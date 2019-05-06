import { Route } from "@curi/types";
declare function ancestors(route: Route, level: number): string;
declare function ancestors(route: Route): Array<string>;
export default ancestors;
