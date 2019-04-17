const glob = require("glob");
const path = require("path");
const fs = require("fs-extra");

const root = process.cwd();

const packagesDir = path.join(root, "packages");

// This relies on a README beginning with the string "## Next".
// If those aren't the first seven characters of the file, this
// will fail.
glob.sync(`${packagesDir}/**/CHANGELOG.md`).forEach(readme => {
  const buffer = fs.readFileSync(readme);
  if (buffer.indexOf("## Next") !== 0) {
    return;
  }

  const path = readme.substr(0, readme.indexOf("/CHANGELOG.md"));
  const pkg = require(`${path}/package.json`);
  const versionBuffer = Buffer.from(`## ${pkg.version}`);
  const output = Buffer.concat([versionBuffer, buffer.slice(7)]);

  fs.outputFile(readme, output);
});
