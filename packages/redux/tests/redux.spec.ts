import 'jest';
import createConfig from '@curi/core';
import InMemory from '@hickory/in-memory';
import { createStore, combineReducers } from 'redux';

import {
  syncResponses,
  curiReducer,
  LOCATION_CHANGE,
  ADD_CURI,
  CuriState
} from '../src';
import { Response, CuriConfig } from '@curi/core';
import { Action as HickoryAction } from '@hickory/root';
import { Action, Store } from 'redux';

describe('syncResponses', () => {
  let history, config, store;

  beforeEach(() => {
    history = InMemory({ locations: ['/'] });
    config = createConfig(history, [
      { name: 'Home', path: '' },
      { name: 'One', path: 'one' }
    ]);

    const reducer = combineReducers({
      curi: curiReducer
    });

    store = createStore(reducer);
  });

  it('dispatches response and action to store whenever the location changes', done => {
    syncResponses(store, config);
    config.respond(() => {
      // this Redux subscriber will be called when the response for
      // the push (below) is emitted.
      store.subscribe(() => {
        const { response, action } = store.getState().curi;
        expect(response.name).toBe('One');
        expect(action).toBe('PUSH');
        done();
      });

      history.push({ pathname: '/one' });
    });
  });

  it('makes the curi config object available from the store', done => {
    config.respond(() => {
      const { curi: before } = store.getState();
      expect(before.config).toBe(null);
      syncResponses(store, config);

      const { curi: after } = store.getState();
      expect(after.config).toBe(config);
      done();
    });
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

  describe('default state', () => {
    it('returns object with null properties', () => {
      const reducer = combineReducers({
        curi: curiReducer
      });

      const store: Store<any> = createStore(reducer);
      const { curi } = store.getState();
      expect(curi).toMatchObject({
        config: null,
        response: null,
        action: null
      });
    });
  });

  describe('ADD_CURI', () => {
    it('returns the provided curi config for ADD_CURI actions', () => {
      const output = curiReducer(undefined, {
        type: ADD_CURI,
        curi: config
      } as Action);
      expect(output.config).toBe(config);
    });
  });

  describe('LOCATION_CHANGE', () => {
    it('sets the response and action from LOCATION_CHANGE actions', () => {
      const response = { key: 'test' } as Response;
      const action = 'POP' as HickoryAction;
      const output = curiReducer(
        {} as CuriState,
        {
          type: LOCATION_CHANGE,
          response,
          action
        } as Action
      );
      expect(output.response).toBe(response);
      expect(output.action).toBe(action);
    });
  });

  describe('other actions', () => {
    it('returns current config/response/action for other actions', () => {
      const fakeConfig = {} as CuriConfig;
      const fakeResponse = { key: 'test' } as Response;
      const output = curiReducer(
        {
          config: fakeConfig,
          response: fakeResponse,
          action: 'POP'
        } as CuriState,
        { type: 'UNKNOWN' }
      );
      expect(output).toMatchObject({
        config: fakeConfig,
        response: fakeResponse,
        action: 'POP'
      });
    });
  });
});
