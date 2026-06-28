import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetPropertyQuery } from "@/services/api";
import { 
  Building, 
  ArrowLeft, 
  FileText, 
  Check, 
  X, 
  Sparkles,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function PropertyDetails() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetPropertyQuery(id || "");
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center animate-pulse">
        <div className="h-10 bg-navy-100 rounded w-1/3 mx-auto mb-6" />
        <div className="aspect-[2/1] bg-navy-100 rounded-2xl mb-8" />
        <div className="h-6 bg-navy-100 rounded w-2/3 mx-auto" />
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="max-w-md mx-auto text-center py-20 bg-white border border-navy-100 rounded-2xl p-8 shadow-sm">
        <Building className="h-12 w-12 text-navy-300 mx-auto mb-4" />
        <h4 className="text-lg font-bold text-navy-900">Objekt nicht gefunden</h4>
        <p className="text-navy-500 text-sm mt-2">
          Die gesuchte Immobilie existiert nicht oder ist offline.
        </p>
        <Link
          to="/"
          className="inline-block mt-6 px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-lg text-sm transition-all"
        >
          Zurück zur Auswahl
        </Link>
      </div>
    );
  }

  const property = data.data;

  // Extract array of image URLs
  const allImages = (property.images || []).map((img) => img.url);

  const nextImage = () => {
    if (allImages.length > 0) {
      setActiveImageIndex((prev) => (prev + 1) % allImages.length);
    }
  };

  const prevImage = () => {
    if (allImages.length > 0) {
      setActiveImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    }
  };

  // Define specs schema using new keys
  const specsConfig: Array<{
    key: string;
    label: string;
    format?: (value: any) => string | React.ReactNode;
  }> = [
    { key: "wohnflaeche", label: "Wohnfläche" },
    { key: "nutzflaeche", label: "Nutzfläche" },
    { key: "widmung", label: "Widmung" },
    { key: "grundflaeche", label: "Grundfläche" },
    {
      key: "leerstand",
      label: "Leerstand",
      format: (v) =>
        v ? (
          <span className="flex items-center text-red-600 font-semibold gap-1">
            <Check className="h-4 w-4" /> Ja
          </span>
        ) : (
          <span className="flex items-center text-green-600 font-semibold gap-1">
            <X className="h-4 w-4" /> Nein
          </span>
        ),
    },
    { key: "befristungen", label: "Befristungen" },
    {
      key: "unbefristete_vermietung",
      label: "Unbefristete Vermietung",
      format: (v) =>
        v ? (
          <span className="flex items-center text-green-600 font-semibold gap-1">
            <Check className="h-4 w-4" /> Ja
          </span>
        ) : (
          <span className="flex items-center text-navy-500 font-semibold gap-1">
            <X className="h-4 w-4" /> Nein
          </span>
        ),
    },
    { key: "bau_potenzial", label: "Bau-Potenzial" },
    { key: "balkon_terrassen", label: "Balkon/Terrassen" },
    { key: "eigengareten", label: "Eigengärten" },
    { key: "abstellplatz", label: "Abstellplatz" },
    { key: "ist_ertrag_netto", label: "Ist-Ertrag (netto)" },
    { key: "soll_ertrag_netto", label: "Soll-Ertrag (netto)" },
    { key: "ist_netto_mietzins", label: "Ø Ist-Netto-Mietzins" },
    { key: "rendite", label: "Rendite" },
    { key: "baujahr", label: "Baujahr" },
    { key: "heizung", label: "Heizung" },
    { key: "zustand", label: "Zustand" },
    { key: "hwb_fgee", label: "HWB + fGEE" },
    { key: "kaufpreis", label: "Kaufpreis" },
    { key: "miete_monatlich", label: "Miete (monatlich)" },
  ];

  // Helper checking if field actually contains data (truthy, not empty string)
  const isPopulated = (val: any) => {
    if (val === undefined || val === null || val === "") return false;
    if (typeof val === "boolean") return true;
    return true;
  };

  // Get only populated fields
  const populatedSpecs = specsConfig.filter((spec) => {
    const value = (property.details as any)?.[spec.key];
    return isPopulated(value);
  });

  return (
    <div className="space-y-16">
      {/* Back link */}
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-navy-500 hover:text-brand-500 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Zurück zur Übersicht
        </Link>
      </div>

      {/* Header Title Section */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-brand-100 text-brand-700 text-xs font-bold rounded-full border border-brand-200 uppercase capitalize">
              {property.category.replace("_", " ")}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy-900 tracking-tight leading-tight">
            {property.title}
          </h2>
        </div>
        {property.details?.kaufpreis ? (
          <div className="text-right">
            <span className="text-xs text-navy-400 font-bold uppercase tracking-wider block">Kaufpreis</span>
            <span className="text-3xl font-black text-brand-600">
              {property.details.kaufpreis}
            </span>
          </div>
        ) : null}
      </div>

      {/* Image Gallery */}
      <section className="space-y-4">
        {allImages.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Active featured viewport */}
            <div className="lg:col-span-3 aspect-[16/9] bg-navy-100 rounded-2xl overflow-hidden relative border border-navy-100 shadow-sm flex items-center justify-center">
              <img
                src={allImages[activeImageIndex]}
                alt={`${property.title} ${activeImageIndex}`}
                className="w-full h-full object-cover"
              />
              {/* Image indicator badge */}
              <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-navy-900/80 backdrop-blur-sm text-white text-xs font-bold rounded-lg">
                {activeImageIndex + 1} / {allImages.length}
              </div>
              {/* Slider Arrows */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white text-navy-900 rounded-full hover:scale-105 active:scale-95 shadow transition-all cursor-pointer"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white text-navy-900 rounded-full hover:scale-105 active:scale-95 shadow transition-all cursor-pointer"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails list */}
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto max-h-[450px] pb-2 lg:pb-0">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`aspect-[4/3] w-24 lg:w-full rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all relative ${
                    activeImageIndex === idx ? "border-brand-500 shadow-md scale-95" : "border-transparent hover:border-navy-300"
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  {/* Star icon if it's the featured image */}
                  {idx === 0 && (
                    <div className="absolute top-1 right-1 p-0.5 bg-brand-500 rounded-full text-white">
                      <Sparkles className="h-3 w-3 fill-current" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="aspect-[21/9] bg-navy-100 border border-dashed border-navy-200 rounded-2xl flex items-center justify-center text-navy-400">
            <Building className="h-16 w-16" />
          </div>
        )}
      </section>

      {/* Grid: Details Specs and Description */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Col: Details Specs Card (Takes 1 of 3 cols) */}
        <section className="bg-white rounded-2xl shadow-sm border border-navy-100 p-6 self-start space-y-6">
          <h3 className="text-xl font-bold text-navy-900 border-b border-navy-100 pb-3 flex items-center gap-2">
            <FileText className="h-5 w-5 text-brand-500" />
            Objektdetails
          </h3>

          {populatedSpecs.length > 0 ? (
            <dl className="space-y-4">
              {populatedSpecs.map((spec) => {
                const value = (property.details as any)[spec.key];
                return (
                  <div key={spec.key} className="flex justify-between items-start gap-4 border-b border-navy-50/50 pb-2.5 text-sm">
                    <dt className="text-navy-500 font-semibold">{spec.label}</dt>
                    <dd className="text-navy-900 font-bold text-right">
                      {spec.format ? spec.format(value) : value}
                    </dd>
                  </div>
                );
              })}
            </dl>
          ) : (
            <p className="text-navy-400 text-sm italic">Keine Objektdetails angegeben.</p>
          )}
        </section>

        {/* Right Col: Description (Takes 2 of 3 cols) */}
        <section className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-navy-100 p-8 space-y-4">
            <h3 className="text-2xl font-bold text-navy-900 flex items-center gap-2.5">
              <Building className="h-6 w-6 text-brand-500" />
              Objektbeschreibung
            </h3>
            {property.description ? (
              <div
                className="prose prose-navy max-w-none text-navy-600 leading-relaxed pt-2"
                dangerouslySetInnerHTML={{ __html: property.description }}
              />
            ) : (
              <p className="text-navy-400 italic">Keine Beschreibung vorhanden.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
