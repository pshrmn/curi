import path from "path";
import * as fs from "fs-extra";
import generate from "@babel/generator";
import * as t from "@babel/types";
import { stringify, types } from "@posh/ast";

import {
  mapHistoryName,
  mapInteractionName,
  mapSideEffectName
} from "./utils/nameMaps";

import { CuriConfig, CuriDependencies } from "../types";

function generateRouterModule(routes: string, deps: CuriDependencies) {
  const curiImport = types.importNamed(["curi"], "@curi/router");

  const historyImportName = mapHistoryName(deps.history);
  const historyImport = types.importDefault(historyImportName, deps.history);

  const routesImport = types.importDefault("routes", routes);

  let hasOptions = false;
  const routerOptions = types.object([]);

  // import & create interactions
  let interactionImports: Array<t.ImportDeclaration> = [];
  if (deps.interactions.length) {
    hasOptions = true;
    const interactionArray = types.array();

    deps.interactions.forEach(i => {
      const name = mapInteractionName(i);

      interactionImports.push(types.importDefault(name, i));

      interactionArray.elements.push(types.call(name, []));
    });

    routerOptions.properties.push(
      types.objProp(types.id("route"), interactionArray)
    );
  }

  // import & create side effects
  let sideEffectImports: Array<t.ImportDeclaration> = [];
  let sideEffectCreates: Array<t.VariableDeclaration> = [];
  if (deps.sideEffects.length) {
    hasOptions = true;
    const sideEffectArray = types.array();

    deps.sideEffects.forEach(s => {
      const name = mapSideEffectName(s);
      const sideEffectName = `${name}Effect`;

      sideEffectImports.push(types.importDefault(name, s));

      sideEffectCreates.push(
        types.constVar(sideEffectName, types.call(name, []))
      );

      sideEffectArray.elements.push(types.id(sideEffectName));
    });

    routerOptions.properties.push(
      types.objProp(types.id("sideEffects"), sideEffectArray)
    );
  }

  const history = types.constVar("history", types.call(historyImportName, []));
  const callCuri = types.call("curi", [
    types.id("history"),
    types.id("routes")
  ]);
  const router = types.constVar("router", callCuri);

  if (hasOptions) {
    callCuri.arguments.push(routerOptions);
  }

  const exportRouter = types.exportDefault(types.id("router"));

  let code = "";
  code += stringify(
    [curiImport, historyImport, ...interactionImports, ...sideEffectImports],
    2
  );
  code += stringify([routesImport], 2);
  code += stringify([history], 2);
  if (sideEffectCreates.length) {
    code += stringify(sideEffectCreates, 2);
  }
  code += stringify([router, exportRouter], 1);

  return code;
}

export default async function createRouterFile(
  config: CuriConfig,
  deps: CuriDependencies,
  root: string
) {
  const { src, router, routes } = config.files;
  const srcDir = path.join(root, src);
  const routerSrc = path.join(srcDir, router);
  const routerDir = path.dirname(routerSrc);
  const routesSrc = path.join(srcDir, routes);
  let relativeRoutes = path.relative(routerDir, routesSrc);

  if (relativeRoutes.charAt(0) !== ".") {
    relativeRoutes = `./${relativeRoutes}`;
  }

  // use ensure file in case the file is in a dir that needs to be created
  await fs.ensureFile(routerSrc);
  const routerCode = generateRouterModule(relativeRoutes, deps);

  return fs.writeFile(routerSrc, routerCode);
}
