import createActive from '../src';

describe('active addon', () => {
  let active;

  beforeEach(() => {
    active = createActive();
  });

  describe('name', () => {
    it('is active', () => {
      expect(active.name).toBe('active');
    });
  });

  describe('register', () => {
    it('returns the array of param keys for the route', () => {
      const player = {
        name: 'Player',
        path: 'player/:id',
        keys: ['id']
      };
      const storedKeys = active.register(player);
      expect(storedKeys).toEqual(['id']);
    });

    it("also stores any ancestor route's keys", () => {
      const album = {
        name: 'Album',
        path: 'a/:albumId',
        keys: ['albumId']
      };
      const photo = {
        name: 'Photo',
        path: ':photoId',
        keys: ['photoId']
      };
      const parentKeys = active.register(album);
      const storedKeys = active.register(photo, parentKeys);
      expect(storedKeys).toEqual(['albumId', 'photoId']);
    });

    it('stores empty array when route has no params', () => {
      const empty = {
        name: 'Empty',
        path: 'empty',
        keys: undefined
      };
      const storedKeys = active.register(empty);
      expect(storedKeys).toEqual([]);
    });

    it('warns when registering the same name', () => {
      const warn = console.warn;
      console.warn = jest.fn();

      const first = {
        name: 'Test',
        path: ':first',
        keys: ['first']
      };
      const second = {
        name: 'Test',
        path: ':second',
        keys: ['second']
      };

      active.register(first);
      expect(console.warn.mock.calls.length).toBe(0);

      active.register(second);
      expect(console.warn.mock.calls.length).toBe(1);

      console.warn = warn;
    });
  });

  describe('get', () => {
    it('returns false when name does not match', () => {
      const player = {
        name: 'Player',
        path: 'player/:id',
        keys: ['id']
      };
      active.register(player);
      const playerIsActive = active.get('Player', { name: 'Coach' }, { id: 6 });
      expect(playerIsActive).toBe(false);
    });

    it('returns false when name matches but params do not', () => {
      const player = {
        name: 'Player',
        path: 'player/:id',
        keys: ['id']
      };
      active.register(player);
      const playerIsActive = active.get(
        'Player',
        { name: 'Player', params: { id: 7 } },
        { id: 6 }
      );
      expect(playerIsActive).toBe(false);
    });

    it('returns false when name is partial match but partial is not true', () => {
      const player = {
        name: 'Player',
        path: 'player/:id',
        keys: ['id']
      };
      active.register(player);
      const playerIsActive = active.get(
        'Player',
        { name: 'Coach', partials: ['Player'], params: { id: 6 } },
        { id: 6 }
      );
      expect(playerIsActive).toBe(false);
    });

    it('returns true when name matches and params match', () => {
      const player = {
        name: 'Player',
        path: 'player/:id',
        keys: ['id']
      };
      active.register(player);
      const playerIsActive = active.get(
        'Player',
        { name: 'Player', params: { id: 7 } },
        { id: 7 }
      );
      expect(playerIsActive).toBe(true);
    });

    it('returns true when name is partial match and partial is true', () => {
      const player = {
        name: 'Player',
        path: 'player/:id',
        keys: ['id']
      };
      active.register(player);
      const playerIsActive = active.get(
        'Player',
        { name: 'Coach', partials: ['Player'], params: { id: 6 } },
        { id: 6 },
        true
      );
      expect(playerIsActive).toBe(true);
    });
  });
});
