import {
  faChevronLeft,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Background from "./animation/Background";
import "./style.css";
import axios from "axios";
import { toast } from "sonner";

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleFormData = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const info = {
      email: data.get("email"),
    };
    setLoading(true);
    try {
      const toastLoading = toast.loading("wait for it ...");
      const response = await axios.post("/api/forgot-password", info);
      if (response.status >= 200) {
        toast.dismiss(toastLoading);
        if (response) {
          toast.success(response.data.message, {
            duration: 5000,
            description:(
              <span className="text-white">
                go to your email and check fo our message then reset your password
              </span>
            ),
            style: {
              backgroundColor: "#1F2937",
              color: "rgb(0, 182, 0)",
              border: "none",
            },
          });
        } else {
          toast.warning(response.data, {
            duration: 3000,
            style: {
              backgroundColor: "#1F2937",
              color: "yellow",
              border: "none",
            },
          });
        }
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response.data.message, {
        duration: 3000,
        icon: (
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            className="text-red-600"
          />
        ),
        style: {
          backgroundColor: "#1F2937",
          color: "white",
          border: "none",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <Background />
      <Link
        to={"/"}
        className="fixed top-5 left-5 text-white hover:text-blue-400 cursor-pointer"
      >
        <FontAwesomeIcon icon={faChevronLeft} className="me-2" />
        Get back
      </Link>
      <div
        className="bg-gray-800 text-white p-12 rounded-sm shadow-lg w-1/3 "
        style={{ zIndex: "99" }}
      >
        <h1 className="text-xl font-bold my-2 text-center">Forget Password 
           <span className="text-slate-500 text-sm font-medium block">
            enter your email to send you a confirm email
            </span>
          </h1>
        <form onSubmit={handleFormData}>
          <div className="py-2 ">
            <label className="block text-sm mb-1">Email</label>
            <div></div>
            <input
              type="email"
              name="email"
              placeholder="your email"
              className="w-full p-2 mb-3 rounded bg-gray-700 focus:outline-none "
            />
          </div>

          <button
            className={`cursor-pointer w-full ${
              loading ? "bg-slate-500 text-slate-800" : "bg-blue-500 text-white"
            }   py-2 rounded hover:${loading ? "" : "bg-blue-600"} transition`}
          >
            Send Reset Password
          </button>
          <div className="text-center w-full mt-3"> 
          <Link
            to={"/login"}
            className="cursor-pointer text-blue-400 text-sm hover:text-blue-500"
          >
            Go Back To Login
          </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
