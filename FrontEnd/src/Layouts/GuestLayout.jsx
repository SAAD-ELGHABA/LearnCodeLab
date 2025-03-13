import { Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { useSelector } from "react-redux";

export default function GuestLayout() {
  const location = useLocation();
  const hideNavBarInPages = ["/login", "/register", "/forget_password","/reset-password"];
  const user = useSelector((state) => state.userReducer.user);

  return (
    <>
      {user && user.role === 'stagiaire' ? (
        <Navigate to={"/user"} />
      ) : (
        <div>
          {!hideNavBarInPages.includes(location.pathname) && <Navbar />}
          <Outlet />
        </div>
      )}
    </>
  );
}
