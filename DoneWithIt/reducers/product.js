import {
  GET_PRODUCT,
  GET_PRODUCTS,
  PRODUCT_ERROR,
  LOADING,
  STOP_LOADING,
} from "../actions/types";

const initialState = {
  product: null,
  products: [],
  loading: false,
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
    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload,
        loading: false,
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
