import axios from "axios";

import { setAlert } from "./alert";
import {
  PRODUCT_LOADING,
  STOP_PRODUCT_LOADING,
  GET_PRODUCT,
  PRODUCT_ERROR,
  GET_PRODUCTS,
} from "./types";
import { serverDomainUrl } from "../serverUrl";

// for getting a all product
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_LOADING,
    });

    const res = await axios.get(`${serverDomainUrl}/api/product`);

    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    });
  } catch (error) {
    const errArr = error.response.data.errors;

    // send the errors to the alert reducer
    if (errArr) {
      errArr.forEach((errItem) => dispatch(setAlert(errItem.msg, "danger")));
    }

    dispatch({
      type: PRODUCT_ERROR,
    });
  }
};

// for getting a single product
export const getProduct = ({ productId }) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_LOADING,
    });

    const res = await axios.get(`${serverDomainUrl}/api/product/${productId}`);

    dispatch({
      type: GET_PRODUCT,
      payload: res.data,
    });
  } catch (error) {
    const errArr = error.response.data.errors;

    // send the errors to the alert reducer
    if (errArr) {
      errArr.forEach((errItem) => dispatch(setAlert(errItem.msg, "danger")));
    }

    dispatch({
      type: PRODUCT_ERROR,
    });
  }
};

// for getting products by category
export const getProductsByCategory = ({ category }) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_LOADING,
    });

    const res = await axios.get(
      `${serverDomainUrl}/api/product/category/${category}`
    );

    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    });
  } catch (error) {
    const errArr = error.response.data.errors;

    // send the errors to the alert reducer
    if (errArr) {
      errArr.forEach((errItem) => dispatch(setAlert(errItem.msg, "danger")));
    }

    dispatch({
      type: PRODUCT_ERROR,
    });
  }
};
