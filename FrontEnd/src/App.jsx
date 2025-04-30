import { RouterProvider } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Router from "././route/Router";
import { toast, Toaster } from "sonner";
import { useEffect, useState } from "react";
import axios from "axios";
import { login } from "./redux/action";
import { useDispatch, useSelector } from "react-redux";
import spinner from "./Assets/spinner.gif";
function App() {
  const token = useSelector((state) => state.userReducer.token);
  const dispatch = useDispatch();
  const [process, setProcess] = useState(false);
  useEffect(() => {
    if (!token) {
      dispatch(login(null, {}));
      setProcess(true);
      return
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
      toast.error(error);
      dispatch(login(null, {}));
    } finally {
      setTimeout(() => {
        setProcess(true);
      }, 3000);
    }
  }, [token, dispatch]);
  return (
    <>
      {process ? (
        <>
          <RouterProvider router={Router}>
            <Navbar />
          </RouterProvider>
          <Toaster />
        </>
      ) : (
        <h1 className="w-full text-1xl font-bold text-center h-screen flex items-center justify-center text-slate-700">
          <img src={spinner} alt="spinner" />
        </h1>
      )}
    </>
  );
}

export default App;
