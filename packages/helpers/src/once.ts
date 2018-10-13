export type AnyFn = (...args: Array<any>) => Promise<any>;

export default function once(fn: AnyFn): AnyFn {
  let promise: Promise<any>;
  let hasRun: boolean = false;

  return function(): Promise<any> {
    if (hasRun) {
      return promise;
    }

    promise = fn.apply(null, arguments);
    hasRun = true;
    return promise;
  };
}
