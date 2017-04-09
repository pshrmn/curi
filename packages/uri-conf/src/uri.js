import {
  join,
  stripLeadingSlash,
  withLeadingSlash
} from './utils/path';

function once(fn) {
  let promise = null;
  let hasRun = false;

  return function() {
    if (hasRun) {
      return promise;
    }

    promise = fn()
    hasRun = true;
    return promise;
  }
}

const uri = (name, fn, path, children, loading = {}) => ({
  name,
  fn,
  path: path.path,
  children,
  preload: loading.preload ? once(loading.preload) : undefined,
  load: loading.load ? loading.load : undefined,
  match: function(pathname, response, parentURI) {
    const testPath = stripLeadingSlash(pathname);
    const match = path.re.exec(testPath);
    if (!match) {
      return false;
    }
    const [ segment, ...parsed ] = match;
    const params = {};
    path.keys.forEach((key, index) => {
      params[key.name] = parsed[index];
    });
    const uriString = parentURI != null ? join(parentURI, segment) : withLeadingSlash(segment);
    response.add(this, params);

    if (children) {
      // the children should only match against the unmatched portion
      const remainder = testPath.slice(segment.length)
      children.some(c => {
        return c.match(remainder, response, uriString);
      });
    }

    return true;
  }
});

export default uri;
