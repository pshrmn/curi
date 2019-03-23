import { ParamParsers } from "../types/route";
import { RawParams, Params } from "../types/response";
export default function parse_params(params: RawParams, fns?: ParamParsers): Params;
