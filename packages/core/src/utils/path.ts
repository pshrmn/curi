export const withLeadingSlash = (path: string): string =>
  path.charAt(0) === '/' ? path : '/' + path;

export const stripLeadingSlash = (path: string): string =>
  path.charAt(0) === '/' ? path.slice(1) : path;

const withTrailingSlash = (path: string): string =>
  path.charAt(path.length - 1) === '/' ? path : path + '/';

export const join = (beginning: string, end: string): string =>
  withTrailingSlash(beginning) + end;
