import DarkLightModeToggle from "../../Components/Switch";

function Settings() {
  return (
    <div className="mx-5 my-5 ">
      <h1 className="text-xl font-bold">Settings </h1>
      <hr className="text-[#273042]" />
      <div className="border rounded mt-5 border-[#273042] p-2 h-2/3">
        <div className="flex">
          <h1 className="me-5">the light/dark mode : </h1>
          <DarkLightModeToggle />
        </div>
      </div>
    </div>
  );
}

export default Settings;
