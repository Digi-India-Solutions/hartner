import Image from "next/image";
import Link from "next/link";

function LeistungenSection() {
  const leistungen = [
    {
      title: "Gewerbeimmobilien",
      image: "/images/NG5.png",
      description: "Anlageobjekte, Zinshäuser und Wohnprojekte mit nachhaltiger Rendite. Wir finden Investments, die zu Ihren Zielen passen.",
      link: "/immobilien_kategorie/gewerbeimmobilien"
    },
    {
      title: "Investmentimmobilien",
      image: "/images/triest.jpeg",
      description: "Anlageobjekte, Zinshäuser und Wohnprojekte mit nachhaltiger Rendite. Wir finden Investments, die zu Ihren Zielen passen.",
      link: "/immobilien_kategorie/investmentimmobilien"
    },
    {
      title: "Mietobjekte",
      image: "/images/Mietobjekt.jpeg",
      description: "Wir vermitteln Mietwohnungen und Gewerbeimmobilien – schnell, diskret und passgenau für Mieter und deren Vermieter.",
      link: "/immobilien_kategorie/mietobjekte"
    },
    {
      title: "Wohnimmobilien",
      image: "/images/hausmit.jpeg",
      description: "Ob exklusive Villa, gemütliche Wohnung oder Baugrundstück – wir finden Ihr neues Zuhause oder die passende Wohnimmobilie.",
      link: "/immobilien_kategorie/wohnimmobilien"
    }
  ];

  return (
    <section className="bg-white py-24 border-t border-gray-100">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-20">
        
        {/* Header */}
        <div className="mb-16">
          <p className="text-yellow-600 text-sm font-semibold tracking-wider mb-4 uppercase">
            Unsere Leistungen
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-black leading-tight max-w-4xl">
            Individuelle Lösungen für jede Immobilienentscheidung
          </h2>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {leistungen.map((item, index) => (
            <Link 
              href={item.link} 
              key={index} 
              className="group flex flex-col cursor-pointer transition-all duration-300"
            >
              {/* Image Container with Zoom effect */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Text details */}
              <div className="mt-6 flex flex-col flex-grow">
                <h3 className="text-[26px] font-light text-black mb-4 group-hover:text-yellow-600 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-[16px] leading-8 font-light">
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

export default LeistungenSection;
