"use client";

import {
  Building2,
  Calendar,
  Home,
  MapPin,
  Ruler,
  Shield,
  Wrench,
  Zap
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

export default function Wohnimmobilien() {
    const images = [
    "/images/card1.jpg",
    "/images/card2.jpg",
    "/images/card3.jpg",
    "/images/card4.jpg",
    "/images/card5.jpg",
    ];

const [activeImage, setActiveImage] = useState(0);
const [openModal, setOpenModal] = useState(false);
const [isMounted, setIsMounted] = useState(false);
const swiperRef = useRef(null);
const containerRef = useRef(null);

    useEffect(() => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    }, []);

    // Container ka layout settle hone do, phir Swiper ko force update karo
    useEffect(() => {
      if (!isMounted) return;

      const forceUpdate = () => {
        if (swiperRef.current && containerRef.current) {
          const width = containerRef.current.offsetWidth;
          if (width > 0) {
            swiperRef.current.updateSize();
            swiperRef.current.updateSlides();
            swiperRef.current.updateProgress();
            swiperRef.current.updateSlidesClasses();
          }
        }
      };

      // Multiple attempts — layout settle hone tak
      const t1 = setTimeout(forceUpdate, 50);
      const t2 = setTimeout(forceUpdate, 200);
      const t3 = setTimeout(forceUpdate, 500);

      // Window resize par bhi update karo
      window.addEventListener("resize", forceUpdate);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        window.removeEventListener("resize", forceUpdate);
      };
    }, [isMounted]);

