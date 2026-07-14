"use client";

import PropertyCard from "@/components/PropertyCard";
import { useEffect, useState } from "react";

const BACKEND_URL = "https://hartapi.digiindiasolutions.com";

export default function CategoryPage({ category, title, subtitle, description }) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch(`${BACKEND_URL}/api/properties`);
        const data = await res.json();
        const all = data.data || data || [];
        // Filter by category and only show published
        const filtered = all.filter(
          (p) => p.category === category && p.status === "published"
        );
        setProperties(filtered);
      } catch (err) {
        console.error("Fehler beim Laden der Immobilien:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProperties();
  }, [category]);

  console.log("Actual category values:", all.map(p => p.category));

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 md:pt-36 pb-16">

        {/* Header */}
        <div className="mb-14">
          <p className="text-[#c8a052] uppercase tracking-widest text-sm font-semibold">
            {title}
          </p>
          <h1 className="text-4xl md:text-6xl font-serif mt-4 leading-tight text-black">
            {subtitle}
          </h1>
          <p className="text-gray-600 mt-6 max-w-3xl text-lg leading-8">
            {description}
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-24">
            <div className="w-12 h-12 border-4 border-[#c8a052] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Empty State */}
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

        {/* Properties Grid */}
        {!loading && properties.length > 0 && (
          <>
            <p className="text-gray-500 text-sm mb-6">
              {properties.length} {properties.length === 1 ? "Immobilie" : "Immobilien"} gefunden
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
