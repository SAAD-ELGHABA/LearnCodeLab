import spinner from "../Assets/spinner.gif";
// eslint-disable-next-line react/prop-types
import { themes } from "../lib/themes.js";
import { useSelector } from "react-redux";

function ConfirmAlert({ message, onConfirm, onCancel, isLogout }) {
  const choosedTheme = useSelector((state) => state.themeReducer);
  return (
    <div
      className="flex flex-col h-screen w-[100vw] justify-center fixed top-0 right-0 items-center rounded-lg shadow-lg bg-[#21252b5e] "
      style={{
        color: themes.find((theme) => theme.name === choosedTheme).textColor,
        zIndex: 1005,
      }}
    >
      {isLogout === "loading" ? (
        <img src={spinner} alt="Loading ..." />
      ) : (
        <div
          className="rounded-lg shadow-lg w-[30%] h-[30%]  flex justify-center items-center flex-col "
          style={{
            backgroundColor: themes.find((theme) => theme.name === choosedTheme)
              .colors[1],
            zIndex: "999",
            color: themes.find((theme) => theme.name === choosedTheme)
              .textColor,
            border: `1px solid ${themes.find((theme) => theme.name === choosedTheme).colors[2]}`,
          }}
        >
          <h2 className="text-lg font-semibold text-center">{message}</h2>
          <div className="flex justify-center gap-3 mt-4 text-sm">
            <button
              onClick={onCancel}
              className="px-6  py-2 rounded-md "
              style={{
                backgroundColor: themes.find(
                  (theme) => theme.name === choosedTheme
                ).colors[1],
                color: themes.find((theme) => theme.name === choosedTheme)
                  .textColor,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = themes.find(
                  (theme) => theme.name === choosedTheme
                ).colors[0];
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="  px-6 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConfirmAlert;
