import { type IProperty } from "@dtos/property.dto";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
};

const PropertyDetailsSchema = new Schema({
  wohnflaeche: { type: String },
  nutzflaeche: { type: String },
  widmung: { type: String },
  grundflaeche: { type: String },
  leerstand: { type: String, default: "" },
  befristungen: { type: String },
  unbefristete_vermietung: { type: String, default: "" },
  bau_potenzial: { type: String },
  balkon_terrassen: { type: String },
  eigengareten: { type: String },
  abstellplatz: { type: String },
  ist_ertrag_netto: { type: String },
  soll_ertrag_netto: { type: String },
  ist_netto_mietzins: { type: String },
  rendite: { type: String },
  baujahr: { type: String },
  heizung: { type: String },
  zustand: { type: String },
  hwb_fgee: { type: String },
  kaufpreis: { type: String },
  miete_monatlich: { type: String },
}, { _id: false });

const PropertyImageSchema = new Schema({
  id: { type: String, required: true },
  url: { type: String, required: true },
  filename: { type: String },
  sort_order: { type: Number, default: 0 },
}, { _id: false });

const PropertySchema = new Schema<IProperty>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, index: true },
    category: {
      type: String,
      required: true,
      enum: [
        'Gewerbeimmobilien',
        'Investmentimmobilien',
        'Wohnimmobilien',
        'Mietobjekte'
      ]
    },
    address: { type: String, default: "" },
    status: {
      type: String,
      required: true,
      enum: ["published", "offline", "draft"],
      default: "draft",
    },
    sort_order: { type: Number, default: 0, index: true },
    description: { type: String, default: "" },
    images: { type: [PropertyImageSchema], default: [] },
    details: { type: PropertyDetailsSchema, default: {} },
    card_fields: { type: [String], default: [] }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

// Map _id virtual to id automatically on conversion to JSON
PropertySchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  }
});

PropertySchema.pre("validate", function (next) {
  if (this.title && !this.slug) {
    this.slug = slugify(this.title);
  }
  next();
});

export default mongoose.model<IProperty>("property", PropertySchema);
