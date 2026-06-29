"use client";

import { useState } from "react";

import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

export default function Wohnimmobilien() {
  const images = [
    "/images/prop.jpg",
    "/images/prop2.jpg",
    "/images/prop3.jpg",
    "/images/prop4.jpg",
  ];

  const [activeImage, setActiveImage] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="bg-white min-h-screen">
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 md:pt-36 pb-8">

      {/* Header */}
      <div className="mb-12">
        <p className="text-[#c8a052] uppercase tracking-widest text-sm font-semibold">
          Wohnimmobilien
        </p>

        <h1 className="text-4xl md:text-6xl font-serif mt-4 leading-tight text-black">
          Exklusive Wohnimmobilien mit besonderem Charakter
        </h1>

        <p className="text-gray-600 mt-6 max-w-3xl text-lg leading-8">
          Ob exklusive Villa, gemütliche Wohnung oder Baugrundstück –
          wir finden Ihr neues Zuhause oder die passende Wohnimmobilie.
        </p>
      </div>

<div className="grid grid-cols-1 2xl:grid-cols-4 gap-8">

        <div className="lg:col-span-3">

          <Swiper
            navigation
            modules={[Navigation]}
            initialSlide={activeImage}
            onSlideChange={(swiper) =>
              setActiveImage(swiper.activeIndex)
            }
            className="rounded-3xl overflow-hidden"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt={`Property ${index + 1}`}
                  className="w-full h-[300px] sm:h-[450px] lg:h-[650px] object-cover rounded-3xl"
                />
              </SwiperSlide>
            ))}
          </Swiper>

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
                    ? "border-yellow-500"
                    : "border-transparent"
                }`}
              />
            ))}
          </div>

        </div>

        <div className="bg-[#1f242b] text-white rounded-3xl p-10 xl:p-12 h-fit xl:sticky xl:top-36 xl:ml-10 w-full xl:w-[420px] flex flex-col gap-8">
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
            {/* Property Details */}
            
    {/* Objektbeschreibung */}
<div className="mt-20 space-y-10">

  <div className="bg-white rounded-3xl border border-gray-200 p-8 md:p-12">
    <h2 className="text-4xl font-serif mb-3 text-black">
      Objektbeschreibung
    </h2>

    <div className="w-14 h-1 bg-[#c8a052] mb-8"></div>

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
  <div className="bg-white rounded-3xl border border-gray-200 p-8 md:p-12">
    <h2 className="text-4xl font-serif mb-3 text-black">
      Flächen & Einheiten
    </h2>

    <div className="w-14 h-1 bg-[#c8a052] mb-8"></div>

    <div className="border rounded-2xl p-6 flex items-center gap-5">
      <div className="w-16 h-16 rounded-full border flex items-center justify-center text-3xl text-[#c8a052]">
        🏠
      </div>

      <div>
        <p className="text-gray-500">
          Wohnfläche
        </p>

        <h3 className="text-3xl font-semibold text-black">
          280 m²
        </h3>
      </div>
    </div>
  </div>

  {/* Objektdaten */}
  <div className="bg-white rounded-3xl border border-gray-200 p-8 md:p-12">
    <h2 className="text-4xl font-serif mb-3 text-black">
      Objektdaten & Zustand
    </h2>

    <div className="w-14 h-1 bg-[#c8a052] mb-8"></div>

    <div className="grid md:grid-cols-2 gap-6">

      <div className="border rounded-2xl p-6 flex gap-5 items-center">
        <div className="w-16 h-16 rounded-full border flex items-center justify-center text-3xl text-[#c8a052]">
          🔥
        </div>

        <div>
          <p className="text-gray-500">
            Heizung
          </p>

          <h3 className="text-3xl font-semibold text-black">
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

          <h3 className="text-3xl font-semibold text-black">
            A+
          </h3>
        </div>
      </div>

    </div>
  </div>

</div>
      {/* Popup Form */}
      {openModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
        <div className="bg-white w-full max-w-xl rounded-3xl p-8 relative shadow-2xl">

            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-5 right-5 text-3xl text-black hover:text-[#c8a052]"
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
                rows="5"
                placeholder="Nachricht"
                className="w-full border p-4 rounded-xl text-black"
              ></textarea>

              <button className="w-full bg-[#c8a052] text-white py-4 rounded-xl text-lg">
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