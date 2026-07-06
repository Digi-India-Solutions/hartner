import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import LoginPage from "../pages/admin/login/page";
import AdminLayout from "../pages/admin/AdminLayout";
import PropertiesListPage from "../pages/admin/properties/page";
import PropertyEditorPage from "../pages/admin/properties/edit/page";
import DashboardPage from "../pages/admin/dashboard/page";
import SettingsPage from "../pages/admin/settings/page";
import LegalPagesPage from "../pages/admin/pages/page";
import InquiriesListPage from "../pages/admin/inquiries/page";
import { PropertiesProvider } from "../hooks/PropertiesContext";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/admin" replace />,
  },
  {
    path: "/admin/login",
    element: <LoginPage />,
  },
  {
    path: "/admin",
    element: (
      <PropertiesProvider>
        <AdminLayout />
      </PropertiesProvider>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/admin/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "properties",
        element: <PropertiesListPage />,
      },
      {
        path: "inquiries",
        element: <InquiriesListPage />,
      },
      {
        path: "properties/new",
        element: <PropertyEditorPage />,
      },
      {
        path: "properties/edit/:id",
        element: <PropertyEditorPage />,
      },
      {
        path: "pages",
        element: <Navigate to="/admin/pages/impressum" replace />,
      },
      {
        path: "pages/impressum",
        element: <LegalPagesPage />,
      },
      {
        path: "pages/datenschutz",
        element: <LegalPagesPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;