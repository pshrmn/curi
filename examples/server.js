let express = require("express");
let path = require("path");
let fs = require("fs");

if (process.argv.length < 3) {
  console.warn("Usage: node server.js <example-folder>");
  return;
}
let example = process.argv[2];
let exampleDir = path.join(__dirname, example);

if (!fs.existsSync(exampleDir) || !fs.lstatSync(exampleDir).isDirectory()) {
  console.error("The provided example folder does not exist:", example);
  return;
}

let publicDir = path.join(exampleDir, "public");
let indexFile = path.join(publicDir, "index.html");

let app = express();

app.use("/static", express.static(publicDir));

app.get("*", function(req, res) {
  res.sendFile(indexFile);
});

app.listen("8000", () => {
  console.log(`Server started at ${new Date()}. Listening on port 8000.`);
});
