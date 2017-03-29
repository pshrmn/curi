import path from '../src/path';

describe('path', () => {
  it('returns a regular expression using provided string', () => {
    const matcher = path('test');
    expect(matcher.re).toBeInstanceOf(RegExp);
  });

  it('returns a "keys" array for identifying matched values', () => {
    const matcher = path(':test/:ing');
    const { keys } = matcher
    const parsedKeys = keys.map(k => k.name)
    expect(parsedKeys).toEqual(expect.arrayContaining(['test', 'ing']));
  });

  it('returns a "reverse" function to create a path', () => {
    const matcher = path(':test/:ing');
    const { reverse } = matcher;
    const params = { test: 'one', ing: 'two' };
    const output = reverse(params);
    expect(output).toBe('one/two')
  })

  describe('options', () => {
    it('passes options to path-to-regexp', () => {
      const defaultMatcher = path('here/');
      const strictMatcher = path('here/', { strict: true });

      expect(defaultMatcher.re.exec('here')).not.toBe(null);
      expect(strictMatcher.re.exec('here')).toBe(null);
    });

    it('passes the option end=false by default', () => {
      const matcher = path('one');
      const match = matcher.re.exec('one/two');
      expect(match).not.toBe(null);
    });
  });

});
