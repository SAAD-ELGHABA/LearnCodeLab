import { useEffect, useRef, useState } from "react";
import { PenLine, X } from "lucide-react";
import { groupstagiaire } from "../../functions/groupstagiaire";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {toast} from 'sonner';
// eslint-disable-next-line react/prop-types
function Groups({ formateur = false }) {
  const dispatch = useDispatch();
  const groupsStagiaireReducer = useSelector((state) => state.groupsStagiaireReducer);
  const groupsReducer = useSelector(state=>state.groupReducer);
  const [groupName, setGroupName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [forAllGroups, setForAllGroups] = useState(false);
  const user = useSelector(state=>state.userReducer.user);
  const dropdownRef = useRef(null);
  useEffect(()=>{
    const resGroup = async ()=>{
      try {
        const res = await axios.get(`/api/get-group/${user.id}`);
        if(res.status >= 200 && res.status < 300){
          dispatch({
            type:"GET_GROUPS",
            payload:res.data.groups
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
    resGroup();
  },[])
  useEffect(() => {
    if (searchTerm.trim() !== "") {
      groupstagiaire(dispatch);
      setDropdownVisible(true);
    } else {
      setDropdownVisible(false);
    }
  }, [searchTerm, dispatch]);

  const handleSelect = (name) => {
    if (!selectedGroups.includes(name)) {
      setSelectedGroups((prev) => [...prev, name]);
    }
    setSearchTerm("");
    setDropdownVisible(false);
  };

  const removeGroup = (nameToRemove) => {
    setSelectedGroups((prev) => prev.filter((name) => name !== nameToRemove));
  };

  // Hide dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = {
      groupName,
      selectedGroups,
      forAllGroups,
      formateurId : user.id
    };
    try {
      const response = await axios.post(`/api/create-group`, formData);
      if(response.status >= 200 && response.status < 300){
        toast.success(response.data.message);
        dispatch({
          type:"GET_GROUPS",
          payload:response.data.groups
        })
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      {formateur && (
        <div className="mx-8 border rounded border-gray-700 p-4">
          <div className="flex justify-start items-center space-x-2 text-xl">
            <h1>Create a group</h1>
            <PenLine className="w-5 h-5" />
          </div>

          <form className="my-4 flex gap-4 flex-wrap" onSubmit={handleSubmit}>
            <div className="flex flex-col w-1/3">
              <label className="text-sm text-gray-400 mb-1">Group Name</label>
              <input
                type="text"
                placeholder="group name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="py-2 px-2.5 outline-none border border-gray-700 rounded"
                disabled={isLoading} // Disable input while loading
              />
            </div>

            <div className="flex flex-col w-1/3 relative" ref={dropdownRef}>
              <label className="text-sm text-gray-400 mb-1">Groups to Associate</label>
              <input
                type="text"
                placeholder="group to associate"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="py-2 px-2.5 outline-none border border-gray-700 rounded"
                disabled={isLoading} // Disable input while loading
              />

              {dropdownVisible && groupsStagiaireReducer.length > 0 && (
                <ul className="absolute z-10 w-full bg-gray-800 border border-gray-700 mt-1 rounded shadow-md max-h-40 overflow-y-auto">
                  {groupsStagiaireReducer.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelect(item.name)}
                      className="px-4 py-2 hover:bg-gray-100 hover:text-gray-900 cursor-pointer border-b border-gray-700"
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              )}

              {selectedGroups.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedGroups.map((group, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 px-2 py-1 bg-gray-200 text-gray-800 rounded-full text-sm"
                    >
                      {group}
                      <button type="button" onClick={() => removeGroup(group)}>
                        <X className="w-3 h-3 text-gray-600 hover:text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex w-1/3 items-center space-x-2 mt-6">
              <label className="text-sm text-gray-400">For All Groups</label>
              <input
                type="checkbox"
                checked={forAllGroups}
                onChange={(e) => setForAllGroups(e.target.checked)}
                disabled={isLoading} // Disable checkbox while loading
              />
            </div>

            <div className="flex justify-center items-center mt-6">
              <button
                type="submit"
                className={`bg-blue-500 px-6 py-2 rounded hover:bg-blue-600 cursor-pointer text-white ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isLoading} // Disable button while loading
              >
                {isLoading ? "Associating..." : "Associate"}
              </button>
            </div>
          </form>

          {/* Show loading spinner when isLoading is true */}
          {isLoading && (
            <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
              <div className="loader border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      )}
      <div>
        {
          !formateur && 
          <div className="mx-8 my-4">
            <h1 className="text-xl font-semibold">My Groups</h1>
          </div>
        }
        {
          groupsReducer.length > 0 ?
          groupsReducer.map((grp)=>
            <div key={grp.id} className="border bg-gray-800 border-gray-600 p-4 rounded text-white my-2">
              <h1>{grp.groupName}</h1>
              <div className="flex justify-end items-center">
                  <button className="bg-green-400 text-white px-4 py-2">Join</button>
              </div>
            </div>
          )
          :
          <div className="flex justify-center items-center h-100">
            <h1 className="text-xl font-semibold">There is no group created at this moment</h1>
          </div>
        }
      </div>
    </div>
  );
}

export default Groups;
