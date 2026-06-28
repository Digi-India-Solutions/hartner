"use client";

import { useState } from "react";

function PropertyTabs() {
  const [activeTab, setActiveTab] = useState("zinshaus");

  return (
    <section className="py-24 bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-20">

        {/* Buttons */}
        <div className="flex gap-5 mb-10">

          <button
            onClick={() => setActiveTab("zinshaus")}
            className={`px-8 py-4 border transition ${
              activeTab === "zinshaus"
                ? "bg-yellow-600 text-black border-black"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            Zinshaus
          </button>

          <button
            onClick={() => setActiveTab("gewerbe")}
            className={`px-8 py-4 border transition ${
              activeTab === "gewerbe"
                ? "bg-yellow-600 text-black border-black"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            Gewerbe
          </button>

          <button
            onClick={() => setActiveTab("wohnen")}
            className={`px-8 py-4 border transition ${
              activeTab === "wohnen"
                ? "bg-yellow-600 text-black border-black"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            Haus & Wohnen
          </button>

          <button
            onClick={() => setActiveTab("miete")}
            className={`px-8 py-4 border transition ${
              activeTab === "miete"
                ? "bg-yellow-600 text-black border-black"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            Mietobjekte
          </button>

        </div>

        {/* Content Box */}
        <div className="bg-white shadow-lg p-14 min-h-[220px]">

          {activeTab === "zinshaus" && (
            <>
              <h2 className="text-5xl text-black font-light mb-8">
                Zinshaus
              </h2>

              <p className="text-gray-700 text-xl leading-9">
                Investmentobjekte und Zinshäuser in besten Lagen.
              </p>
            </>
          )}

          {activeTab === "gewerbe" && (
            <>
              <h2 className="text-5xl text-black font-light mb-8">
                Gewerbe & Investment
              </h2>

              <p className="text-gray-700 text-xl leading-9">
                Gewerbe- und Investmentimmobilien.
              </p>
            </>
          )}

          {activeTab === "wohnen" && (
            <>
              <h2 className="text-5xl text-black font-light mb-8">
                Haus & Wohnen
              </h2>

              <p className="text-gray-700 text-xl leading-9">
                Häuser und Wohnungen für Familien.
              </p>
            </>
          )}

          {activeTab === "miete" && (
            <>
              <h2 className="text-5xl text-black font-light mb-8">
                Mietobjekte
              </h2>

              <p className="text-gray-700 text-xl leading-9">
                Moderne Mietwohnungen und Mietobjekte.
              </p>
            </>
          )}

        </div>

      </div>
    </section>
  );
}

export default PropertyTabs;