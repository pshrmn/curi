export const with_leading_slash = (path: string): string =>
  path.charAt(0) === "/" ? path : "/" + path;

const with_trailing_slash = (path: string): string =>
  path.charAt(path.length - 1) === "/" ? path : path + "/";

export const join = (beginning: string, end: string): string =>
  with_trailing_slash(beginning) + end;
