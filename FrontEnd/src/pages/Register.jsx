import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Toaster, toast } from "sonner";
import Background from "./animation/Background";
export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    group: "",
    agreeTerms: false,
    receiveAlerts: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const [loading, setLoading] = useState(false);
  const sendData = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const toastLoading = toast.loading("wait for it ...");
      const response = await axios.post("/api/register", formData);
      if (response.status >= 200) {
        toast.dismiss(toastLoading);
        if (response.data.token) {
          toast.success("you logged in successfully👌", {
            duration: 3000,
            style: {
              backgroundColor: "#1F2937",
              color: "rgb(0, 182, 0)",
              border: "none",
            },
          });
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
        console.log(response.data);
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
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <Background />
      <Link
        to={"/"}
        className="fixed top-5 left-5 text-white hover:text-blue-400 cursor-pointer"
      >
        <FontAwesomeIcon icon={faChevronLeft} className="me-2" />
        get back
      </Link>
      <div
        className="bg-gray-800 p-6 rounded-lg shadow-lg w-1/3 "
        style={{ zIndex: "999" }}
      >
        <h2 className="text-white text-xl font-semibold text-center mb-4">
          Sign up for Learn Code Lab
        </h2>
        <p className="text-gray-400 text-center text-sm mb-6">
          Learn Code Lab is free to use. Sign up using your edu-mail address
          below to get started.
        </p>
        <form onSubmit={sendData}>
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-2 mb-3 rounded bg-gray-700 text-white focus:outline-none"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-2 mb-3 rounded bg-gray-700 text-white focus:outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="mail@mail.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 mb-3 rounded bg-gray-700 text-white focus:outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="password(6 digits)"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 mb-3 rounded bg-gray-700 text-white focus:outline-none"
          />
          <input
            type="group"
            name="group"
            placeholder="group"
            value={formData.group}
            onChange={handleChange}
            className="w-full p-2 mb-3 rounded bg-gray-700 text-white focus:outline-none"
          />
          <div className="text-sm text-slate-200 mb-2">
            i have already an account{" "}
            <Link to={"/login"} className="text-blue-400 ms-2">
              {" "}
              get it
            </Link>
          </div>
          <button
            disabled={loading ? true : false}
            className={`cursor-pointer w-full ${
              loading ? "bg-slate-500 text-slate-800" : "bg-blue-500 text-white"
            }   py-2 rounded hover:${loading ? "" : "bg-blue-600"} transition`}
          >
            Create account
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
}
