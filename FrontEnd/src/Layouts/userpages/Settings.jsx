import DarkLightModeToggle from "../../Components/Switch";
import ThemeSelector from "../../Components/ThemeSelector";
<<<<<<< HEAD
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
=======

function Settings() {
  return (
    <div className="mx-5 my-5 ">
      <h1 className="text-xl font-bold">Settings </h1>
<div className=" rounded mt-5 p-2 h-2/3">
  <ThemeSelector />
</div>

>>>>>>> 27c02272435c323488386150c779909c9f511c29
    </div>
  );
}

export default Settings;
