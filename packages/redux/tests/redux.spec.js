import createConfig from '@curi/core';
import InMemory from '@hickory/in-memory';
import { createStore, combineReducers } from 'redux';

import {
  syncResponses,
  responseReducer,
  configReducer,
  LOCATION_CHANGE,
  STORE_CONFIG
} from '../src';

describe('syncResponses', () => {
  let history, config, store;

  beforeEach(() => {
    history = InMemory({ locations: ['/'] });
    config = createConfig(history, [
      { name: 'Home', path: '' },
      { name: 'One', path: 'one' }
    ]);

    const reducer = combineReducers({
      response: responseReducer,
      curi: configReducer
    });

    store = createStore(reducer);
  });

  it('dispatches response to store whenever the location changes', done => {
    config.ready().then(() => {
      syncResponses(store, config);

      store.subscribe(() => {
        const { response } = store.getState();
        expect(response.name).toBe('One');
        done();
      });

      history.push({ pathname: '/one' });
    });
  });

  it('dispatches action to add the configuration object to the store', () => {
    config.ready().then(() => {
      // this relies on the configReducer. It isn't strictly required
      syncResponses(store, config);
      const { curi } = store.getState();
      expect(curi).toBe(config);
    });
  });

  it('does not dispatch config to store when includeConfig is false', () => {
    config.ready().then(() => {
      // create the store without the configReducer since we aren't using that
      const reducer = combineReducers({
        response: responseReducer
      });
      store = createStore(reducer);

      syncResponses(store, config, false);
      const { curi } = store.getState();
      expect(curi).toBeUndefined();
    });
  });
});

describe('responseReducer', () => {
  it('sets the response from LOCATION_CHANGE actions', () => {
    const response = { key: 'test' };
    const output = responseReducer(
      {},
      {
        type: LOCATION_CHANGE,
        response
      }
    );
    expect(output).toBe(response);
  });
});

describe('configReducer', () => {
  it('sets the config from STORE_CONFIG actions', () => {
    const fakeConfig = {};
    const output = configReducer(
      {},
      {
        type: STORE_CONFIG,
        config: fakeConfig
      }
    );
    expect(output).toBe(fakeConfig);
  });
});
