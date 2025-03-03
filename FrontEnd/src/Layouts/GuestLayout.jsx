import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import HomePage from "../pages/Home";

export default function GuestLayout() {
  return (
    <div>
      <Navbar />
      <HomePage/>
      <Outlet />
    </div>
  );
}
