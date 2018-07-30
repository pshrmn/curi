const path = require("path");
const glob = require("glob");
const fs = require("fs").promises;

const BASE = path.resolve(__dirname, "..");
const SRC = path.resolve(BASE, "src");
const DIST = path.resolve(BASE, "dist");

function copyHTML() {
  fs.mkdir(DIST, err => {
    if (err) {
      console.error(err);
      return;
    }
    glob.glob(path.join(SRC, "*.html"), function(err, files) {
      files.forEach(input => {
        const name = path.basename(input);
        const output = path.join(DIST, name);
        fs.createReadStream(input).pipe(fs.createWriteStream(output));
      });
    });
  });
}

module.exports = copyHTML;
