import { FaBuilding, FaMapMarkerAlt, FaShieldAlt, FaUser } from "react-icons/fa";

function Features() {
  return (
    <section className="absolute bottom-0 left-0 w-full z-20 bg-black/70 backdrop-blur-md py-10">
      <div className="grid grid-cols-4 px-24 gap-12">

        <div className="flex items-center gap-4">
          <FaShieldAlt className="text-yellow-500 text-3xl" />
          <h3 className="font-semibold">
            20+ JAHRE ERFAHRUNG
          </h3>
        </div>

        <div className="flex items-center gap-4">
          <FaUser className="text-yellow-500 text-3xl" />
          <h3 className="font-semibold">
            PERSÖNLICHE BETREUUNG
          </h3>
        </div>

        <div className="flex items-center gap-4">
          <FaBuilding className="text-yellow-500 text-3xl" />
          <h3 className="font-semibold">
            WOHN-, GEWERBE &
            INVESTMENTIMMOBILIEN
          </h3>
        </div>

        <div className="flex items-center gap-4">
          <FaMapMarkerAlt className="text-yellow-500 text-3xl" />
          <h3 className="font-semibold">
            ÖSTERREICHWEITE EXPERTISE
          </h3>
        </div>

      </div>
    </section>
  );
}

export default Features;