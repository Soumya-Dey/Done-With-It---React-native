import AsyncStorage from "@react-native-community/async-storage";

import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  ACCOUNT_DELETED,
  LOADING,
  STOP_LOADING,
} from "../actions/types";

const initialState = {
  token: null,
  isAuthenticated: null,
  loading: false,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case STOP_LOADING:
      return {
        ...state,
        loading: false,
      };
    // authenticating a user
    case USER_LOADED:
      console.log("user loaded");
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    // registering a new user
    // loggin in a  user
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      AsyncStorage.setItem(
        "token",
        action.payload.token,
        (err) => new Error(err)
      );
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    // fail when registering
    // fail when logging in
    // fail when authenticating
    // loggin out user
    // deleting user
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case AUTH_ERROR:
    case LOGOUT:
    case ACCOUNT_DELETED:
      AsyncStorage.removeItem("token", (err) => new Error(err));
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}
