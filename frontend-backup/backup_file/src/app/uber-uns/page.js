function UberUnsPage() {
  return (
    <main>
      <section className="bg-black text-white py-28">
        <div className="max-w-7xl mx-auto px-20">
          <p className="text-yellow-500 mb-4">
            ÜBER UNS
          </p>

          <h1 className="text-6xl mb-6">
            Hartner Immobilien
          </h1>

          <p className="text-gray-300 text-xl max-w-3xl">
            Seit mehr als 20 Jahren begleiten wir unsere Kunden
            mit Kompetenz, Vertrauen und persönlicher Betreuung.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-20 grid grid-cols-2 gap-16">

          <div>
            <h2 className="text-4xl mb-8">
              Unsere Werte
            </h2>

            <p className="text-gray-600 leading-8">
              Vertrauen, Kompetenz und Diskretion bilden die
              Grundlage unserer täglichen Arbeit.
            </p>
          </div>

          <div>
            <h2 className="text-4xl mb-8">
              Unsere Erfahrung
            </h2>

            <p className="text-gray-600 leading-8">
              Durch langjährige Erfahrung am österreichischen
              Immobilienmarkt bieten wir individuelle Lösungen.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}

export default UberUnsPage;