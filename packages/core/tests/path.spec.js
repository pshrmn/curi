import createPath from '../src/utils/createPath';

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
      const defaultMatcher = createPath('here/');
      const strictMatcher = createPath('here/', { strict: true });

      expect(defaultMatcher.re.exec('here')).not.toBe(null);
      expect(strictMatcher.re.exec('here')).toBe(null);
    });

    it('passes the option sensitive=false by default', () => {
      const matcher = createPath('One');
      const match = matcher.re.exec('one');
      expect(match).not.toBe(null);
    });

    it('passes the option strict=false by default', () => {
      const matcher = createPath('one/');
      const match = matcher.re.exec('one');
      expect(match).not.toBe(null);
    });

    it('passes the option end=true by default', () => {
      const matcher = createPath('one');
      const match = matcher.re.exec('one/two');
      expect(match).toBe(null);
    });
  });
});
