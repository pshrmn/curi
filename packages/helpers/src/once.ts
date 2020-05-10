export type AnyFn = (...args: any[]) => Promise<any>;

let once = (fn: AnyFn): AnyFn => {
  let promise: Promise<any>;

  return (...args: any[]) => {
    if (promise !== undefined) {
      return promise;
    }

    promise = fn(...args);
    return promise;
  };
};

export default once;
