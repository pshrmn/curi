import { InternalRoute } from '../route';
import { Params } from '../interface';
export interface Match {
    route: InternalRoute;
    params: Params;
}
export default function matchRoute(route: InternalRoute, pathname: string, matches: Array<Match>, parentPath?: string): boolean;
