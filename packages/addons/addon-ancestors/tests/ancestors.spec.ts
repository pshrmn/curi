import 'jest';
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
    it("returns an array with the route's name when there are no ancestors", () => {
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
    it('returns all ancestors when level is undefined (or null)', () => {
      const player = { name: 'Player' };
      ancestors.register(player, ['Team', 'League']);
      expect(ancestors.get('Player')).toEqual(['Team', 'League']);
      expect(ancestors.get('Player', null)).toEqual(['Team', 'League']);
    });

    it('returns a copy of the ancestors array, not the original', () => {
      const player = { name: 'Player' };
      ancestors.register(player, ['Team', 'League']);
      const older = ancestors.get('Player');
      older.reverse();
      const older2 = ancestors.get('Player');
      expect(older).not.toEqual(older2);
    });

    it('returns undefined when level is not a postive integer', () => {
      const player = { name: 'Player' };
      ancestors.register(player, ['Team']);
      const badArgs = ['no', 0];
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

    it('returns undefined if route does not exist', () => {
      expect(ancestors.get('This route does not exist')).toBeUndefined();
    });
  });

  describe('reset', () => {
    it('resets registered routes', () => {
      const player = { name: 'Player' };
      ancestors.register(player, ['Team', 'League']);
      expect(ancestors.get('Player')).toEqual(['Team', 'League']);
      expect(ancestors.get('Player', null)).toEqual(['Team', 'League']);
      ancestors.reset();
      expect(ancestors.get('Player')).toBeUndefined();
    });
  });
});
