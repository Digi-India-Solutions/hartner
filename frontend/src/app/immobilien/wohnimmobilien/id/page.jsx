"use client";

import { useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

export default function Gewerbeimmobilien() {
  const images = [
    "/images/card5.jpg",
    "/images/card2.jpg",
    "/images/card3.jpg",
    "/images/card4.jpg",
  ];

  const [activeImage, setActiveImage] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="bg-[#f7f7f7] min-h-screen">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 pt-32 pb-20">

        {/* Header */}

        <div className="flex flex-col xl:flex-row xl:justify-between gap-10 mb-10">

          <div>
            <span className="inline-block px-5 py-2 rounded-full bg-[#f4efe4] text-[#c8a052] text-sm uppercase font-semibold tracking-widest">
              Immobilienangebot
            </span>

            <h1 className="text-4xl md:text-6xl font-serif text-black mt-5 leading-tight">
              Exklusive Villa mit Pool und Garten
            </h1>

            <p className="text-gray-500 mt-5 text-lg">
              📍 Hietzing, Wien, Österreich
            </p>
          </div>

          <div className="xl:text-right space-y-6">

            <div>
              <p className="text-sm uppercase tracking-widest text-gray-400">
                Kaufpreis
              </p>

              <h2 className="text-4xl font-semibold text-[#c8a052] mt-2">
                € 2.850.000
              </h2>
            </div>

            <div>
              <p className="text-sm uppercase tracking-widest text-gray-400">
                Miete
              </p>

              <h2 className="text-4xl font-semibold text-[#c8a052] mt-2">
                € 6.500 / Monat
              </h2>
            </div>

          </div>

        </div>

        <div className="grid lg:grid-cols-[2fr_420px] gap-8">

          {/* LEFT */}

          <div>

            <div className="bg-white rounded-3xl overflow-hidden border">

              <Swiper
                navigation
                modules={[Navigation]}
                initialSlide={activeImage}
                onSlideChange={(swiper) =>
                  setActiveImage(swiper.activeIndex)
                }
              >
                {images.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={img}
                      alt=""
                      className="w-full h-[550px] object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">

              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt=""
                  onClick={() => {
                    document
                      .querySelector(".swiper")
                      ?.swiper.slideTo(index);

                    setActiveImage(index);
                  }}
                  className={`h-24 md:h-28 w-full object-cover rounded-xl cursor-pointer border-4 transition-all ${
                    activeImage === index
                      ? "border-[#c8a052]"
                      : "border-transparent"
                  }`}
                />
              ))}

            </div>

            {/* Objektbeschreibung */}

            <div className="bg-white rounded-3xl border p-10 mt-10">

              <h2 className="text-5xl font-serif text-black">
                Objektbeschreibung
              </h2>

              <div className="w-14 h-1 bg-[#c8a052] mt-4 mb-8"></div>

              <p className="text-gray-600 text-lg leading-10">
                Diese exklusive Wohnimmobilie bietet großzügige Räume,
                hochwertige Ausstattung und eine ruhige Wohnlage.
              </p>

              <p className="text-gray-600 text-lg leading-10 mt-6">
                Die Immobilie überzeugt durch moderne Architektur,
                lichtdurchflutete Räume und ein angenehmes Wohngefühl.
              </p>

              <ul className="mt-8 space-y-4 text-gray-600 text-lg">
                <li>• Großzügiger Wohnbereich</li>
                <li>• Moderne Küche</li>
                <li>• Schlafzimmer mit viel Tageslicht</li>
                <li>• Hochwertiges Badezimmer</li>
                <li>• Balkon oder Terrasse</li>
              </ul>

            </div>

            {/* Flächen */}

            <div className="bg-white rounded-3xl border p-10 mt-10">

              <h2 className="text-5xl font-serif text-black">
                Flächen & Einheiten
              </h2>

              <div className="w-14 h-1 bg-[#c8a052] mt-4 mb-8"></div>

              <div className="grid md:grid-cols-2 gap-6">

                <div className="border rounded-2xl p-6 flex gap-5 items-center">
                  <div className="w-16 h-16 rounded-full border flex items-center justify-center text-3xl text-[#c8a052]">
                    🏠
                  </div>

                  <div>
                    <p className="text-gray-500">
                      Wohnfläche
                    </p>

                    <h3 className="text-3xl font-semibold">
                      280 m²
                    </h3>
                  </div>
                </div>

                <div className="border rounded-2xl p-6 flex gap-5 items-center">
                  <div className="w-16 h-16 rounded-full border flex items-center justify-center text-3xl text-[#c8a052]">
                    🏗️
                  </div>

                  <div>
                    <p className="text-gray-500">
                      Nutzfläche
                    </p>

                    <h3 className="text-3xl font-semibold">
                      510 m²
                    </h3>
                  </div>
                </div>

                                <div className="border rounded-2xl p-6 flex gap-5 items-center">
                  <div className="w-16 h-16 rounded-full border flex items-center justify-center text-3xl text-[#c8a052]">
                    ⬜
                  </div>

                  <div>
                    <p className="text-gray-500">
                      Grundfläche
                    </p>

                    <h3 className="text-3xl font-semibold">
                      1.050 m²
                    </h3>
                  </div>
                </div>

                <div className="border rounded-2xl p-6 flex gap-5 items-center">
                  <div className="w-16 h-16 rounded-full border flex items-center justify-center text-3xl text-[#c8a052]">
                    🗺️
                  </div>

                  <div>
                    <p className="text-gray-500">
                      Widmung
                    </p>

                    <h3 className="text-3xl font-semibold">
                      Wohngebiet
                    </h3>
                  </div>
                </div>

              </div>

            </div>

            {/* Objektdaten */}

            <div className="bg-white rounded-3xl border p-10 mt-10">

              <h2 className="text-5xl font-serif text-black">
                Objektdaten & Zustand
              </h2>

              <div className="w-14 h-1 bg-[#c8a052] mt-4 mb-8"></div>

              <div className="grid md:grid-cols-2 gap-6">

                <div className="border rounded-2xl p-6 flex gap-5 items-center">
                  <div className="w-16 h-16 rounded-full border flex items-center justify-center text-3xl text-[#c8a052]">
                    📅
                  </div>

                  <div>
                    <p className="text-gray-500">
                      Baujahr
                    </p>

                    <h3 className="text-3xl font-semibold">
                      2021
                    </h3>
                  </div>
                </div>

                <div className="border rounded-2xl p-6 flex gap-5 items-center">
                  <div className="w-16 h-16 rounded-full border flex items-center justify-center text-3xl text-[#c8a052]">
                    🔥
                  </div>

                  <div>
                    <p className="text-gray-500">
                      Heizung
                    </p>

                    <h3 className="text-3xl font-semibold">
                      Fernwärme
                    </h3>
                  </div>
                </div>

                <div className="border rounded-2xl p-6 flex gap-5 items-center">
                  <div className="w-16 h-16 rounded-full border flex items-center justify-center text-3xl text-[#c8a052]">
                    ⚡
                  </div>

                  <div>
                    <p className="text-gray-500">
                      Energieklasse
                    </p>

                    <h3 className="text-3xl font-semibold">
                      A+
                    </h3>
                  </div>
                </div>

                <div className="border rounded-2xl p-6 flex gap-5 items-center">
                  <div className="w-16 h-16 rounded-full border flex items-center justify-center text-3xl text-[#c8a052]">
                    🛡️
                  </div>

                  <div>
                    <p className="text-gray-500">
                      Zustand
                    </p>

                    <h3 className="text-3xl font-semibold">
                      Luftwärmepumpe
                    </h3>
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* RIGHT SIDEBAR */}

          <div className="space-y-8 lg:sticky lg:top-32 h-fit">

            <div className="bg-white rounded-3xl border p-8">

              <h3 className="uppercase tracking-widest text-sm font-semibold text-gray-500 mb-6">
                Finanzen & Rendite
              </h3>

              <div className="border-2 border-dashed border-green-300 rounded-2xl bg-green-50 py-8 text-center mb-8">

                <p className="text-gray-500 mb-2">
                  Erwartete Rendite
                </p>

                <h2 className="text-green-600 text-4xl font-bold">
                  € 15,50 / m²
                </h2>

              </div>

              <div className="space-y-5">

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Ist-Ertrag (netto)
                  </span>

                  <span className="font-semibold">
                    € 72.000 / Jahr
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Soll-Ertrag (netto)
                  </span>

                  <span className="font-semibold">
                    € 80.000 / Jahr
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Ø Ist-Netto-Mietzins
                  </span>

                  <span className="font-semibold">
                    € 80.000 / Jahr
                  </span>
                </div>

              </div>

            </div>

            <div className="bg-white rounded-3xl border p-8">

              <h3 className="uppercase tracking-widest text-sm font-semibold text-gray-500 mb-6">
                Ausstattung & Belegung
              </h3>

              <div className="space-y-5">

                <div className="flex justify-between">
                  <span>Balkon/Terrassen</span>
                  <span className="bg-gray-100 px-3 py-1 rounded-lg">
                    3
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Eigengärten</span>
                  <span className="bg-gray-100 px-3 py-1 rounded-lg">
                    1
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Abstellplatz</span>
                  <span className="bg-gray-100 px-3 py-1 rounded-lg">
                    4 Stellplätze
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Leerstand</span>
                  <span className="bg-gray-100 px-3 py-1 rounded-lg">
                    Nein
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Befristungen</span>
                  <span className="bg-gray-100 px-3 py-1 rounded-lg">
                    Keine
                  </span>
                </div>

              </div>

            </div>

            <div className="bg-[#1f242b] text-white rounded-3xl p-10">

              <h2 className="text-3xl font-serif mb-4">
                Interesse geweckt?
              </h2>

              <p className="text-gray-300 leading-8 mb-8">
                Fordern Sie jetzt das Exposé an oder vereinbaren Sie einen Besichtigungstermin.
              </p>

              <button
                onClick={() => setOpenModal(true)}
                className="w-full bg-[#c8a052] hover:bg-[#b0893f] transition py-4 rounded-xl text-lg font-semibold"
              >
                Exposé anfordern
              </button>

            </div>

          </div>

        </div>

        {openModal && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">

            <div className="bg-white w-full max-w-xl rounded-3xl p-8 relative">

              <button
                onClick={() => setOpenModal(false)}
                className="absolute top-5 right-5 text-3xl"
              >
                ×
              </button>

              <h2 className="text-4xl font-serif mb-6 text-black">
                Anfrage senden
              </h2>

              <div className="space-y-4">

                <input
                  type="text"
                  placeholder="Name"
                  className="w-full border p-4 rounded-xl text-black"
                />

                <input
                  type="email"
                  placeholder="E-Mail"
                  className="w-full border p-4 rounded-xl text-black"
                />

                <input
                  type="tel"
                  placeholder="Telefon"
                  className="w-full border p-4 rounded-xl text-black"
                />

                <textarea
                  rows={5}
                  placeholder="Nachricht"
                  className="w-full border p-4 rounded-xl text-black"
                ></textarea>

                <button className="w-full bg-[#c8a052] text-white py-4 rounded-xl">
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