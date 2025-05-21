import axios from "axios";

export const handlerate = async (type,idCollection,dispatch)=>{
    try {
        const response = await axios.post(`/api/rate-collection/${idCollection}`,{
            type
        },{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        });
        if (response.status >= 200 && response.status <= 300) {
            dispatch({
                type: "GET_ALL_COLLECTIONS",
                payload: response.data.collections,
            });
        }
    } catch (error) {
        console.log(error);
        
    }
}