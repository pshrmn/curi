import { buildRoutes } from "@curi/router";

import plainBaseRoutes from "./base";
import plainAdminRoutes from "./admin";

export const baseRoutes = buildRoutes(plainBaseRoutes);
export const adminRoutes = buildRoutes(plainAdminRoutes);
