import { prompt } from "inquirer";
import * as fs from "fs-extra";
import path from "path";

import { overwriteRouter, overwriteRoutes } from "../questions/install/files";

import { CuriConfig } from "../types";

// if anything in here throws, let this fns caller catch and handle it
export default async function existingFilesPrompts(config: CuriConfig) {
  console.log("\nChecking existing files\n");

  const root = process.cwd();
  const { src, router, routes } = config.files;
  const routerFile = path.join(root, src, router);
  const routesFile = path.join(root, src, routes);

  let hasExistingFiles = false;

  if (fs.existsSync(routerFile)) {
    hasExistingFiles = true;
    await prompt(overwriteRouter);
  }

  if (fs.existsSync(routesFile)) {
    hasExistingFiles = true;
    await prompt(overwriteRoutes);
  }

  if (!hasExistingFiles) {
    console.log("No existing files to overwrite");
  }
}
