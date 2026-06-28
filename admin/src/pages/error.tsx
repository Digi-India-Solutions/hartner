import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";
import { AlertCircle } from "lucide-react";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  let title = "Something went wrong";
  let message = "An unexpected error occurred.";

  if (isRouteErrorResponse(error)) {
    title = `Error ${error.status}`;
    message = error.statusText || message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-50 px-6 py-12">
      <div className="max-w-md w-full flex flex-col items-center">
        <div className="w-full bg-red-50 border border-red-200 rounded-xl p-6 mb-8 flex gap-4">
          <AlertCircle className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-lg font-bold text-red-800">{title}</h3>
            <p className="text-sm text-red-600 mt-1 font-medium">{message}</p>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-lg shadow-sm transition-all duration-200 active:scale-[0.98]"
          >
            Go Home
          </button>
          <button
            onClick={() => navigate(0)}
            className="px-6 py-2.5 bg-white border border-navy-200 hover:border-brand-500 text-navy-700 hover:text-navy-900 font-semibold rounded-lg shadow-sm transition-all duration-200 active:scale-[0.98]"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );
}
