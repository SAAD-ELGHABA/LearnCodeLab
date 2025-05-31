import axios from "axios";

export const fetchLanguages = async (dispatch)=>{
    try {
        const res = await axios.get('/api/get-languages');
        if(res.status >= 200 && res.status <= 300){
            dispatch({
                type:"GET_LANGUAGES",
                payload:res.data.languages
            })
        }
    } catch (error) {
        console.log(error);
    }
}