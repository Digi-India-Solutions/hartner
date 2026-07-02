"use client";

import { useEffect, useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Investmentimmobilien() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch("http://localhost:8000/api/properties");
        if (!res.ok) throw new Error("Fehler beim Laden");
        const json = await res.json();
        const all = json.data || json || [];
        const filtered = all.filter(
          (p) => p.category === "zinshaus" && p.status === "published"
        );
        setProperties(filtered);
      } catch (err) {
        console.error("Error fetching properties:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProperties();
  }, []);

  return (
    <div className="bg-[#f5f5f5] min-h-screen pt-32 pb-20 px-4">
      <h1 className="text-4xl md:text-6xl text-center font-serif mb-16 text-black">
        Investmentimmobilien
      </h1>

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[1400px] mx-auto justify-items-start">
          {properties.map((property) => {
            const firstImage = property.images && property.images.length > 0
              ? (property.images[0].url.startsWith("http") ? property.images[0].url : `http://localhost:8000${property.images[0].url}`)
              : "/images/card.jpg";

            const price = property.details?.kaufpreis || property.details?.miete_monatlich || "Preis auf Anfrage";
            const detailFields = property.details || {};

            const getLeerstandText = (val) => {
              if (val === true || val === "Ja" || val === "true") return "Ja";
              if (val === false || val === "Nein" || val === "false") return "Nein";
              return val || "-";
            };

            const getUnbefristeteText = (val) => {
              if (val === true || val === "Ja" || val === "true") return "Ja";
              if (val === false || val === "Nein" || val === "false") return "Nein";
              return val || "-";
            };

            return (
              <Link
                key={property.id || property._id}
                href={`/immobilien/${property.id || property._id}`}
                className="bg-white shadow-lg rounded-[30px] overflow-hidden hover:shadow-2xl transition max-w-[650px] w-full"
              >
                {/* Image */}
                <Image
                  src={firstImage}
                  alt={property.title}
                  width={700}
                  height={500}
                  className="w-full h-[250px] md:h-[350px] object-cover"
                />

                {/* Content */}
                <div className="p-6 md:p-8">
                  {/* Title + Price */}
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <h2 className="text-2xl md:text-4xl font-serif text-black leading-tight">
                      {property.title}
                    </h2>

                    <p className="text-2xl md:text-4xl text-[#c8a052] whitespace-nowrap">
                      {price}
                    </p>
                  </div>

                  {/* Location */}
                  {property.address && (
                    <div className="flex items-center gap-2 mt-5 text-gray-500">
                      <MapPin size={18} className="text-[#c8a052]" />
                      <p>{property.address}</p>
                    </div>
                  )}

                  {/* Divider */}
                  <div className="border-t my-8"></div>

                  {/* Features */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex gap-4">
                      <ArrowRight className="text-[#c8a052] mt-1" />
                      <div>
                        <p className="text-blue-600 text-lg">
                          Widmung
                        </p>
                        <p className="font-semibold text-black text-xl">
                          {detailFields.widmung || "-"}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <ArrowRight className="text-[#c8a052] mt-1" />
                      <div>
                        <p className="text-blue-600 text-lg">
                          Leerstand
                        </p>
                        <p className="font-semibold text-black text-xl">
                          {getLeerstandText(detailFields.leerstand)}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <ArrowRight className="text-[#c8a052] mt-1" />
                      <div>
                        <p className="text-blue-600 text-lg">
                          Befristungen
                        </p>
                        <p className="font-semibold text-black text-xl">
                          {detailFields.befristungen || "-"}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <ArrowRight className="text-[#c8a052] mt-1" />
                      <div>
                        <p className="text-blue-600 text-lg">
                          Unbefristete Vermietung
                        </p>
                        <p className="font-semibold text-black text-xl">
                          {getUnbefristeteText(detailFields.unbefristete_vermietung || detailFields.unbefristeteVermietung)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t mt-8"></div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}