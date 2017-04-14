import path, { parentPath } from '../src/path';

describe('path', () => {
  it('returns a regular expression using provided string', () => {
    const matcher = path('test');
    expect(matcher.re).toBeInstanceOf(RegExp);
  });

  it('returns a "keys" array for identifying matched values', () => {
    const matcher = path(':test/:ing');
    const { keys } = matcher;
    const parsedKeys = keys.map(k => k.name);
    expect(parsedKeys).toEqual(expect.arrayContaining(['test', 'ing']));
  });

  describe('options', () => {
    it('passes options to path-to-regexp', () => {
      const defaultMatcher = path('here/');
      const strictMatcher = path('here/', { strict: true });

      expect(defaultMatcher.re.exec('here')).not.toBe(null);
      expect(strictMatcher.re.exec('here')).toBe(null);
    });

    it('passes the option sensitive=false by default', () => {
      const matcher = path('One');
      const match = matcher.re.exec('one');
      expect(match).not.toBe(null);
    });

    it('passes the option strict=false by default', () => {
      const matcher = path('one/');
      const match = matcher.re.exec('one');
      expect(match).not.toBe(null);
    });

    it('passes the option end=true by default', () => {
      const matcher = path('one');
      const match = matcher.re.exec('one/two');
      expect(match).toBe(null);
    });
  });
});

describe('parentPath', () => {
  it('returns a path with end=false', () => {
    const matcher = parentPath('test');
    const match = matcher.re.exec('test/ing');
    expect(match).not.toBe(null);
  });

  it('sets end=false even if provided end=true option', () => {
    const matcher = parentPath('test', { end: true });
    const match = matcher.re.exec('test/ing');
    expect(match).not.toBe(null);
  });
});
