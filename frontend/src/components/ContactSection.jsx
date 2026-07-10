"use client";

import { Globe, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

export default function ContactSection() {
  const [openModal, setOpenModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmitInquiry = async () => {
    if (!form.name || !form.email || !form.phone || !form.subject) {
      setSubmitError("Bitte füllen Sie alle Pflichtfelder aus (Name, E-Mail, Telefonnummer, Betreff).");
      return;
    }
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("https://hartapi.digiindiasolutions.com/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: form.subject,
          message: form.message,
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

  return (
    <section
      id="contact"
      className="py-20 relative font-sans scroll-mt-20 overflow-hidden bg-black"
    >
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: "url('https://hartner.digiindiasolutions.com/wp-content/themes/hartner-theme/images/slavia.jpeg')",
        }}
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 lg:px-12 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content (col-span-8) */}
          <div className="lg:col-span-8 text-white">
            <span className="text-[#c8a052] text-sm font-semibold tracking-widest block uppercase mb-4">
              KONTAKT
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6">
              Lassen Sie uns über <br />
              Ihre Immobilie sprechen
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mb-10">
              Ob Verkauf, Kauf, Vermietung oder Investment – wir sind für Sie da. Diskret, persönlich und mit vollem Einsatz.
            </p>
            <button
              onClick={() => {
                setOpenModal(true);
                setForm({ name: "", email: "", phone: "", subject: "Allgemeine Anfrage", message: "" });
                setSent(false);
                setSubmitError("");
              }}
              className="bg-[#c8a052] hover:bg-[#b0893f] text-white px-8 py-4 text-base font-semibold rounded-lg shadow-md transition-all duration-300 cursor-pointer"
            >
              JETZT KONTAKT AUFNEHMEN
            </button>
          </div>

          {/* Right Info Box (col-span-4) */}
          <div className="lg:col-span-4 bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100 flex flex-col gap-8">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-lg bg-[#c8a052]/10 flex items-center justify-center text-[#c8a052] shrink-0 mt-1">
                <MapPin size={20} />
              </div>
              <div>
                <h6 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Adresse</h6>
                <p className="text-gray-900 font-medium leading-relaxed">
                  Hoher Markt 17 <br />
                  A-3340 Waidhofen/Ybbs
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-lg bg-[#c8a052]/10 flex items-center justify-center text-[#c8a052] shrink-0 mt-1">
                <Phone size={20} />
              </div>
              <div>
                <h6 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Telefon</h6>
                <a href="tel:+436644545404" className="text-[#c8a052] hover:underline font-semibold leading-relaxed">
                  +43 664 - 45 45 404
                </a>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-lg bg-[#c8a052]/10 flex items-center justify-center text-[#c8a052] shrink-0 mt-1">
                <Mail size={20} />
              </div>
              <div>
                <h6 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">E-Mail</h6>
                <a href="mailto:gerold@hartner-immobilien.at" className="text-gray-900 hover:text-[#c8a052] transition-colors font-medium leading-relaxed break-all">
                  gerold@hartner-immobilien.at
                </a>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-lg bg-[#c8a052]/10 flex items-center justify-center text-[#c8a052] shrink-0 mt-1">
                <Globe size={20} />
              </div>
              <div>
                <h6 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Website</h6>
                <a href="https://www.hartner-immobilien.at" target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-[#c8a052] transition-colors font-medium leading-relaxed">
                  www.hartner-immobilien.at
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Inquiry Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-xl rounded-3xl p-8 relative shadow-2xl">
            <button
              onClick={() => { setOpenModal(false); setSent(false); }}
              className="absolute top-5 right-5 text-3xl text-gray-500 hover:text-black transition cursor-pointer"
            >
              ×
            </button>
            <h2 className="text-3xl font-serif font-bold mb-6 text-black">Kontakt aufnehmen</h2>
            {sent ? (
              <div className="text-center py-8">
                <p className="text-5xl mb-4">✅</p>
                <p className="text-xl font-semibold text-black">Vielen Dank!</p>
                <p className="text-gray-500 mt-2">Wir haben Ihre Nachricht erhalten und melden uns in Kürze bei Ihnen.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {submitError && (
                  <p className="text-red-500 text-sm font-medium">{submitError}</p>
                )}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 font-sans">Ihr Name *</label>
                  <input type="text" placeholder="z. B. Max Mustermann" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full border border-gray-200 p-4 rounded-xl text-black bg-white focus:outline-none focus:ring-2 focus:ring-[#c8a052] font-sans" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 font-sans">E-Mail-Adresse *</label>
                  <input type="email" placeholder="z. B. max@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full border border-gray-200 p-4 rounded-xl text-black bg-white focus:outline-none focus:ring-2 focus:ring-[#c8a052] font-sans" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 font-sans">Telefonnummer *</label>
                  <input type="tel" placeholder="z. B. +43 664 1234567" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full border border-gray-200 p-4 rounded-xl text-black bg-white focus:outline-none focus:ring-2 focus:ring-[#c8a052] font-sans" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 font-sans">Betreff *</label>
                  <input type="text" placeholder="z. B. Allgemeine Anfrage" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} className="w-full border border-gray-200 p-4 rounded-xl text-black bg-white focus:outline-none focus:ring-2 focus:ring-[#c8a052] font-sans" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 font-sans">Ihre Nachricht</label>
                  <textarea rows="4" placeholder="Schreiben Sie uns Ihre Nachricht..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full border border-gray-200 p-4 rounded-xl text-black bg-white focus:outline-none focus:ring-2 focus:ring-[#c8a052] font-sans" />
                </div>
                <button
                  onClick={handleSubmitInquiry}
                  disabled={submitting}
                  className="w-full mt-4 bg-[#c8a052] text-white py-4 rounded-xl text-lg font-semibold hover:bg-[#b0893f] transition cursor-pointer font-sans disabled:opacity-50"
                >
                  {submitting ? "Wird gesendet..." : "Nachricht senden"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}