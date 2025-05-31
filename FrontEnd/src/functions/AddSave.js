import axios from "axios";

export const AddSave = async (itemId,dispatch)=>{
    try {
        const response = await axios.post('/api/add-save',{itemId},{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        });
        if (response.status >= 200 && response.status <= 300) {
            dispatch({
                type:"GET_MY_SAVES",
                payload:response.data.mysaves
            })
        }
    } catch (error) {
        console.log(error);
    }
}