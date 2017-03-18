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
});
