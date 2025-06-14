import { Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
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
      ) : user && user.email_verified_at && user.role === "formateur" ? (
        <Navigate to={"/formateur"} />
      ) : (
        <div>
          {!hideNavBarInPages.includes(location.pathname) && <Navbar />}
          {/* <ParticlesBackground /> */}
          <Outlet />
          {!hideNavBarInPages.includes(location.pathname) && <Footer />}
        </div>
      )}
    </div>
  );
}
