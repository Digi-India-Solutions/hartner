"use client";

import { ShieldCheck, User, Building, MapPin } from "lucide-react";

export default function Features() {
  const items = [
    { icon: ShieldCheck, text: "20+ JAHRE ERFAHRUNG" },
    { icon: User, text: "PERSÖNLICHE BETREUUNG" },
    { icon: Building, text: "WOHN-, GEWERBE & INVESTMENTIMMOBILIEN" },
    { icon: MapPin, text: "ÖSTERREICHWEITE EXPERTISE" },
  ];

  return (
    <section className="bg-[#1f242b] py-10 md:py-12 border-b border-white/5 font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 xl:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-4 text-white hover:text-[#c8a052] transition-colors duration-300">
                <Icon className="text-[#c8a052] text-3xl shrink-0" size={32} />
                <span className="text-sm font-semibold tracking-wider leading-snug">
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}