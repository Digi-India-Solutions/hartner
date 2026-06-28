import UserSchema from "./user.schema";

export const ensureDefaultAdminUser = async (): Promise<void> => {
  const hasAnyUser = await UserSchema.exists({});

  if (hasAnyUser) {
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
