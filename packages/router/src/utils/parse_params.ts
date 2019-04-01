import { ParamParsers, Params } from "@curi/types";
import { RawParams } from "../types/response";

export default function parse_params(
  params: RawParams,
  fns?: ParamParsers
): Params {
  if (!fns) {
    return params;
  }
  const output: Params = {};
  // For each param, attempt to parse it. However, if that
  // fails, fall back to the string value.
  for (let key in params) {
    let value = params[key];
    let fn = fns[key];
    if (fn) {
      try {
        value = fn(value);
      } catch (e) {
        console.error(e);
        value = params[key];
      }
    }
    output[key] = value;
  }
  return output;
}
