import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  ACCOUNT_DELETED,
  AUTH_LOADING,
  STOP_AUTH_LOADING,
} from "../actions/types";

const initialState = {
  token: null,
  isAuthenticated: null,
  authLoading: false,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        authLoading: true,
      };
    case STOP_AUTH_LOADING:
      return {
        ...state,
        authLoading: false,
      };
    // authenticating a user
    case USER_LOADED:
      console.log("user loaded");
      return {
        ...state,
        isAuthenticated: true,
        authLoading: false,
        user: action.payload,
      };
    // registering a new user
    // loggin in a  user
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        authLoading: false,
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
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        authLoading: false,
      };
    default:
      return state;
  }
}
