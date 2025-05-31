import DarkLightModeToggle from "../../Components/Switch";
import ThemeSelector from "../../Components/ThemeSelector";
import { Cog } from "lucide-react";
function Settings() {
  return (
    <div className="mx-8 my-4 ">
      <h1 className="text-xl font-bold flex items-center space-x-2">
        <span>Settings</span>
        <Cog />
      </h1>
      <div className=" rounded mt-5 p-2 h-2/3">
        <ThemeSelector />
      </div>
    </div>
  );
}

export default Settings;
