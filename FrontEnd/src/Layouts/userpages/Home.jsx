import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Index from "../../Components/collection/index.collection";
import axios from "axios";
import { toast } from "sonner";
import spinner from "../../Assets/spinner.gif";

import { useSelector } from "react-redux";
function Home() {
  const token = useSelector((state) => state.userReducer.token);
  const [loadingCollections, setLoadingCollections] = useState(false);
  const [collections, setCollections] = useState([]);
  useEffect(() => {
    setLoadingCollections(true);
    const getCollections = async () => {
      try {
        const response = await axios.get("/api/collections", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCollections(response.data.collections);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }finally{
        setLoadingCollections(false)
      }
    };
    getCollections();
  }, []);
  return (
    <div className="bg-gray-800 min-h-screen p-6 text-gray-100">
      {/* Header Section */}
      <div className="mb-8 text-sm">
        <h1 className="text-2xl font-bold mb-2">Recently Active Questions</h1>
        <p className="text-gray-400 mb-4">503 collection with 1202 code</p>

        <div className="flex gap-4 mb-6">
          <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center gap-2 transition-colors">
            <span>Tap to search</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          <Link
            to="/add1"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-2 transition-colors"
          >
            <span>Add a collection</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </Link>
        </div>
      </div>
      {loadingCollections ? (
        <div className="flex items-center h-96">
          <img src={spinner} alt="Loading..." className="w-8  mx-auto" />
        </div>
      ) : (
        collections && collections.map((collection) => <Index key={collection.id} collection={collection}/>)
        // <Index />
      )}
    </div>
  );
}

export default Home;
