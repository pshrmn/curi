import 'jest';
import createPath from '../src/createPath';

describe('path', () => {
  it('returns a regular expression using provided string', () => {
    const matcher = createPath('test');
    expect(matcher.re).toBeInstanceOf(RegExp);
  });

  it('returns a "keys" array for identifying matched values', () => {
    const matcher = createPath(':test/:ing');
    const { keys } = matcher;
    const parsedKeys = keys.map(k => k.name);
    expect(parsedKeys).toEqual(expect.arrayContaining(['test', 'ing']));
  });

  describe('options', () => {
    it('passes options to path-to-regexp', () => {
      const defaultMatcher = createPath('here');
      const strictMatcher = createPath('here', { sensitive: true });
      const CapitalizedPath = 'Here';
      expect(defaultMatcher.re.exec(CapitalizedPath)).not.toBe(null);
      expect(strictMatcher.re.exec(CapitalizedPath)).toBe(null);
    });

    it('passes the option sensitive=false by default', () => {
      const matcher = createPath('One');
      const match = matcher.re.exec('one');
      expect(match).not.toBe(null);
    });

    it('passes the option strict=false by default', () => {
      const matcher = createPath('one');
      const match = matcher.re.exec('one/');
      expect(match).not.toBe(null);
    });

    it('passes the option end=true by default', () => {
      const matcher = createPath('one');
      const match = matcher.re.exec('one/two');
      expect(match).toBe(null);
    });
  });
});
