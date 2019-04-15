import { prepareRoutes } from "@curi/router";
import prefetch from "@curi/route-prefetch";

import home from "./home";
import tutorials from "./tutorials";
import guides from "./guides";
import packages from "./packages";
import examples from "./examples";
import notFound from "./not-found";

export default prepareRoutes(
  [home, tutorials, guides, packages, examples, notFound],
  [prefetch()]
);
