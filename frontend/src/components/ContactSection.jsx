import {
    FaEnvelope,
    FaGlobe,
    FaMapMarkerAlt,
    FaPhoneAlt,
} from "react-icons/fa";

function ContactSection() {
  return (
    <section
      className="py-20 relative"
      style={{
        backgroundImage: "url('/images/hero-4.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/65"></div>

      <div className="relative z-10 max-w-[1700px] mx-auto px-6 md:px-10 lg:px-20">

        <div className="grid lg:grid-cols-3 gap-10 items-start">

          {/* Left Content */}
          <div className="text-white">
            <p className="text-yellow-400 font-semibold mb-5">
              KONTAKT
            </p>

            <h2 className="text-4xl md:text-5xl lg:text-6xl leading-tight mb-8">
              Lassen Sie uns über
              <br />
              Ihre Immobilie sprechen
            </h2>

            <p className="text-xl text-gray-200 leading-10 mb-10">
              Ob Verkauf, Kauf, Vermietung oder Investment –
              wir sind für Sie da. Diskret, persönlich und
              mit vollem Einsatz.
            </p>

            <button className="bg-yellow-600 text-black px-10 py-5 font-semibold">
              JETZT KONTAKT AUFNEHMEN
            </button>
          </div>

          {/* Contact Info */}
          <div className="bg-white p-10">

            <div className="flex gap-5 mb-10">
              <FaMapMarkerAlt className="text-yellow-600 text-3xl mt-1" />
              <p className="text-xl text-gray-900 font-medium">
                Hoher Markt 17
                <br />
                A-3340 Waidhofen/Ybbs
              </p>
            </div>

            <div className="flex gap-5 mb-10">
              <FaPhoneAlt className="text-yellow-600 text-3xl mt-1" />
              <p className="text-xl text-gray-900 font-medium">
                +43 664 123 45 67
              </p>
            </div>

            <div className="flex gap-5 mb-10">
              <FaEnvelope className="text-yellow-600 text-3xl mt-1" />
              <p className="text-xl text-gray-900 font-medium">
                office@hartner.at
              </p>
            </div>

            <div className="flex gap-5">
              <FaGlobe className="text-yellow-600 text-3xl mt-1" />
              <p className="text-xl text-gray-900 font-medium">
                www.hartner-immobilien.at
              </p>
            </div>

          </div>

          {/* Form */}
          <form className="bg-white p-10">

            <input
              type="text"
              placeholder="Name"
              className="w-full border border-gray-300 p-5 mb-5 text-black placeholder:text-gray-500"
            />

            <input
              type="email"
              placeholder="E-Mail"
              className="w-full border border-gray-300 p-5 mb-5 text-black placeholder:text-gray-500"
            />

            <input
              type="text"
              placeholder="Telefon"
              className="w-full border border-gray-300 p-5 mb-5 text-black placeholder:text-gray-500"
            />

            <textarea
              placeholder="Nachricht"
              rows="5"
              className="w-full border border-gray-300 p-5 mb-5 text-black placeholder:text-gray-500"
            ></textarea>

            <button className="w-full bg-yellow-600 text-black py-5 font-semibold text-lg">
              ANFRAGE SENDEN
            </button>

          </form>

        </div>
      </div>
    </section>
  );
}

export default ContactSection;