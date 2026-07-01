import CategoryPage from "@/components/CategoryPage";

export const metadata = {
  title: "Mietobjekte | Haertner Immobilien",
  description:
    "Moderne Mietwohnungen und Mietobjekte in besten Lagen. Jetzt Mietobjekt finden.",
};

export default function MietobjektePage() {
  return (
    <CategoryPage
      category="mietobjekte"
      title="Mietobjekte"
      subtitle="Moderne Mietobjekte in besten Lagen"
      description="Von der gemütlichen Stadtwohnung bis zur geräumigen Familienwohnung – entdecken Sie unsere aktuellen Mietobjekte."
    />
  );
}