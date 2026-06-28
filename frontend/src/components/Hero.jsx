"use client";

import { useEffect, useState } from "react";

function Hero() {
  const images = [
    "/images/hero-1.jpg",
    "/images/hero-2.jpg",
    "/images/hero-3.jpg",
    "/images/hero-4.jpg",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${images[currentImage]})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
        <div className="relative z-10 w-full pl-20 md:pl-28 lg:pl-36">

        <div className="max-w-3xl">

          <h1 className="
            text-white
            font-light
            leading-tight
            text-4xl
            sm:text-5xl
            md:text-6xl
            lg:text-7xl
          ">
            Ihr Immobilienpartner
            <br />
            für Wohnen, Gewerbe &
            <br />
            Investment in Österreich
          </h1>

          <p className="
            mt-6
            text-gray-200
            leading-8
            max-w-2xl
            text-lg
            md:text-xl
          ">
            Seit mehr als 20 Jahren stehen wir für Kompetenz,
            Vertrauen und persönliche Betreuung.
          </p>

          <div className="
            flex
            flex-col
            sm:flex-row
            gap-4
            mt-10
          ">
            <button className="
              bg-yellow-600
              text-black
              px-8
              py-4
              font-semibold
              hover:bg-yellow-500
              transition
            ">
              MEHR ÜBER UNS
            </button>

            <button className="
              border
              border-white
              text-white
              px-8
              py-4
              hover:bg-white
              hover:text-black
              transition
            ">
              KONTAKT AUFNEHMEN
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;