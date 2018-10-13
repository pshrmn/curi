declare type AnyFn = (...args: Array<any>) => Promise<any>;
export default function once(fn: AnyFn): AnyFn;
export {};
