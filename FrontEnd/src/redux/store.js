import {combineReducers,legacy_createStore} from 'redux'
<<<<<<< HEAD
import {modeReducer, userReducer,collectionReducer, ChatAiReducer, collectionsReducer, feedbackReducer, groupsStagiaireReducer, groupReducer, savesReducer, themeReducer, resourcesReducer, languagesReducer, notificationsReducer, globalSearchResultReducer, GroupJoiningReducer} from './reducer'
=======
import {modeReducer, userReducer,collectionReducer, ChatAiReducer, collectionsReducer, feedbackReducer, groupsStagiaireReducer, groupReducer, savesReducer, themeReducer} from './reducer'
>>>>>>> 27c02272435c323488386150c779909c9f511c29
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
<<<<<<< HEAD
    resourcesReducer,
    languagesReducer,
    themeReducer,
    notificationsReducer,
    globalSearchResultReducer,
    GroupJoiningReducer
=======
    themeReducer
>>>>>>> 27c02272435c323488386150c779909c9f511c29
})

export const store = legacy_createStore(reducers);