import { SquareLibrary } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import Index from "../Components/collection/Index.collection";

import { useSelector } from "react-redux";
function MyCollections() {
  const [MyCollections, setMyCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.userReducer.user);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/get-mycollections/${user?.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.status === 200) {
          setMyCollections(res.data.MyCollections);
        } else {
          console.error("Failed to fetch collections");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user?.id]);
  return (
    <div className="my-4 mx-8">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-bold ">
          <span>My Collections</span>
          <SquareLibrary />
        </h1>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span>Loading...</span>
        </div>
      ) : MyCollections.length > 0 ? (
        <div className="my-4">
          {MyCollections.map((collection) => (
            <Index key={collection.id} collection={collection} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <span>No collections found.</span>
          <span>Create One</span>
        </div>
      )}
    </div>
  );
}

export default MyCollections;
