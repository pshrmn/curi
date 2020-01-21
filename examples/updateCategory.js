let fs = require("fs");
let path = require("path");
let cp = require("child_process");

function runCommand(folder, args) {
  cp.spawn("npm", args, { env: process.env, cwd: folder, stdio: "inherit" });
}

function getPackages(category) {
  let folder = path.join(__dirname, category);
  return fs
    .readdirSync(folder)
    .map(function(dir) {
      let fullPath = path.join(folder, dir);
      // check for a package.json file
      if (!fs.existsSync(path.join(fullPath, "package.json"))) {
        return;
      }
      return fullPath;
    })
    .filter(function(pkg) {
      return pkg !== undefined;
    });
}

function runCommandInCategory(category, args) {
  let pkgs = getPackages(category);

  pkgs.forEach(function(pkg) {
    runCommand(pkg, args);
  });
}

let CATEGORIES = ["react", "vue", "svelte", "misc"];
let category = process.argv[2];
let args = process.argv.slice(3);

if (category === "all") {
  CATEGORIES.forEach(function(c) {
    runCommandInCategory(c, args);
  });
} else {
  runCommandInCategory(category, args);
}
