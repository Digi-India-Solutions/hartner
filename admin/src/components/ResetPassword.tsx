import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import {
  useResetPasswordMutation,
  useVerfiyInvitationMutation,
} from "../services/api";
import PasswordInput from "./PasswordInput";

const validation = yup.object({
  token: yup.string().required(),
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
  token: string;
  type: "reset-password" | "invite";
};

export default function ResetPassword(props: Props) {
  const navigate = useNavigate();
  const [resetPassword] = useResetPasswordMutation();
  const [verifyPassword] = useVerfiyInvitationMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      confirmPassword: "",
      password: "",
      token: props.token,
    },
    resolver: yupResolver(validation),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const action = props.type === "invite" ? verifyPassword : resetPassword;
      await action(data).unwrap();
      navigate("/login", { replace: true });
      toast.success("Password reset successfully, Please login!");
    } catch (error: any) {
      const validationError = error?.data?.data?.errors?.[0].msg;
      toast.error(
        validationError ?? error?.data?.message ?? "Something went wrong!"
      );
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-navy-100 p-8">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-navy-900">
          {props.type === "invite" ? "Accept Invitation" : "Reset Password"}
        </h2>
        <p className="text-navy-500 mt-1">
          {props.type === "invite" 
            ? "Create a secure password to activate your account." 
            : "Enter a new password below."}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
          {props.type === "invite" ? "Activate Account" : "Change Password"}
        </button>
      </form>
    </div>
  );
}
