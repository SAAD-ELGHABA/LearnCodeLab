import { useState, useEffect } from "react";
import {useSelector , useDispatch} from 'react-redux'
import {themes} from '../lib/themes.js'



export default function ThemeSelector() {
    const dispatch = useDispatch()
    const theme = useSelector(state=>state.themeReducer)
  const [selectedTheme, setSelectedTheme] = useState(theme);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-xl font-bold text-center mb-6 ">
        Choose a theme
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {themes.map((theme) => (
          <div
            key={theme.name}
            className={`cursor-pointer border-2 rounded-lg p-2 transition-all ${
              selectedTheme === theme.name
                ? "border-blue-500"
                : "border-transparent hover:border-gray-400"
            }`}
            onClick={() => {
                setSelectedTheme(theme.name);
            }}
          >
            <div className="flex space-x-1 mb-1">
              {theme.colors.map((color, index) => (
                <div
                  key={index}
                  
                  className="w-8 h-8 rounded border"
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
            <p className="text-xs text-center ">{theme.name}</p>
          </div>
        ))}
      </div>
      <div className="w-full flex justify-end mt-4"> 
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 cursor-pointer" onClick={()=>{
            dispatch({type:"SET_THEME",payload:selectedTheme})
            localStorage.setItem("theme",selectedTheme)}}
            >
            save changes
        </button>
      </div>
    </div>
  );
}
