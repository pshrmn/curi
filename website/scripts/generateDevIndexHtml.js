let { outputFile } = require("fs-extra");
let path = require("path");
let insert = require("./html");

let html = insert("", "dev");
let outputFilename = path.join(process.cwd(), "public", "index.html");

outputFile(outputFilename, html).then(() => {
  console.log("output public/index.html");
});
