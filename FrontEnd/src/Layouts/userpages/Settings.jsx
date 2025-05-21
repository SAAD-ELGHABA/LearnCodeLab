import DarkLightModeToggle from "../../Components/Switch";
import ThemeSelector from "../../Components/ThemeSelector";

function Settings() {
  return (
    <div className="mx-5 my-5 ">
      <h1 className="text-xl font-bold">Settings </h1>
<div className=" rounded mt-5 p-2 h-2/3">
  <ThemeSelector />
</div>

    </div>
  );
}

export default Settings;
