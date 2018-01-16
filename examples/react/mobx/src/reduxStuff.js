import { createStore, combineReducers } from "redux";
import { curiReducer } from "@curi/redux";

function productReducer(state = {}, action) {
  switch (action.type) {
    case "LOAD_PRODUCTS":
      return action.products;
    case "LOAD_PRODUCT":
      return Object.assign({}, state, {
        [action.product.id]: action.product
      });
    default:
      return state;
  }
}

export const loadProducts = products => ({
  type: "LOAD_PRODUCTS",
  products
});

export const loadProduct = product => ({
  type: "LOAD_PRODUCT",
  product
});

const reducer = combineReducers({
  products: productReducer,
  curi: curiReducer
});

export default createStore(reducer, {});
