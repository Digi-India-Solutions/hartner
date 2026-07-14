function KontaktPage() {
  return (
    <main>
      <section className="bg-black text-white py-28">
        <div className="max-w-7xl mx-auto px-20">
          <p className="text-yellow-500 mb-4">
            KONTAKT
          </p>

          <h1 className="text-6xl mb-6">
            Kontaktieren Sie uns
          </h1>

          <p className="text-gray-300 text-xl max-w-3xl">
            Wir freuen uns auf Ihre Anfrage und beraten Sie
            persönlich und unverbindlich.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-20 grid grid-cols-2 gap-16">

          <div>
            <h2 className="text-4xl mb-8">
              Kontaktinformationen
            </h2>

            <p className="mb-4">
              Telefon: +43 664 45 45 404
            </p>

            <p className="mb-4">
              E-Mail: office@hartner.at
            </p>

            <p>
              Österreich
            </p>
          </div>

          <form className="bg-white shadow p-10">

            <input
              type="text"
              placeholder="Name"
              className="w-full border p-4 mb-4"
            />

            <input
              type="email"
              placeholder="E-Mail"
              className="w-full border p-4 mb-4"
            />

            <textarea
              rows="5"
              placeholder="Nachricht"
              className="w-full border p-4 mb-4"
            ></textarea>

            <button className="bg-yellow-600 px-8 py-4 font-semibold">
              SENDEN
            </button>

          </form>

        </div>
      </section>
    </main>
  );
}

export default KontaktPage;