import { Route } from "./route";

export type RegisterInteraction = (route: Route, parent?: any) => any;
export type GetInteraction = (name: string, ...rest: Array<any>) => any;

export interface Interaction {
  name: string;
  register: RegisterInteraction;
  get: GetInteraction;
  reset(): void;
}

export type Interactions = { [key: string]: GetInteraction };
