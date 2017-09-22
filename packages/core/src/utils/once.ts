export default function once(
  fn: () => Promise<any>
): () => Promise<any> {
  let promise: Promise<any> = null;
  let hasRun: boolean = false;

  return function(): Promise<any> {
    if (hasRun) {
      return promise;
    }

    promise = fn();
    hasRun = true;
    return promise;
  };
}
