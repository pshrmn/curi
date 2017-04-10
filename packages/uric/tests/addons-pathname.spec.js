import createPathname from '../src/addons/pathname';
import uri from '../src/uri';
import path from '../src/path';

describe('pathname addon', () => {

  let pathname;

  beforeEach(() => {
    pathname = createPathname();
  });

  describe('name', () => {
    it('is pathname', () => {
      expect(pathname.name).toBe('pathname');
    });
  });

  describe('register', () => {
    it('adds the path to the known paths', () => {
      const playerURI = uri({ name: 'Player', path: path('player') });
      pathname.register(playerURI);
      expect(pathname.get('Player')).toBeDefined();
    });

    it('merges path with parent path', () => {
      const parentURI = uri({ name: 'Parent', path: path('parent') });
      const childURI = uri({ name: 'Child', path: path('child') });
      pathname.register(parentURI);
      pathname.register(childURI, 'Parent');
      expect(pathname.get('Child')).toBe('/parent/child');
    });

    it('merges when there is a trailing slash', () => {
      const parentURI = uri({ name: 'Parent', path: path('parent/') });
      const childURI = uri({ name: 'Child', path: path('child') });
      pathname.register(parentURI);
      pathname.register(childURI, 'Parent');
      expect(pathname.get('Child')).toBe('/parent/child');
    });

    it('warns when registering the same name', () => {
      const warn = console.warn;
      console.warn = jest.fn();

      const first = uri({ name: 'Test', path: path('first') });
      const second = uri({ name: 'Test', path: path('second') });

      pathname.register(first);
      expect(console.warn.mock.calls.length).toBe(0);

      pathname.register(second);
      expect(console.warn.mock.calls.length).toBe(1);

      console.warn = warn;
    });
  });

  describe('get', () => {
    it('returns a pathname using params', () => {
      const playerURI = uri({ name: 'Player', path: path('player/:id') });
      pathname.register(playerURI);
      const output = pathname.get('Player', { id: 17 });
      expect(output).toBe('/player/17');
    });

    it('returns undefined when path not found', () => {
      const error = console.error;
      console.error = jest.fn();

      const output = pathname.get('Anonymous', { id: 123 });
      expect(output).toBe(undefined);
      expect(console.error.mock.calls.length).toBe(1);

      console.error = error;
    });

    it('works when paths contain no params', () => { // duh?
      const staticURI = uri({ name: 'Static', path: path('this/has/no/params') });
      pathname.register(staticURI);
      const output = pathname.get('Static');
      expect(output).toBe('/this/has/no/params');
    });
  });

  describe('reset', () => {
    it('resets the addon', () => {
      const err = console.error;
      console.error = jest.fn();

      const playerURI = uri({ name: 'Player', path: path('player') });
      pathname.register(playerURI);
      expect(pathname.get('Player')).toBeDefined();

      pathname.reset();
      expect(pathname.get('Player')).toBeUndefined();

      // reset console.error
      console.error = err;
    })
  });
});
