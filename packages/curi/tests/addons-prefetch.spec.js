import createPrefetch from '../src/addons/prefetch';
import uri from '../src/uri';
import path from '../src/path';

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
      const playerURI = uri({
        name: 'Player',
        path: path('player'),
        load: () => Promise.resolve()
      });
      prefetch.register(playerURI);

      expect(prefetch.get('Player')).toBeDefined();
    });

    it('does not register if there is no load function', (done) => {
      const noLoadURI = uri({ name: 'No load', path: path('player') });
      const preloadURI = uri({
        name: 'Preload',
        path: path('player'),
        preload: () => Promise.resolve()
      });
      prefetch.register(noLoadURI);
      prefetch.register(preloadURI);
      // This is a bit roundabout, but we verify that the paths did not register
      // by resolving from catch
      Promise.all([
        prefetch.get('No load').catch(() => { return Promise.resolve('No load failed'); }),
        prefetch.get('Preload').catch(() => { return Promise.resolve('Preload failed'); })
      ]).then((results) => {
        expect(results[0]).toBe('No load failed');
        expect(results[1]).toBe('Preload failed');
        done();
      });
    });

    it('warns when registering the same name', () => {
      const warn = console.warn;
      console.warn = jest.fn();

      const first = uri({
        name: 'Test',
        path: path('first'),
        load: () => Promise.resolve()
      });
      const second = uri({
        name: 'Test',
        path: path('second'),
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
      const playerURI = uri({
        name: 'Player',
        path: path('player/:id'),
        load: () => Promise.resolve()
      });
      prefetch.register(playerURI);
      expect(prefetch.get('Player').then).toBeDefined();
    });

    it('passes arguments to load function', () => {
      const playerURI = uri({
        name: 'Player',
        path: path('player/:id'),
        load: function(one, two) {
          expect(one).toBe(1);
          expect(two).toBe(2);
        }
      });
      prefetch.register(playerURI);
      prefetch.get('Player', 1, 2);
    });

    it('returns rejected Promise when path not found', (done) => {
      const output = prefetch.get('Anonymous', { id: 123 });
      expect(output).toBeInstanceOf(Promise);
      output.catch(err => {
        expect(true).toBe(true);
        done();
      })
    });
  });
});
