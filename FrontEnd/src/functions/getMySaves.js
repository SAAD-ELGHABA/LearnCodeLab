import axios from "axios";

export const saves = async (dispatch) => {
    try {
      const response = await axios.get("/api/mySaves", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response) {
        dispatch({
          type: "GET_MY_SAVES",
          payload: response.data.mysaves,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };