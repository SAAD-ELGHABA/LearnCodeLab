import React, { useState } from "react";
import { FiArrowRight, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { useNavigate } from "react-router-dom";
// import emailjs from 'emailjs-com';
import contactImg from '../Assets/bg1.jpg';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    profile: "",
    request: "",
    message: "",
    firstName: "",
    lastName: "",
    postalCode: "",
    email: "",
    phone: "",
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

      const serviceID = 'service_gzy4me4';   
      const templateID = 'template_f3hfbhx';
      const publicKey = 'L8q2xx3TM2zG5WSRY';

      emailjs.send(serviceID, templateID, formData, publicKey)
        .then(() => {
          alert("✅ Got it! Your request is being processed by LearnCodeLab.");
          localStorage.setItem('submissionMessage', 'Your request has been sent to LocaTech. We will get back to you as soon as possible.');

          setTimeout(() => {
            navigate('/');
          }, 1000);

          setFormData({
            profile: "",
            request: "",
            message: "",
            firstName: "",
            lastName: "",
            postalCode: "",
            email: "",
            phone: "",
          });
          setTouchedFields({});
        }, (err) => {
          console.log('FAILED...', err);
          alert("❌ An error occurred. Please try again.");
        });
    }
  };

  const renderInputIcon = (field) => {
    if (errors[field]) {
      return <FiXCircle className="text-red-500 absolute right-3 top-1/2 transform -translate-y-1/2" />;
    } else if (formData[field]) {
      return <FiCheckCircle className="text-green-500 absolute right-3 top-1/2 transform -translate-y-1/2" />;
    }
    return null;
  };

  return (
    <div className="bg-white">
      <div className="h-130 bg-cover bg-center flex flex-col items-center justify-center text-white text-center px-4 mb-20" style={{ backgroundImage: `url(${contactImg})` }}></div>

      <div className="flex justify-center -mt-35 px-4 z-20 relative mb-50">
        <div className="bg-white shadow-lg rounded w-full max-w-4xl p-8">
          <p className="mb-8 text-center text-gray-700">
            To better assist you, please fill out the form below.
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Profile & Request */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Profile */}
              <div>
                <label className="block text-sm mb-1 font-medium">You are*</label>
                <div className="relative">
                  <select
                    name="profile"
                    className={`w-full border ${errors.profile ? 'border-red-500' : formData.profile ? 'border-green-500' : 'border-gray-300'} rounded px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none`}
                    value={formData.profile}
                    onChange={handleInputChange}
                  >
                    <option value="">Select your profile</option>
                    <option value="Individual">Individual</option>
                    <option value="Professional">Professional</option>
                  </select>
                  {renderInputIcon('profile')}
                </div>
                {errors.profile && <p className="text-red-500 text-sm text-center mt-1">{errors.profile}</p>}
              </div>

              {/* Request */}
              <div>
                <label className="block text-sm mb-1 font-medium">You want to*</label>
                <div className="relative">
                  <select
                    name="request"
                    className={`w-full border ${errors.request ? 'border-red-500' : formData.request ? 'border-green-500' : 'border-gray-300'} rounded px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none`}
                    value={formData.request}
                    onChange={handleInputChange}
                  >
                    <option value="">Select your request</option>
                    <option value="Buy property">Buy property</option>
                    <option value="Rent property">Rent property</option>
                    <option value="Ask a question">Ask a question</option>
                  </select>
                  {renderInputIcon('request')}
                </div>
                {errors.request && <p className="text-red-500 text-sm text-center mt-1">{errors.request}</p>}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm mb-1 font-medium">Your message*</label>
              <div className="relative">
                <textarea
                  name="message"
                  rows="4"
                  className={`w-full border ${errors.message ? 'border-red-500' : formData.message ? 'border-green-500' : 'border-gray-300'} rounded px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none`}
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleInputChange}
                ></textarea>
                {renderInputIcon('message')}
              </div>
              {errors.message && <p className="text-red-500 text-sm text-center mt-1">{errors.message}</p>}
            </div>

            {/* First & Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-1 font-medium">First name*</label>
                <div className="relative">
                  <input
                    type="text"
                    name="firstName"
                    className={`w-full border ${errors.firstName ? 'border-red-500' : formData.firstName ? 'border-green-500' : 'border-gray-300'} rounded px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none`}
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                  {renderInputIcon('firstName')}
                </div>
                {errors.firstName && <p className="text-red-500 text-sm text-center mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-sm mb-1 font-medium">Last name*</label>
                <div className="relative">
                  <input
                    type="text"
                    name="lastName"
                    className={`w-full border ${errors.lastName ? 'border-red-500' : formData.lastName ? 'border-green-500' : 'border-gray-300'} rounded px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none`}
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                  {renderInputIcon('lastName')}
                </div>
                {errors.lastName && <p className="text-red-500 text-sm text-center mt-1">{errors.lastName}</p>}
              </div>
            </div>

            {/* Postal Code & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-1 font-medium">Postal code*</label>
                <div className="relative">
                  <input
                    type="text"
                    name="postalCode"
                    className={`w-full border ${errors.postalCode ? 'border-red-500' : formData.postalCode ? 'border-green-500' : 'border-gray-300'} rounded px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none`}
                    value={formData.postalCode}
                    onChange={handleInputChange}
                  />
                  {renderInputIcon('postalCode')}
                </div>
                {errors.postalCode && <p className="text-red-500 text-sm text-center mt-1">{errors.postalCode}</p>}
              </div>

              <div>
                <label className="block text-sm mb-1 font-medium">Email*</label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    className={`w-full border ${errors.email ? 'border-red-500' : formData.email ? 'border-green-500' : 'border-gray-300'} rounded px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none`}
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {renderInputIcon('email')}
                </div>
                {errors.email && <p className="text-red-500 text-sm text-center mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm mb-1 font-medium">Phone number*</label>
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  className={`w-full border ${errors.phone ? 'border-red-500' : formData.phone ? 'border-green-500' : 'border-gray-300'} rounded px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none`}
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                {renderInputIcon('phone')}
              </div>
              {errors.phone && <p className="text-red-500 text-sm text-center mt-1">{errors.phone}</p>}
            </div>

            <div className="flex justify-center">
              <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded flex items-center hover:bg-blue-600 transition-all duration-200 cursor-pointer">
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
