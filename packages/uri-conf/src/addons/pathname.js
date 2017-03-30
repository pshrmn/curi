import PathToRegexp from 'path-to-regexp';
import { join } from '../utils/path';

let knownPaths = {};
let cache = {};

const pathnameAddon = {
  name: 'pathname',
  register: (uri, parent) => {
    const { name, path } = uri;
    let base;
    if (parent && knownPaths[parent]) {
      base = knownPaths[parent];
    }
    knownPaths[name] = base ? join(base, path) : path;
    return name;
  },
  reset: () => {
    knownPaths = {};
    cache = {};
  },
  get: (name, params) => {
    if (knownPaths[name] == null) {
      console.error(`Could not generate pathname for ${name} because it is not registered.`);
      return;
    }
    const compile = cache[name]
      ? cache[name]
      : (cache[name] = PathToRegexp.compile(knownPaths[name]))
    return compile(params, { pretty: true });
  }
};

export default pathnameAddon;
