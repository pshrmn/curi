import createPathname from '../src/addons/pathname';
import uri from '../src/utils/createUri';

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
      const player = { name: 'Player', path: 'player' };
      pathname.register(player);
      expect(pathname.get('Player')).toBeDefined();
    });

    it('merges path with parent path', () => {
      const grandparent = { name: 'Grandparent', path: 'grandparent' };
      const parent = { name: 'Parent', path: 'parent' };
      const child = { name: 'Child', path: 'child' };
      pathname.register(grandparent);
      pathname.register(parent, 'Grandparent');
      pathname.register(child, 'Parent');
      expect(pathname.get('Child')).toBe('/grandparent/parent/child');
    });

    it('merges when there is a trailing slash', () => {
      const parent = { name: 'Parent', path: 'parent/' };
      const child = { name: 'Child', path: 'child' };
      pathname.register(parent);
      pathname.register(child, 'Parent');
      expect(pathname.get('Child')).toBe('/parent/child');
    });

    it('warns when registering the same name', () => {
      const warn = console.warn;
      console.warn = jest.fn();

      const first = { name: 'Test', path: 'first' };
      const second = { name: 'Test', path: 'second' };

      pathname.register(first);
      expect(console.warn.mock.calls.length).toBe(0);

      pathname.register(second);
      expect(console.warn.mock.calls.length).toBe(1);

      console.warn = warn;
    });
  });

  describe('get', () => {
    it('returns a pathname using params', () => {
      const player = { name: 'Player', path: 'player/:id' };
      pathname.register(player);
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

    it('works when paths contain no params', () => {
      // duh?
      const staticRoute = { name: 'Static', path: 'this/has/no/params' };
      pathname.register(staticRoute);
      const output = pathname.get('Static');
      expect(output).toBe('/this/has/no/params');
    });
  });
});
