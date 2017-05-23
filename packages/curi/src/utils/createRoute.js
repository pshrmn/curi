import { join, stripLeadingSlash, withLeadingSlash } from './path';
import once from './once';
import createPath from './createPath';

const createRoute = options => {
  const {
    name,
    path,
    pathOptions = {},
    value,
    call,
    children,
    preload,
    load,
    ...rest
  } = options || {};

  if (name == null || path == null) {
    throw new Error('A route must have defined name and path properties');
  }

  // end defaults to true, so end has to be hardcoded for it to be false
  const expectedExact = pathOptions.end == null || pathOptions.end;
  // when we have child routes, we need to perform non-end matching
  if (children) {
    pathOptions.end = false;
  }
  const regexPath = createPath(path, pathOptions);

  return {
    ...rest,
    name,
    path: path,
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
    keys: regexPath.keys.map(key => key.name),
    match: function(pathname, response, parentPath) {
      const testPath = stripLeadingSlash(pathname);
      const match = regexPath.re.exec(testPath);
      if (!match) {
        return false;
      }
      const [segment, ...parsed] = match;
      const params = {};
      regexPath.keys.forEach((key, index) => {
        params[key.name] = parsed[index];
      });
      const uriString = parentPath != null
        ? join(parentPath, segment)
        : withLeadingSlash(segment);

      response.push(this, params);
      // if there are no children, then we accept the match
      if (!children || !children.length) {
        return true;
      }
      // children only need to match against unmatched segments
      const remainder = testPath.slice(segment.length);
      const notExact = !!remainder.length;
      const hasChildMatch = children.some(c =>
        c.match(remainder, response, uriString)
      );
      // if the route has children, but none of them match, remove the match unless it
      // is exact
      if (expectedExact && notExact && !hasChildMatch) {
        response.pop();
        return false;
      }
      return true;
    }
  };
};

export default createRoute;
