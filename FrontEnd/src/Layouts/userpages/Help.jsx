import { MessageCircleQuestion } from "lucide-react";
import React from "react";
import ContactUs from "../../pages/ContactUs.jsx";
import { themes } from "../../lib/themes.js";
import { useSelector } from "react-redux";
function Help() {
  const choosedTeheme = useSelector((state) => state.themeReducer);
    const user = useSelector((state) => state.userReducer.user);

  return (
    <div>
      <div className="flex items-center space-x-3 mx-8 my-4">
        <h1 className="text-2xl font-bold">Help & Support</h1>
        <MessageCircleQuestion className="h-7 w-7" />
      </div>
      <ContactUs
        isHelpSection={true}
        selectedTheme={themes.find((theme) => theme.name === choosedTeheme)}
        user={user} 
      />
    </div>
  );
}

export default Help;
