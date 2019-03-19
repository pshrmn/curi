import * as fs from "fs-extra";

import { CuriConfig } from "./types";

export function readConfig(path: string) {
  return require(path);
}

export function writeConfig(config: CuriConfig, path: string) {
  const content = `module.exports = ${JSON.stringify(config, null, 2)};\n`;
  fs.writeFileSync(path, content);
}
