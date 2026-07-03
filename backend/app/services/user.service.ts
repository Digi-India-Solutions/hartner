import { ProjectionType, QueryOptions } from "mongoose";
import { type IUser } from "./user.dto";
import UserSchema from "./user.schema";

const applySensitiveSelect = (
  query: ReturnType<typeof UserSchema.findOne>,
  projection?: ProjectionType<IUser>
) => {
  const projectionObj = projection as Record<string, unknown> | undefined;
  const sensitiveFields = ["password", "refreshToken", "facebookId"] as const;
  const neededFields = sensitiveFields.filter((field) => projectionObj?.[field] === true || projectionObj?.[field] === 1);

  if (neededFields.length === 0) {
    return query;
  }

  return query.select(neededFields.map((field) => `+${field}`).join(" "));
};

export const createUser = async (
  data: Omit<IUser, "_id" | "createdAt" | "updatedAt">
) => {
  const result = await UserSchema.create(data);
  const { refreshToken, password, ...user } = result.toJSON();
  return user;
};

export const updateUser = async (id: string, data: IUser) => {
  const result = await UserSchema.findOneAndUpdate({ _id: id }, data, {
    new: true,
    select: "-password -refreshToken -facebookId",
  });
  return result;
};

export const editUser = async (id: string, data: Partial<IUser>) => {
  const result = await UserSchema.findOneAndUpdate({ _id: id }, data, {
    new: true,
    select: "-password -refreshToken -facebookId",
  });
  return result;
};

export const deleteUser = async (id: string) => {
  const result = await UserSchema.deleteOne(
    { _id: id },
    { select: "-password -refreshToken -facebookId" }
  );
  return result;
};

export const getUserById = async (
  id: string,
  projection?: ProjectionType<IUser>
) => {
  const query = UserSchema.findById(id, projection);
  const result = await applySensitiveSelect(query, projection).lean();
  return result;
};

export const getAllUser = async (
  projection?: ProjectionType<IUser>,
  options?: QueryOptions<IUser>
) => {
  const result = await UserSchema.find({}, projection, options).lean();
  return result;
};
export const getUserByEmail = async (
  email: string,
  projection?: ProjectionType<IUser>
) => {
  const query = UserSchema.findOne({ email }, projection);
  const result = await applySensitiveSelect(query, projection).lean();
  return result;
};

export const countItems = () => {
  return UserSchema.count();
};
