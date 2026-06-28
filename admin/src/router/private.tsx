import { RouteObject } from "react-router-dom";
import AuthenticatedLayout, { authLoader } from "@/layouts/Authenticated";
import ErrorPage from "@/pages/error";
import AdminDashboard from "@/pages/admin-dashboard";
import PropertyEditor from "@/pages/property-editor";
import Profile, { profileLoader } from "@/pages/profile";

const privateRouter: RouteObject = {
  element: <AuthenticatedLayout />,
  loader: authLoader,
  errorElement: <ErrorPage />,
  children: [
    {
      path: "/",
      element: <AdminDashboard />,
    },
    {
      path: "/admin",
      element: <AdminDashboard />,
    },
    {
      path: "/admin/property/new",
      element: <PropertyEditor />,
    },
    {
      path: "/admin/property/:id",
      element: <PropertyEditor />,
    },
    {
      path: "/profile",
      loader: profileLoader,
      element: <Profile />,
    },
  ],
};

export default privateRouter;
