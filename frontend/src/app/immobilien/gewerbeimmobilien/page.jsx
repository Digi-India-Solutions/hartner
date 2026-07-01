import CategoryPage from "@/components/CategoryPage";

export const metadata = {
  title: "Gewerbeimmobilien | Haertner Immobilien",
  description:
    "Attraktive Gewerbeimmobilien – Büros, Geschäftslokale und Gewerbeobjekte für Unternehmen und Investoren.",
};

export default function GewerbeimmobilienPage() {
  return (
    <CategoryPage
      category="gewerbe"
      title="Gewerbeimmobilien"
      subtitle="Moderne Gewerbeimmobilien für Unternehmen und Investoren"
      description="Von Büroflächen über Geschäftslokale bis hin zu modernen Gewerbeobjekten bieten wir individuelle Lösungen für Unternehmen, Investoren und Gewerbetreibende."
    />
  );
}