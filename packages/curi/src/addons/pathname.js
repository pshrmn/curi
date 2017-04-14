import PathToRegexp from 'path-to-regexp';
import { withLeadingSlash, join } from '../utils/path';

function createPathnameAddon() {
  let knownPaths = {};
  let cache = {};

  return {
    name: 'pathname',
    register: (route, parent) => {
      const { name, path: pathObj } = route;
      const { path } = pathObj;
      if (knownPaths[name] !== undefined) {
        console.warn(
          'A pathname with the name "' +
            name +
            '" already exists. Each route should' +
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
    get: (name, params) => {
      if (knownPaths[name] == null) {
        console.error(
          `Could not generate pathname for ${name} because it is not registered.`
        );
        return;
      }
      const compile = cache[name]
        ? cache[name]
        : (cache[name] = PathToRegexp.compile(knownPaths[name]));
      return withLeadingSlash(compile(params, { pretty: true }));
    }
  };
}

export default createPathnameAddon;
