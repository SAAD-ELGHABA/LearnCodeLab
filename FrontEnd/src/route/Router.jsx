import { createBrowserRouter } from "react-router-dom";
import Register from "./../pages/Register";
import GuestLayout from "../Layouts/GuestLayout";
import Login from "../pages/Login";
import HomePage from "../pages/Home";
import ContactUs from '../pages/ContactUs';
import About from "../pages/About";
import Blog from "../pages/Blog";
import ThankYou from '../pages/ThankYou';
import BlockedPage from "../pages/Block";
import StagiaireLayout from "../Layouts/StagiaireLayout";
import VerifyAcceessRoutes from "./VerifyRoutes/VerifyAcceessRoutes";
import ForgetPassword from "../pages/ForgetPassword";
import ResetPassword from "../pages/ResetPassword";
import FormateurLayout from "../Layouts/FormateurLayout";
import AdminGreeting from "../pages/AdminGreeting";
import Home from "../Layouts/userpages/Home";
import Settings from "../Layouts/userpages/Settings";
import Saves from "../Layouts/userpages/Saves";
import Groups from "../Layouts/userpages/Groups";
import Languages from "../Layouts/userpages/Languages";
import Resources from "../Layouts/userpages/Resources";
import Help from "../Layouts/userpages/Help";
import VerifyEmail from "../pages/VerifyEmail";
import ResendVerification from "../pages/ResendVerification";
import Add from "../Layouts/userpages/Addcollection/Add";
import DetailsCollection from "../Layouts/userpages/collection/DetailsCollection";

const REGISTER = "/register";
const LOGIN = "/login";
const FORGET_PASSWORD = "/forget_password";
const RESET_PASSWORD = "/reset-password";

const SETTINGS = "/settings";
const SAVES = "/saves";
const GROUPS = "/groups";
const LANGUAGES = "/languages";
const RESOURCES = "/resources";
const HELP = "/help";
const ADD = "/Add1";

const VERIFY_EMAIL = "/verify-email/:id/:hash";
const RESEND_VERIFICATION_EMAIL = "/resend_verification_email";
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
        element: <ResetPassword />,
      },
      {
        path: '/ContactUs',
        element: <ContactUs />,
      },
      {
        path: '/About',
        element: <About />,
      },
      {
        path: '/Blog',
        element: <Blog />,
      },
      {
        path: '/thank-you',
        element: <ThankYou />,
      },
      {
        path: "/block",
        element: <BlockedPage />,
      },
    ],
  },
  {
    path: VERIFY_EMAIL,
    element: <VerifyEmail />,
  },
  {
    path: RESEND_VERIFICATION_EMAIL,
    element: <ResendVerification />,
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
        element: <Home />,
      },
      {
        path: SETTINGS,
        element: <Settings />,
      },
      {
        path: SAVES,
        element: <Saves />,
      },
      {
        path: GROUPS,
        element: <Groups />,
      },
      {
        path: LANGUAGES,
        element: <Languages />,
      },
      {
        path: RESOURCES,
        element: <Resources />,
      },
      {
        path: HELP,
        element: <Help />,
      },
      {
        path: ADD,
        element: <Add />,
      },
      {
        path: "/collection/details/:user/:slug",
        element: <DetailsCollection />,
      },
    ],
  },
  {
    element: (
      <VerifyAcceessRoutes role={"formateur"} path={"/"}>
        <FormateurLayout />
      </VerifyAcceessRoutes>
    ),
    children: [
      {
        path: "/formateur",
        index: true,
        element: <Home />,
      },
      {
        path:"/formateur-groups",
        element: <Groups formateur={true}/>,
      }
    ],
  },
  {
    element: (
      <VerifyAcceessRoutes role={"admin"} path={"/"}>
        <AdminGreeting />
      </VerifyAcceessRoutes>
    ),
    children: [
      {
        path: "/admin",
        index: true,
        element: <AdminGreeting />,
      },
    ],
  },
]);
export default Router;
