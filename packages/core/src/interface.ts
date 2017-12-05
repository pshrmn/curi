import { HickoryLocation, Action } from '@hickory/root';
import { Route } from './route';
import { Response } from './response';

export type AddonRegister = (route: Route, parent?: any) => any;
export type AddonGet = (name: string, ...rest: Array<any>) => any;

export interface Addon {
  name: string;
  register: AddonRegister;
  get: AddonGet;
  reset(): void;
}

export type Addons = { [key: string]: AddonGet };

export type ResponseHandler = (response: Response, action?: Action) => void;
export type RemoveResponseHandler = () => void;

export interface SideEffect {
  fn: ResponseHandler;
  after?: boolean;
}

export interface Cache {
  set: (response: Response) => void;
  get: (location: HickoryLocation) => Response;
}

export type RawParams = { [key: string]: string };
export type Params = { [key: string]: any };

export interface RouteProps {
  params: object;
  location: object;
  name: string;
}
export interface ResponseSetters {
  error: (err: any) => void;
  redirect: (to: any, status?: number) => void;
  data: (data: any) => void;
  status: (status: number) => void;
  body: (body: any) => void;
}

export interface FinishProps {
  error: any;
  resolved: any;
  route: RouteProps;
  set: ResponseSetters;
  addons: Addons;
}

export type EveryMatchFn = (route?: RouteProps) => Promise<any>;
export type InitialMatchFn = () => Promise<any>;
export type FinishMatchFn = (props: FinishProps) => void;
