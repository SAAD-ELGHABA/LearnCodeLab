import {combineReducers,legacy_createStore} from 'redux'
import {userReducer} from './reducer'
const reducers = combineReducers({
    userReducer,
})

export const store = legacy_createStore(reducers);