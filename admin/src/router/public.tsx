import { RouteObject } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout";
import Home from "@/pages/homepage";
import PropertyDetails from "@/pages/property-details";
import About from "@/pages/about";
import ErrorPage from "@/pages/error";

const publicRouter: RouteObject = {
  element: <PublicLayout />,
  errorElement: <ErrorPage />,
  children: [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/property/:id",
      element: <PropertyDetails />,
    },
    {
      path: "/about",
      element: <About />,
    },
  ],
};

export default publicRouter;
