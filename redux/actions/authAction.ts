import axios from "axios";
import Router from "next/router";
import * as t from "../types";

// const server = "http://localhost:8080/api/users";
const server = "http://localhost:5000";
// const server:string = 'http://localhost:1337/api/auth';
export const oauthGoogle = (data) => {
  return async (dispatch) => {
    const json = await axios.post(`${server}/google`, {
      access_token: data,
    });

    dispatch({
      type: t.AUTH_SIGN_UP,
      payload: json,
    });
  };
};

export const oauthFacebook = (data) => {
  return async (dispatch) => {
    const json = await axios.post(`${server}/facebook`, {
      access_token: data,
    });

    dispatch({
      type: t.AUTH_SIGN_UP,
      payload: json,
    });
  };
};
export const signUp = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: t.AUTH_LOADING,
        payload: true,
      });
      const json = await axios.post(`${server}/register`, data);
      dispatch({
        type: t.AUTH_SIGN_UP,
        payload: json,
      });
      Router.push("/");
    } catch (err) {
      dispatch({
        type: t.AUTH_ERROR,
        payload: "Email is already in use",
      });
    }
  };
};

export const signIn = (data) => {
  return async (dispatch) => {
    try {
      // server = http://localhost:8080/api/users
      const resp = await axios.post(`${server}/login`, data, {
        withCredentials: true,
      });
      console.log({ resp });
      dispatch({
        type: t.AUTH_SIGN_IN,
        payload: data,
      });
      // Router.push('/');
    } catch (err) {
      dispatch({
        type: t.AUTH_ERROR,
        payload: err.toString(),
      });
    }
  };
};
export const loginUser = (data) => {
  return (dispatch) => {
    try {
      dispatch({
        type: t.AUTH_SIGN_IN,
        payload: {
          ...data,
        },
      });
    } catch (err) {
      dispatch({
        type: t.AUTH_ERROR,
        payload: "error",
      });
    }
  };
};
export const checkAuth = () => {
  return async (dispatch) => {
    try {
      await axios.get(`${server}/status`);

      dispatch({
        type: t.AUTH_SIGN_IN,
      });

      console.log("user is auth-ed");
    } catch (err) {
      console.log("error", err);
    }
  };
};

export const signOut = () => {
  return async (dispatch) => {
    await axios.get("http://localhost:5000/users/signout");

    dispatch({
      type: t.AUTH_SIGN_OUT,
    });
  };
};
