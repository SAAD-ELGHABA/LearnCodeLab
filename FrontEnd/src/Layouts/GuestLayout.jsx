import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

export default function GuestLayout() {
  return (
    <div>
      <Navbar />
      <h1>Welcome to the site!</h1>
      <Outlet />
    </div>
  );
}
