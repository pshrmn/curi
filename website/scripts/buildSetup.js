let fs = require("fs-extra");
let join = require("path").join;

let BASE_DIR = join(__dirname, "..");
let STATIC_DIR = join(BASE_DIR, "public", "static");
let GH_PAGES = join(BASE_DIR, "gh-pages");
let GH_STATIC_DIR = join(GH_PAGES, "static");

fs.removeSync(GH_PAGES);
console.log("Removed files");

fs.ensureDirSync(GH_STATIC_DIR);
console.log("Created directories");

fs.copySync(STATIC_DIR, GH_STATIC_DIR);
console.log("Copied static files");
