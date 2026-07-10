"use client";

import Link from "next/link";
import { BsArrowBarRight, BsGeoAltFill } from "react-icons/bs";

const categoryLabels = {
  zinshaus: "Zinshaus",
  gewerbe: "Gewerbeimmobilien",
  haus_wohnen: "Wohnimmobilien",
  mietobjekte: "Mietobjekte",
};

// Helper to map card fields to display labels and values dynamically
const getCardFeatures = (property) => {
  const detailFields = property.details || {};
  const cardKeys = property.card_fields && property.card_fields.length > 0
    ? property.card_fields
    : ["widmung", "leerstand", "befristungen", "unbefristete_vermietung"]; // default fallback

  const labelMap = {
    wohnflaeche: "Wohnfläche",
    nutzflaeche: "Nutzfläche",
    widmung: "Widmung",
    grundflaeche: "Grundfläche",
    leerstand: "Leerstand",
    befristungen: "Befristungen",
    unbefristete_vermietung: "Unbefr. Vermietung",
    unbefristeteVermietung: "Unbefr. Vermietung",
    bau_potenzial: "Baupotenzial",
    bauPotenzial: "Baupotenzial",
    balkon_terrassen: "Balkon/Terrassen",
    balkonTerrassen: "Balkon/Terrassen",
    eigengareten: "Eigengärten",
    eigengaerten: "Eigengärten",
    abstellplatz: "Abstellplatz",
    ist_ertrag_netto: "Ist-Ertrag (netto)",
    istErtragNetto: "Ist-Ertrag (netto)",
    soll_ertrag_netto: "Soll-Ertrag (netto)",
    sollErtragNetto: "Soll-Ertrag (netto)",
    ist_netto_mietzins: "Ist-Nettomietzins",
    durchschnittMietzins: "Ist-Nettomietzins",
    rendite: "Rendite",
    baujahr: "Baujahr",
    heizung: "Heizung",
    zustand: "Zustand",
    hwb_fgee: "HWB / fGEE",
    hwbFgee: "HWB / fGEE",
    kaufpreis: "Kaufpreis",
    miete_monatlich: "Miete",
    mieteMonatlich: "Miete",
  };

  return cardKeys
    .map((key) => {
      // Resolve key in case it's in camelCase on admin side or snake_case on backend
      let val = detailFields[key];
      if (val === undefined) {
        // Try alternate case
        const snake = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
        const camel = key.replace(/([-_][a-z])/g, group => group.toUpperCase().replace('-', '').replace('_', ''));
        val = detailFields[snake] !== undefined ? detailFields[snake] : detailFields[camel];
      }

      if (val === undefined || val === "") return null;

      const label = labelMap[key] || key;
      const formattedVal = (val === true || val === "true" || val === "Ja") ? "Ja" :
                           (val === false || val === "false" || val === "Nein") ? "Nein" : val;
      
      return { label, value: formattedVal };
    })
    .filter(Boolean)
    .slice(0, 4); // Show max 4 features on the card to keep layout clean
};

export default function PropertyCard({ property }) {
  const getImageUrl = (url) => {
    if (!url) return "/images/card.jpg";
    if (url.startsWith("http") || url.startsWith("data:")) return url;
    if (url.startsWith("/wp-content") || url.startsWith("/wp-includes")) {
      return `https://hartner.digiindiasolutions.com${url}`;
    }
    return `https://hartapi.digiindiasolutions.com${url}`;
  };

  const firstImage = property.images && property.images.length > 0
    ? getImageUrl(property.images[0].url)

    : "/images/card.jpg";


  const price = property.details?.kaufpreis || property.details?.miete_monatlich || "Preis auf Anfrage";
  const features = getCardFeatures(property);

  return (
    <Link href={`/immobilien/${property.id || property._id}`} className="block h-full">
      <div className="property-card">
        {/* Image */}
        <div className="property-image">
          <img
            src={firstImage}
            alt={property.title}
          />
        </div>

        {/* Content */}
        <div className="property-content">
          {/* Title + Price */}
          <div className="property-header">
            <h3>{property.title}</h3>
            <span className="property-price">{price}</span>
          </div>

          {/* Location */}
          {property.address && (
            <div className="property-location">
              <BsGeoAltFill size={16} />
              <span>{property.address}</span>
            </div>
          )}

          {/* Dynamic features block */}
          {features.length > 0 && (
            <div className="property-features">
              <div className="features-grid">
                {features.map((feat, idx) => (
                  <div key={idx} className="feature-col">
                    <div className="feature-row">
                      <BsArrowBarRight size={20} className="shrink-0 feature-icon" />
                      <div className="feature-content">
                        <p className="feature-label">{feat.label}</p>
                        <p className="feature-value"><strong>{feat.value}</strong></p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

