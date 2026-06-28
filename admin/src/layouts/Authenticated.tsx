import { api, useLogoutMutation, useMeQuery } from "@/services/api";
import { useAppDispatch, store } from "@/store/store";
import * as React from "react";
import { Link, Outlet, useNavigate, useRevalidator, useLocation } from "react-router-dom";
import { redirect } from "react-router-dom";
import { 
  LayoutDashboard, 
  User as UserIcon, 
  LogOut, 
  Menu, 
  X, 
  Building 
} from "lucide-react";

export const authLoader = () => {
  const { isAuthenticated } = store.getState().auth;

  if (!isAuthenticated) {
    throw redirect("/login");
  }

  return null;
};

export default function Authenticated() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const location = useLocation();
  const navigation = useNavigate();
  const [logoutUser] = useLogoutMutation();
  const { revalidate } = useRevalidator();
  const dispatch = useAppDispatch();

  // Fetch current user details via RTK Query hook
  const { data: meData } = useMeQuery();
  const user = meData?.data;

  const afterLogout = async () => {
    await revalidate();
    dispatch(api.util.resetApiState());
    navigation("/login");
  };

  const handleLogout = () => {
    logoutUser().finally(afterLogout);
  };

  const navItems = [
    {
      name: "Property Manager",
      path: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "My Profile",
      path: "/profile",
      icon: UserIcon,
    },
  ];

  return (
    <div className="min-h-screen bg-navy-50 flex">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-navy-900 text-white flex-shrink-0 border-r border-navy-800">
        <div className="h-16 flex items-center px-6 border-b border-navy-800 gap-2">
          <Building className="h-6 w-6 text-brand-400" />
          <span className="font-semibold text-lg tracking-wide text-brand-100">
            Haertner CMS
          </span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || 
              (item.path === "/admin" && location.pathname.startsWith("/admin/property"));
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-brand-500 text-white shadow-lg shadow-brand-500/20"
                    : "text-navy-300 hover:bg-navy-800 hover:text-white"
                }`}
              >
                <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-navy-800">
          <button
            onClick={handleLogout}
            className="flex w-full items-center px-4 py-3 rounded-lg text-sm font-medium text-navy-300 hover:bg-red-900/20 hover:text-red-400 transition-all duration-200"
          >
            <LogOut className="mr-3 h-5 w-5 flex-shrink-0" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Sidebar for Mobile (Overlay) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden flex">
          <div
            className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative flex flex-col w-64 bg-navy-900 text-white z-50">
            <div className="h-16 flex items-center justify-between px-6 border-b border-navy-800">
              <div className="flex items-center gap-2">
                <Building className="h-6 w-6 text-brand-400" />
                <span className="font-semibold text-lg text-brand-100">Haertner CMS</span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="text-white hover:text-brand-400">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path || 
                  (item.path === "/admin" && location.pathname.startsWith("/admin/property"));
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-brand-500 text-white"
                        : "text-navy-300 hover:bg-navy-800"
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            <div className="p-4 border-t border-navy-800">
              <button
                onClick={() => {
                  setSidebarOpen(false);
                  handleLogout();
                }}
                className="flex w-full items-center px-4 py-3 rounded-lg text-sm font-medium text-navy-300 hover:bg-red-900/20 hover:text-red-400 transition-all duration-200"
              >
                <LogOut className="mr-3 h-5 w-5 flex-shrink-0" />
                Sign Out
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-navy-100 flex items-center justify-between px-6 z-10 flex-shrink-0">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-navy-600 hover:text-navy-900 md:hidden mr-4 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-bold text-navy-900 tracking-tight">
              {location.pathname.startsWith("/admin/property/new") 
                ? "Add Property" 
                : location.pathname.startsWith("/admin/property") 
                ? "Edit Property" 
                : location.pathname === "/profile"
                ? "User Profile"
                : "Real Estate CMS"}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-sm font-semibold text-navy-900">{user?.name || "Administrator"}</span>
              <span className="text-xs text-navy-400 capitalize">{user?.role || "ADMIN"}</span>
            </div>
            <div className="h-10 w-10 rounded-full bg-brand-100 border border-brand-200 flex items-center justify-center text-brand-700 font-bold uppercase shadow-sm">
              {user?.name ? user.name[0] : "A"}
            </div>
          </div>
        </header>

        {/* Content Outlet */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
