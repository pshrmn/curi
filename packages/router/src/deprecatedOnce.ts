import { once } from "@curi/helpers";
import { AnyFn } from "@curi/helpers";

let hasWarned = false;

export default function deprecatedOnce(fn: AnyFn) {
  if (process.env.NODE_ENV !== "production") {
    if (!hasWarned) {
      console.warn(`Deprecation warning:
once() has been moved to the @curi/helpers package.
Please install @curi/helpers and import once() from that package instead.

import { once } from "@curi/helpers";`);
      hasWarned = true;
    }
  }
  return once(fn);
}
