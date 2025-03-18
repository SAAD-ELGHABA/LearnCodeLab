import { Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { useSelector } from "react-redux";

export default function GuestLayout() {
  const location = useLocation();
  const hideNavBarInPages = [
    "/login",
    "/register",
    "/forget_password",
    "/reset-password",
  ];
  const user = useSelector((state) => state.userReducer.user);

  return (
    <div className="bg-gradient-to-r from-[#0E1C2D] to-[#0f2036]">
      {user && user.email_verified_at && user.role === "stagiaire" ? (
        <Navigate to={"/user"} />
      ) : (
        <div>
          {!hideNavBarInPages.includes(location.pathname) && <Navbar />}
          {/* <ParticlesBackground /> */}
          <Outlet />
        </div>
      )}
    </div>
  );
}
