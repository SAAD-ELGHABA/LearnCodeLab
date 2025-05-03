import {combineReducers,legacy_createStore} from 'redux'
import {modeReducer, userReducer,collectionReducer, ChatAiReducer, collectionsReducer, feedbackReducer, groupsStagiaireReducer, groupReducer, savesReducer} from './reducer'
const reducers = combineReducers({
    userReducer,
    modeReducer,
    collectionReducer,
    ChatAiReducer,
    collectionsReducer,
    feedbackReducer,
    groupsStagiaireReducer,
    groupReducer,
    savesReducer
})

export const store = legacy_createStore(reducers);