import * as t from '../types';

const initialState = {
    userName:<string>"",
    lastSearchKey:<string>""
}
const userReducer = (state = initialState,action)=>{
    switch (action.type){
        case t.SET_NAME:
            return {
                ...state,userName:action.payload
            };
        default:
            return {...state};
    }
}

export default userReducer;