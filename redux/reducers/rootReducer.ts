import {combineReducers} from 'redux';
import authReducer from './authReducer';

const rootReducer = combineReducers({
    user:authReducer
})

export default rootReducer;
export type AppState = ReturnType<typeof rootReducer>;