import * as t from "../types";

type defaultState = {
  isAuthenticated: boolean;
  errorMessage: string;
  userName: string;
  lastSearchKey?: string;
  userAvatar?: string;
  isLoading: boolean;
};
type action = {
  type: string;
  payload: defaultState;
};
export const DEFAULT_STATE: defaultState = {
  isAuthenticated: false,
  errorMessage: "",
  userName: null,
  lastSearchKey: "",
  userAvatar: "",
  isLoading: false,
};

export default (state = DEFAULT_STATE, { type, payload }: action) => {
  switch (type) {
    case t.AUTH_LOADING:
      return { ...state, isLoading: payload.isLoading };
    case t.AUTH_SIGN_UP:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        errorMessage: "",
      };
    case t.AUTH_SIGN_IN:
      return {
        ...state,
        isAuthenticated: true,
        userName: payload.userName,
        userAvatar: payload.userAvatar,
        lastSearchKey: payload.lastSearchKey,
        errorMessage: "",
      };
    case t.AUTH_SIGN_OUT:
      return { ...state, isAuthenticated: false, errorMessage: "" };
    case t.AUTH_ERROR:
      return { ...state, isLoading: false, errorMessage: payload };
    default:
      return state;
  }
};
