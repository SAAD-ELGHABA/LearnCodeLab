import {combineReducers,legacy_createStore} from 'redux'
import {modeReducer, userReducer} from './reducer'
const reducers = combineReducers({
    userReducer,
    modeReducer,
})

export const store = legacy_createStore(reducers);