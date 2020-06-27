export declare type AnyFn = (...args: any[]) => Promise<any>;
export declare let once: (fn: AnyFn) => AnyFn;
export declare let preferDefault: (module: any) => Promise<any>;
