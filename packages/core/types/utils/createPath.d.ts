import PathToRegexp, { Key } from 'path-to-regexp';
export interface Path {
    re: RegExp;
    keys: Array<Key>;
}
declare const path: (pathString: string, options?: PathToRegexp.RegExpOptions) => Path;
export default path;
