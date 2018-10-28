import pathname from "./pathname";

import { PathFunction, PathFunctionOptions } from "path-to-regexp";
import { Interaction } from "../types/interaction";

export default function deprecatedPathname(
  options?: PathFunctionOptions
): Interaction {
  let hasWarned = false;
  if (process.env.NODE_ENV !== "production") {
    if (!hasWarned) {
      console.warn(`Deprecation warning:
pathname() should not be called manually. It will be removed in the next major version of @curi/router.`);
      hasWarned = true;
    }
  }
  return pathname(options);
}
