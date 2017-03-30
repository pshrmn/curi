import prefetch from '../src/addons/prefetch';
import uri from '../src/uri';
import path from '../src/path';

describe('prefetch addon', () => {

  afterEach(() => {
    prefetch.reset();
  });

  describe('name', () => {
    it('is prefetch', () => {
      expect(prefetch.name).toBe('prefetch');
    });
  });

  describe('register', () => {
    it('adds the path to the known paths', () => {
      const spy = jest.fn(() => Promise.resolve());
      const playerURI = uri('Player', path('player'), null, {
        load: () => Promise.resolve()
      });
      prefetch.register(playerURI);

      expect(prefetch.get('Player')).toBeDefined();
    });

    it('does not register if there is no load function', () => {
      const err = console.error;
      console.error = jest.fn();

      const spy = jest.fn(() => Promise.resolve());
      const noLoadURI = uri('No load', path('player'));
      const preloadURI = uri('Preload', path('player'), null, {
        preload: () => Promise.resolve()
      });
      prefetch.register(noLoadURI);
      prefetch.register(preloadURI);
      expect(prefetch.get('No load')).toBeUndefined();
      expect(prefetch.get('Preload')).toBeUndefined();

      console.error = err;
    })

    it('warns when registering the same name', () => {
      const warn = console.warn;
      console.warn = jest.fn();

      const first = uri('Test', path('first'), null, {
        load: () => Promise.resolve()
      });
      const second = uri('Test', path('second'), null, {
        load: () => Promise.resolve()
      });

      prefetch.register(first);
      expect(console.warn.mock.calls.length).toBe(0);

      prefetch.register(second);
      expect(console.warn.mock.calls.length).toBe(1);

      console.warn = warn;
    });
  });

  describe('get', () => {
    it('returns a Promise', () => {
      const playerURI = uri('Player', path('player/:id'), null, {
        load: () => Promise.resolve()
      });
      prefetch.register(playerURI);
      expect(prefetch.get('Player').then).toBeDefined();
    });

    it('passes arguments to load function', () => {
      const playerURI = uri('Player', path('player/:id'), null, {
        load: function(one, two) {
          expect(one).toBe(1);
          expect(two).toBe(2);
        }
      });
      prefetch.register(playerURI);
      prefetch.get('Player', 1, 2);
    });

    it('returns undefined when path not found', () => {
      const error = console.error;
      console.error = jest.fn();

      const output = prefetch.get('Anonymous', { id: 123 });
      expect(output).toBe(undefined);
      expect(console.error.mock.calls.length).toBe(1);

      console.error = error;
    });
  });

  describe('reset', () => {
    const err = console.error;
    console.error = jest.fn();

    const playerURI = uri('Player', path('player'), null, {
        load: () => Promise.resolve()
      });
    prefetch.register(playerURI);
    expect(prefetch.get('Player')).toBeDefined();

    prefetch.reset();
    expect(prefetch.get('Player')).toBeUndefined();

    // reset console.error
    console.error = err;
  });
});
