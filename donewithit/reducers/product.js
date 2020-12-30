import {
  GET_PRODUCT,
  GET_PRODUCTS,
  PRODUCT_ERROR,
  PRODUCT_LOADING,
  STOP_PRODUCT_LOADING,
} from "../actions/types";

const initialState = {
  product: null,
  products: [],
  productLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PRODUCT_LOADING:
      return {
        ...state,
        productLoading: true,
      };
    case STOP_PRODUCT_LOADING:
      return {
        ...state,
        productLoading: false,
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload,
        productLoading: false,
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        productLoading: false,
      };
    case PRODUCT_ERROR:
      return {
        ...state,
        productLoading: false,
      };
    default:
      return state;
  }
}
