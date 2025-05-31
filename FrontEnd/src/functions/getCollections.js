import axios from "axios";
import { toast } from "sonner";

export const getCollections = async (dispatch) => {
    try {
      const response = await axios.get("/api/collections", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = response.data.collections;
      if(response.status >=200 && response.status <=300){
          dispatch({
            type: "GET_ALL_COLLECTIONS",
            payload: data,
          });
          return data;
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error loading collections"
      );
      console.error(error);
    }
  };