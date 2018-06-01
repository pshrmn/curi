const fs = require("fs-extra");
const join = require("path").join;

const BASE_DIR = join(__dirname, "..");
const STATIC_DIR = join(BASE_DIR, "static");
const GH_STATIC_DIR = join(BASE_DIR, "gh-pages", "static");
const GH_PAGES = join(BASE_DIR, "gh-pages");

function removeFiles() {
  fs.removeSync(GH_PAGES);
  console.log("Removed files");
}

function createDirs() {
  fs.ensureDirSync(GH_STATIC_DIR);
  console.log("Created directories");
}

function copyStaticFiles() {
  fs.copySync(STATIC_DIR, GH_STATIC_DIR);
  console.log("Copied static files");
}

removeFiles();
createDirs();
copyStaticFiles();
