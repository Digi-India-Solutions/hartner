export type PropertyStatus = "published" | "offline" | "draft";

export interface IPropertyDetails {
  wohnflaeche?: string;
  nutzflaeche?: string;
  widmung?: string;
  grundflaeche?: string;
  leerstand?: string;
  befristungen?: string;
  unbefristete_vermietung?: string;
  bau_potenzial?: string;
  balkon_terrassen?: string;
  eigengareten?: string;
  abstellplatz?: string;
  ist_ertrag_netto?: string;
  soll_ertrag_netto?: string;
  ist_netto_mietzins?: string;
  rendite?: string;
  baujahr?: string;
  heizung?: string;
  zustand?: string;
  hwb_fgee?: string;
  kaufpreis?: string;
  miete_monatlich?: string;
}

export interface IPropertyImage {
  id: string;
  url: string;
  filename?: string;
  sort_order?: number;
}

export interface IProperty {
  _id?: string;
  id?: string;
  title: string;
  slug: string;
  category:
  | "Gewerbeimmobilien"
  | "Investmentimmobilien"
  | "Wohnimmobilien"
  | "Mietobjekte";
  address?: string;
  status: PropertyStatus;
  sort_order: number;
  description: string;
  images: IPropertyImage[];
  details: IPropertyDetails;
  card_fields: string[];
  created_at?: Date;
  updated_at?: Date;
}
