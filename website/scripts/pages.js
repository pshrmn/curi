let packagesAPI = require("../src/constants/packages").default;
let guidesAPI = require("../src/constants/guides").default;
let examplesAPI = require("../src/constants/examples").default;
let tutorialsAPI = require("../src/constants/tutorials").default;

let packageParams = packagesAPI.all().reduce((acc, pkg) => {
  let pkgs = Object.keys(pkg.versions).map(version => ({
    package: pkg.name,
    version
  }));
  return acc.concat(pkgs);
}, []);
let guideParams = guidesAPI.all().map(p => ({ slug: p.slug }));
let exampleParams = examplesAPI.all().map(e => ({ slug: e.slug }));
let tutorialParams = tutorialsAPI.all().map(t => ({ slug: t.slug }));

module.exports = [
  { name: "Home" },

  { name: "Packages", params: { version: "v1" } },
  { name: "Packages", params: { version: "v2" } },
  ...packageParams.map(params => ({ name: "Package", params })),

  { name: "Guides" },
  ...guideParams.map(params => ({ name: "Guide", params })),

  { name: "Examples" },
  ...exampleParams.map(params => ({ name: "Example", params })),

  { name: "Tutorials" },
  ...tutorialParams.map(params => ({ name: "Tutorial", params }))
];
