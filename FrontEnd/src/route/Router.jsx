import { createBrowserRouter } from "react-router-dom";
import Login from "./../pages/Login";
import GuestLayout from "../Layouts/GuestLayout";

const LOGIN = "/login";
const Router = createBrowserRouter([
    {
        path:'/',
        element:<GuestLayout/>
    }
    ,
  {
    path: LOGIN,
    element: <Login />,
  },
]);
export default Router;
