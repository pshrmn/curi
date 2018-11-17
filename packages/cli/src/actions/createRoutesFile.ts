import path from "path";
import * as fs from "fs-extra";
import { types, stringify } from "@posh/ast";

import { createRoute } from "../ast/route";

import { CuriConfig } from "../types";

export default async function createRoutesFile(
  config: CuriConfig,
  root: string
) {
  const { src, routes } = config.files;
  const srcDir = path.join(root, src);
  const routesSrc = path.join(srcDir, routes);

  const importPrepare = types.importNamed(["prepareRoutes"], "@curi/router");
  const routesArray = types.array();
  const preparedRoutes = types.call("prepareRoutes", [routesArray]);

  const notFoundRoute = createRoute("Not Found", "(.*)");
  routesArray.elements.push(notFoundRoute);

  const exportRoutes = types.exportDefault(preparedRoutes);

  let code = "";
  code += stringify([importPrepare], 2);
  code += stringify([exportRoutes], 1);

  // use ensure file in case the file is in a dir that needs to be created
  await fs.ensureFile(routesSrc);
  fs.writeFile(routesSrc, code);
}
