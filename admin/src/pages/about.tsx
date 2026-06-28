import { ShieldCheck, Award, Compass } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: ShieldCheck,
      title: "Vertrauen & Diskretion",
      desc: "Die Vermittlung von erstklassigen Anlageobjekten erfordert absolutes Vertrauen. Wir garantieren diskrete Transaktionen.",
    },
    {
      icon: Award,
      title: "Exzellente Qualität",
      desc: "Unsere sorgfältig ausgewählten Objekte erfüllen höchste Ansprüche an Lage, Bausubstanz und Entwicklungspotenzial.",
    },
    {
      icon: Compass,
      title: "Marktkompetenz",
      desc: "Durch unsere langjährige Erfahrung im österreichischen Immobilienmarkt bewerten wir Trends präzise und zukunftssicher.",
    },
  ];

  return (
    <div className="space-y-24">
      {/* Intro section */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <span className="inline-block text-brand-500 font-bold uppercase tracking-widest text-xs">
          Wer wir sind
        </span>
        <h2 className="text-4xl font-extrabold text-navy-900 tracking-tight leading-tight">
          Haertner Immobilien
        </h2>
        <p className="text-navy-600 text-lg leading-relaxed font-medium">
          Haertner Immobilien GmbH ist Ihr spezialisierter Partner für die Vermittlung und Entwicklung von wertbeständigen Immobilien und renditestarken Zinshäusern in Österreich.
        </p>
      </section>

      {/* Main content split grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="bg-navy-900 text-white rounded-3xl p-8 md:p-12 shadow-lg border border-navy-800 space-y-6">
          <h3 className="text-2xl font-bold text-brand-100">Unsere Philosophie</h3>
          <p className="text-navy-300 leading-relaxed text-sm">
            Immobilien sind mehr als nur Ziegel und Zement. Sie stellen Lebensräume, Geschäftsfelder und vor allem nachhaltige Vermögenswerte dar. Bei Haertner Immobilien begleiten wir private Anleger, Family Offices und institutionelle Investoren mit fundiertem Fachwissen und strategischem Weitblick.
          </p>
          <p className="text-navy-300 leading-relaxed text-sm">
            Unser Schwerpunkt liegt auf Zinshäusern, Gewerbeimmobilien sowie exklusiven Wohnobjekten in Wien und Umgebung. Wir pflegen langjährige Partnerschaften und setzen auf absolute Transparenz.
          </p>
        </div>

        {/* Highlight Stats */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white border border-navy-100 rounded-2xl p-6 shadow-sm space-y-2 text-center">
            <span className="text-4xl font-black text-brand-500">25+</span>
            <p className="text-navy-900 font-bold text-sm">Jahre Erfahrung</p>
          </div>
          <div className="bg-white border border-navy-100 rounded-2xl p-6 shadow-sm space-y-2 text-center">
            <span className="text-4xl font-black text-brand-500">450M+</span>
            <p className="text-navy-900 font-bold text-sm">Vermitteltes Volumen</p>
          </div>
          <div className="bg-white border border-navy-100 rounded-2xl p-6 shadow-sm space-y-2 text-center">
            <span className="text-4xl font-black text-brand-500">120+</span>
            <p className="text-navy-900 font-bold text-sm">Zinshäuser betreut</p>
          </div>
          <div className="bg-white border border-navy-100 rounded-2xl p-6 shadow-sm space-y-2 text-center">
            <span className="text-4xl font-black text-brand-500">100%</span>
            <p className="text-navy-900 font-bold text-sm">Zufriedene Kunden</p>
          </div>
        </div>
      </section>

      {/* Core Values grid */}
      <section className="space-y-12">
        <h3 className="text-2xl font-bold text-navy-900 tracking-tight text-center">
          Unsere Werte im Mittelpunkt
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, idx) => {
            const Icon = v.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-navy-100 rounded-2xl p-6 md:p-8 shadow-sm space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="h-12 w-12 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center">
                  <Icon className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-bold text-navy-900">{v.title}</h4>
                <p className="text-navy-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
