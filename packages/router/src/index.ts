import { PrepareRoutesOptions } from "./prepare/prepareRoutes";
import { RouterOptions } from "./router/createRouter";
export { PrepareRoutesOptions, RouterOptions };

import createRouter from "./router/createRouter";
import prepareRoutes from "./prepare/prepareRoutes";
import pathname from "./interactions/pathname";
import active from "./interactions/active";
import ancestors from "./interactions/ancestors";
import prefetch from "./interactions/prefetch";

export { createRouter, prepareRoutes, pathname, active, ancestors, prefetch };
