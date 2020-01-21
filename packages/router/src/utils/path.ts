export let withLeadingSlash = (path: string): string =>
  path.charAt(0) === "/" ? path : "/" + path;

let withTrailingSlash = (path: string): string =>
  path.charAt(path.length - 1) === "/" ? path : path + "/";

export let join = (beginning: string, end: string): string =>
  withTrailingSlash(beginning) + end;
