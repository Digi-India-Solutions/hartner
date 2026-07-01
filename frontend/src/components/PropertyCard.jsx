"use client";

import Image from "next/image";
import Link from "next/link";

const categoryLabels = {
  zinshaus: "Zinshaus",
  gewerbe: "Gewerbeimmobilien",
  haus_wohnen: "Wohnimmobilien",
  mietobjekte: "Mietobjekte",
};

export default function PropertyCard({ property }) {
  const firstImage =
    property.images && property.images.length > 0
      ? property.images[0].url
      : null;

  const price =
    property.details?.kaufpreis || property.details?.miete_monatlich || null;

  return (
    <Link
      href={`/immobilien/${property.id}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Image */}
      <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
        {firstImage ? (
          <img
            src={firstImage}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 text-5xl">
            🏠
          </div>
        )}

        {/* Category Badge */}
        <span className="absolute top-4 left-4 bg-[#c8a052] text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
          {categoryLabels[property.category] || property.category}
        </span>

        {/* Status Badge */}
        {property.status === "published" && (
          <span className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Verfügbar
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-serif text-black mb-2 group-hover:text-[#c8a052] transition-colors line-clamp-2">
          {property.title}
        </h3>

        {property.address && (
          <p className="text-gray-500 text-sm mb-3 flex items-center gap-1">
            <span>📍</span> {property.address}
          </p>
        )}

        {/* Details row */}
        <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-600">
          {property.details?.wohnflaeche && (
            <span className="flex items-center gap-1">
              🏠 {property.details.wohnflaeche} m²
            </span>
          )}
          {property.details?.baujahr && (
            <span className="flex items-center gap-1">
              📅 Bj. {property.details.baujahr}
            </span>
          )}
          {property.details?.heizung && (
            <span className="flex items-center gap-1">
              🔥 {property.details.heizung}
            </span>
          )}
        </div>

        {/* Price */}
        {price && (
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-[#c8a052] font-bold text-lg">{price}</span>
            <span className="text-[#c8a052] text-sm font-semibold group-hover:underline">
              Details →
            </span>
          </div>
        )}

        {!price && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <span className="text-[#c8a052] text-sm font-semibold group-hover:underline">
              Details anfordern →
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
