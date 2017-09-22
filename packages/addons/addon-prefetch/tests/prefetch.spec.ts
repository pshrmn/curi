import 'jest';
import createPrefetch from '../src';
import { HickoryLocation } from '@hickory/root';
import { LoadModifiers } from '@curi/core';

describe('prefetch addon', () => {
  let prefetch;

  beforeEach(() => {
    prefetch = createPrefetch();
  });

  describe('name', () => {
    it('is prefetch', () => {
      expect(prefetch.name).toBe('prefetch');
    });
  });

  describe('register', () => {
    it('adds the path to the known paths', () => {
      const spy = jest.fn(() => Promise.resolve());
      const playerURI = {
        name: 'Player',
        path: 'player',
        load: () => Promise.resolve()
      };
      prefetch.register(playerURI);

      expect(prefetch.get('Player')).toBeDefined();
    });

    it('does not register if there is no load function', () => {
      const noLoadURI = { name: 'No load', path: 'player' };
      const preloadURI = {
        name: 'Preload',
        path: 'player',
        preload: () => Promise.resolve()
      };
      prefetch.register(noLoadURI);
      prefetch.register(preloadURI);
      // This is a bit roundabout, but we verify that the paths did not register
      // by resolving from catch
      expect.assertions(2);
      return Promise.all([
        prefetch.get('No load').catch(() => {
          return Promise.resolve('No load failed');
        }),
        prefetch.get('Preload').catch(() => {
          return Promise.resolve('Preload failed');
        })
      ]).then(results => {
        expect(results[0]).toBe('No load failed');
        expect(results[1]).toBe('Preload failed');
      });
    });

    it('warns when registering the same name', () => {
      const warn = console.warn;
      console.warn = jest.fn();

      const first = {
        name: 'Test',
        path: 'first',
        load: () => Promise.resolve()
      };
      const second = {
        name: 'Test',
        path: 'second',
        load: () => Promise.resolve()
      };

      prefetch.register(first);
      expect(console.warn.mock.calls.length).toBe(0);

      prefetch.register(second);
      expect(console.warn.mock.calls.length).toBe(1);

      console.warn = warn;
    });
  });

  describe('get', () => {
    it('returns a Promise', () => {
      const playerURI = {
        name: 'Player',
        path: 'player/:id',
        load: () => Promise.resolve()
      };
      prefetch.register(playerURI);
      expect(prefetch.get('Player').then).toBeDefined();
    });

    it('passes arguments to load function', () => {
      const playerURI = {
        name: 'Player',
        path: 'player/:id',
        load: function(params, location, modifiers) {
          expect(params).toEqual(paramsToPass);
          expect(location).toEqual(locationToPass);
          expect(modifiers).toEqual(modifiersToPass);
          return Promise.resolve(true);
        }
      };
      const paramsToPass = { id: 1 };
      const locationToPass = {} as HickoryLocation;
      const modifiersToPass = {} as LoadModifiers;
      prefetch.register(playerURI);
      prefetch.get('Player', paramsToPass, locationToPass, modifiersToPass);
    });

    it('returns rejected Promise when path not found', () => {
      const output = prefetch.get('Anonymous', { id: 123 });
      expect.assertions(2);
      expect(output).toBeInstanceOf(Promise);
      return output.catch(err => {
        expect(true).toBe(true);
      });
    });
  });
});
