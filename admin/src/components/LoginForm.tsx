import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useLoginMutation } from "../services/api";
import { setTokens } from "../store/reducers/authReducer";
import { useAppDispatch } from "../store/store";
import AppleLogin from "./AppleLogin";
import FBLogin from "./FBLogin";
import GoogleLogin from "./GoogleLogin";
import LinkedInLogin from "./LinkedInLogin";
import PasswordInput from "./PasswordInput";

const validation = yup.object({
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Minimum 5 chars are required")
    .max(16, "Maximum 16 chars allowed"),
});

type FormData = typeof validation.__outputType;

export default function LoginForm() {
  const [loginUser] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(validation),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const result = await loginUser(data).unwrap();

      console.log("Login Response:", result);

      const token = result.data.accessToken;
      const refreshToken = result.data.refreshToken;
      const user = result.data.user;

      // Save token
      localStorage.setItem("admin_token", token);

      // Optional (keep these if the rest of your app expects them)
      localStorage.setItem("access_token", token);
      localStorage.setItem("refresh_token", refreshToken);

      // Save user
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      // Update Redux
      dispatch(
        setTokens({
          accessToken: token,
          refreshToken: refreshToken,
        })
      );

    toast.success("User logged in successfully!");
    navigate("/", { replace: true });
  } catch (error: any) {
    console.error(error);

    const message =
      error?.data?.message ||
      error?.data?.error?.message ||
      error?.error?.message ||
      error?.message ||
      "Unable to sign in right now.";

    toast.error(message);
  }
};

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-navy-50 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-navy-100 p-10 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold text-navy-900 tracking-tight">
            Welcome Back!
          </h1>
          <p className="text-navy-500 mt-2">Sign in to continue to Haertner CMS.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-navy-500">
              Email
            </label>
            <input
              type="text"
              placeholder="Email"
              className={`w-full px-4 py-3.5 bg-navy-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all duration-200 ${
                errors.email ? "border-red-500" : "border-navy-200"
              }`}
              {...register("email")}
            />
            {errors.email && (
              <span className="text-xs text-red-500 mt-1">{errors.email.message}</span>
            )}
          </div>

          <PasswordInput
            label="Password"
            placeholder="Password"
            error={errors.password?.message}
            {...register("password")}
          />

          <button
            type="submit"
            disabled={!isValid}
            className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 disabled:bg-navy-200 text-white font-semibold rounded-lg shadow-lg shadow-brand-500/20 hover:shadow-brand-600/30 active:scale-[0.98] transition-all duration-200 disabled:pointer-events-none disabled:shadow-none mt-2"
          >
            Log in
          </button>
        </form>

        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-navy-100"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-4 text-navy-400">Or connect with</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mb-10">
          <AppleLogin />
          <GoogleLogin />
          <LinkedInLogin />
          <FBLogin />
        </div>

        <div className="text-center space-y-2 text-sm">
          <p className="text-navy-600">
            Don't have an account?{" "}
            <NavLink to="/signup" className="text-brand-600 hover:text-brand-700 font-semibold underline transition-colors">
              Sign up
            </NavLink>
          </p>
          <p>
            <NavLink to="/forgot-password" className="text-navy-400 hover:text-navy-600 font-medium transition-colors">
              Forgot password?
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
