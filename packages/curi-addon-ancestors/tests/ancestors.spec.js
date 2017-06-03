import createAncestors from '../src';

describe('ancestors addon', () => {
  let ancestors;

  beforeEach(() => {
    ancestors = createAncestors();
  });

  describe('name', () => {
    it('is ancestors', () => {
      expect(ancestors.name).toBe('ancestors');
    });
  });

  describe('register', () => {
    it('returns an array with the route\'s name when there are no ancestors', () => {
      const player = { name: 'Player' };
      const older = ancestors.register(player);
      expect(older).toEqual(['Player']);
    });

    it('prepends the new route to returned ancestors array', () => {
      const player = { name: 'Player' };
      const older = ancestors.register(player, ['Team']);
      expect(older).toEqual(['Player', 'Team']);
    });

    it('warns when registering the same name', () => {
      const warn = console.warn;
      console.warn = jest.fn();

      const first = { name: 'Test' };
      const second = { name: 'Test' };

      ancestors.register(first);
      expect(console.warn.mock.calls.length).toBe(0);

      ancestors.register(second);
      expect(console.warn.mock.calls.length).toBe(1);

      console.warn = warn;
    });
  });

  describe('get', () => {
    it('returns undefined when level is not a postive integer', () => {
      const player = { name: 'Player' };
      ancestors.register(player, ['Team']);
      const badArgs = [undefined, 'no', 0];
      badArgs.forEach(arg => {
        expect(ancestors.get('Player', arg)).toBeUndefined();
      });
    });

    it('returns undefined when the level is larger than the ancestor count', () => {
      const player = { name: 'Player' };
      ancestors.register(player, ['Team']);
      expect(ancestors.get('Player', 2)).toBeUndefined();
    });

    it('returns the ancestor at the requested level', () => {
      const player = { name: 'Player' };
      ancestors.register(player, ['Team', 'League']);
      expect(ancestors.get('Player', 1)).toBe('Team');
      expect(ancestors.get('Player', 2)).toBe('League');
    });    
  });
});
