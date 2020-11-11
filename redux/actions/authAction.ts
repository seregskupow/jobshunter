import axios from 'axios';
import * as t from '../types';
import Router from 'next/router'

export const oauthGoogle = data => {
    return async dispatch => {
      const json = await axios.post('http://localhost:5000/users/oauth/google', {
        access_token: data
      });
  
      dispatch({
        type: t.AUTH_SIGN_UP,
        payload:json
      });
    };
  }
  
export const oauthFacebook = data => {
    return async dispatch => {
        const json= await axios.post('http://localhost:5000/users/oauth/facebook', {
        access_token: data
      });
  
      dispatch({
        type: t.AUTH_SIGN_UP,
        payload:json
      });
    };
  }
  export const signUp = data => {
    return async dispatch => {
      try {
        const json = await axios.post('http://localhost:5000/users/signup', data);
  
        dispatch({
          type: t.AUTH_SIGN_UP,
          payload:json
        });
        
      } catch(err) {
        dispatch({
          type: t.AUTH_ERROR,
          payload: 'Email is already in use'
        })
      }
    };
  }
  
  export const signIn = (data) => {
    return async dispatch => {
      try {
        // const json = await axios.post('http://localhost:5000/users/signin', data);
        console.log('im triggered')
        console.log(data)
        dispatch({
          type: t.AUTH_SIGN_IN,
          payload:data
        });
        // Router.push('/');
      } catch(err) {
        dispatch({
          type: t.AUTH_ERROR,
          payload: 'Email and password combination isn\'t valid'
        })
      }
    };
  }
  
  export const checkAuth = () => {
    return async dispatch => {
      try {
        await axios.get('http://localhost:5000/users/status');
  
        dispatch({
          type: t.AUTH_SIGN_IN
        });
  
        console.log('user is auth-ed')
      } catch(err) {
        console.log('error', err)
      }
    };
  }
  
export const signOut = () => {
    return async dispatch => {
      await axios.get('http://localhost:5000/users/signout');
  
      dispatch({
        type: t.AUTH_SIGN_OUT
      })
    };
  }