import {
  FaChartBar,
  FaShieldAlt,
  FaUser,
} from "react-icons/fa";

function ServiceCards() {
  return (
    <section className="bg-white pb-24 pt-10">
      <div className="max-w-[1700px] mx-auto px-6 md:px-10 lg:px-20">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Card 1 */}
          <div className="border border-[#d4ad58] h-[320px] px-10 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-2">

            <FaUser className="text-[#c8a052] text-5xl mb-8" />

            <h3
              className="text-[34px] text-black mb-6 leading-tight font-normal"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Persönliche Betreuung
            </h3>

            <p
              className="text-gray-600 text-[18px] leading-10 max-w-[420px]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Individuelle Beratung und begleitende
              Unterstützung.
            </p>

          </div>

          {/* Card 2 */}
          <div className="border border-[#d4ad58] h-[320px] px-10 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-2">

            <FaChartBar className="text-[#c8a052] text-5xl mb-8" />

            <h3
              className="text-[34px] text-black mb-6 leading-tight font-normal"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Sorglose Abwicklung
            </h3>

            <p
              className="text-gray-600 text-[18px] leading-10 max-w-[420px]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Wir kümmern uns um den gesamten Prozess.
            </p>

          </div>

          {/* Card 3 */}
          <div className="border border-[#d4ad58] h-[320px] px-10 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-2">

            <FaShieldAlt className="text-[#c8a052] text-5xl mb-8" />

            <h3
              className="text-[34px] text-black mb-6 leading-tight font-normal"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Verlässliche Partnerschaft
            </h3>

            <p
              className="text-gray-600 text-[18px] leading-10 max-w-[420px]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Vertrauen, Integrität und Diskretion stehen
              bei uns an erster Stelle.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}

export default ServiceCards;