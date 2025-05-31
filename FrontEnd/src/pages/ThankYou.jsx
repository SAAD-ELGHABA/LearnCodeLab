import React from 'react';
import { useNavigate } from 'react-router-dom';

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <h1 className="text-4xl font-bold text-blue-500 mb-12">Thank You!</h1>
      <p className="text-gray-700 text-center max-w-md mb-10">
        Thank you for your request. A member of our dedicated team will contact you shortly.
      </p>
      <button
        onClick={() => navigate('/About')}
        className="bg-blue-600 text-white px-6 py-2 hover:bg-blue-700 transition cursor-pointer"
      >
        Go Back
      </button>
    </div>
  );
};

export default ThankYou;
