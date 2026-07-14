function PropertySection() {
    const properties = [
    {
        title: "Zinshaus",
        text: "Wohn- und Anlageobjekte mit langfristigem Wert."
    },
    {
        title: "Gewerbe & Investment",
        text: "Attraktive Gewerbe- und Investmentimmobilien."
    },
    {
        title: "Haus & Wohnen",
        text: "Wohnimmobilien für Eigennutzer und Familien."
    },
    {
        title: "Mietobjekte",
        text: "Moderne Mietwohnungen und Mietobjekte."
    },
];

return (
    <section className="bg-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-20">

        <p className="text-yellow-600 font-semibold mb-4">
            IMMOBILIEN
        </p>

        <h2 className="text-6xl text-black">
            Unsere Immobilien
        </h2>

        <div className="grid grid-cols-2 gap-8">
            {properties.map((item, index) => (
            <div
                key={index}
                className="bg-white p-12 border min-h-70 hover:shadow-1g duration-300"
            >
            <h3 className="text-gray-800 text-4xl mb-8">
                {item.title}
            </h3>

            <p className="text-gray-600 leading-8">
                {item.text}
            </p>

            <button className="mt-8 text-yellow-600 font-semibold">
                Mehr erfahren →
            </button>
            </div>
        ))}
        </div>

    </div>
    </section>
);
}

export default PropertySection;