import axios from "axios"
import { toast } from "sonner"

export const feedbackPromise = async (feedbackData,dispatch)=>{
    try {
        const response = await axios.post("/api/feedback",feedbackData,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
        dispatch({
            type: "GET_FEEDBACK_COLLECTION",
            payload: response.data.feedbacks,
          });
        toast.success(response.data.message)
    } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred while submitting feedback.")
    }
}
