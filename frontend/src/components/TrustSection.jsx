"use client";

export default function TrustSection() {
  return (
    <section className="bg-white py-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          
          <div>
            <span className="text-[#c8a052] text-sm font-semibold tracking-widest block uppercase mb-4">
              VERTRAUEN & KOMPETENZ
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight">
              Vertrauen, auf das Sie bauen können
            </h2>
          </div>

          <div className="lg:pt-8">
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
              Ob Haus in den besten Lagen oder renditestarke Gewerbeobjekte – wir begleiten Sie mit Know-how, Marktverständnis und einem starken Netzwerk. Diskret, effizient und immer in Ihrem Interesse.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}