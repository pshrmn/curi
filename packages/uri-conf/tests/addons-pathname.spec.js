import pathname from '../src/addons/pathname';
import uri from '../src/uri';
import path from '../src/path';

describe('pathname addon', () => {

  afterEach(() => {
    pathname.reset();
  });

  describe('name', () => {
    it('is pathname', () => {
      expect(pathname.name).toBe('pathname');
    });
  });

  describe('register', () => {
    it('adds the path to the known paths', () => {
      const playerURI = uri('Player', path('player'));
      pathname.register(playerURI);
      expect(pathname.get('Player')).toBeDefined();
    });

    it('merges path with parent path', () => {
      const parentURI = uri('Parent', path('parent'));
      const childURI = uri('Child', path('child'));
      pathname.register(parentURI);
      pathname.register(childURI, 'Parent');
      expect(pathname.get('Child')).toBe('parent/child');
    });

    it('merges when there is a trailing slash', () => {
      const parentURI = uri('Parent', path('parent/'));
      const childURI = uri('Child', path('child'));
      pathname.register(parentURI);
      pathname.register(childURI, 'Parent');
      expect(pathname.get('Child')).toBe('parent/child');
    })
  });

  describe('get', () => {
    it('returns a pathname using params', () => {
      const playerURI = uri('Player', path('player/:id'));
      pathname.register(playerURI);
      const output = pathname.get('Player', { id: 17 });
      expect(output).toBe('player/17');
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
      const staticURI = uri('Static', path('this/has/no/params'));
      pathname.register(staticURI);
      const output = pathname.get('Static');
      expect(output).toBe('this/has/no/params');
    });
  });

  describe('reset', () => {
    const err = console.error;
    console.error = jest.fn();

    const playerURI = uri('Player', path('player'));
    pathname.register(playerURI);
    expect(pathname.get('Player')).toBeDefined();

    pathname.reset();
    expect(pathname.get('Player')).toBeUndefined();

    // reset console.error
    console.error = err;
  });
});
