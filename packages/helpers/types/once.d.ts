export declare type AnyFn = (...args: any[]) => Promise<any>;
declare let once: (fn: AnyFn) => AnyFn;
export default once;
