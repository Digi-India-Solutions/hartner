import PropertyDetails from "@/components/PropertyDetails";
import PropertyTabs from "@/components/PropertyTabs";

function ImmobilienPage() {
  return (
    <main>
      <section className="bg-black text-white py-28">
        <div className="max-w-7xl mx-auto px-20">
          <p className="text-yellow-500 mb-4">
            IMMOBILIEN
          </p>

          <h1 className="text-6xl">
            Unsere Immobilien
          </h1>
        </div>
      </section>

      <PropertyTabs />

      <PropertyDetails />
    </main>
  );
}

export default ImmobilienPage;