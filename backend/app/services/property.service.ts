import { type IProperty } from "@dtos/property.dto";
import PropertySchema from "@models/property.model";

export const createProperty = async (
  data: Omit<IProperty, "_id" | "createdAt" | "updatedAt">
) => {
  const result = await PropertySchema.create(data);
  return result;
};

export const updateProperty = async (id: string, data: Partial<IProperty>) => {
  const result = await PropertySchema.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return result;
};

export const deleteProperty = async (id: string) => {
  const result = await PropertySchema.deleteOne({ _id: id });
  return result;
};

export const getPropertyById = async (id: string) => {
  const result = await PropertySchema.findById(id).lean();
  return result;
};

export const getPropertyBySlug = async (slug: string) => {
  const result = await PropertySchema.findOne({ slug }).lean();
  return result;
};

export const getAllProperties = async (filter: any = {}, options: any = {}) => {
  const result = await PropertySchema.find(filter, null, options).lean();
  return result;
};

export const countProperties = async (filter: any = {}) => {
  return await PropertySchema.countDocuments(filter);
};
export const getNextDisplayOrder = async (): Promise<number> => {
  const last = await PropertySchema.findOne().sort({ sort_order: -1 }).select("sort_order").lean();
  return last ? (last.sort_order + 1) : 1;
};
