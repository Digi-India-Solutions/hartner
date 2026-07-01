import CategoryPage from "@/components/CategoryPage";

export const metadata = {
  title: "Investmentimmobilien | Haertner Immobilien",
  description:
    "Zinshäuser und Investment-Objekte mit langfristigem Wertzuwachs. Attraktive Renditen für Investoren.",
};

export default function InvestmentimmobilienPage() {
  return (
    <CategoryPage
      category="zinshaus"
      title="Investmentimmobilien"
      subtitle="Zinshäuser & Investmentobjekte mit langfristigem Wert"
      description="Wohn- und Anlageobjekte mit stabilem Ertrag und langfristigem Wertzuwachs. Entdecken Sie unsere aktuellen Investmentimmobilien."
    />
  );
}