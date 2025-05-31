import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LCL from '../Assets/LCL.png';

const BlockedPage = () => {
  const user = useSelector((state) => state.userReducer.userInfo);

  const dispatch = useDispatch();
  useEffect(() => {
    user &&
      user.role === "courtier" &&
      dispatch({
        type: "SHOW_CREATEBIENTOGGLE",
        payload: true,
      });
  });

  return (
    <div className="min-h-screen flex flex-col justify-center items-center space-y-2 bg-white">
      {/* Logo + Title */}
      <div className="flex flex-col items-center space-y-2">
        <Link to="/">
          <div className="flex items-center space-x-2">
            <img src={LCL} alt="Logo" className="w-25 h-25" />
          </div>
        </Link>
      </div>

      {!user || user.role !== "courtier" ? (
        <div className="text-center">
          <p className="text-xl text-black font-medium">
            You have been blocked.
          </p>

          {/* Link Create an account */}
          <Link
            to="/register"
            className="text-xs font-semibold hover:underline mt-6"
          >
            Create an account
          </Link>
        </div>
      ) : (
        <div>
          <Link to={"/courtier-index"} className="hover:underline">
            Go to your dashboard to create a new listing
          </Link>
        </div>
      )}
      {/* Message */}
    </div>
  );
};

export default BlockedPage;
