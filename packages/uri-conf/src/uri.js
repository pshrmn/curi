import {
  join,
  stripLeadingSlash,
  withLeadingSlash
} from './utils/path';

const uri = (name, path, children, load = {}) => {
  const preload = {
    promise: null,
    complete: false
  };

  /*
   * pathname - the location pathname to match against. If a uri matches part of
   *   the pathname, then its children will only match against the unmatched part.
   * register - an object whose keys are uri names and whose
   *   values are uriData objects
   * awaiting - a function that takes a promise. Any async loading functions
   *   should register their promise by passing it to awaiting.
   * parent - the parent uriData object
   */
  const match = (pathname, register, awaiting, parent) => {
    const testPath = stripLeadingSlash(pathname);
    const match = path.re.exec(testPath);

    if (!match) {
      return false;
    }

    const [ segment, ...parsed ] = match
    const params = Object.assign({}, parent && parent.params)
    path.keys.forEach((key, index) => {
      params[key.name] = parsed[index]
    })

    const uriData = {
      segment,
      params,
      uri: parent ? join(parent.uri, segment) : withLeadingSlash(segment)
    };

    register[name] = uriData

    if (load.preload && !preload.complete) {
      // if this is called again before the original promise has resolved,
      // then just re-await it
      if (preload.promise == null) {
        preload.promise = load.preload().then(() => {
          preload.promise = null;
          preload.complete = true;
        });
      }
      awaiting(preload.promise)
    }

    if (load.load) {
      awaiting(load.load(uriData))
    }

    if (children) {
      // the children should only match against the unmatched portion
      const remainder = testPath.slice(segment.length)
      children.some(c => {
        return c.match(remainder, register, awaiting, uriData);
      });
    }

    return true;
  };

  return {
    match,
    name,
    path: path.path,
    children,
    load
  };
};

export default uri;
