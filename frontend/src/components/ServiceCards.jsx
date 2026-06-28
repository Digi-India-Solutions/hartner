import {
    FaChartBar,
    FaShieldAlt,
    FaStar,
    FaUser,
} from "react-icons/fa";

function ServiceCards() {
  return (
    <section className="bg-white pb-24 -mt-10">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        <div className="border border-yellow-500 h-[380px] px-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:-translate-y-3 hover:bg-gray-50">
          <FaStar className="text-yellow-600 text-4xl mb-6" />

          <h3 className="text-3xl font-light mb-5 leading-tight text-black">
            20 Jahre
            <br />
            Erfahrung
          </h3>

          <p className="text-gray-600 leading-8">
            Langjährige Expertise am
            österreichischen
            Immobilienmarkt.
          </p>
        </div>

        <div className="border border-yellow-500 h-[380px] px-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:-translate-y-3 hover:bg-gray-50">
          <FaUser className="text-yellow-600 text-4xl mb-6" />

          <h3 className="text-3xl font-light mb-5 leading-tight text-black">
            Persönliche
            <br />
            Betreuung
          </h3>

          <p className="text-gray-600 leading-8">
            Individuelle Beratung und
            begleitende Unterstützung.
          </p>
        </div>

        <div className="border border-yellow-500 h-[380px] px-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:-translate-y-3 hover:bg-gray-50">
          <FaChartBar className="text-yellow-600 text-4xl mb-6" />

          <h3 className="text-3xl font-light mb-5 leading-tight text-black">
            Sorglose
            <br />
            Abwicklung
          </h3>

          <p className="text-gray-600 leading-8">
            Wir kümmern uns um den
            gesamten Prozess.
          </p>
        </div>

        <div className="border border-yellow-500 h-[380px] px-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:-translate-y-3 hover:bg-gray-50">
          <FaShieldAlt className="text-yellow-600 text-4xl mb-6" />

          <h3 className="text-3xl font-light mb-5 leading-tight text-black">
            Verlässliche
            <br />
            Partnerschaft
          </h3>

          <p className="text-gray-600 leading-8">
            Vertrauen und Diskretion stehen
            bei uns an erster Stelle.
          </p>
        </div>

      </div>
    </section>
  );
}

export default ServiceCards;