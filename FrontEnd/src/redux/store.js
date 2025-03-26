import {combineReducers,legacy_createStore} from 'redux'
import {modeReducer, userReducer,collectionReducer} from './reducer'
const reducers = combineReducers({
    userReducer,
    modeReducer,
    collectionReducer,
})

export const store = legacy_createStore(reducers);