import { createBrowserRouter } from "react-router-dom";
import Register from "./../pages/Register";
import GuestLayout from "../Layouts/GuestLayout";
import Login from "../pages/Login";
import HomePage from "../pages/Home";
import StagiaireLayout from "../Layouts/StagiaireLayout";
import VerifyAcceessRoutes from "./VerifyRoutes/VerifyAcceessRoutes";
import ForgetPassword from "../pages/ForgetPassword";
import ResetPassword from "../pages/ResetPassword";

const REGISTER = "/register";
const LOGIN = "/login";
const FORGET_PASSWORD = "/forget_password";
const RESET_PASSWORD = "/reset-password";
const Router = createBrowserRouter([
  {
    element: <GuestLayout />,
    children: [
      {
        path: "/",
        index: true,
        element: <HomePage />,
      },
      {
        path: LOGIN,
        element: <Login />,
      },
      {
        path: REGISTER,
        element: <Register />,
      },
      {
        path: FORGET_PASSWORD,
        element: <ForgetPassword />,
      },
      {
        path: RESET_PASSWORD,
        element: <ResetPassword/>,
      },
    ],
  },
  {
    element: (
      <VerifyAcceessRoutes role={"stagiaire"} path={"/"}>
        <StagiaireLayout />
      </VerifyAcceessRoutes>
    ),
    children: [
      {
        path: "/user",
        index: true,
        element: <StagiaireLayout />,
      },
    ],
  },
]);
export default Router;
