import PathToRegexp from 'path-to-regexp';

const DEFAULT_OPTIONS = {
  sensitive: false,
  strict: false,
  end: true,
  delimiter: '/'
};

const path = (pathString, options) => {
  const keys = [];
  const mergedOptions = Object.assign({}, DEFAULT_OPTIONS, options);
  const re = PathToRegexp(pathString, keys, mergedOptions);

  return { re, keys };
};

export default path;
