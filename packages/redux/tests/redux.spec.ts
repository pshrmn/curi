import 'jest';
import createConfig from '@curi/core';
import InMemory from '@hickory/in-memory';
import { createStore, combineReducers } from 'redux';

import {
  syncResponses,
  responseReducer,
  curiReducer,
  LOCATION_CHANGE,
  ADD_CURI
} from '../src';
import { Response } from '@curi/core';
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
      response: responseReducer,
      curi: curiReducer
    });

    store = createStore(reducer);
  });

  it('dispatches response to store whenever the location changes', done => {
    syncResponses(store, config);
    config.subscribe(() => {
      // this Redux subscriber will be called when the response for
      // the push (below) is emitted.
      store.subscribe(() => {
        const { response } = store.getState();
        expect(response.name).toBe('One');
        done();
      });

      history.push({ pathname: '/one' });
    });
  });

  it('makes the curi config object available from the store', done => {
    config.subscribe(() => {
      const { curi: before } = store.getState();
      expect(before).toBe(null);
      syncResponses(store, config);

      const { curi: after } = store.getState();
      expect(after).toBe(config);
      done();
    });
  });
});

describe('responseReducer', () => {
  it('sets the response from LOCATION_CHANGE actions', () => {
    const response = { key: 'test' } as Response;
    const output = responseReducer(
      {} as Response,
      {
        type: LOCATION_CHANGE,
        response
      } as Action
    );
    expect(output).toBe(response);
  });

  it('returns current response for non-location change actions', () => {
    const response = { key: 'test' } as Response;
    const output = responseReducer(response, { type: 'UNKNOWN' });
    expect(output).toBe(response);
  });

  it('returns null for non-location change actions if store.response is undefined', () => {
    const output = responseReducer(undefined, { type: 'UNKNOWN' });
    expect(output).toBe(null);
  });
});

describe('curiReducer', () => {
  let history, config;

  beforeEach(() => {
    history = InMemory({ locations: ['/'] });
    config = createConfig(history, [
      { name: 'Home', path: '' },
      { name: 'One', path: 'one' }
    ]);
  });

  it('returns the provided curi config for ADD_CURI actions', () => {
    const output = curiReducer(undefined, {
      type: ADD_CURI,
      curi: config
    } as Action);
    expect(output).toBe(config);
  });

  it('returns the curi config object saved in the store', () => {
    const output = curiReducer(config, { type: 'UNKNOWN' });
    expect(output).toBe(config);
  });

  it('returns null for non-add curi actions if store.curi is undefined', () => {
    const output = curiReducer(undefined, { type: 'UNKNOWN' });
    expect(output).toBe(null);
  });
});
