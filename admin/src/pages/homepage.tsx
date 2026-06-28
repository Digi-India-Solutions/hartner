import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useGetPropertiesQuery } from "@/services/api";
import { Building, Search, ArrowRight, Layers, Euro } from "lucide-react";
import { IProperty } from "@/types";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "All";
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { data, isLoading } = useGetPropertiesQuery({
    category: activeCategory === "All" ? undefined : activeCategory,
    search: debouncedSearch || undefined,
  });

  const properties = data?.data ?? [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDebouncedSearch(searchTerm);
  };

  const handleCategorySelect = (category: string) => {
    if (category === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category);
    }
    setSearchParams(searchParams);
  };

  const categories = ["All", "Zinshaus", "Gewerbe & Investment", "Haus & Wohnen", "Mietobjekte"];

  return (
    <div className="space-y-24">
      {/* Hero Banner */}
      <section className="relative rounded-3xl overflow-hidden bg-navy-900 text-white py-20 px-8 md:px-16 shadow-xl border border-navy-800">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-900/90 to-transparent z-0" />
        <div className="relative z-10 max-w-2xl space-y-6">
          <span className="inline-block text-brand-400 font-bold uppercase tracking-widest text-xs">
            Exklusive Immobilien in Österreich
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white">
            Finden Sie Ihr nächstes <br />
            <span className="text-brand-100 font-serif italic">Premium-Objekt</span>
          </h2>
          <p className="text-navy-300 text-base md:text-lg leading-relaxed max-w-lg">
            Haertner Immobilien bietet erstklassige Beratung und exzellente Anlageobjekte, Zinshäuser und Gewerbeinvestitionen.
          </p>

          {/* Search Bar Form */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-col sm:flex-row items-stretch bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-2xl gap-2 max-w-lg mt-8"
          >
            <div className="flex-1 flex items-center px-3 relative">
              <Search className="h-5 w-5 text-navy-300 absolute left-4" />
              <input
                type="text"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-2 py-3 bg-transparent placeholder-navy-300 text-white border-0 focus:outline-none focus:ring-0 text-sm font-semibold"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl transition-all duration-200 shadow-md text-sm"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Category Navigation Bar */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-b border-navy-100 pb-4">
          <div>
            <h3 className="text-2xl font-bold text-navy-900 tracking-tight">Unsere Objekte</h3>
            <p className="text-navy-500 text-sm mt-1">Filtern Sie nach der gewünschten Immobilienkategorie.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-brand-500 text-white shadow-md shadow-brand-500/20"
                    : "bg-white border border-navy-200 text-navy-600 hover:border-brand-500 hover:text-brand-500"
                }`}
              >
                {cat === "All" ? "Alle Objekte" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Listings Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white border border-navy-100 rounded-2xl p-4 space-y-4 animate-pulse">
                <div className="aspect-[4/3] bg-navy-100 rounded-xl" />
                <div className="h-6 bg-navy-100 rounded w-2/3" />
                <div className="h-4 bg-navy-100 rounded w-1/2" />
                <div className="h-10 bg-navy-100 rounded" />
              </div>
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-20 bg-white border border-navy-100 rounded-2xl max-w-md mx-auto p-8 shadow-sm">
            <Building className="h-12 w-12 text-navy-300 mx-auto mb-4" />
            <h4 className="text-lg font-bold text-navy-900">Keine Immobilien gefunden</h4>
            <p className="text-navy-500 text-sm mt-2">
              Für Ihre aktuelle Auswahl stehen derzeit keine Objekte zur Verfügung.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((prop: IProperty) => (
              <div
                key={prop._id}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-navy-100 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  {/* Thumbnail / Image container */}
                  <div className="aspect-[4/3] relative bg-navy-100 overflow-hidden">
                    {prop.images?.length ? (
                      <img
                        src={prop.images[0].url}
                        alt={prop.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-navy-300">
                        <Building className="h-12 w-12" />
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-navy-900/80 backdrop-blur-sm text-brand-400 text-xs font-bold rounded-full border border-white/10 uppercase">
                        {prop.category}
                      </span>
                    </div>
                  </div>

                  {/* Core details */}
                  <div className="p-6 space-y-3">
                    <h4 className="text-lg font-bold text-navy-900 line-clamp-1 group-hover:text-brand-600 transition-colors">
                      {prop.title}
                    </h4>

                    {/* Meta quick specs */}
                    <div className="flex items-center gap-4 text-xs font-semibold text-navy-500 pt-2">
                      {prop.details?.wohnflaeche ? (
                        <div className="flex items-center gap-1">
                          <Layers className="h-4 w-4 text-brand-500" />
                          <span>{prop.details.wohnflaeche} m²</span>
                        </div>
                      ) : prop.details?.nutzflaeche ? (
                        <div className="flex items-center gap-1">
                          <Layers className="h-4 w-4 text-brand-500" />
                          <span>{prop.details.nutzflaeche} m²</span>
                        </div>
                      ) : null}

                      {prop.details?.kaufpreis ? (
                        <div className="flex items-center gap-1">
                          <Euro className="h-4 w-4 text-brand-500" />
                          <span>€{Number(prop.details.kaufpreis).toLocaleString("de-DE")}</span>
                        </div>
                      ) : null}
                    </div>

                    <p className="text-navy-400 text-sm line-clamp-2 leading-relaxed pt-1">
                      {prop.description ? prop.description.replace(/<[^>]*>/g, "") : "Keine Beschreibung vorhanden."}
                    </p>
                  </div>
                </div>

                {/* Card Button footer */}
                <div className="p-6 pt-0">
                  <Link
                    to={`/property/${prop.slug}`}
                    className="flex w-full items-center justify-center gap-2 py-3 bg-navy-50 group-hover:bg-brand-500 hover:bg-brand-600 text-navy-700 group-hover:text-white font-bold rounded-xl text-sm transition-all duration-200 shadow-sm"
                  >
                    Details ansehen
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* About Us Page Content Section */}
      <section className="bg-white rounded-3xl border border-navy-100 p-8 md:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <span className="inline-block text-brand-500 font-bold uppercase tracking-widest text-xs">
            Über uns
          </span>
          <h3 className="text-3xl font-extrabold text-navy-900 tracking-tight leading-tight">
            Haertner Immobilien <br />
            <span className="text-brand-500 font-serif italic">Ihr Partner in Wien</span>
          </h3>
          <p className="text-navy-500 text-base leading-relaxed">
            Haertner Immobilien GmbH ist Ihr Experte für erstklassige Anlegerwohnungen, historische Zinshäuser sowie Gewerbe- und Anlageobjekte in Wien und ganz Österreich. Wir verstehen Immobilien nicht nur als Räume, sondern als wertbeständige Investitionen für Ihre Zukunft.
          </p>
          <p className="text-navy-500 text-base leading-relaxed">
            Unser erfahrenes Team berät Sie kompetent bei jedem Schritt – von der marktgerechten Wertermittlung über den strukturierten Ankaufsprozess bis hin zur nachhaltigen Bewirtschaftung Ihres Portfolios.
          </p>
          <div className="pt-2">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 font-bold text-brand-600 hover:text-brand-700"
            >
              Mehr erfahren über uns
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="bg-navy-100 rounded-2xl overflow-hidden aspect-[4/3] relative border border-navy-200">
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/45 to-transparent z-10" />
          <div className="absolute bottom-6 left-6 z-20">
            <span className="text-xs text-brand-400 uppercase font-bold tracking-wider">Haertner Immobilien</span>
            <p className="text-lg font-bold text-white">Kompetenz, Vertrauen, Diskretion.</p>
          </div>
          <div className="w-full h-full flex items-center justify-center text-navy-300">
            <Building className="h-20 w-20" />
          </div>
        </div>
      </section>
    </div>
  );
}
