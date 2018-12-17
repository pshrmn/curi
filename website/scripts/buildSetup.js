const fs = require("fs-extra");
const join = require("path").join;

const BASE_DIR = join(__dirname, "..");
const STATIC_DIR = join(BASE_DIR, "public", "static");
const GH_PAGES = join(BASE_DIR, "gh-pages");
const GH_STATIC_DIR = join(GH_PAGES, "static");

fs.removeSync(GH_PAGES);
console.log("Removed files");

fs.ensureDirSync(GH_STATIC_DIR);
console.log("Created directories");

fs.copySync(STATIC_DIR, GH_STATIC_DIR);
console.log("Copied static files");
