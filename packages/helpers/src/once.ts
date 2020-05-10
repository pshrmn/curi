export type AnyFn = (...args: any[]) => Promise<any>;

let once = (fn: AnyFn): AnyFn => {
  let promise: Promise<any>;

  return function() {
    if (promise !== undefined) {
      return promise;
    }

    // eslint-disable-next-line prefer-spread,prefer-rest-params
    promise = fn.apply(null, arguments);
    return promise;
  };
};

export default once;
