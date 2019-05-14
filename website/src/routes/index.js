import { prepareRoutes } from "@curi/router";

import home from "./home";
import tutorials from "./tutorials";
import guides from "./guides";
import packages from "./packages";
import legacyPackages from "./packages/legacy";
import examples from "./examples";
import notFound from "./not-found";

export default prepareRoutes([
  home,
  tutorials,
  guides,
  packages,
  examples,
  legacyPackages,
  notFound
]);
