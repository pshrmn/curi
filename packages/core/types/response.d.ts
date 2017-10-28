import { HickoryLocation, ToArgument } from '@hickory/root';
import { Route } from './route';
import { Params, Addons } from './interface';
export interface ResponseProps {
    location: HickoryLocation;
    params: Params;
    partials: Array<string>;
    status: number;
    data: any;
    error?: any;
    redirectTo?: ToArgument;
}
export interface Response {
    key: string;
    location: HickoryLocation;
    status: number;
    data: any;
    title: string;
    body: any;
    name?: string;
    partials?: Array<string>;
    params?: Params;
    error?: any;
    redirectTo?: any;
}
declare function createResponse(location: HickoryLocation, routes: Array<Route>, addons: Addons): Promise<Response>;
export default createResponse;
