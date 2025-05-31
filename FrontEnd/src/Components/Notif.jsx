import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const Notif = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const socket = io("http://localhost:3001");
  console.log(userId);

  return (
    <div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
        onClick={() =>
          socket.emit("send-notification", {
            user_id: 107,
            title: "Test Notification",
            message: "This is a real-time test",
          })
        }
      >
        Test Notification
      </button>
    </div>
  );
};

export default Notif;
