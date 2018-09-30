const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const location = process.argv[2];
const type = process.argv[3];

const entry = path.join(__dirname, location, "src", "index.js");
const outputPath = path.join(__dirname, location, "public");
const config = path.join(
  __dirname,
  "configs",
  "webpack",
  `webpack.${type}.config.js`
);

execSync(
  `npx webpack \
  --config=${config} \
  --entry=${entry} \
  --output-path=${outputPath} \
`,
  { stdio: [0, 1, 2] }
);
