export default function Impressum() {
  return (
    <section className="bg-white min-h-screen py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        <h1
          className="text-6xl mb-12"
          style={{ fontFamily: "Georgia, serif" }}
        >
          IMPRESSUM
        </h1>

        <div className="space-y-12 text-gray-900">

          <div>
            <h2
              className="text-4xl mb-6"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Angaben gemäß § 5 TMG
            </h2>

            <p className="leading-10 text-xl">
              <strong>Hartner Immobilien GmbH</strong><br />
              Musterstraße 123<br />
              1010 Wien<br />
              Österreich<br /><br />
              Telefon: +43 123 456 789<br />
              E-Mail:{" "}
<a
  href="mailto:info@hartner-immobilien.at"
  className="text-blue-600 hover:underline cursor-pointer"
>
  info@hartner-immobilien.at
</a>

<br />

Website:{" "}
<a
  href="https://www.hartner-immobilien.at"
  target="_blank"
  rel="noopener noreferrer"
  className="text-blue-600 hover:underline cursor-pointer"
>
  www.hartner-immobilien.at
</a>
            </p>
          </div>

          <hr />

          <div>
            <h2
              className="text-4xl mb-5"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Vertreten durch
            </h2>

            <p className="text-xl">
              Max Mustermann<br />
              Geschäftsführer
            </p>
          </div>

          <hr />

          <div>
            <h2
              className="text-4xl mb-5"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Handelsregister
            </h2>

            <p className="text-xl">
              Handelsgericht Wien<br />
              Registernummer: FN 123456a
            </p>
          </div>

          <hr />

          <div>
            <h2
              className="text-4xl mb-5"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Umsatzsteuer-ID
            </h2>

            <p className="text-xl">
              Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:
              <br /><br />
              ATU12345678
            </p>
          </div>

          <hr />

          <div>
            <h2
              className="text-4xl mb-5"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Verantwortlich für den Inhalt
            </h2>

            <p className="text-xl leading-10">
              Max Mustermann<br />
              Hartner Immobilien GmbH<br />
              Musterstraße 123<br />
              1010 Wien<br />
              Österreich
            </p>
          </div>

          <hr />

          <div>
            <h2
              className="text-4xl mb-5"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Haftung für Inhalte
            </h2>

            <p className="text-xl leading-10">
              Die Inhalte dieser Website wurden mit größter
              Sorgfalt erstellt. Für die Richtigkeit,
              Vollständigkeit und Aktualität übernehmen wir
              jedoch keine Gewähr.
            </p>
          </div>

          <hr />

          <div>
            <h2
              className="text-4xl mb-5"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Haftung für Links
            </h2>

            <p className="text-xl leading-10">
              Unsere Website enthält Links zu externen Websites
              Dritter. Auf deren Inhalte haben wir keinen Einfluss.
            </p>
          </div>

          <hr />

          <div>
            <h2
              className="text-4xl mb-5"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Urheberrecht
            </h2>

            <p className="text-xl leading-10">
              Die Inhalte und Werke auf dieser Website
              unterliegen dem Urheberrecht.
            </p>
          </div>

          <hr />

          <div>
            <h2
              className="text-4xl mb-5"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Streitbeilegung
            </h2>

            <p className="text-xl leading-10">
              Die Europäische Kommission stellt eine Plattform
              zur Online-Streitbeilegung bereit.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}