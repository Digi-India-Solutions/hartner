"use client";


import { use, useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import {
  BsBoundingBox,
  BsBuilding,
  BsCalendar3,
  BsCarFront,
  BsEnvelopeOpenFill,
  BsFileEarmarkCheck,
  BsFire,
  BsGeoAltFill,
  BsHammer,
  BsHouseDoor,
  BsInfoCircle,
  BsLayerForward,
  BsMap,
  BsShieldExclamation,
  BsTree
} from "react-icons/bs";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const categoryLabels = {
  zinshaus: "Zinshaus",
  gewerbe: "Gewerbeimmobilien",
  haus_wohnen: "Wohnimmobilien",
  mietobjekte: "Mietobjekte",
};

export default function PropertyDetailPage({ params }) {
  // In Next.js 16, params is a Promise — must unwrap with React.use()
  const { id } = use(params);

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mainSwiper, setMainSwiper] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
const [galleryIndex, setGalleryIndex] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmitInquiry = async () => {
    if (!form.name || !form.email || !form.phone) {
      setSubmitError("Bitte füllen Sie alle Pflichtfelder aus (Name, E-Mail, Telefonnummer).");
      return;
    }
    setSubmitting(true);
    setSubmitError("");
    try {
      const subject = form.subject || `Anfrage zu ${property.title}`;
      const res = await fetch("http://localhost:8000/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject,
          message: form.message,
          propertyId: property.id
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Fehler beim Senden der Anfrage.");
      }
      setSent(true);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

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
          <h2 className="text-3xl font-serif text-black mb-2 font-bold">Immobilie nicht gefunden</h2>
          <p className="text-gray-500">Die gesuchte Immobilie existiert nicht oder wurde entfernt.</p>
          <Link href="/immobilien" className="inline-block mt-6 bg-[#c8a052] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#b0893f] transition">
            Zurück zur Übersicht
          </Link>
        </div>
      </div>
    );
  }

  const images = property.images || [];
  const details = property.details || {};

  const getImageUrl = (img) => {
    if (!img) return "/images/card.jpg";
    const url = typeof img === "string" ? img : img.url;
    if (!url) return "/images/card.jpg";
    if (url.startsWith("http") || url.startsWith("data:")) return url;
    if (url.startsWith("/wp-content") || url.startsWith("/wp-includes")) {
      return `https://hartner.digiindiasolutions.com${url}`;
    }
    return `http://localhost:8000${url}`;
  };

  const imageLoader = ({ src }) => src;

  const formatValue = (val) => {
    if (val === true || val === "true" || val === "Ja") return "Ja";
    if (val === false || val === "false" || val === "Nein") return "Nein";
    return val || "-";
  };

  // Sections groupings
  const flaechenConfig = [
    { key: "wohnflaeche", label: "Wohnfläche", icon: BsHouseDoor },
    { key: "nutzflaeche", label: "Nutzfläche", icon: BsLayerForward },
    { key: "grundflaeche", label: "Grundfläche", icon: BsBoundingBox },
    { key: "widmung", label: "Widmung", icon: BsMap },
  ];

  const objektdatenConfig = [
    { key: "baujahr", label: "Baujahr", icon: BsCalendar3 },
    { key: "heizung", label: "Heizung", icon: BsFire },
    { key: "zustand", label: "Zustand", icon: BsInfoCircle },
    { key: "hwb_fgee", label: "HWB / fGEE", icon: BsShieldExclamation },
    { key: "bau_potenzial", label: "Baupotenzial", icon: BsHammer },
    { key: "abstellplatz", label: "Abstellplatz", icon: BsCarFront },
  ];

  const filledFlaechen = flaechenConfig.filter(cfg => details[cfg.key] && details[cfg.key] !== "");
  const filledObjektdaten = objektdatenConfig.filter(cfg => details[cfg.key] && details[cfg.key] !== "");

  const hasFlaechen = filledFlaechen.length > 0;
  const hasObjektdaten = filledObjektdaten.length > 0;

  const hasFinanzen = details.rendite || details.ist_ertrag_netto || details.soll_ertrag_netto || details.ist_netto_mietzins;
  const hasFinanzenRows = details.ist_ertrag_netto || details.soll_ertrag_netto || details.ist_netto_mietzins;

  const hasAusstattung = details.balkon_terrassen || details.eigengareten || details.unbefristete_vermietung || details.leerstand || details.befristungen;

  return (
    <section className="property-details-page font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* 1. OBJEKT-HEADER (Titel, Ort & Preise) */}
        <div className="property-header flex flex-col md:flex-row justify-between items-start md:items-end gap-3 mb-8 pb-8 border-b border-gray-200">
          <div className="header-main">
            <span className="badge-status mb-2">Immobilienangebot</span>
            <h1 className="property-title fw-bold text-dark m-0 font-serif">
              {property.title}
            </h1>
            {property.address && (
              <p className="property-location text-muted m-0 mt-2 flex items-center gap-2">
                <BsGeoAltFill className="text-gold" size={16} />
                <span>{property.address}</span>
              </p>
            )}
          </div>

          <div className="price-tag md:text-right shrink-0">
            {details.kaufpreis && (
              <div className="mb-3">
                <span className="price-label text-muted text-uppercase small d-block">Kaufpreis</span>
                <div className="property-price fw-bold text-gold text-2xl md:text-3xl m-0">{details.kaufpreis}</div>
              </div>
            )}
            {details.miete_monatlich && (
              <div className="mb-3">
                <span className="price-label text-muted text-uppercase small d-block">Miete monatlich</span>
                <div className="property-price fw-bold text-gold text-2xl md:text-3xl m-0">{details.miete_monatlich}</div>
              </div>
            )}
            {!details.kaufpreis && !details.miete_monatlich && (
              <div className="mb-3">
                <span className="price-label text-muted text-uppercase small d-block">Preis</span>
                <div className="property-price fw-bold text-gold text-2xl md:text-3xl m-0">Preis auf Anfrage</div>
              </div>
            )}
          </div>
        </div>

        {/* 2. HAUPTLAYOUT GRID (Split-Ansicht) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Linke Spalte: Medien, Beschreibung & Objektdaten */}
          <div className="lg:col-span-8 flex flex-col gap-8">

            {/* Media Gallery (Hero image + Thumbnail state switcher) */}
            <div>
              <div className="property-hero-image w-full h-[300px] sm:h-[400px] md:h-[480px] rounded-3xl overflow-hidden shadow-sm bg-gray-50 border border-gray-100">

  {images.length > 0 ? (
    <Swiper
    onSwiper={(swiper) => {
  console.log("Main Swiper:", swiper);
  setMainSwiper(swiper);
}}
      navigation
      modules={[Navigation, Thumbs]}
      thumbs={{
  swiper:
    thumbsSwiper && !thumbsSwiper.destroyed
      ? thumbsSwiper
      : null,
}}
      onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      className="w-full h-full"
    >
      {images.map((img, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-full h-full">
            <Image
              loader={imageLoader}
              src={getImageUrl(img)}
              alt={`${property.title} - Bild ${index + 1}`}
              onClick={() => {
                setGalleryIndex(index);
                setShowGallery(true);
              }}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-contain cursor-pointer"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  ) : (
    <div className="w-full h-full flex items-center justify-center text-6xl text-gray-300">
      🏠
    </div>
  )}

</div>

              {images.length > 1 && (
  <Swiper
  onSwiper={setThumbsSwiper}
  
  freeMode={true}
  modules={[Thumbs, Navigation]}
  spaceBetween={12}
  slidesPerView={4}
  watchSlidesProgress={true}
  
  className="mt-4"
>
    {images.map((img, i) => (
      <SwiperSlide
  key={img.id || i}
  onClick={() => {
    mainSwiper?.slideTo(i);
    setActiveIndex(i);
  }}
>
        <div className="relative w-full h-24">
          <Image
            loader={imageLoader}
            src={getImageUrl(img)}
            alt={`${property.title} - Bild ${i + 1}`}
            onClick={() => {
              mainSwiper?.slideTo(i);
              setActiveIndex(i);
            }}
            fill
            sizes="100px"
            className={`object-cover rounded-xl cursor-pointer transition border-4 ${
              activeIndex === i
                ? "border-[#c8a052]"
                : "border-transparent"
            }`}
          />
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
)}
            </div>

            {/* Objektbeschreibung */}
            {property.description && (
              <div className="detail-card bg-white p-6 md:p-8 rounded-3xl border shadow-xs mb-4">
                <h3 className="detail-title fw-bold mb-3 position-relative pb-2 text-xl font-serif text-black">
                  Objektbeschreibung
                </h3>
                <div className="description-text text-secondary leading-relaxed text-base md:text-lg whitespace-pre-line mt-4">
                  {property.description}
                </div>
              </div>
            )}

            {/* KATEGORIE: FLÄCHEN & EINHEITEN */}
            {/* {hasFlaechen && (
              <div className="detail-card bg-white p-6 md:p-8 rounded-3xl border shadow-xs mb-4">
                <h3 className="detail-title fw-bold mb-4 position-relative pb-2 text-xl font-serif">
                  Flächen & Einheiten
                </h3>
                <div className="info-grid mt-4">
                  {filledFlaechen.map(({ key, label, icon: Icon }) => (
                    <div key={key} className="info-item flex items-center gap-3 p-3 bg-gray-50 rounded-xl border">
                      <div className="info-icon rounded-full bg-white border flex items-center justify-center text-gold w-11 h-11 shrink-0">
                        <Icon size={20} />
                      </div>
                      <div className="info-text">
                        <span className="info-label text-muted small block text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</span>
                        <span className="info-value fw-bold text-dark text-lg">{details[key]}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )} */}

            {/* KATEGORIE: OBJEKTDATEN & ZUSTAND */}
            {/* {hasObjektdaten && (
              <div className="detail-card bg-white p-6 md:p-8 rounded-3xl border shadow-xs mb-4">
                <h3 className="detail-title fw-bold mb-4 position-relative pb-2 text-xl font-serif">
                  Objektdaten & Zustand
                </h3>
                <div className="info-grid mt-4">
                  {filledObjektdaten.map(({ key, label, icon: Icon }) => (
                    <div key={key} className="info-item flex items-center gap-3 p-3 bg-gray-50 rounded-xl border">
                      <div className="info-icon rounded-full bg-white border flex items-center justify-center text-gold w-11 h-11 shrink-0">
                        <Icon size={20} />
                      </div>
                      <div className="info-text">
                        <span className="info-label text-muted small block text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</span>
                        <span className="info-value fw-bold text-dark text-lg">{details[key]}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )} */}

          </div>

          {/* Rechte Spalte: Finanzen, Vermietung & Ausstattung (Sticky Sidebar) */}
          <div className="lg:col-span-4 lg:sticky lg:top-36 flex flex-col gap-6">

            {/* FINANZEN & RENDITE */}
            {hasFinanzen && (
              <div className="sidebar-card bg-white p-6 rounded-3xl border shadow-xs">
                <h3 className="detail-title-sm text-dark fw-bold mb-3 text-xs uppercase tracking-widest text-gray-400">
                  Finanzen & Rendite
                </h3>

                {details.rendite && (
                  <div className="rendite-box text-center p-3 mb-3 rounded-xl border border-dashed border-emerald-600 bg-emerald-50/20">
                    <span className="text-muted small block text-xs text-gray-500 mb-1 font-semibold">Erwartete Rendite</span>
                    <span className="fw-bold text-xl text-emerald-700 font-serif">{details.rendite}</span>
                  </div>
                )}

                {hasFinanzenRows && (
                  <div className="flex flex-col gap-1">
                    {details.ist_ertrag_netto && (
                      <div className="flex justify-between items-center py-2 border-b border-light">
                        <span className="text-secondary small">Ist-Ertrag (netto)</span>
                        <span className="fw-bold text-dark">{details.ist_ertrag_netto}</span>
                      </div>
                    )}
                    {details.soll_ertrag_netto && (
                      <div className="flex justify-between items-center py-2 border-b border-light">
                        <span className="text-secondary small">Soll-Ertrag (netto)</span>
                        <span className="fw-bold text-dark">{details.soll_ertrag_netto}</span>
                      </div>
                    )}
                    {details.ist_netto_mietzins && (
                      <div className="flex justify-between items-center py-2 border-b border-light">
                        <span className="text-secondary small">Ø Ist-Nettomietzins</span>
                        <span className="fw-bold text-dark">{details.ist_netto_mietzins}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {hasFlaechen && (
  <div className="bg-white rounded-3xl border shadow-xs overflow-hidden">
    <table className="w-full">
      <thead>
        <tr className="border-b">
          <th className="text-left px-6 py-5 text-black">
            Eigenschaft
          </th>
          <th className="text-right px-6 py-5 text-black">
            Wert
          </th>
        </tr>
      </thead>

      <tbody>

        {details.wohnflaeche && (
          <tr className="border-b">
            <td className="px-6 py-5 text-gray-600">Wohnfläche</td>
            <td className="px-6 py-5 text-right font-bold text-black">
              {details.wohnflaeche}
            </td>
          </tr>
        )}

        {details.nutzflaeche && (
          <tr className="border-b">
            <td className="px-6 py-5 text-gray-600">Nutzfläche</td>
            <td className="px-6 py-5 text-right font-bold text-black">
              {details.nutzflaeche}
            </td>
          </tr>
        )}

        {details.widmung && (
          <tr className="border-b">
            <td className="px-6 py-5 text-gray-600">Widmung</td>
            <td className="px-6 py-5 text-right font-bold text-black">
              {details.widmung}
            </td>
          </tr>
        )}

        {details.grundflaeche && (
          <tr className="border-b">
            <td className="px-6 py-5 text-gray-600">Grundfläche</td>
            <td className="px-6 py-5 text-right font-bold text-black">
              {details.grundflaeche}
            </td>
          </tr>
        )}

        {details.unbefristete_vermietung && (
          <tr className="border-b">
            <td className="px-6 py-5 text-gray-600">
              Unbefristete Vermietung
            </td>
            <td className="px-6 py-5 text-right font-bold text-black">
              {formatValue(details.unbefristete_vermietung)}
            </td>
          </tr>
        )}

        {details.balkon_terrassen && (
          <tr className="border-b">
            <td className="px-6 py-5 text-gray-600">
              Balkon / Terrassen
            </td>
            <td className="px-6 py-5 text-right font-bold text-black">
              {details.balkon_terrassen}
            </td>
          </tr>
        )}

        {details.eigengareten && (
          <tr className="border-b">
            <td className="px-6 py-5 text-gray-600">
              Eigengärten
            </td>
            <td className="px-6 py-5 text-right font-bold text-black">
              {details.eigengareten}
            </td>
          </tr>
        )}

        {details.ist_ertrag_netto && (
          <tr className="border-b">
            <td className="px-6 py-5 text-gray-600">
              Ist-Ertrag (netto)
            </td>
            <td className="px-6 py-5 text-right font-bold text-black">
              {details.ist_ertrag_netto}
            </td>
          </tr>
        )}

        {details.soll_ertrag_netto && (
          <tr className="border-b">
            <td className="px-6 py-5 text-gray-600">
              Soll-Ertrag (netto)
            </td>
            <td className="px-6 py-5 text-right font-bold text-black">
              {details.soll_ertrag_netto}
            </td>
          </tr>
        )}

        {details.ist_netto_mietzins && (
          <tr>
            <td className="px-6 py-5 text-gray-600">
              Ø Ist-Nettomietzins
            </td>
            <td className="px-6 py-5 text-right font-bold text-black">
              {details.ist_netto_mietzins}
            </td>
          </tr>
        )}

      </tbody>
    </table>
  </div>
)}

            {/* AUSSTATTUNG & BELEGUNG */}
            {hasAusstattung && (
              <div className="sidebar-card bg-white p-6 rounded-3xl border shadow-xs">
                <h3 className="detail-title-sm text-dark fw-bold mb-3 text-xs uppercase tracking-widest text-gray-400">
                  Ausstattung & Belegung
                </h3>
                <ul className="flex flex-col gap-3">
                  {details.balkon_terrassen && (
                    <li className="flex justify-between items-center">
                      <span className="text-secondary flex items-center gap-2 small">
                        <BsBuilding size={16} className="text-gold" />
                        Balkon / Terrassen
                      </span>
                      <span className="badge bg-light text-dark border px-2 py-1 rounded-2 fw-bold font-monospace">
                        {details.balkon_terrassen}
                      </span>
                    </li>
                  )}
                  {details.eigengareten && (
                    <li className="flex justify-between items-center">
                      <span className="text-secondary flex items-center gap-2 small">
                        <BsTree size={16} className="text-gold" />
                        Eigengärten
                      </span>
                      <span className="badge bg-light text-dark border px-2 py-1 rounded-2 fw-bold font-monospace">
                        {details.eigengareten}
                      </span>
                    </li>
                  )}
                  {details.unbefristete_vermietung && (
                    <li className="flex justify-between items-center">
                      <span className="text-secondary flex items-center gap-2 small">
                        <BsFileEarmarkCheck size={16} className="text-gold" />
                        Unbefristete Vermietung
                      </span>
                      <span className="badge bg-light text-dark border px-2 py-1 rounded-2 fw-bold font-monospace">
                        {formatValue(details.unbefristete_vermietung)}
                      </span>
                    </li>
                  )}
                  {details.leerstand && (
                    <li className="flex justify-between items-center">
                      <span className="text-secondary flex items-center gap-2 small">
                        <BsInfoCircle size={16} className="text-gold" />
                        Leerstand
                      </span>
                      <span className="badge bg-light text-dark border px-2 py-1 rounded-2 fw-bold font-monospace">
                        {formatValue(details.leerstand)}
                      </span>
                    </li>
                  )}
                  {details.befristungen && (
                    <li className="flex justify-between items-center">
                      <span className="text-secondary flex items-center gap-2 small">
                        <BsShieldExclamation size={16} className="text-gold" />
                        Befristungen
                      </span>
                      <span className="badge bg-light text-dark border px-2 py-1 rounded-2 fw-bold font-monospace">
                        {details.befristungen}
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            )}

            {/* KONTAKT / INTERESSE WIDGET */}
            <div className="sidebar-card bg-dark text-white p-6 rounded-3xl border-0 shadow-sm flex flex-col gap-4">
              <h4 className="text-xl font-serif font-bold text-white">Interesse geweckt?</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                Fordern Sie jetzt das unverbindliche Exposé an oder vereinbaren Sie einen persönlichen Besichtigungstermin.
              </p>
              <button
                onClick={() => {
                  setOpenModal(true);
                  setForm({ name: "", email: "", phone: "", subject: `Anfrage zu ${property.title}`, message: "" });
                  setSent(false);
                  setSubmitError("");
                }}
                className="btn btn-gold w-100 py-3 fw-bold text-white border-0 rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer font-sans"
              >
                <BsEnvelopeOpenFill size={16} />
                <span>kontakt</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Inquiry Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center overflow-y-auto p-4 md:p-8 contact-modal-overlay">
          <div className="bg-white w-full max-w-xl rounded-3xl p-8 relative shadow-2xl border-0 my-auto">
            <button
              onClick={() => { setOpenModal(false); setSent(false); }}
              className="absolute top-5 right-5 text-3xl text-gray-400 hover:text-black transition cursor-pointer leading-none"
            >
              ×
            </button>
            <h2 className="text-3xl font-serif font-bold mb-6 text-black border-b border-gray-100 pb-3">Kontakt aufnehmen</h2>
            {sent ? (
              <div className="text-center py-8">
                <p className="text-5xl mb-4">✅</p>
                <p className="text-xl font-semibold text-black">Vielen Dank!</p>
                <p className="text-gray-500 mt-2">Wir haben Ihre Nachricht erhalten und melden uns in Kürze bei Ihnen.</p>
              </div>
            ) : (
              <div className="contact-form-box space-y-4 text-black">
                {submitError && (
                  <p className="text-red-500 text-sm font-medium">{submitError}</p>
                )}
                <div>
                  <label>Ihr Name *</label>
                  <input type="text" placeholder="z. B. Max Mustermann" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                </div>
                <div>
                  <label>E-Mail-Adresse *</label>
                  <input type="email" placeholder="z. B. max@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                </div>
                <div>
                  <label>Telefonnummer *</label>
                  <input type="tel" placeholder="z. B. +43 664 1234567" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                </div>
                <div>
                  <label>Betreff *</label>
                  <input type="text" placeholder={`Anfrage zu ${property.title}`} value={form.subject || `Anfrage zu ${property.title}`} onChange={e => setForm({...form, subject: e.target.value})} />
                </div>
                <div>
                  <label>Ihre Nachricht</label>
                  <textarea rows="4" placeholder="Schreiben Sie uns Ihre Nachricht..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
                </div>
                <button
                  onClick={handleSubmitInquiry}
                  disabled={submitting}
                  className="contact-form-submit disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? "Wird gesendet..." : "Nachricht senden"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {showGallery && (
  <div
    className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center"
    onClick={() => setShowGallery(false)}
  >
    <button
      onClick={() => setShowGallery(false)}
      className="absolute top-5 right-5 text-white text-5xl z-50"
    >
      ×
    </button>

    <Swiper
      initialSlide={galleryIndex}
      navigation
      modules={[Navigation]}
      className="w-[90%] h-[90%]"
    >
      {images.map((img, index) => (
        <SwiperSlide key={index}>
          <img
            src={getImageUrl(img)}
            alt=""
            className="w-full h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
)}
    </section>
  );
}

