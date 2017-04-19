export default function once(fn) {
  let promise = null;
  let hasRun = false;

  return function() {
    if (hasRun) {
      return promise;
    }

    promise = fn();
    hasRun = true;
    return promise;
  };
}
