import { join, stripLeadingSlash, withLeadingSlash } from './path';
import once from './once';
import createPath from './createPath';

const uri = options => {
  const {
    name,
    path,
    pathOptions = {},
    value,
    call,
    children,
    preload,
    load
  } = options || {};

  if (name == null || path == null) {
    throw new Error('A URI must have defined name and path properties');
  }

  // create the path
  if (children) {
    pathOptions.end = false;
  }
  const regexPath = createPath(path, pathOptions);

  return {
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
    match: function(pathname, response, parentURI) {
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
      const uriString = parentURI != null
        ? join(parentURI, segment)
        : withLeadingSlash(segment);
      response.add(this, params);

      if (children) {
        // children only need to match against unmatched segments
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
