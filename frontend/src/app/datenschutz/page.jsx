export default function DatenschutzPage() {
  return (
    <main className="bg-[#f5f5f5] min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        <h1
          className="text-black text-5xl mb-12"
          style={{ fontFamily: "Georgia, serif" }}
        >
          DATENSCHUTZERKLÄRUNG
        </h1>

        <section className="mb-12">
          <h2
            className="text-black text-4xl mb-5"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Datenschutz auf einen Blick
          </h2>

          <p className="text-black text-2xl leading-10">
            Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen.
            Wir behandeln Ihre personenbezogenen Daten vertraulich und
            entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser
            Datenschutzerklärung.
          </p>
        </section>

        <section className="mb-12">
          <h2
            className="text-black text-4xl mb-5"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Erhebung und Verarbeitung personenbezogener Daten
          </h2>

          <p className="text-black text-2xl leading-10">
            Personenbezogene Daten werden nur erhoben, wenn Sie uns diese
            freiwillig mitteilen, beispielsweise über unser Kontaktformular
            oder per E-Mail. Die von Ihnen übermittelten Informationen werden
            ausschließlich zur Bearbeitung Ihrer Anfrage verwendet.
          </p>
        </section>

        <section className="mb-12">
          <h2
            className="text-black text-4xl mb-5"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Nutzung Ihrer Daten
          </h2>

          <p className="text-black text-2xl mb-5">
            Ihre personenbezogenen Daten werden ausschließlich für folgende
            Zwecke verwendet:
          </p>

          <ul className="list-decimal pl-10 text-black text-2xl leading-10">
            <li>Bearbeitung Ihrer Anfragen</li>
            <li>Kommunikation im Zusammenhang mit Immobilienangeboten</li>
            <li>Verbesserung unseres Kundenservices</li>
            <li>Erfüllung gesetzlicher Verpflichtungen</li>
          </ul>

          <p className="text-black text-2xl mt-8 leading-10">
            Eine Weitergabe Ihrer Daten an Dritte erfolgt nur, soweit dies
            gesetzlich vorgeschrieben oder zur Vertragserfüllung erforderlich
            ist.
          </p>
        </section>

        <section className="mb-12">
          <h2
            className="text-black text-4xl mb-5"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Cookies
          </h2>

          <p className="text-black text-2xl leading-10">
            Unsere Website verwendet Cookies, um die Benutzerfreundlichkeit zu
            verbessern und bestimmte Funktionen bereitzustellen.
          </p>
        </section>

        <section className="mb-12">
          <h2
            className="text-black text-4xl mb-5"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Kontaktformular
          </h2>

          <p className="text-black text-2xl leading-10">
            Wenn Sie uns über das Kontaktformular kontaktieren, werden Ihre
            Angaben ausschließlich zur Bearbeitung Ihrer Anfrage gespeichert.
          </p>
        </section>

        <section className="mb-12">
          <h2
            className="text-black text-4xl mb-5"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Datensicherheit
          </h2>

          <p className="text-black text-2xl leading-10">
            Wir setzen geeignete technische und organisatorische Maßnahmen ein,
            um Ihre personenbezogenen Daten zu schützen.
          </p>
        </section>

        <section className="mb-12">
          <h2
            className="text-black text-4xl mb-5"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Ihre Rechte
          </h2>

          <ul className="list-disc pl-10 text-black text-2xl leading-10">
            <li>Auskunft über Ihre gespeicherten Daten</li>
            <li>Berichtigung unrichtiger Daten</li>
            <li>Löschung personenbezogener Daten</li>
            <li>Einschränkung der Verarbeitung</li>
            <li>Datenübertragbarkeit</li>
            <li>Widerspruch gegen die Verarbeitung</li>
          </ul>
        </section>

        <section>
          <h2
            className="text-black text-4xl mb-5"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Änderungen dieser Datenschutzerklärung
          </h2>

          <p className="text-black text-2xl leading-10">
            Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf
            anzupassen.
          </p>
        </section>

      </div>
    </main>
  );
}