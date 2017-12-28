import { HickoryLocation } from '@hickory/root';
import { InternalRoute } from './types/route';
import { PendingResponse } from './types/response';
export default function createResponse(location: HickoryLocation, routes: Array<InternalRoute>): Promise<PendingResponse>;
