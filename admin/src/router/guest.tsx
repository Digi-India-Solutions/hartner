import { RouteObject } from "react-router-dom";

import GuestLayout, { guestLoader } from "@/layouts/Guest";

import ErrorPage from "@/pages/error";
import ForgotPassword from "@/pages/forgot-password";
import Login from "@/pages/login";
import Register from "@/pages/register";
import ResetPassword from "@/pages/reset-password";

const guestRouter: RouteObject = {
  element: <GuestLayout />,
  loader: guestLoader,
  errorElement: <ErrorPage />,
  children: [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Register />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/reset-password",
      element: <ResetPassword />,
    },
  ],
};
export default guestRouter;
