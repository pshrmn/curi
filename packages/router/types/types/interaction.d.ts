import { Route } from "./route";
export declare type RegisterInteraction = (route: Route, parent?: any) => any;
export declare type GetInteraction = (name: string, ...rest: Array<any>) => any;
export interface Interaction {
    name: string;
    register: RegisterInteraction;
    get: GetInteraction;
    reset(): void;
}
export declare type Interactions = {
    [key: string]: GetInteraction;
};
