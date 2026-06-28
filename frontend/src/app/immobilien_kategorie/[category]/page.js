"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaMapMarkerAlt, FaEuroSign, FaRulerCombined, FaPercent } from "react-icons/fa";

// Category mapping to match database category field and display title
const categoryMap = {
  gewerbeimmobilien: {
    dbKey: "gewerbe",
    title: "Gewerbeimmobilien",
    subtitle: "Gewerbe & Investment"
  },
  investmentimmobilien: {
    dbKey: "zinshaus",
    title: "Investmentimmobilien",
    subtitle: "Zinshäuser & Anlageobjekte"
  },
  mietobjekte: {
    dbKey: "mietobjekte",
    title: "Mietobjekte",
    subtitle: "Mietwohnungen & Gewerbe"
  },
  wohnimmobilien: {
    dbKey: "haus_wohnen",
    title: "Wohnimmobilien",
    subtitle: "Häuser & Wohnungen"
  }
};

function CategoryPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const categoryParam = params?.category?.toLowerCase();
  const categoryConfig = categoryMap[categoryParam] || {
    dbKey: categoryParam,
    title: categoryParam ? categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1) : "Kategorie",
    subtitle: "Immobilien"
  };

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProperties() {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:8000/api/properties");
        if (!res.ok) {
          throw new Error("Fehler beim Laden der Immobilien");
        }
        const result = await res.json();
        
        // Filter properties belonging to this category
        if (result && result.success && Array.isArray(result.data)) {
          const filtered = result.data.filter(
            (p) => String(p.category).toLowerCase() === categoryConfig.dbKey.toLowerCase()
          );
          setProperties(filtered);
        } else {
          setProperties([]);
        }
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (categoryConfig.dbKey) {
      fetchProperties();
    }
  }, [categoryConfig.dbKey]);

  // Helper to format image path
  const getPropertyImage = (property) => {
    if (property.images && property.images.length > 0) {
      // If it is absolute URL or starts with uploads
      const img = property.images[0].url || property.images[0];
      if (img.startsWith("http")) return img;
      if (img.startsWith("/")) return img;
      return `http://localhost:8000/${img}`;
    }
    // Fallbacks based on category
    if (categoryConfig.dbKey === "gewerbe") return "/images/NG5.png";
    if (categoryConfig.dbKey === "zinshaus") return "/images/triest.jpeg";
    if (categoryConfig.dbKey === "mietobjekte") return "/images/Mietobjekt.jpeg";
    return "/images/hausmit.jpeg";
  };

  return (
    <div className="bg-white flex flex-col w-full">
      <main className="flex-grow pt-20">
        {/* Banner Section */}
        <section className="bg-black text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url('/images/hero-1.jpg')` }}></div>
          <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-20 xl:px-28 relative z-10">
            <p className="text-yellow-600 font-semibold mb-3 tracking-widest uppercase text-sm">
              {categoryConfig.subtitle}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light">
              {categoryConfig.title}
            </h1>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-20 xl:px-28">
            
            {loading && (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-600"></div>
              </div>
            )}

            {error && !loading && (
              <div className="text-center py-10 bg-red-50 text-red-600 rounded-lg max-w-2xl mx-auto">
                <p className="font-semibold mb-2">Fehler beim Abrufen der Daten</p>
                <p className="text-sm">{error}</p>
              </div>
            )}

            {!loading && !error && properties.length === 0 && (
              <div className="text-center py-20 px-8 bg-white border border-gray-200 rounded-lg max-w-4xl mx-auto shadow-sm">
                <h3 className="text-2xl font-light text-gray-800 mb-4">{categoryConfig.title}</h3>
                <p className="text-gray-600 text-lg">
                  Derzeit sind keine Immobilien in dieser Kategorie verfügbar. Bitte schauen Sie später erneut vorbei.
                </p>
              </div>
            )}

            {!loading && !error && properties.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {properties.map((property, index) => (
                  <div 
                    key={property._id || property.id || index}
                    className="bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden"
                  >
                    {/* Image Area */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                      <Image
                        src={getPropertyImage(property)}
                        alt={property.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 bg-black/70 text-yellow-500 text-xs px-3 py-1 font-semibold tracking-wider uppercase">
                        {categoryConfig.subtitle}
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-8 flex flex-col flex-grow">
                      <h3 className="text-2xl font-light text-black mb-4 min-h-[64px] line-clamp-2 group-hover:text-yellow-600 transition-colors">
                        {property.title}
                      </h3>

                      {property.address && (
                        <div className="flex items-start gap-2 text-gray-500 mb-6">
                          <FaMapMarkerAlt className="text-yellow-600 mt-1 shrink-0" />
                          <span className="text-sm line-clamp-1">{property.address}</span>
                        </div>
                      )}

                      {/* Info stats */}
                      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100 mt-auto">
                        {property.details?.kaufpreis && (
                          <div className="flex items-center gap-2">
                            <FaEuroSign className="text-yellow-600 text-sm shrink-0" />
                            <div>
                              <p className="text-[11px] text-gray-400 uppercase tracking-wider">Kaufpreis</p>
                              <p className="text-sm font-semibold text-black">{property.details.kaufpreis}</p>
                            </div>
                          </div>
                        )}

                        {property.details?.wohnflaeche && (
                          <div className="flex items-center gap-2">
                            <FaRulerCombined className="text-yellow-600 text-sm shrink-0" />
                            <div>
                              <p className="text-[11px] text-gray-400 uppercase tracking-wider">Fläche</p>
                              <p className="text-sm font-semibold text-black">{property.details.wohnflaeche}</p>
                            </div>
                          </div>
                        )}

                        {property.details?.rendite && (
                          <div className="flex items-center gap-2">
                            <FaPercent className="text-yellow-600 text-sm shrink-0" />
                            <div>
                              <p className="text-[11px] text-gray-400 uppercase tracking-wider">Rendite</p>
                              <p className="text-sm font-semibold text-black">{property.details.rendite}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </section>
      </main>
    </div>
  );
}

export default CategoryPage;
