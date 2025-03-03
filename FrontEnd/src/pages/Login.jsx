import { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-white text-xl font-semibold text-center mb-4">
          Sign up for Learn Code Lab
        </h2>
        <p className="text-gray-400 text-center text-sm mb-6">
          Learn Code Lab is free to use. Sign up using your edu-mail address
          below to get started.
        </p>
        <form>
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
            placeholder="6 digits"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 mb-3 rounded bg-gray-700 text-white focus:outline-none"
          />
          <div className="flex items-center mb-3">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-gray-400 text-sm">
              I agree to the{" "}
              <a href="#" className="text-blue-400">
                terms and conditions
              </a>
            </span>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              name="receiveAlerts"
              checked={formData.receiveAlerts}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-gray-400 text-sm">
              Send me the latest deal alerts
            </span>
          </div>
          <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
            Create account
          </button>
        </form>
      </div>
    </div>
  );
}
