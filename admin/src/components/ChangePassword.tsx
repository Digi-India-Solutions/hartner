import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { api, useChangePasswordMutation } from "../services/api";
import { useAppDispatch } from "../store/store";
import { User } from "../types";
import PasswordInput from "./PasswordInput";

const validation = yup.object({
  currentPassword: yup.string().when("$provider", {
    is: (provider: string) => provider === "manual",
    then: (schema) => schema.required("Current password is required"),
    otherwise: (schema) => schema.optional(),
  }),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Minimum 5 chars are required")
    .max(16, "Maximum 16 chars allowed"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

type FormData = typeof validation.__outputType;

type Props = {
  user: User;
};

export default function ChangePassword(props: Props) {
  const dispatch = useAppDispatch();
  const { provider } = props.user;
  const [changePassword] = useChangePasswordMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      confirmPassword: "",
      password: "",
      currentPassword: "",
    },
    context: { provider },
    resolver: yupResolver<FormData, any, any>(validation),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await changePassword(data).unwrap();
      dispatch(api.util.invalidateTags(["ME"]));
      reset();
      toast.success("Password changed successfully!");
    } catch (error: any) {
      const validationError = error?.data?.data?.errors?.[0].msg;
      toast.error(
        validationError ?? error?.data?.message ?? "Something went wrong!"
      );
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-navy-100 p-8 mt-8">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-navy-900">Change Password</h3>
        <p className="text-navy-500 text-sm mt-1">Update your login credentials.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {provider === "manual" && (
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-navy-500">
              Current Password
            </label>
            <input
              type="password"
              placeholder="Current password"
              className={`w-full px-4 py-2.5 bg-navy-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all duration-200 ${
                errors.currentPassword ? "border-red-500" : "border-navy-200"
              }`}
              {...register("currentPassword")}
            />
            {errors.currentPassword && (
              <span className="text-xs text-red-500 mt-1">{errors.currentPassword.message}</span>
            )}
          </div>
        )}

        <PasswordInput
          type="password"
          placeholder="New password"
          label="New password"
          error={errors.password?.message}
          {...register("password")}
        />

        <PasswordInput
          type="password"
          placeholder="Confirm password"
          label="Confirm password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <button
          type="submit"
          disabled={!isValid}
          className="w-full py-3 bg-brand-500 hover:bg-brand-600 disabled:bg-navy-200 text-white font-semibold rounded-lg shadow-lg shadow-brand-500/20 hover:shadow-brand-600/30 active:scale-[0.98] transition-all duration-200 disabled:pointer-events-none disabled:shadow-none mt-2"
        >
          Change Password
        </button>
      </form>
    </div>
  );
}
