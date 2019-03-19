import path from "path";

import { readConfig } from "../config";
import existingFilePrompts from "../prompts/existingFiles";
import packagePrompts from "../prompts/packages";
import installDependencies from "../actions/installDependencies";
import ensureFiles from "../actions/ensureFiles";
import hasPackageJSON from "../validate/packageJSON";

export default async function create() {
  try {
    const inPackage = await hasPackageJSON();
    if (!inPackage) {
      console.error(
        `"curi create" only works in a valid package. Did you forget to call "npm init"?`
      );
      return;
    }
    const root = process.cwd();
    const configPath = path.join(root, "curi.config.js");
    const config = readConfig(configPath);

    await existingFilePrompts(config);

    const { deps, install } = await packagePrompts();

    installDependencies(install.deps, install.devDeps);

    await ensureFiles(config, deps, root);
  } catch (e) {
    console.error(e);
  }
}
