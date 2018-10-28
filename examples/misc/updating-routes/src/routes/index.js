import { prepareRoutes } from "@curi/router";

import plainBaseRoutes from "./base";
import plainAdminRoutes from "./admin";

export const baseRoutes = prepareRoutes(plainBaseRoutes);
export const adminRoutes = prepareRoutes(plainAdminRoutes);
