function LeistungenPage() {
  return (
    <main>
      <section className="bg-black text-white py-28">
        <div className="max-w-7xl mx-auto px-20">
          <p className="text-yellow-500 mb-4">
            LEISTUNGEN
          </p>

          <h1 className="text-6xl mb-6">
            Unsere Leistungen
          </h1>

          <p className="text-gray-300 text-xl">
            Individuelle Beratung und professionelle
            Immobilienlösungen.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-20 grid grid-cols-2 gap-10">

          <div className="border p-10">
            <h2 className="text-3xl mb-4">
              Beratung
            </h2>

            <p className="text-gray-600">
              Persönliche Immobilienberatung.
            </p>
          </div>

          <div className="border p-10">
            <h2 className="text-3xl mb-4">
              Bewertung
            </h2>

            <p className="text-gray-600">
              Marktgerechte Immobilienbewertung.
            </p>
          </div>

          <div className="border p-10">
            <h2 className="text-3xl mb-4">
              Vermittlung
            </h2>

            <p className="text-gray-600">
              Verkauf und Vermietung von Immobilien.
            </p>
          </div>

          <div className="border p-10">
            <h2 className="text-3xl mb-4">
              Betreuung
            </h2>

            <p className="text-gray-600">
              Individuelle Unterstützung während des gesamten Prozesses.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}

export default LeistungenPage;