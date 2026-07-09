"use client";

import { useEffect, useState } from "react";

const images = [
  "https://hartner.digiindiasolutions.com/wp-content/themes/hartner-theme/images/hausmit.jpeg",
  "https://hartner.digiindiasolutions.com/wp-content/themes/hartner-theme/images/NG5.png",
  "https://hartner.digiindiasolutions.com/wp-content/themes/hartner-theme/images/slavia.jpeg",
  "https://hartner.digiindiasolutions.com/wp-content/themes/hartner-theme/images/triest.jpeg",
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-start overflow-hidden bg-black">
      {/* Background Images Stack for Smooth Cross-Fade */}
      {images.map((img, index) => (
        <div
          key={img}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            currentImage === index ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${img})`,
          }}
        />
      ))}

      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-black/60" /> */}

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 xl:px-20 pt-32 pb-16">
        <div className="max-w-[850px]">
          <h1 className="text-white font-serif font-bold leading-[1.1] text-4xl sm:text-5xl md:text-6xl lg:text-[72px]">
            Ihr Immobilienpartner für Wohnen, Gewerbe & Investment in Österreich und in der EU
          </h1>

          <p className="mt-8 text-gray-300 text-base md:text-xl leading-relaxed max-w-3xl">
            Seit mehr als 20 Jahren stehen wir für Kompetenz, Vertrauen und persönliche Betreuung. Wir finden die richtige Immobilie oder den passenden Käufer – für Ihre Ziele.
          </p>
        </div>
      </div>
    </section>
  );
}