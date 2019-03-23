export type AnyFn = (...args: Array<any>) => Promise<any>;

export default function once(fn: AnyFn): AnyFn {
  let promise: Promise<any>;
  let has_run: boolean = false;

  return function(): Promise<any> {
    if (has_run) {
      return promise;
    }

    promise = fn.apply(null, arguments);
    has_run = true;
    return promise;
  };
}
