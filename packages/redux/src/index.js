export const LOCATION_CHANGE = '@@curi/LOCATION_CHANGE';
export const STORE_CONFIG = '@@curi/STORE_CONFIG";';

export const configReducer = (state = {}, action) => {
  return action.type === STORE_CONFIG ? action.config : state;
};

export const responseReducer = (state = {}, action) => {
  return action.type === LOCATION_CHANGE ? action.response : state;
};

export const syncResponses = (store, config, includeConfig = true) => {
  if (includeConfig) {
    store.dispatch({
      type: STORE_CONFIG,
      config
    });
  }

  config.subscribe(response => {
    store.dispatch({
      type: LOCATION_CHANGE,
      response
    });
  });
};
