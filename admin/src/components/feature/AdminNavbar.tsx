import { Link, useLocation } from 'react-router-dom';

export function AdminNavbar() {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="w-full px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link
              to="/admin/properties"
              className="text-lg font-bold text-gray-900 tracking-tight cursor-pointer whitespace-nowrap"
            >
              Haertner Immobilien
            </Link>
            <div className="hidden md:flex items-center gap-1">
              <Link
                to="/admin/properties"
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  location.pathname.startsWith('/admin/properties')
                    ? 'bg-accent-50 text-accent-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Immobilien
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-full bg-accent-100 flex items-center justify-center cursor-pointer">
              <span className="text-sm font-semibold text-accent-700">AH</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}