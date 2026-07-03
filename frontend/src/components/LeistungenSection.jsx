"use client";

import Image from "next/image";
import Link from "next/link";

export default function LeistungenSection() {
  const leistungen = [
    {
      title: "Gewerbeimmobilien",
      image: "/images/NG5.png",
      description: "Anlageobjekte, Zinshäuser und Wohnprojekte mit nachhaltiger Rendite. Wir finden Investments, die zu Ihren Zielen passen.",
      link: "/immobilien/gewerbeimmobilien"
    },
    {
      title: "Investmentimmobilien",
      image: "/images/triest.jpeg",
      description: "Anlageobjekte, Zinshäuser und Wohnprojekte mit nachhaltiger Rendite. Wir finden Investments, die zu Ihren Zielen passen.",
      link: "/immobilien/investmentimmobilien"
    },
    {
      title: "Mietobjekte",
      image: "/images/Mietobjekt.jpeg",
      description: "Wir vermitteln Mietwohnungen und Gewerbeimmobilien – schnell, diskret und passgenau für Mieter und deren Vermieter.",
      link: "/immobilien/mietobjekte"
    },
    {
      title: "Wohnimmobilien",
      image: "/images/hausmit.jpeg",
      description: "Villen, Wohnungen und Baugrundstücke für Eigennutzer und Familien.",
      link: "/immobilien/wohnimmobilien"
    }
  ];

  return (
    <section id="properties" className="bg-[#fcfcfc] py-20 border-t border-gray-100 font-sans scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 xl:px-20">
        
        {/* Header */}
        <div className="mb-16">
          <span className="text-[#c8a052] text-sm font-semibold tracking-widest block uppercase mb-4">
            UNSERE LEISTUNGEN
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight max-w-4xl">
            Individuelle Lösungen für jede Immobilienentscheidung
          </h2>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {leistungen.map((item, index) => (
            <Link 
              href={item.link} 
              key={index} 
              className="group bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
            >
              {/* Image Container with Zoom effect */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-750 ease-out group-hover:scale-105"
                />
              </div>

              {/* Text details */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3 group-hover:text-[#c8a052] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
