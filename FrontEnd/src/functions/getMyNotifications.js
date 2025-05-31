import axios from "axios";

export const getMyNotifications = async (dispatch)=>{
    try {
        const res = await axios.get('/api/my-notifications',{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        });
        dispatch({
            type:"GET_NOTIFICATION",
            payload:res.data.myNotifications
        })
    } catch (error) {
        console.log(error);
    }
}