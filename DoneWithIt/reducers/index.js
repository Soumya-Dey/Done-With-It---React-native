import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import product from "./product";

// adding the state variables
export default combineReducers({ alert, auth, product });
