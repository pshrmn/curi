import { RegExpOptions, Key } from 'path-to-regexp';
export interface Path {
    re: RegExp;
    keys: Array<Key>;
}
export default function path(pathString: string, options?: RegExpOptions): Path;
