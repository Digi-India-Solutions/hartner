import CategoryPage from "@/components/CategoryPage";

export const metadata = {
  title: "Wohnimmobilien | Haertner Immobilien",
  description:
    "Exklusive Wohnimmobilien – Villen, Wohnungen und Baugrundstücke. Finden Sie Ihr neues Zuhause.",
};

export default function WohnimmobilienPage() {
  return (
    <CategoryPage
      category="haus_wohnen"
      title="Wohnimmobilien"
      subtitle="Exklusive Wohnimmobilien mit besonderem Charakter"
      description="Ob exklusive Villa, gemütliche Wohnung oder Baugrundstück – wir finden Ihr neues Zuhause oder die passende Wohnimmobilie."
    />
  );
}