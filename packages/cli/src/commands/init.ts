import path from "path";
import * as fs from "fs-extra";

import { writeConfig } from "../config";
import structurePrompts from "../prompts/structure";

import { CuriConfig } from "../types";

export default async function create() {
  try {
    const structure = await structurePrompts();

    const config: CuriConfig = {
      files: {
        src: structure.src,
        router: structure.router,
        routes: structure.routes,
        components: structure.components
      },
      async: false
    };
    const root = structure.root || process.cwd();
    const output = path.join(root, "curi.config.js");
    await fs.ensureDir(root);
    writeConfig(config, output);
  } catch (e) {
    console.error(e);
  }
}
