export default function once(
  fn: (...args: Array<any>) => Promise<any>
): () => Promise<any> {
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
