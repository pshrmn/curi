import { Route } from "@curi/types";
import { PreparedRoute } from "./prepareRoutes";
export default function mapRoutes(routes: Array<PreparedRoute>, map: {
    [key: string]: Route;
}): {
    [key: string]: Route<unknown>;
};
