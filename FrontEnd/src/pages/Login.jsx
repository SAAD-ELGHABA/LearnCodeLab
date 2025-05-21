import {
  faChevronLeft,
  faEye,
  faEyeSlash,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Background from "./animation/Background";
import "./style.css";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { login } from "../redux/action";

const LoginModal = () => {
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const handleFormData = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const info = {
      email: data.get("email"),
      password: data.get("password"),
      remember: data.get("remember") ? true : false,
    };
    setLoading(true);
    try {
      const toastLoading = toast.loading("wait for it ...");
      const response = await axios.post("/api/login", info, {
        withCredentials: true,
      });
      if (response.status >= 200) {
        toast.dismiss(toastLoading);
        if (response.data.token) {
          toast.success("you logged in successfully", {
            duration: 3000,
            style: {
              backgroundColor: "#101828",
              color: " #60A5FA",
              border: "none",
            },
          });
          localStorage.setItem("token", response.data.token);
          dispatch(login(response.data.token, response.data.user));
          if (response.data.user.role === "admin") {
            nav("/admin");
          } else if (response.data.user.role === "formateur") {
            nav("/formateur");
          } else if (response.data.user.role === "stagiaire") {
            nav("/user");
          } else {
            nav("/");
          }
        } else {
          toast.warning(response.data.data, {
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
        className="bg-gray-800 text-white p-12 rounded-sm shadow-lg  md:w-1/3"
        style={{ zIndex: "99" }}
      >
        <h1 className="text-xl font-bold my-2">Login for Learn Code Lab</h1>
        <form onSubmit={handleFormData}>
          <div className="">
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="your email"
              className="w-full p-2 mb-3 rounded bg-gray-700 text-white focus:outline-none"
            />
          </div>

          <div className=" relative">
            <label className="block text-sm mb-1">Password</label>
            <input
              type={`${!passwordVisible ? "password" : "text"}`}
              name="password"
              placeholder="*******"
              className="w-full p-2 mb-3 rounded bg-gray-700 text-white focus:outline-none"
            />
            <span
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-3 top-8 text-gray-500"
            >
              {passwordVisible ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </span>
          </div>
          <div className="mb-4 flex justify-between">
            <label htmlFor="remember">
              <input
                type="checkbox"
                name="remember"
                id="remember"
                className="me-2"
              />
              remember me
            </label>
            <Link
              id="forget-password"
              className="bg-gradient-to-r from-blue-700 via-bule-400 to-slate-50 text-transparent bg-clip-text"
              to={"/forget_password"}
            >
              forget password
            </Link>
          </div>
          <div className="text-sm text-slate-200 mb-2">
            i don&apos;t have an account{" "}
            <Link className="ms-2 text-blue-400" to={"/register"}>
              let&apos;s create one
            </Link>
          </div>
          <button
            className={`cursor-pointer w-full ${
              loading ? "bg-slate-500 text-slate-800" : "bg-blue-500 text-white"
            }   py-2 rounded hover:${loading ? "" : "bg-blue-600"} transition`}
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
