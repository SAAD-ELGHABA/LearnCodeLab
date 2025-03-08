import { RouterProvider } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Router from "././route/Router";
import { toast, Toaster } from "sonner";
import { useEffect } from "react";
import axios from "axios";
import { login } from "./redux/action";
import { useDispatch, useSelector } from "react-redux";
function App() {
  const token = useSelector((state) => state.userReducer.token);
  const dispatch = useDispatch();
  useEffect(() => {
    try
    {
      const fetchUserData = async () => {
        const response = await axios.get("/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if(response){
          dispatch(login(token, response.data));
        }
      };
      fetchUserData();
    }catch(error){
      toast.error(error);
    }

  }, [token, dispatch]);
  return (
    <>
      <RouterProvider router={Router}>
        <Navbar />
      </RouterProvider>
      <Toaster />
    </>
  );
}

export default App;
