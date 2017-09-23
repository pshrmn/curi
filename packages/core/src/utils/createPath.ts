import PathToRegexp, { RegExpOptions, Key } from 'path-to-regexp';

export interface Path {
  re: RegExp,
  keys: Array<Key>
}

const path = (pathString: string, options?: RegExpOptions): Path => {
  const keys: Array<Key> = [];
  const re = PathToRegexp(pathString, keys, options);
  return { re, keys };
};

export default path;
