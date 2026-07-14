function PropertyDetails() {
    const details = {
    wohnflaeche: "120 m²",
    nutzflaeche: "",
    widmung: "",
    grundflaeche: "",
    leerstand: "",
    befristungen: "",
    unbefristeteVermietung: "",
    bauPotenzial: "",
    balkon: "",
    eigengaerten: "",
    abstellplatz: "",
    istErtrag: "",
    sollErtrag: "",
    nettoMietzins: "",
    rendite: "",
    baujahr: "2005",
    heizung: "",
    zustand: "",
    hwb: "",
    kaufpreis: "€500,000",
};

  return (
    <section className="py-24 bg-[#f5f5f5]">
      <div className="max-w-6xl mx-auto bg-white shadow-lg p-16">

        <h2 className="text-5xl text-black font-light mb-14">
          Objektdetails
        </h2>

        <div className="grid grid-cols-2 gap-y-12 gap-x-20">

          {details.wohnflaeche && (
            <div>
              <p className="text-gray-500 text-lg mb-2">
                Wohnfläche
              </p>

              <p className="text-2xl text-black">
                {details.wohnflaeche}
              </p>
            </div>
          )}

          {details.baujahr && (
            <div>
              <p className="text-gray-500 text-lg mb-2">
                Baujahr
              </p>

              <p className="text-2xl text-black">
                {details.baujahr}
              </p>
            </div>
          )}

          {details.kaufpreis && (
            <div>
              <p className="text-gray-500 text-lg mb-2">
                Kaufpreis
              </p>

              <p className="text-2xl text-black">
                {details.kaufpreis}
              </p>
            </div>
          )}

          {details.heizung && (
            <div>
              <p className="text-gray-500 text-lg mb-2">
                Heizung
              </p>

              <p className="text-2xl text-black">
                {details.heizung}
              </p>
            </div>
          )}

          {details.rendite && (
            <div>
              <p className="text-gray-500 text-lg mb-2">
                Rendite
              </p>

              <p className="text-2xl text-black">
                {details.rendite}
              </p>
            </div>
          )}

        {details.nutzflaeche && (
  <div>
    <p className="text-gray-500">Nutzfläche</p>
    <p>{details.nutzflaeche}</p>
  </div>
)}

{details.widmung && (
  <div>
    <p className="text-gray-500">Widmung</p>
    <p>{details.widmung}</p>
  </div>
)}

{details.grundflaeche && (
  <div>
    <p className="text-gray-500">Grundfläche</p>
    <p>{details.grundflaeche}</p>
  </div>
)}

        </div>

        <div className="mt-16 border-t pt-10">
          <h3 className="text-4xl text-black font-light mb-6">
            Beschreibung
          </h3>

          <p className="text-gray-700 text-xl leading-10 max-w-3xl">
            Attraktives Objekt in zentraler Lage mit sehr guter
            Infrastruktur und langfristigem Wertpotenzial.
          </p>
        </div>

      </div>
    </section>
  );
}

export default PropertyDetails;