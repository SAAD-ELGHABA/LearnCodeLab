import spinner from "../Assets/spinner.gif";
// eslint-disable-next-line react/prop-types
function ConfirmAlert({ message, onConfirm, onCancel ,isLogout}) {
  
  return (
    <div className={`fixed inset-0 flex items-center justify-center ${isLogout==='loading'?"bg-[#163050de]":"bg-[#163050b9]"} `} style={{zIndex:'999999'}}>
      {
        isLogout === 'loading'?
        <img src={spinner} alt="Loading ..." />
        :
      <div className="bg-gray-900 px-15 py-10 rounded-lg shadow-lg w-96 border border-gray-800">
        <h2 className="text-xl font-semibold text-center">{message}</h2>
        <div className="flex justify-center gap-3 mt-4 text-sm">
          <button 
            onClick={onCancel} 
            className="px-6 text-blue-400 py-2 rounded-md hover:bg-gray-800  cursor-pointer"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm} 
            className="bg-blue-500 text-white px-6 py-2 rounded-md cursor-pointer hover:bg-[hsl(213,57%,20%)] hover:text-blue-500 hover:border-blue500"
          >
            Confirm
          </button>
        </div>
      </div>
        
      }
    </div>
  );
}



export default ConfirmAlert;
