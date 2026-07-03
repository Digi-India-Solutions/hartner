import PropertySchema from "@models/property.model";

export const runPropertySeeder = async (): Promise<void> => {
  try {
    // 1. Run migration for existing data
    // First, copy the legacy createdAt value to created_at for documents that lack it
    const copyResult = await PropertySchema.updateMany(
      { createdAt: { $exists: true }, created_at: { $exists: false } },
      [ { $set: { created_at: "$createdAt" } } ],
      { strict: false }
    );
    if (copyResult.modifiedCount > 0) {
      console.log(`Copied createdAt timestamp for ${copyResult.modifiedCount} legacy properties.`);
    }

    // Second, unset the legacy camelCase fields to avoid conflicts
    const unsetResult = await PropertySchema.updateMany(
      {},
      { $unset: { createdAt: "", updatedAt: "" } },
      { strict: false }
    );
    if (unsetResult.modifiedCount > 0) {
      console.log(`Unset legacy camelCase fields for ${unsetResult.modifiedCount} properties.`);
    }

    const legacyProperties = await PropertySchema.find({
      $or: [
        { status: { $exists: false } },
        { sort_order: { $exists: false } },
        { details: { $exists: false } },
      ],
    });

    if (legacyProperties.length > 0) {
      console.log(`Migrating ${legacyProperties.length} legacy properties...`);
      for (const prop of legacyProperties) {
        const normalizedStatus = String(prop.status ?? "").toLowerCase();
        if (!prop.status || normalizedStatus === "published") prop.status = "published";
        if (normalizedStatus === "offline") prop.status = "offline";
        if (normalizedStatus === "draft") prop.status = "draft";

        const normalizedCategory = String(prop.category ?? "").toLowerCase();
        if (normalizedCategory === "zinshaus") prop.category = "zinshaus";
        if (normalizedCategory === "gewerbe") prop.category = "gewerbe";
        if (normalizedCategory === "haus & wohnen" || normalizedCategory === "haus_wohnen") prop.category = "haus_wohnen";
        if (normalizedCategory === "mietobjekte") prop.category = "mietobjekte";

        if (prop.sort_order === undefined) prop.sort_order = 0;
        if (!prop.details) prop.details = {};
        await prop.save({ validateBeforeSave: false });
      }
      console.log("Migration complete!");
    }

    // 2. Seed mock data if database is empty
    const count = await PropertySchema.countDocuments();
    if (count === 0) {
      console.log("Database has no properties. Seeding mock real estate data...");

      const mockProperties = [
        {
          title: "Historisches Zinshaus im 4. Bezirk",
          category: "zinshaus",
          status: "published",
          sort_order: 1,
          description: "Ein wunderschönes, historisches Zinshaus in bester Lage des 4. Wiener Gemeindebezirks. Das... <p>Klassische Altbaufassade und hohes Ausbaupotential.</p>",
          address: "Schubertring 6, 1010 Wien",
          images: [],
          card_fields: ["wohnflaeche", "kaufpreis", "rendite"],
          details: {
            wohnflaeche: "850 m²",
            nutzflaeche: "980 m²",
            widmung: "Wohngebiet",
            grundflaeche: "450 m²",
            leerstand: false,
            befristungen: "Teilweise befristet",
            unbefristete_vermietung: true,
            bau_potenzial: "Dachgeschossausbau ca. 300 m² möglich",
            balkon_terrassen: "4",
            eigengareten: "0",
            abstellplatz: "2",
            ist_ertrag_netto: "€ 48.000/Jahr",
            soll_ertrag_netto: "€ 62.000/Jahr",
            ist_netto_mietzins: "€ 8,50/m²",
            rendite: "3.2 %",
            baujahr: "1895",
            heizung: "Gas-Etagenheizung",
            zustand: "Gepflegt",
            hwb_fgee: "HWB 124 / fGEE 1.8",
            kaufpreis: "€ 2.450.000",
          },
        },
        {
          title: "Moderne Bürofläche im Linzer Zentrum",
          category: "gewerbe",
          status: "published",
          sort_order: 2,
          description: "Helle, moderne Büroflächen direkt in der Linzer Innenstadt. Flexible Raumaufteilung möglich, hervorragende Verkehrsanbindung.",
          address: "Landstraße 12, 4020 Linz",
          images: [],
          card_fields: ["nutzflaeche", "kaufpreis", "rendite"],
          details: {
            wohnflaeche: "",
            nutzflaeche: "320 m²",
            widmung: "Kerngebiet",
            grundflaeche: "0 m²",
            leerstand: true,
            befristungen: "Bestandsfrei",
            unbefristete_vermietung: false,
            bau_potenzial: "Keines",
            balkon_terrassen: "0",
            eigengareten: "0",
            abstellplatz: "5",
            ist_ertrag_netto: "€ 0/Jahr",
            soll_ertrag_netto: "€ 38.400/Jahr",
            ist_netto_mietzins: "€ 10.00/m²",
            rendite: "5.5 %",
            baujahr: "2012",
            heizung: "Fernwärme",
            zustand: "Sehr gut",
            hwb_fgee: "HWB 48 / fGEE 0.9",
            kaufpreis: "€ 699.000",
          },
        },
      ];

      await PropertySchema.create(mockProperties);
      console.log("Mock properties seeded successfully!");
    }
  } catch (error) {
    console.error("Failed to run property seeder/migration:", error);
  }
};
