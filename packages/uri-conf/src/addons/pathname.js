import PathToRegexp from 'path-to-regexp';
import { withLeadingSlash, join } from '../utils/path';

let knownPaths = {};
let cache = {};

const pathnameAddon = {
  name: 'pathname',
  register: (uri, parent) => {
    const { name, path } = uri;
    if (knownPaths[name] !== undefined) {
      console.warn(
        'A pathname with the name "' + name + '" already exists. Each uri should' +
        'have a unique name. By registering a pathname with a name that already exists, ' +
        'you are overwriting the existing pathname. This may break your application.'
      );
    }
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
    return withLeadingSlash(compile(params, { pretty: true }));
  }
};

export default pathnameAddon;
