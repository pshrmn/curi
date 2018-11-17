import path from "path";
import * as fs from "fs-extra";

import createRouterFile from "./createRouterFile";
import createRoutesFile from "./createRoutesFile";

import { CuriConfig, CuriDependencies } from "../types";

export default async function setupProjectFiles(
  config: CuriConfig,
  deps: CuriDependencies,
  root: string
) {
  const { src, components } = config.files;

  await fs.ensureDir(src);
  await createRouterFile(config, deps, root);
  await createRoutesFile(config, root);

  const srcDir = path.join(root, src);
  const componentDir = path.join(srcDir, components);
  await fs.ensureDir(componentDir);
}
