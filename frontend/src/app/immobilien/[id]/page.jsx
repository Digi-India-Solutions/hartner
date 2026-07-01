"use client";

import { use, useEffect, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

const categoryLabels = {
  zinshaus: "Zinshaus",
  gewerbe: "Gewerbeimmobilien",
  haus_wohnen: "Wohnimmobilien",
  mietobjekte: "Mietobjekte",
};

const detailLabels = {
  wohnflaeche: "Wohnfläche",
  nutzflaeche: "Nutzfläche",
  widmung: "Widmung",
  grundflaeche: "Grundfläche",
  befristungen: "Befristungen",
  bau_potenzial: "Baupotenzial",
  balkon_terrassen: "Balkon / Terrassen",
  eigengareten: "Eigengärten",
  abstellplatz: "Abstellplatz",
  ist_ertrag_netto: "Ist-Ertrag (netto)",
  soll_ertrag_netto: "Soll-Ertrag (netto)",
  ist_netto_mietzins: "Ist-Nettomietzins",
  rendite: "Rendite",
  baujahr: "Baujahr",
  heizung: "Heizung",
  zustand: "Zustand",
  hwb_fgee: "HWB / fGEE",
  kaufpreis: "Kaufpreis",
  miete_monatlich: "Miete monatlich",
};

export default function PropertyDetailPage({ params }) {
  // In Next.js 16, params is a Promise — must unwrap with React.use()
  const { id } = use(params);

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    async function fetchProperty() {
      try {
        const res = await fetch(`http://localhost:8000/api/properties/${id}`);
        if (!res.ok) throw new Error("Nicht gefunden");
        const data = await res.json();
        setProperty(data.data || data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#c8a052] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <div>
          <p className="text-6xl mb-4">🏚️</p>
          <h2 className="text-3xl font-serif text-black mb-2">Immobilie nicht gefunden</h2>
          <p className="text-gray-500">Die gesuchte Immobilie existiert nicht oder wurde entfernt.</p>
          <a href="/immobilien" className="inline-block mt-6 bg-[#c8a052] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#b0893f] transition">
            Zurück zur Übersicht
          </a>
        </div>
      </div>
    );
  }

  const images = property.images || [];
  const details = property.details || {};

  const filledDetails = Object.entries(detailLabels).filter(
    ([key]) => details[key] && details[key] !== ""
  );

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 md:pt-36 pb-16">

        {/* Header */}
        <div className="mb-10">
          <p className="text-[#c8a052] uppercase tracking-widest text-sm font-semibold mb-2">
            {categoryLabels[property.category] || property.category}
          </p>
          <h1 className="text-4xl md:text-5xl font-serif leading-tight text-black">
            {property.title}
          </h1>
          {property.address && (
            <p className="text-gray-500 mt-3 text-lg flex items-center gap-2">
              <span>📍</span> {property.address}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">

          {/* Left: Images */}
          <div className="xl:col-span-3">
            {images.length > 0 ? (
              <>
                <Swiper
                  navigation
                  modules={[Navigation]}
                  initialSlide={activeIndex}
                  onSlideChange={(s) => setActiveIndex(s.activeIndex)}
                  className="rounded-3xl overflow-hidden"
                >
                  {images.map((img, i) => (
                    <SwiperSlide key={img.id || i}>
                      <img
                        src={img.url}
                        alt={`${property.title} - Bild ${i + 1}`}
                        className="w-full h-[300px] sm:h-[450px] lg:h-[600px] object-cover rounded-3xl"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                {images.length > 1 && (
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mt-4">
                    {images.map((img, i) => (
                      <img
                        key={img.id || i}
                        src={img.url}
                        alt=""
                        onClick={() => setActiveIndex(i)}
                        className={`h-20 w-full object-cover rounded-xl cursor-pointer border-4 transition-all ${
                          activeIndex === i ? "border-[#c8a052]" : "border-transparent"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-64 rounded-3xl bg-gray-100 flex items-center justify-center text-6xl text-gray-300">
                🏠
              </div>
            )}
          </div>

          {/* Right: Contact Box */}
          <div className="bg-[#1f242b] text-white rounded-3xl p-8 xl:p-10 h-fit xl:sticky xl:top-36 flex flex-col gap-6">
            {details.kaufpreis && (
              <div>
                <p className="text-gray-400 text-sm uppercase tracking-wide">Kaufpreis</p>
                <p className="text-[#c8a052] text-3xl font-bold mt-1">{details.kaufpreis}</p>
              </div>
            )}
            {details.miete_monatlich && (
              <div>
                <p className="text-gray-400 text-sm uppercase tracking-wide">Miete monatlich</p>
                <p className="text-[#c8a052] text-3xl font-bold mt-1">{details.miete_monatlich}</p>
              </div>
            )}

            <h2 className="text-2xl font-serif">Interesse geweckt?</h2>
            <p className="text-gray-300 leading-7 text-sm">
              Fordern Sie jetzt das Exposé an oder vereinbaren Sie einen Besichtigungstermin.
            </p>
            <button
              onClick={() => setOpenModal(true)}
              className="w-full bg-[#c8a052] hover:bg-[#b0893f] transition py-4 rounded-xl text-lg font-semibold"
            >
              Exposé anfordern
            </button>
          </div>
        </div>

        {/* Description */}
        {property.description && (
          <div className="mt-16 bg-white rounded-3xl border border-gray-200 p-8 md:p-12">
            <h2 className="text-3xl font-serif mb-3 text-black">Objektbeschreibung</h2>
            <div className="w-14 h-1 bg-[#c8a052] mb-6" />
            <p className="text-gray-600 text-lg leading-9 whitespace-pre-line">
              {property.description}
            </p>
          </div>
        )}

        {/* Details Grid */}
        {filledDetails.length > 0 && (
          <div className="mt-8 bg-white rounded-3xl border border-gray-200 p-8 md:p-12">
            <h2 className="text-3xl font-serif mb-3 text-black">Objektdaten</h2>
            <div className="w-14 h-1 bg-[#c8a052] mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filledDetails.map(([key, label]) => (
                <div key={key} className="border rounded-2xl p-5 flex flex-col gap-1">
                  <p className="text-gray-500 text-sm">{label}</p>
                  <p className="text-black font-semibold text-lg">{details[key]}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Inquiry Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-xl rounded-3xl p-8 relative shadow-2xl">
            <button
              onClick={() => { setOpenModal(false); setSent(false); }}
              className="absolute top-5 right-5 text-3xl text-black hover:text-[#c8a052]"
            >
              ×
            </button>
            <h2 className="text-3xl font-serif mb-6 text-black">Anfrage senden</h2>
            {sent ? (
              <div className="text-center py-8">
                <p className="text-5xl mb-4">✅</p>
                <p className="text-xl font-semibold text-black">Vielen Dank!</p>
                <p className="text-gray-500 mt-2">Wir melden uns in Kürze bei Ihnen.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <input type="text" placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full border p-4 rounded-xl text-black" />
                <input type="email" placeholder="E-Mail" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full border p-4 rounded-xl text-black" />
                <input type="tel" placeholder="Telefon" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full border p-4 rounded-xl text-black" />
                <textarea rows="4" placeholder="Nachricht" value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full border p-4 rounded-xl text-black" />
                <button
                  onClick={() => setSent(true)}
                  className="w-full bg-[#c8a052] text-white py-4 rounded-xl text-lg font-semibold hover:bg-[#b0893f] transition"
                >
                  Anfrage senden
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
