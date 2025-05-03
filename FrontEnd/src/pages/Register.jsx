import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import Background from "./animation/Background";
import { useSelector } from "react-redux";

export default function Register() {
  const groupsStagiaireReducer = useSelector((state) => state.groupsStagiaireReducer);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    group: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validation function
  const validate = () => {
    let tempErrors = {};
    if (!formData.firstName) tempErrors.firstName = "First name is required!";
    if (!formData.lastName) tempErrors.lastName = "Last name is required!";
    if (!formData.email) tempErrors.email = "Email is required!";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      tempErrors.email = "Invalid email format!";
    if (!formData.password) tempErrors.password = "Password is required!";
    else if (formData.password.length < 6)
      tempErrors.password = "Password must be at least 6 characters!";
    if (!formData.group) tempErrors.group = "Group is required!";
    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  // Handle form submission
  const sendData = async (e) => {
    e.preventDefault();
    console.log(formData)
    if (!validate()) return; // Stop if validation fails

    setLoading(true);
    try {
      const toastLoading = toast.loading("Wait for it...");
      const response = await axios.post("/api/register", formData);

      toast.dismiss(toastLoading);
      if (response.status >= 200) {
        nav("/resend_verification_email");
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message, {
          duration: 4000,
          style: { backgroundColor: "#1e2939", color: "rgb(0, 182, 0)" },
        });
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Registration failed.", {
        duration: 3000,
        style: { backgroundColor: "#1e2939", color: "white" },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <Background />
      <Link to="/" className="fixed top-5 left-5 text-white hover:text-blue-400 cursor-pointer">
        <FontAwesomeIcon icon={faChevronLeft} className="me-2" /> Get back
      </Link>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-1/3" style={{ zIndex: "999" }}>
        <h2 className="text-white text-xl font-semibold text-center mb-4">
          Sign up for Learn Code Lab
        </h2>
        <p className="text-gray-400 text-center text-sm mb-6">
          Learn Code Lab is free to use. Sign up using your edu-mail address below to get started.
        </p>

        <form onSubmit={sendData}>
          <div>
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-2 mb-1 rounded bg-gray-700 text-white focus:outline-none"
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
          </div>

          <div>
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-2 mb-1 rounded bg-gray-700 text-white focus:outline-none"
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="mail@mail.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 mb-1 rounded bg-gray-700 text-white focus:outline-none"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password (6 characters min)"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 mb-1 rounded bg-gray-700 text-white focus:outline-none"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <div>
            <select 
              id=""
              className="w-full p-2 mb-1 rounded bg-gray-700 border border-gray-500 text-white focus:outline-none"
              onChange={handleChange}
              name="group"
            >
              <option value="">select your group</option>
              { 
                groupsStagiaireReducer.map((grpstg)=>
                  <option key={grpstg.id} value={String(grpstg.id)} className="text-white">
                    {grpstg.name}
                  </option>
                )
              }
            </select>
            {errors.group && <p className="text-red-500 text-sm">{errors.group}</p>}
          </div>

          <div className="text-sm text-slate-200 mb-2">
            I already have an account{" "}
            <Link to="/login" className="text-blue-400 ms-2">
              Get it
            </Link>
          </div>

          <button
            disabled={loading}
            className={`cursor-pointer w-full ${
              loading ? "bg-slate-500 text-slate-800" : "bg-blue-500 text-white"
            } py-2 rounded hover:${loading ? "" : "bg-blue-600"} transition`}
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
}
