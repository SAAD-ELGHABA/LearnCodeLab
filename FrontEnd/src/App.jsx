import { RouterProvider } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Router from "././route/Router";
import { toast, Toaster } from "sonner";
import { useEffect, useState } from "react";
import axios from "axios";
import { login } from "./redux/action";
import { useDispatch, useSelector } from "react-redux";
import spinner from "./Assets/spinner.gif";
import { groupstagiaire } from "./functions/groupstagiaire";
import { fetchLanguages } from "./functions/getLanguages";

import { io } from "socket.io-client";
import { getMyNotifications } from "./functions/getMyNotifications";
const socket = io("http://localhost:3001");
function App() {
  const token = useSelector((state) => state.userReducer.token);
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  const [process, setProcess] = useState(false);

  useEffect(() => {
    const lang = async () => await fetchLanguages(dispatch);
    lang();

    if (!token) {
      dispatch(login(null, {}));
      groupstagiaire(dispatch);
      setProcess(true);
      return;
    } else {
      groupstagiaire(dispatch);
      const notif = async () => await getMyNotifications(dispatch);
      notif();
    }

    try {
      const fetchUserData = async () => {
        axios.defaults.withCredentials = true;
        axios.defaults.withXSRFToken = true;
        const response = await axios.get("/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response) {
          dispatch(login(token, response.data));
        }
      };
      fetchUserData();
    } catch (error) {
      toast.error(error.message || "Failed to fetch user");
      dispatch(login(null, {}));
    } finally {
      setTimeout(() => {
        setProcess(true);
      }, 3000);
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (!user?.id) return;

    socket.emit("register", user.id);

    const handleNotification = (data) => {
      if (data.user_id === user.id) {
        dispatch({
          type: "ADD_NOTIFICATION",
          payload: data,
        });
        toast.info(`📬 ${data.title}: ${data.message}`);
      }
    };

    socket.on("receive-notification", handleNotification);

    return () => {
      socket.off("receive-notification", handleNotification);
    };
  }, [user]);

  return (
    <>
      {process ? (
        <div className="page-container">
          <RouterProvider router={Router}>
            <Navbar />
          </RouterProvider>
          <Toaster />
        </div>
      ) : (
        <h1 className="w-full text-1xl font-bold text-center h-screen flex items-center justify-center text-slate-700">
          <img src={spinner} alt="spinner" />
        </h1>
      )}
    </>
  );
}

export default App;
