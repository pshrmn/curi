import { HickoryLocation } from '@hickory/root';
import { InternalRoute } from './types/route';
import { PendingResponse } from './types/response';
export declare function createResponse(location: HickoryLocation, routes: Array<InternalRoute>): PendingResponse;
export declare function asyncCreateResponse(location: HickoryLocation, routes: Array<InternalRoute>): Promise<PendingResponse>;
