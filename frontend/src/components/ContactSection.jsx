"use client";

import { useState } from "react";
import {
  FaEnvelope,
  FaGlobe,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTimes,
} from "react-icons/fa";

function ContactSection() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <section
    id="kontakt"
      className="py-20 relative"
      style={{
        backgroundImage: "url('/images/hero-4.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/65"></div>

      <div className="relative z-10 max-w-[1700px] mx-auto px-6 md:px-10 lg:px-24">

        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-16 items-center">

          {/* Left Content */}
          <div className="text-white lg:pl-10">

            <p className="text-yellow-400 font-semibold mb-5">
              KONTAKT
            </p>

            <h2 className="text-4xl md:text-5xl lg:text-6xl leading-tight mb-8">
              Lassen Sie uns über
              <br />
              Ihre Immobilie sprechen
            </h2>

            <p className="text-lg md:text-xl text-gray-200 leading-10 mb-10">
              Ob Verkauf, Kauf, Vermietung oder Investment –
              wir sind für Sie da. Diskret, persönlich und
              mit vollem Einsatz.
            </p>

            <button
              onClick={() => setShowPopup(true)}
              className="bg-yellow-600 text-black px-10 py-5 font-semibold hover:bg-yellow-500 transition"
            >
              JETZT KONTAKT AUFNEHMEN
            </button>

          </div>

          {/* Contact Info Box */}
          <div className="bg-white p-8 md:p-10">

            <div className="flex gap-5 mb-10">
              <FaMapMarkerAlt className="text-yellow-600 text-3xl mt-1" />
              <p className="text-xl text-black font-medium">
                Hoher Markt 17
                <br />
                A-3340 Waidhofen/Ybbs
              </p>
            </div>

            <div className="flex gap-5 mb-10">
              <FaPhoneAlt className="text-yellow-600 text-3xl mt-1" />
              <p className="text-xl text-black font-medium">
                +43 664 123 45 67
              </p>
            </div>

            <div className="flex gap-5 mb-10">
              <FaEnvelope className="text-yellow-600 text-3xl mt-1" />
              <p className="text-xl text-black font-medium">
                office@hartner.at
              </p>
            </div>

            <div className="flex gap-5">
              <FaGlobe className="text-yellow-600 text-3xl mt-1" />
              <p className="text-xl text-black font-medium">
                www.hartner-immobilien.at
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* Popup Form */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-2xl relative">

            {/* Header */}
            <div className="flex justify-between items-center border-b px-8 py-6">

              <h2 className="text-4xl text-black font-light">
                Kontakt aufnehmen
              </h2>

              <button
                onClick={() => setShowPopup(false)}
                className="text-gray-500 text-4xl hover:text-black"
              >
                <FaTimes />
              </button>

            </div>

            {/* Form */}
            <form className="p-8 md:p-12">

              <label className="block text-xl text-black mb-3">
                Your name
              </label>

              <input
                type="text"
                className="w-full border border-gray-300 p-5 mb-8 text-black outline-none"
              />

              <label className="block text-xl text-black mb-3">
                Your email
              </label>

              <input
                type="email"
                className="w-full border border-gray-300 p-5 mb-8 text-black outline-none"
              />

              <label className="block text-xl text-black mb-3">
                Subject
              </label>

              <input
                type="text"
                className="w-full border border-gray-300 p-5 mb-8 text-black outline-none"
              />

              <label className="block text-xl text-black mb-3">
                Your message (optional)
              </label>

              <textarea
                rows="5"
                className="w-full border border-gray-300 p-5 mb-8 text-black outline-none resize-none"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-yellow-600 text-white py-5 text-2xl font-semibold hover:bg-yellow-500 transition"
              >
                Submit
              </button>

            </form>

          </div>

        </div>
      )}
    </section>
  );
}

export default ContactSection;