import { useState, useRef, useEffect } from "react";
import { Bell, Megaphone, MessageCircleCode, Star } from "lucide-react";
import { themes } from "../lib/themes.js";
import { useSelector } from "react-redux";
import Notif from "./Notif.jsx";
const NotificationBell = () => {
  const choosedTheme = useSelector((state) => state.themeReducer);
  const user = useSelector((state) => state.userReducer.user);
  const notificationsReducer = useSelector(
    (state) => state.notificationsReducer
  );

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer p-2.5 rounded-full"
        style={{
          backgroundColor: themes.find((theme) => theme.name === choosedTheme)
            ?.colors[1],
          color: themes.find((theme) => theme.name === choosedTheme)?.textColor,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = themes.find(
            (theme) => theme.name === choosedTheme
          )?.colors[0];
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        {notificationsReducer.length ? (
          <div className="top-1.5 right-2 bg-red-500 text-xs h-2 w-2 rounded-full absolute"></div>
        ) : (
          ""
        )}
        <Bell className="h-5 w-5" />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full w-96  shadow-lg rounded-md overflow-hidden z-50 max-h-[85vh] overflow-y-scroll custom-scrollbar"
          style={{
            backgroundColor: themes.find((theme) => theme.name === choosedTheme)
              ?.colors[1],
            color: themes.find((theme) => theme.name === choosedTheme)
              ?.textColor,
            border: `1px solid ${
              themes.find((theme) => theme.name === choosedTheme)?.colors[2]
            }`,
          }}
        >
          {notificationsReducer.length === 0 ? (
            <div className="p-4 text-sm text-center">Aucune notification</div>
          ) : (
            notificationsReducer.map((note) => (
              <div
                key={note.id}
                className="p-3 text-sm cursor-pointer  last:border-none"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = themes.find(
                    (theme) => theme.name === choosedTheme
                  )?.colors[0];
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <div
                  className={`flex items-center space-x-2 ${
                    (note?.read == 0 || !note?.read) && " justify-between "
                  }`}
                >
                  {note?.title === "New Group Created" ? (
                    <div className="p-1 bg-yellow-500 text-white rounded">
                      <Megaphone />
                    </div>
                  ) : note?.title === "New rate to your collection" ? (
                    <div className="p-1 bg-blue-500 text-white rounded">
                      <Star />
                    </div>
                  ) : note?.title === "New feedback in your collection" ? (
                    <div className="p-1 bg-green-500 text-white rounded">
                      <MessageCircleCode />
                    </div>
                  ) : (
                    ""
                  )}
                  <div>
                    <div className="font-semibold">{note?.title}</div>
                    <div>{note.message}</div>
                  </div>
                  {note?.read == 0 || !note?.read ? (
                    <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="text-gray-500 mt-2 w-full flex justify-end text-xs ">
                  {note?.created_at
                    ? new Date(note.created_at).toLocaleString("en-US", {
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "just now"}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
