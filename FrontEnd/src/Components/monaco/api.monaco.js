import axios from "axios";

export const monacoApi = async (language,code,stdin="")=>{
        try {
          const response = await axios.post(
            "https://emkc.org/api/v2/piston/execute",
            {
              language: language,
              version: "*",
              stdin: stdin,
              files: [
                {
                  content: code,
                },
              ],
            },
            {
              withCredentials: false,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
    
          if (response.status >= 200) {
            const { run: result } = response.data;
            return {
                output: result.output,
                stderr: result.stderr,
            };
          }
        } catch (error) {
          return error;
        }

}