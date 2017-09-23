import 'jest';
import createConfig from '@curi/core';
import InMemory from '@hickory/in-memory';
import { createStore, combineReducers } from 'redux';

import {
  syncResponses,
  responseReducer,
  LOCATION_CHANGE
} from '../src';
import { AnyResponse } from '@curi/core';
import { Action } from 'redux';

describe('syncResponses', () => {
  let history, config, store;

  beforeEach(() => {
    history = InMemory({ locations: ['/'] });
    config = createConfig(history, [
      { name: 'Home', path: '' },
      { name: 'One', path: 'one' }
    ]);

    const reducer = combineReducers({
      response: responseReducer
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
});

describe('responseReducer', () => {
  it('sets the response from LOCATION_CHANGE actions', () => {
    const response = { key: 'test' } as AnyResponse;
    const output = responseReducer(
      {} as AnyResponse,
      {
        type: LOCATION_CHANGE,
        response
      } as Action
    );
    expect(output).toBe(response);
  });
});
