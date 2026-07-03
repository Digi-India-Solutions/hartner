import UserSchema from "@models/user.model";

export const ensureDefaultAdminUser = async (): Promise<void> => {
  const hasAdminUser = await UserSchema.exists({ email: "admin@haertner.com" });

  if (hasAdminUser) {
    return;
  }

  await UserSchema.create({
    name: "Admin",
    email: "admin@haertner.com",
    password: "Admin@1234",
    role: "ADMIN",
    active: true,
    provider: "manual",
  });

  console.log("Default admin user seeded: admin@haertner.com / Admin@1234");
};
