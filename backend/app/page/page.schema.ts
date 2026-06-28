import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface IPage {
  slug: string;
  content: string;
  updated_at?: Date;
}

const PageSchema = new Schema<IPage>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    content: { type: String, required: true },
  },
  {
    timestamps: { createdAt: false, updatedAt: "updated_at" },
  }
);

// Map _id virtual to id automatically on conversion to JSON
PageSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  }
});

export default mongoose.model<IPage>("page", PageSchema);
export { type IPage };
