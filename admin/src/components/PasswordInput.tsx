import { Eye, EyeOff } from "lucide-react";
import { ComponentProps, forwardRef, useState } from "react";

type Props = ComponentProps<"input"> & {
  label: string;
  error?: string;
};

const PasswordInput = forwardRef<HTMLInputElement, Props>(
  ({ label, error, className = "", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => setShowPassword(!showPassword);

    return (
      <div className="w-full flex flex-col gap-1.5">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold uppercase tracking-wider text-navy-500">
            {label}
          </label>
        </div>
        <div className="relative">
          <input
            ref={ref}
            {...props}
            type={showPassword ? "text" : "password"}
            className={`w-full px-4 py-3.5 bg-navy-50 border rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all duration-200 ${
              error ? "border-red-500" : "border-navy-200"
            } ${className}`}
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-navy-400 hover:text-navy-600 focus:outline-none"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
