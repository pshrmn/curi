const { outputFile } = require("fs-extra");
const path = require("path");
const insert = require("./html");

const html = insert("", "dev");
const outputFilename = path.join(process.cwd(), "public", "index.html");

outputFile(outputFilename, html).then(() => {
  console.log("output public/index.html");
});
