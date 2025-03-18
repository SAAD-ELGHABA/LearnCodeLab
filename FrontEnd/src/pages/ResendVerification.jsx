import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import spinner from "../Assets/spinner.gif";
const ResendVerification = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const handleResend = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "/api/email/verification-notification",
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      setMessage(response.data.message);
      if (response.status >= 200) {
        toast.success(message);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to resend email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-1/3 text-center">
        <p className="text-gray-500">
          we&apos;ve sent you a verification email , check your email to complete
          your registration ! or :
        </p>
        <button
          onClick={handleResend}
          className={`${
            loading ? "text-blue-700" : " text-blue-400 cursor-pointer "
          }p-2 underline `}
        >
          {loading ? (
            <img src={spinner} alt="" className="w-1/5 mx-auto" />
          ) : (
            "Resend Verification Email"
          )}
        </button>
      </div>
    </div>
  );
};

export default ResendVerification;
