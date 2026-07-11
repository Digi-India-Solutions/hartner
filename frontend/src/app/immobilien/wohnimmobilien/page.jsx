"use client";

import PropertyCard from "@/components/PropertyCard";
import { useEffect, useState } from "react";

const ITEMS_PER_LOAD = 12;

export default function Wohnimmobilien() {
  const [properties, setProperties] = useState([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch("https://hartapi.digiindiasolutions.com/api/properties");
        if (!res.ok) throw new Error("Fehler beim Laden");

        const json = await res.json();
        const all = json.data || json || [];

        const filtered = all.filter(
          (p) =>
            p.category === "Wohnimmobilien" &&
            p.status === "published"
        );

        setProperties([...filtered].reverse());
        setLoading(false);
      } catch (err) {
        console.error("Error fetching properties:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, []);

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 200
      ) {
        setVisibleCount((prev) =>
          Math.min(prev + ITEMS_PER_LOAD, properties.length)
        );
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, [properties]);

  return (
    <section className="property-section font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        <h3 className="property-section-title text-center py-4">
          Wohnimmobilien
        </h3>

        {loading && (
          <div className="flex items-center justify-center py-24">
            <div className="w-12 h-12 border-4 border-[#c8a052] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!loading && properties.length === 0 && (
          <div className="text-center py-24">
            <p className="text-6xl mb-4">🏡</p>

            <h2 className="text-2xl font-serif text-black mb-2">
              Derzeit keine Immobilien verfügbar
            </h2>

            <p className="text-gray-500 max-w-md mx-auto">
              In dieser Kategorie sind aktuell keine Objekte verfügbar.
              Schauen Sie bald wieder vorbei.
            </p>
          </div>
        )}

        {!loading && properties.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {properties
                .slice(0, visibleCount)
                .map((property) => (
                  <PropertyCard
                    key={property.id || property._id}
                    property={property}
                  />
                ))}
            </div>

            {visibleCount < properties.length && (
              <div className="flex justify-center py-10">
                <div className="w-10 h-10 border-4 border-[#c8a052] border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
}