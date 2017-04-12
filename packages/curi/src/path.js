import PathToRegexp from 'path-to-regexp';

const DEFAULT_OPTIONS = {
  sensitive: false,
  strict: false,
  end: true,
  delimiter: '/'
};

const path = (path, options) => {
  const keys = [];
  const mergedOptions = Object.assign({}, DEFAULT_OPTIONS, options);
  const re = PathToRegexp(path, keys, mergedOptions);

  return { re, keys, path };
};

export default path;
