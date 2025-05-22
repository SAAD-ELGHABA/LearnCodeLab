import spinner from "../Assets/spinner.gif";
// eslint-disable-next-line react/prop-types
import {themes} from '../lib/themes.js';
import {useSelector } from 'react-redux'


function ConfirmAlert({ message, onConfirm, onCancel ,isLogout}) {
  const choosedTheme = useSelector(
    (state) => state.themeReducer)
  return (
    <div className={`fixed inset-0 flex items-center justify-center ${isLogout==='loading'?"bg-[#163050de]":"bg-[#163050b9]"} `} style={{zIndex:'999999'}}>
      {
        isLogout === 'loading'?
        <img src={spinner} alt="Loading ..." />
        :
      <div className="px-15 py-10 rounded-lg shadow-lg w-96 border border-gray-800" style={{ backgroundColor: themes.find((theme) => theme.name === choosedTheme).colors[1] ,zIndex:'999',color:themes.find((theme) => theme.name === choosedTheme).textColor}} >
        <h2 className="text-xl font-semibold text-center">{message}</h2>
        <div className="flex justify-center gap-3 mt-4 text-sm">
          <button 
            onClick={onCancel} 
            className="px-6  py-2 rounded-md "
            style={{ backgroundColor: themes.find((theme) => theme.name === choosedTheme).colors[1] ,color:themes.find((theme) => theme.name === choosedTheme).textColor }}
            onMouseEnter={
              (e)=>{
                e.currentTarget.style.backgroundColor = themes.find((theme) => theme.name === choosedTheme).colors[0]
              }
              
            }
            onMouseLeave={
              (e)=>{
                e.currentTarget.style.backgroundColor = "transparent"
              }
              
            }
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm} 
            className="  px-6 py-2 rounded-md "
            style={{ backgroundColor: themes.find((theme) => theme.name === choosedTheme).colors[1] ,color:themes.find((theme) => theme.name === choosedTheme).textColor }}
            onMouseEnter={
              (e)=>{
                e.currentTarget.style.backgroundColor = themes.find((theme) => theme.name === choosedTheme).colors[0]
              }
              
            }
            onMouseLeave={
              (e)=>{
                e.currentTarget.style.backgroundColor = "transparent"
              }
              
            }
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
