const glob = require("glob");
const path = require("path");
const fs = require("fs-extra");
const git = require("simple-git")(process.cwd());

const root = process.cwd();

const packagesDir = path.join(root, "packages");
const examplesDir = path.join(root, "examples");
// get the dependencies from the actual packages
const pkgs = glob
  .sync(`${packagesDir}/**/package.json`)
  .map(pkgPath => require(pkgPath))
  .map(pkg => ({
    name: pkg.name,
    version: pkg.version
  }))
  .reduce((acc, curr) => {
    acc[curr.name] = curr.version;
    return acc;
  }, {});

glob
  .sync(`${examplesDir}/+(react|vue|svelte|misc)/*/package.json`)
  .map(pkgPath => ({
    path: pkgPath,
    module: require(pkgPath)
  }))
  .forEach(pkg => {
    Object.keys(pkg.module.dependencies).forEach(dep => {
      if (dep in pkgs) {
        pkg.module.dependencies[dep] = pkgs[dep];
      }
    });

    fs.outputFile(pkg.path, `${JSON.stringify(pkg.module, null, 2)}\n`).then(
      () => {
        git.add(pkg.path);
      },
      e => {
        console.error(`Failed to write ${pkg.path}`);
        console.error(e);
      }
    );
  });
