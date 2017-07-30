export const withLeadingSlash = path =>
  path.charAt(0) === '/' ? path : '/' + path;

export const stripLeadingSlash = path =>
  path.charAt(0) === '/' ? path.slice(1) : path;

const withTrailingSlash = path =>
  path.charAt(path.length - 1) === '/' ? path : path + '/';

export const join = (beginning, end) => withTrailingSlash(beginning) + end;
