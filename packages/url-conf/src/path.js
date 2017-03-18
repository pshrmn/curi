import pathToRegexp from 'path-to-regexp';

const path = (path, options) => {
  const keys = [];
  const re = pathToRegexp(path, keys, options);
  return { re, keys };
};

export default path;
