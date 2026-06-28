import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useForgotPasswordMutation } from "../services/api";

const validation = yup.object({
  email: yup.string().email("Email is invalid").required("Email is required"),
});

type FormData = typeof validation.__outputType;

export default function ForgotPassword() {
  const [forgotPassword] = useForgotPasswordMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(validation),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await forgotPassword(data).unwrap();
      toast.success("Email sent successfully!");
      reset();
    } catch (error: any) {
      const validationError = error?.data?.data?.errors?.[0].msg;
      toast.error(
        validationError ?? error?.data?.message ?? "Something went wrong!"
      );
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-navy-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-navy-100 p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-navy-900 tracking-tight">
            Forgot Password
          </h1>
          <p className="text-navy-500 mt-2">
            Enter your email address and we'll send you a recovery link.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-navy-500">
              Email Address
            </label>
            <input
              type="text"
              placeholder="Email"
              className={`w-full px-4 py-2.5 bg-navy-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all duration-200 ${
                errors.email ? "border-red-500" : "border-navy-200"
              }`}
              {...register("email")}
            />
            {errors.email && (
              <span className="text-xs text-red-500 mt-1">{errors.email.message}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className="w-full py-3 bg-brand-500 hover:bg-brand-600 disabled:bg-navy-200 text-white font-semibold rounded-lg shadow-lg shadow-brand-500/20 hover:shadow-brand-600/30 active:scale-[0.98] transition-all duration-200 disabled:pointer-events-none disabled:shadow-none mt-2"
          >
            Send Password Reset Link
          </button>
        </form>

        <div className="text-center mt-8 text-sm">
          <NavLink to="/login" className="text-brand-600 hover:text-brand-700 font-semibold underline transition-colors">
            Back to Sign In
          </NavLink>
        </div>
      </div>
    </div>
  );
}
