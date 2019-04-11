export type AnyFn = (...args: Array<any>) => Promise<any>;

export default function once(fn: AnyFn): AnyFn {
  let promise: Promise<any>;

  return function(): Promise<any> {
    if (promise !== undefined) {
      return promise;
    }

    promise = fn.apply(null, arguments);
    return promise;
  };
}
