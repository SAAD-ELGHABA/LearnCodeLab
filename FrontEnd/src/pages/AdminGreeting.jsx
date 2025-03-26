import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/action";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";


function AdminGreeting() {
  const token = useSelector((state) => state.userReducer.token);
  const redirectAdmin = () => {
    if (!token) return;
    window.open(
      `http://127.0.0.1:8000/set-token?token=${encodeURIComponent(token)}`,
      "_blank"
    );
    // window.open(`http://127.0.0.1:8000/set-token?token=${token}`, "_blank");
  };
  const nav = useNavigate();
  const dispatch = useDispatch();
  const handleLogOut = async () => {
    if (confirm("log out !")) {
      const response = await axios.post(
        "/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status >= 200) {
        dispatch(logout());
        nav("/");
      }
    }
  };
  return (
    <div className="flex text-white justify-center items-center h-screen bg-gray-900">
      <button
        className="absolute top-5 end-10 text-xl cursor-pointer"
        onClick={handleLogOut}
      >
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
      </button>
      <button
        onClick={redirectAdmin}
        className="cursor-pointer hover:text-blue-500 hover:border-blue-500 text-sm border border-blue-400 text-blue-400 rounded px-4 py-2"
      >
        go to the dashboard admin
      </button>
    </div>
  );
}

export default AdminGreeting;
