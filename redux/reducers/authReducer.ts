import * as t from '../types';

type defaultState = {
    isAuthenticated:boolean,
    errorMessage:string,
    userName:string,
    lastSearchKey?:string,
    userAvatar?:string
}
type action = {
    type:string,
    payload:defaultState
}
export const DEFAULT_STATE:defaultState = {
    isAuthenticated: false,
    errorMessage: '',
    userName:null,
    lastSearchKey:'',
    userAvatar:''
  }
  
  export default (state = DEFAULT_STATE, {type,payload}:action) => {
    switch(type) {
      case t.AUTH_SIGN_UP:
        return { ...state, isAuthenticated: true, errorMessage: '' }
      case t.AUTH_SIGN_IN:
        return { ...state, isAuthenticated: payload.isAuthenticated,userName:payload.userName,userAvatar:payload.userAvatar,lastSearchKey:payload.lastSearchKey, errorMessage: '' }
      case t.AUTH_SIGN_OUT:
        return { ...state, isAuthenticated: false, errorMessage: '' }
      case t.AUTH_ERROR:
        return { ...state, errorMessage: payload }
      default:
        return state
    }
  }