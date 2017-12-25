import { ParamParsers } from '../types/route';
import { RawParams, Params } from '../types/response';
export default function parseParams(params: RawParams, fns: ParamParsers): Params;
