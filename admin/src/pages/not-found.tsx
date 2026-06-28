import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-navy-50 px-6 py-12">
      <h1 className="text-9xl font-black text-brand-500 tracking-wider">
        404
      </h1>
      <h2 className="text-3xl font-extrabold text-navy-900 mt-4 tracking-tight">
        Page Not Found
      </h2>
      <p className="text-navy-500 mt-2 mb-8 max-w-sm text-lg font-medium">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-8 py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-lg shadow-lg shadow-brand-500/20 hover:shadow-brand-600/30 active:scale-[0.98] transition-all duration-200"
      >
        Go to Homepage
      </Link>
    </div>
  );
}
