import * as t from '../types';

type defaultState = {
    isAuthenticated:boolean,
    errorMessage:string,
    userName:string,
    lastSearchKey:string
}
type actionPayload = {
    isAuthenticated?:boolean,
    errorMessage?:string,
    userName?:string,
    lastSearchKey?:string
}   
type action = {
    type:string,
    payload:actionPayload
}
const DEFAULT_STATE:defaultState = {
    isAuthenticated: false,
    errorMessage: '',
    userName:null,
    lastSearchKey:''
  }
  
  export default (state = DEFAULT_STATE, {type,payload}:action) => {
    switch(type) {
      case t.AUTH_SIGN_UP:
        return { ...state, isAuthenticated: true, errorMessage: '' }
      case t.AUTH_SIGN_IN:
        return { ...state, isAuthenticated: true, errorMessage: '' }
      case t.AUTH_SIGN_OUT:
        return { ...state, isAuthenticated: false, errorMessage: '' }
      case t.AUTH_ERROR:
        return { ...state, errorMessage: payload }
      default:
        return state
    }
  }