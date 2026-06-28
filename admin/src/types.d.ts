declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

export type ProviderType = "google" | "manual" | "facebook" | "apple" | "linkedin";

export interface User {
  _id: string;
  name: string;
  email: string;
  active?: boolean;
  role: "USER" | "ADMIN";
  blocked?: boolean;
  blockReason?: string;
  provider: ProviderType;
  facebookId?: string;
  image?: string;
  linkedinId?: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export type PropertyStatus = "published" | "offline" | "draft";

export interface IPropertyDetails {
  wohnflaeche?: string;
  nutzflaeche?: string;
  widmung?: string;
  grundflaeche?: string;
  leerstand?: boolean;
  befristungen?: string;
  unbefristete_vermietung?: boolean;
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
  id?: string;
  _id?: string;
  title: string;
  slug: string;
  category: "zinshaus" | "gewerbe" | "haus_wohnen" | "mietobjekte";
  address?: string;
  status: PropertyStatus;
  sort_order: number;
  description: string;
  images: IPropertyImage[];
  details: IPropertyDetails;
  card_fields: string[];
  created_at?: string;
  updated_at?: string;
}

export interface IPage {
  slug: string;
  content: string;
  updated_at?: string;
}
