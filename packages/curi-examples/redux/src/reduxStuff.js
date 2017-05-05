import { createStore } from 'redux';

function productReducer(state = {}, action) {
  switch (action.type) {
    case 'LOAD_PRODUCTS':
      return action.products;
    case 'LOAD_PRODUCT':
      return Object.assign({}, state, {
        [action.product.id]: action.product
      });
    default:
      return state;
  }
}

export const loadProducts = (products) => ({
  type: 'LOAD_PRODUCTS',
  products
});

export const loadProduct = (product) => ({
  type: 'LOAD_PRODUCT',
  product
});

export default createStore(productReducer, {});
