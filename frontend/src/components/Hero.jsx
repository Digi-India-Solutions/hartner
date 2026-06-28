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
      className="relative min-h-screen flex items-center bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `url(${images[currentImage]})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55"></div>

      {/* Content */}
      <div className="relative z-10 w-full pl-8 md:pl-12 lg:pl-20 pt-28 md:pt-32">

        <div className="max-w-[850px]">

          <h1
            className="
              text-white
              font-light
              leading-[1.1]
              text-4xl
              sm:text-5xl
              md:text-6xl
              lg:text-[72px]
            "
            style={{
              fontFamily: "Georgia, serif",
            }}
          >
            Ihr Immobilienpartner
            <br />
            für Wohnen, Gewerbe &
            <br />
            Investment in Österreich
            <br />
            und in der EU
          </h1>

          <p
            className="
              mt-8
              text-white/90
              text-base
              md:text-xl
              leading-8
              max-w-3xl
            "
          >
            Seit mehr als 20 Jahren stehen wir für Kompetenz,
            Vertrauen und persönliche Betreuung. Wir finden
            die richtige Immobilie oder den passenden Käufer –
            für Ihre Ziele.
          </p>

          <div
            className="
              flex
              flex-col
              sm:flex-row
              gap-4
              mt-10
            "
          >
            {/* Buttons agar chahiye to yahan uncomment kar lena */}
          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;