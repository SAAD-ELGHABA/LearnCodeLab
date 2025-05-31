import {combineReducers,legacy_createStore} from 'redux'
import {modeReducer, userReducer,collectionReducer, ChatAiReducer, collectionsReducer, feedbackReducer, groupsStagiaireReducer, groupReducer, savesReducer, themeReducer, resourcesReducer, languagesReducer, notificationsReducer, globalSearchResultReducer, GroupJoiningReducer} from './reducer'
const reducers = combineReducers({
    userReducer,
    modeReducer,
    collectionReducer,
    ChatAiReducer,
    collectionsReducer,
    feedbackReducer,
    groupsStagiaireReducer,
    groupReducer,
    savesReducer,
    resourcesReducer,
    languagesReducer,
    themeReducer,
    notificationsReducer,
    globalSearchResultReducer,
    GroupJoiningReducer
})

export const store = legacy_createStore(reducers);