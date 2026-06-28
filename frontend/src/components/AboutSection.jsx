import {
    FaBuilding,
    FaShieldAlt,
    FaUser,
} from "react-icons/fa";

function AboutSection() {
  return (
    <section className="bg-black text-white py-8">
      <div className="grid grid-cols-3 min-h-[650px]">

        {/* Left Side */}
        <div className="px-12 py-16 flex flex-col justify-center bg-gradient-to-r from-black to-[#111111]">

          <p className="text-yellow-500 font-semibold mb-8 tracking-wide">
            ÜBER UNS
          </p>

          <h2 className="text-7xl font-light leading-tight mb-10">
            Persönlich.
            <br />
            Kompetent.
            <br />
            Vertrauenswürdig.
          </h2>

          <p className="text-gray-300 text-xl leading-10 mb-10">
            Bei Haertner Immobilien stehen Sie im Mittelpunkt.
            Wir nehmen uns Zeit, hören zu und entwickeln
            Lösungen, die wirklich zu Ihnen passen.
          </p>

          <p className="text-gray-300 text-xl leading-10">
            Unsere Erfahrung, Diskretion und Leidenschaft
            für Immobilien machen den Unterschied für
            Eigentümer, Käufer und Investoren.
          </p>
        </div>

        {/* Center Image */}
        <div className="h-[650px]">
        <img
            src="/images/about.jpg"
            alt="About"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side */}
        <div className="bg-[#111111] px-12 flex flex-col justify-center gap-16">

          <div className="flex items-center gap-8">
            <FaBuilding className="text-yellow-500 text-5xl" />
            <h3 className="text-4xl font-light leading-snug">
              Ausgezeichnete
              <br />
              Marktkenntnis
            </h3>
          </div>

          <div className="flex items-center gap-8">
            <FaUser className="text-yellow-500 text-5xl" />
            <h3 className="text-4xl font-light">
              Maßgeschneiderte Lösungen
            </h3>
          </div>

          <div className="flex items-center gap-8">
            <FaUser className="text-yellow-500 text-5xl" />
            <h3 className="text-4xl font-light">
              Persönlicher Service
            </h3>
          </div>

          <div className="flex items-center gap-8">
            <FaShieldAlt className="text-yellow-500 text-5xl" />
            <h3 className="text-4xl font-light">
              Diskretion & Vertrauen
            </h3>
          </div>

        </div>

      </div>
    </section>
  );
}

export default AboutSection;