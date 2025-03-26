const userState = {
    user:null,
    token: localStorage.getItem('token') ? localStorage.getItem('token') :null
}
const mode = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'dark' 
export const userReducer = (state=userState,action)=>{
    switch (action.type){
        case "LOGIN":
            return {
                ...state,
                user:action.payload.user,
                token:action.payload.token
            }
        case "REGISTER":
            return {
                ...state,
                user:action.payload.user,
                token:action.payload.token
            }
        case "LOGOUT":
            localStorage.removeItem('token');
            return {
                user:null,
                token:null
            }
        default:
            return state;
    }
}

export const modeReducer = (state=mode,action)=>{
    switch (action.type){
        case "LIGHT":
            return state = 'light';
        case "DARK":
            return state = 'dark';
        default:
            return state ;
    }
}

const initialState = {
    title: "",
    language: "",
    question: "",
    description: "",
    code: "",
};

export const collectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_TITLE_AND_LANGUAGE"  :
            return {
                ...state,
                title: action.payload.title,
                language: action.payload.language,
            };
        case 'SET_QUESTION_AND_DESCRIPTION':
            return {
                ...state,
                question: action.payload.question,
                description: action.payload.description,
            };
        case 'SET_CODE':
            return {
                ...state,
                code: action.payload,
            };
        case 'RESET_FORM':
            return initialState;
        default:
            return state;
    }
};


const messages = [
    
]

export const ChatAiReducer = (state=messages,action)=>{
    switch (action.type){
        case "PUSH_MESSAGE":
            return [
                ...state,action.payload
            ]
        default:
            return messages;
    }
}