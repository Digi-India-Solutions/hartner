import {
  FaBuilding,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaUser,
} from "react-icons/fa";

function Features() {
  return (
    <section className="bg-black/10 backdrop-blur-md py-10 md:py-12">
      <div className="max-w-[1700px] mx-auto px-6 md:px-10 lg:px-20">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          <div className="flex items-center gap-5">
            <FaShieldAlt className="text-[#d4ad58] text-4xl flex-shrink-0" />
            <h3 className="text-white text-lg font-semibold leading-7">
              20+ JAHRE ERFAHRUNG
            </h3>
          </div>

          <div className="flex items-center gap-5">
            <FaUser className="text-[#d4ad58] text-4xl flex-shrink-0" />
            <h3 className="text-white text-lg font-semibold leading-7">
              PERSÖNLICHE BETREUUNG
            </h3>
          </div>

          <div className="flex items-center gap-5">
            <FaBuilding className="text-[#d4ad58] text-4xl flex-shrink-0" />
            <h3 className="text-white text-lg font-semibold leading-7">
              WOHN-, GEWERBE &
              <br />
              INVESTMENTIMMOBILIEN
            </h3>
          </div>

          <div className="flex items-center gap-5">
            <FaMapMarkerAlt className="text-[#d4ad58] text-4xl flex-shrink-0" />
            <h3 className="text-white text-lg font-semibold leading-7">
              ÖSTERREICHWEITE EXPERTISE
            </h3>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Features;