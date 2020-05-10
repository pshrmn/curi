import { Route, Params } from "@curi/types";
declare let pathname: (route: Route<unknown>, params?: Params | undefined) => string;
export default pathname;
