"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";

const BACKEND_URL = "http://localhost:8000";

const categories = [
  {
    key: "haus_wohnen",
    label: "Wohnimmobilien",
    href: "/immobilien/wohnimmobilien",
    icon: "🏠",
    text: "Villen, Wohnungen und Baugrundstücke für Eigennutzer und Familien.",
  },
  {
    key: "gewerbe",
    label: "Gewerbeimmobilien",
    href: "/immobilien/gewerbeimmobilien",
    icon: "🏢",
    text: "Büroflächen, Geschäftslokale und Gewerbeobjekte für Unternehmen.",
  },
  {
    key: "zinshaus",
    label: "Investmentimmobilien",
    href: "/immobilien/investmentimmobilien",
    icon: "📈",
    text: "Zinshäuser und Anlageobjekte mit langfristigem Wert.",
  },
  {
    key: "mietobjekte",
    label: "Mietobjekte",
    href: "/immobilien/mietobjekte",
    icon: "🔑",
    text: "Moderne Mietwohnungen und Mietobjekte in besten Lagen.",
  },
];

export default function ImmobilienPage() {
  const [latest, setLatest] = useState([]);

  useEffect(() => {
    async function fetchLatest() {
      try {
        const res = await fetch(`${BACKEND_URL}/api/properties`);
        const data = await res.json();
        const all = (data.data || data || []).filter(p => p.status === "published");
        setLatest(all.slice(0, 6));
      } catch (err) {
        console.error(err);
      }
    }
    fetchLatest();
  }, []);

  return (
    <main className="bg-white min-h-screen">

      {/* Hero Banner */}
      <section className="bg-[#1f242b] text-white pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#c8a052] uppercase tracking-widest text-sm font-semibold mb-4">
            IMMOBILIEN
          </p>
          <h1 className="text-5xl md:text-7xl font-serif leading-tight">
            Unsere Immobilien
          </h1>
          <p className="text-gray-400 mt-6 max-w-2xl text-lg leading-8">
            Entdecken Sie unser exklusives Portfolio an Wohn-, Gewerbe- und Investmentimmobilien.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <h2 className="text-3xl font-serif text-black mb-10">Kategorien</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.key}
              href={cat.href}
              className="group bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg hover:border-[#c8a052] transition-all duration-300"
            >
              <div className="text-4xl mb-4">{cat.icon}</div>
              <h3 className="text-xl font-serif text-black mb-2 group-hover:text-[#c8a052] transition-colors">
                {cat.label}
              </h3>
              <p className="text-gray-500 text-sm leading-6">{cat.text}</p>
              <p className="text-[#c8a052] text-sm font-semibold mt-4 group-hover:underline">
                Mehr anzeigen →
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Properties */}
      {latest.length > 0 && (
        <section className="bg-gray-50 py-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <p className="text-[#c8a052] uppercase tracking-widest text-sm font-semibold mb-2">
              AKTUELL
            </p>
            <h2 className="text-4xl font-serif text-black mb-10">
              Aktuelle Objekte
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {latest.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}