import mongoose from "mongoose";
import { type IProperty } from "@dtos/property.dto";

const Schema = mongoose.Schema;

export interface IInquiry extends mongoose.Document {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message?: string;
  property?: mongoose.Types.ObjectId | IProperty;
  created_at: Date;
  updated_at: Date;
}

const InquirySchema = new Schema<IInquiry>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, default: "" },
    property: { type: mongoose.Schema.Types.ObjectId, ref: "property", required: false },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

// Map _id virtual to id automatically on conversion to JSON
InquirySchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  }
});

export default mongoose.model<IInquiry>("inquiry", InquirySchema);
