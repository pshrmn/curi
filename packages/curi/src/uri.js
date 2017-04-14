import { join, stripLeadingSlash, withLeadingSlash } from './utils/path';

function once(fn) {
  let promise = null;
  let hasRun = false;

  return function() {
    if (hasRun) {
      return promise;
    }

    promise = fn();
    hasRun = true;
    return promise;
  };
}

const uri = options => {
  const { name, path, value, call, children, preload, load } = options || {};

  if (name == null || path == null) {
    throw new Error('A URI must have defined name and path properties');
  }

  return {
    name,
    path: path.path,
    render: function() {
      if (value != null) {
        return value;
      } else if (call != null) {
        return call();
      }
    },
    children,
    preload: preload ? once(preload) : undefined,
    load,
    match: function(pathname, response, parentURI) {
      const testPath = stripLeadingSlash(pathname);
      const match = path.re.exec(testPath);
      if (!match) {
        return false;
      }
      const [segment, ...parsed] = match;
      const params = {};
      path.keys.forEach((key, index) => {
        params[key.name] = parsed[index];
      });
      const uriString = parentURI != null
        ? join(parentURI, segment)
        : withLeadingSlash(segment);
      response.add(this, params);

      if (children) {
        // the children should only match against the unmatched portion
        const remainder = testPath.slice(segment.length);
        children.some(c => {
          return c.match(remainder, response, uriString);
        });
      }

      return true;
    }
  };
};

export default uri;
