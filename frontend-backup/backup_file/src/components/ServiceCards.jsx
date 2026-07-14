"use client";

import { User, BarChart3, ShieldCheck } from "lucide-react";

export default function ServiceCards() {
  const cards = [
    {
      icon: User,
      title: "Persönliche Betreuung",
      description: "Individuelle Beratung und begleitende Unterstützung.",
    },
    {
      icon: BarChart3,
      title: "Sorglose Abwicklung",
      description: "Wir kümmern uns um den gesamten Prozess.",
    },
    {
      icon: ShieldCheck,
      title: "Verlässliche Partnerschaft",
      description: "Vertrauen, Integrität und Diskretion stehen bei uns an erster Stelle.",
    },
  ];

  return (
    <section className="bg-white pb-20 pt-2 font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 xl:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-gray-100 p-8 rounded-2xl shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-start"
              >
                <div className="w-12 h-12 rounded-xl bg-[#c8a052]/10 flex items-center justify-center text-[#c8a052] mb-6">
                  <Icon size={24} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}