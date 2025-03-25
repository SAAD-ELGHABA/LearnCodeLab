export const login = (token,user)=>{
    return {
        type:'LOGIN',
        payload:{token,user}
    }
}
export const register = (token,user)=>{
    return {
        type:'REGISTER',
        payload:{token,user}
    }
}

export const logout = ()=>{
    return {
        type:"LOGOUT"
    }
}



export const setTitleAndLanguage = (title, language) => ({
    type: "SET_TITLE_AND_LANGUAGE",
    payload: { title, language },
});

export const setQuestionAndDescription = (question, description) => ({
    type: "SET_QUESTION_AND_DESCRIPTION",
    payload: { question, description },
});

export const setCode = (code) => ({
    type: "SET_CODE",
    payload: code,
});

export const resetForm = () => ({
    type: "RESET_FORM",
});