return (
    <div className="bg-[#f6f6f6] min-h-screen w-full overflow-x-hidden">
    
    <div className="max-w-[1600px] mx-auto px-4 lg:px-8 pt-32 pb-20">

        {/* HEADER */}
        <div className="border-b border-gray-300 pb-10 mb-10">
        <div className="flex flex-col xl:flex-row xl:justify-between gap-10 w-full">

            <div>
            <span className="inline-block px-5 py-2 rounded-full bg-[#f4efe4] text-[#c8a052] text-sm font-semibold uppercase">
                Immobilienangebot
            </span>

            <h1 className="font-serif text-black mt-6 leading-tight text-4xl md:text-6xl max-w-4xl">
                Exklusive Villa mit Pool und Garten
            </h1>

            <div className="flex items-center gap-3 mt-6 text-gray-600 text-xl">
                <MapPin size={24} className="text-[#c8a052]" />
                <span>Hietzing, Wien, Österreich</span>
            </div>
            </div>

            <div className="text-right min-w-[240px]">
            <p className="uppercase text-gray-500 text-sm mb-1">
                Kaufpreis
            </p>

            <h3 className="text-[#c8a052] text-5xl font-semibold">
                € 2.850.000
            </h3>

            <p className="uppercase text-gray-500 text-sm mt-10 mb-1">
                Miete
            </p>

            <h3 className="text-[#c8a052] text-4xl font-semibold">
                € 6.500 / Monat
            </h3>
            </div>

        </div>
        </div>

        {/* MAIN LAYOUT — Flexbox with explicit width boundary for Swiper isolation */}
        <div className="flex flex-col xl:flex-row gap-10 w-full items-start">

          {/* LEFT SIDE — Takes remaining space but limited structurally */}
        <div className="w-full xl:flex-1 min-w-0 block overflow-hidden">

            {/* IMAGE CAROUSEL */}
            <div
              ref={containerRef}
              className="bg-white rounded-[30px] border overflow-hidden w-full relative h-[650px]"
            >
              {isMounted ? (
                <Swiper
                  navigation
                  modules={[Navigation]}
                  className="propertySwiper h-full w-full"
                  initialSlide={activeImage}
                  observer={true}
                  observeParents={true}
                  observeSlideChildren={true}
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                    // Mount ke turant baad ek forced update
                    requestAnimationFrame(() => {
                      swiper.updateSize();
                      swiper.updateSlides();
                      swiper.updateProgress();
                      swiper.updateSlidesClasses();
                    });
                  }}
                  onSlideChange={(swiper) => setActiveImage(swiper.activeIndex)}
                >
                  {images.map((img, index) => (
                    <SwiperSlide key={index} className="w-full h-full relative">
                      <img
                        src={img}
                        alt={`Ansicht ${index + 1}`}
                        className="w-full h-full object-cover block absolute inset-0"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="w-full h-full bg-gray-200 animate-pulse" />
              )}
            </div>

            {/* THUMBNAILS */}
            <div className="grid grid-cols-5 gap-5 mt-8">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Vorschau ${index + 1}`}
                  onClick={() => {
                    if (swiperRef.current) {
                      swiperRef.current.slideTo(index);
                    }
                    setActiveImage(index);
                  }}
                  className={`h-[130px] w-full object-cover cursor-pointer rounded-md border-4 transition ${
                    activeImage === index
                      ? "border-[#c8a052]"
                      : "border-transparent"
                  }`}
                />
              ))}
            </div>

            {/* OBJEKTBESCHREIBUNG */}
            <div className="mt-10 bg-white border rounded-[30px] p-10">
              <h2 className="font-serif text-5xl text-black">
                Objektbeschreibung
              </h2>

              <div className="w-14 h-1 bg-[#c8a052] mt-4 mb-8"></div>

              <p className="text-gray-600 text-2xl leading-10">
                Diese exklusive Villa befindet sich in einer der
                begehrtesten Wohnlagen Wiens und bietet höchsten
                Wohnkomfort auf großzügiger Fläche.
              </p>

              <p className="text-gray-600 text-2xl leading-10 mt-8">
                Das moderne Design, hochwertige Materialien sowie ein
                wunderschöner Garten mit Pool schaffen ein
                einzigartiges Wohngefühl.
              </p>

              <p className="text-gray-600 text-2xl leading-10 mt-8">
                Die Immobilie eignet sich ideal für Familien oder
                Investoren, die Wert auf Qualität, Lage und
                langfristige Wertstabilität legen.
              </p>
            </div>

            {/* FLAECHEN */}
            <div className="mt-10 bg-white border rounded-[30px] p-10">
              <h2 className="font-serif text-5xl text-black">
                Flächen & Einheiten
              </h2>

              <div className="w-14 h-1 bg-[#c8a052] mt-4 mb-10"></div>

              <div className="grid md:grid-cols-2 gap-6">

                <div className="border rounded-2xl p-8 flex gap-5 items-center">
                  <div className="w-16 h-16 rounded-full border flex items-center justify-center flex-shrink-0">
                    <Home className="text-[#c8a052]" />
                  </div>
                  <div>
                    <p className="text-gray-500">Wohnfläche</p>
                    <h3 className="text-4xl  text-black">420 m²</h3>
                  </div>
                </div>

                <div className="border rounded-2xl p-8 flex gap-5 items-center">
                  <div className="w-16 h-16 rounded-full border flex items-center justify-center flex-shrink-0">
                    <Building2 className="text-[#c8a052]" />
                  </div>
                  <div>
                    <p className="text-gray-500">Nutzfläche</p>
                    <h3 className="text-4xl  text-black">510 m²</h3>
                  </div>
                </div>

                <div className="border rounded-2xl p-8 flex gap-5 items-center">
                  <div className="w-16 h-16 rounded-full border flex items-center justify-center flex-shrink-0">
                    <Ruler className="text-[#c8a052]" />
                  </div>
                  <div>
                    <p className="text-gray-500">Grundfläche</p>
                    <h3 className="text-4xl text-black">1.050 m²</h3>
                  </div>
                </div>

                <div className="border rounded-2xl p-8 flex gap-5 items-center">
                  <div className="w-16 h-16 rounded-full border flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-[#c8a052]" />
                  </div>
                  <div>
                    <p className="text-gray-500">Widmung</p>
                    <h3 className="text-4xl  text-black">Wohngebiet</h3>
                  </div>
                </div>

              </div>
            </div>

            {/* OBJEKTDATEN */}
            <div className="mt-10 bg-white border rounded-[30px] p-10">
              <h2 className="font-serif text-5xl text-black">
                Objektdaten & Zustand
              </h2>

              <div className="w-14 h-1 bg-[#c8a052] mt-4 mb-10"></div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                <div className="border rounded-2xl p-8 flex gap-5 items-center">
                  <div className="w-16 h-16 rounded-full border flex items-center justify-center flex-shrink-0">
                    <Calendar className="text-[#c8a052]" />
                  </div>
                  <div>
                    <p className="text-gray-500">Baujahr</p>
                    <h3 className="text-3xl  text-black">2021</h3>
                  </div>
                </div>

                {/* <div className="border rounded-2xl p-8 flex gap-5 items-center">
                  <div className="w-16 h-16 rounded-full border flex items-center justify-center flex-shrink-0">
                    <Flame className="text-[#c8a052]" />
                  </div>
                  <div>
                    <p className="text-gray-500">Heizung</p>
                    <h3 className="text-3xl font-semibold">Luftwärmepumpe</h3>
                  </div>
                </div> */}

                <div className="border rounded-2xl p-8 flex gap-5 items-center">
                  <div className="w-16 h-16 rounded-full border flex items-center justify-center flex-shrink-0">
                    <Shield className="text-[#c8a052]" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-black">Zustand</p>
                    <h3 className="text-3xl  text-black">Exzellent</h3>
                  </div>
                </div>

                <div className="border rounded-2xl p-8 flex gap-5 items-center">
                  <div className="w-16 h-16 rounded-full border flex items-center justify-center flex-shrink-0">
                    <Zap className="text-[#c8a052]" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-black">HWB + fGEE</p>
                    <h3 className="text-3xl  text-black">A++ Klasse</h3>
                  </div>
                </div>

                <div className="border rounded-2xl p-8 flex gap-5 items-center">
                  <div className="w-16 h-16 rounded-full border flex items-center justify-center flex-shrink-0">
                    <Wrench className="text-[#c8a052]" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-black">Bau-Potenzial</p>
                    <h3 className="text-3xl  text-black">Hoch</h3>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* RIGHT SIDEBAR — Fixed width to maintain layout integrity */}
          <div className="space-y-8 w-full xl:w-[470px] flex-shrink-0 block xl:sticky xl:top-32 h-auto">

            <div className="bg-white border rounded-[30px] p-8">
              <h3 className="font-serif text-3xl mb-8 text-black">
                FINANZEN & RENDITE
              </h3>

              <div className="border border-green-400 rounded-2xl p-8 text-center mb-8">
                <p className="text-gray-500 mb-3">
                  Erwartete Rendite
                </p>
                <h2 className="text-green-600 text-5xl font-bold">
                  € 15,50 / m²
                </h2>
              </div>

              <div className="space-y-6 text-xl">
                <div className="flex justify-between border-b pb-4">
                  <span className="text-gray-500">Ist-Ertrag (netto)</span>
                  <span className="font-semibold text-black">€ 72.000 / Jahr</span>
                </div>

                <div className="flex justify-between border-b pb-4">
                  <span className="text-gray-500">Soll-Ertrag (netto)</span>
                  <span className="font-semibold text-black">€ 80.000 / Jahr</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Ø Ist-Netto-Mietzins</span>
                  <span className="font-semibold text-black">€ 5.800 / Monat</span>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-[30px] p-8">
              <h3 className="font-serif text-3xl mb-8 text-black">
                AUSSTATTUNG & BELEGUNG
              </h3>

              <div className="space-y-6 text-xl">
                <div className="flex justify-between">
                  <span className="text-gray-500">Balkon/Terrassen</span>
                  <span className="px-3 py-1 rounded bg-gray-100 text-black">3</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Eigengärten</span>
                  <span className="px-3 py-1 rounded bg-gray-100 text-black">1</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Abstellplatz</span>
                  <span className="px-3 py-1 rounded bg-gray-100 text-black">4 Stellplätze</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Leerstand</span>
                  <span className="px-3 py-1 rounded bg-gray-100 text-black">Nein</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Befristungen</span>
                  <span className="px-3 py-1 rounded bg-gray-100 text-black">Keine</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Unbefristete Vermietung</span>
                  <span className="px-3 py-1 rounded bg-gray-100 text-black">Ja</span>
                </div>
              </div>
            </div>

            <div className="bg-[#171d26] text-white rounded-[30px] p-10">
              <h2 className="font-serif text-4xl mb-6">
                Interesse geweckt?
              </h2>

              <p className="text-gray-300 leading-8 mb-10 text-xl">
                Fordern Sie jetzt das unverbindliche Exposé an oder
                vereinbaren Sie einen persönlichen Besichtigungstermin.
              </p>

              <button
                onClick={() => setOpenModal(true)}
                className="w-full bg-[#c8a052] hover:bg-[#b59143] transition py-5 rounded-xl text-2xl font-semibold text-white"
              >
                Exposé anfordern
              </button>
            </div>

          </div>
        </div>

        {/* MODAL WINDOW */}
        {openModal && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
            <div className="bg-white max-w-xl w-full rounded-3xl p-8 relative">
              <button
                onClick={() => setOpenModal(false)}
                className="absolute right-6 top-4 text-4xl text-gray-500 hover:text-black"
              >
                ×
              </button>

              <h2 className="text-4xl font-serif mb-8 text-black">
                Anfrage senden
              </h2>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full border rounded-xl p-4 text-black"
                />

                <input
                  type="email"
                  placeholder="E-Mail"
                  className="w-full border rounded-xl p-4 text-black"
                />

                <input
                  type="tel"
                  placeholder="Telefon"
                  className="w-full border rounded-xl p-4 text-black"
                />

                <textarea
                  rows={5}
                  placeholder="Nachricht"
                  className="w-full border rounded-xl p-4 text-black"
                />

                <button className="w-full bg-[#c8a052] text-white py-4 rounded-xl text-xl font-semibold hover:bg-[#b59143] transition">
                  Anfrage senden
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
