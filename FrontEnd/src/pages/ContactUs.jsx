import React, { useState } from "react";
import { FiArrowRight, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import emailjs from 'emailjs-com';
import contactImg from "../Assets/bg1.jpg";
import { toast } from 'sonner';

const ContactUs = ({ isHelpSection = false, selectedTheme, user = {} }) => {
  console.log(user);

  const [formData, setFormData] = useState({
    message: "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.telephone || "",
  });

  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setTouchedFields({ ...touchedFields, [name]: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};
    for (const field in formData) {
      if (!formData[field]) {
        validationErrors[field] = "This field is required";
      }
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});

      const serviceID = "service_jbdhkf7";
      const templateID = "template_f3hfbhx";
      const publicKey = "M7vuX5P4HONvCOLaf";

      emailjs.send(serviceID, templateID, formData, publicKey).then(
        () => {
          toast.success("✅ Request received! LearnCodeLab will respond shortly.");
          localStorage.setItem(
            "submissionMessage",
            "Your request has been sent to LearnCodeLab. We will get back to you as soon as possible."
          );

          setTimeout(() => {
            navigate("/");
          }, 1000);

          setFormData({
            message: "",
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
          });

          setTouchedFields({});
        },
        (err) => {
          console.log("FAILED...", err);
          toast.error("❌ An error occurred. Please try again later.");
        }
      );
    }
  };

  const renderInputIcon = (field) => {
    if (errors[field]) {
      return (
        <FiXCircle className="text-red-500 absolute right-3 top-1/2 transform -translate-y-1/2" />
      );
    } else if (formData[field]) {
      return (
        <FiCheckCircle className="text-green-500 absolute right-3 top-1/2 transform -translate-y-1/2" />
      );
    }
    return null;
  };

  return (
    <div className={`${!isHelpSection && "bg-white"}`}>
    

      {!isHelpSection && (
        <div
          className="h-130 bg-cover bg-center flex flex-col items-center justify-center text-center px-4 mb-20"
          style={{ backgroundImage: `url(${contactImg})` }}
        ></div>
      )}

      <div
        className={`
          flex justify-center px-4 z-20 relative mb-50
          ${!isHelpSection && "-mt-35"}
        `}
      >
        <div
          className={`
            ${!isHelpSection && "bg-white"} rounded w-full max-w-4xl p-8`}
        >
          <p className="mb-8 text-center">
            To better assist you, please fill out the form below.
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6"></div>

            <div>
              <label className="block text-sm mb-1 font-medium">
                Your message*
              </label>
              <div className="relative">
                <textarea
                  name="message"
                  rows="4"
                  className={`w-full border ${
                    errors.message
                      ? "border-blue-500"
                      : formData.message
                      ? "border-green-500"
                      : "border-gray-300"
                  } rounded px-4 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none`}
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleInputChange}
                ></textarea>
                {renderInputIcon("message")}
              </div>
              {errors.message && (
                <p className="text-blue-500 text-sm text-center mt-1">
                  {errors.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-1 font-medium">
                  First name*
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="firstName"
                    className={`w-full border ${
                      errors.firstName
                        ? "border-blue-500"
                        : formData.firstName
                        ? "border-green-500"
                        : "border-gray-300"
                    } rounded px-4 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none`}
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                  {renderInputIcon("firstName")}
                </div>
                {errors.firstName && (
                  <p className="text-blue-500 text-sm text-center mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm mb-1 font-medium">
                  Last name*
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="lastName"
                    className={`w-full border ${
                      errors.lastName
                        ? "border-blue-500"
                        : formData.lastName
                        ? "border-green-500"
                        : "border-gray-300"
                    } rounded px-4 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none`}
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                  {renderInputIcon("lastName")}
                </div>
                {errors.lastName && (
                  <p className="text-blue-500 text-sm text-center mt-1">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-1 font-medium">
                  Email*
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    className={`w-full border ${
                      errors.email
                        ? "border-blue-500"
                        : formData.email
                        ? "border-green-500"
                        : "border-gray-300"
                    } rounded px-4 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none`}
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {renderInputIcon("email")}
                </div>
                {errors.email && (
                  <p className="text-blue-500 text-sm text-center mt-1">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1 font-medium">
                Phone number*
              </label>
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  placeholder="+212 6 12 34 56 78"
                  className={`w-full border ${
                    errors.phone
                      ? "border-blue-500"
                      : formData.phone
                      ? "border-green-500"
                      : "border-gray-300"
                  } rounded px-4 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none`}
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                {renderInputIcon("phone")}
              </div>
              {errors.phone && (
                <p className="text-blue-500 text-sm text-center mt-1">
                  {errors.phone}
                </p>
              )}
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 px-6 py-2 rounded flex items-center hover:bg-blue-600 transition-all duration-200 cursor-pointer text-white"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
