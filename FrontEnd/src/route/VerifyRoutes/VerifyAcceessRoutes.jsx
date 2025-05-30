import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function VerifyAcceessRoutes({ children, role = undefined, path }) {
  const token = useSelector((state) => state.userReducer.token);
  const user = useSelector((state) => state.userReducer.user);
  const userRole = useSelector((state) =>
    user ? state.userReducer.user.role : null
  );
  return user &&
    user.email_verified_at &&
    (userRole === role || userRole === "formateur" || userRole === "admin") ? (
    children
  ) : (
    <Navigate to={path} />
  );
}

export default VerifyAcceessRoutes;
