import axios from "axios";

export const groupstagiaire = async(dispatch)=>{
    try {
        const response = await axios.get('/api/groups-stagiaire');
        if(response.status >= 200 && response.status <= 300){
            dispatch({
                type:"GET_GROUPS_STAGIAIRE",
                payload:response.data.GroupsStagiaire
            })
        }
    } catch (error) {
        console.log(error);
    }
}