let fs = require("fs");
let path = require("path");
let { execSync } = require("child_process");

let location = process.argv[2];
let type = process.argv[3];

let entry = path.join(__dirname, location, "src", "index.js");
let outputPath = path.join(__dirname, location, "public");
let config = path.join(__dirname, "configs", "webpack", `${type}.config.js`);

execSync(
  `npx webpack \
  --config=${config} \
  --entry=${entry} \
  --output-path=${outputPath} \
`,
  { stdio: [0, 1, 2] }
);
