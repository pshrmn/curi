import { HickoryLocation } from '@hickory/root';
import { InternalRoute } from './types/route';
import { Addons } from './types/addon';
import { Response, PendingResponse } from './types/response';
export declare function createResponse(location: HickoryLocation, routes: Array<InternalRoute>): Promise<PendingResponse>;
export declare function finishResponse(pending: PendingResponse, addons: Addons): Response;
