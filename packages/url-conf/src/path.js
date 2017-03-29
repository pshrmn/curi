import pathToRegexp from 'path-to-regexp';

const DEFAULT_OPTIONS = {
  sensitive: false,
  strict: false,
  end: false, // this is different than the default
  delimiter: '/'
};

const path = (path, options) => {
  const keys = [];
  const mergedOptions = Object.assign({}, DEFAULT_OPTIONS, options);
  const re = pathToRegexp(path, keys, mergedOptions);
  const compiled = pathToRegexp.compile(path);
  const reverse = params => compiled(params, { pretty: true });
  return { re, keys, reverse };
};

export default path;
