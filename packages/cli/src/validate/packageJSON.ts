import path from "path";
import * as fs from "fs-extra";

export default async function hasPackageJSON() {
  const here = process.cwd();
  const pkgJSON = path.join(here, "package.json");
  return fs.pathExists(pkgJSON);
}
