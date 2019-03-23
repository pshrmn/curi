import { prepare_routes } from "@curi/router";

import plainBaseRoutes from "./base";
import plainAdminRoutes from "./admin";

export const baseRoutes = prepare_routes(plainBaseRoutes);
export const adminRoutes = prepare_routes(plainAdminRoutes);
