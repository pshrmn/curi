const packagesAPI = require("../src/constants/packages").default;
const guidesAPI = require("../src/constants/guides").default;
const examplesAPI = require("../src/constants/examples").default;
const tutorialsAPI = require("../src/constants/tutorials").default;

const packageParams = packagesAPI.all().reduce((acc, pkg) => {
  const pkgs = Object.keys(pkg.versions).map(version => ({
    package: pkg.name,
    version
  }));
  return acc.concat(pkgs);
}, []);
const guideParams = guidesAPI.all().map(p => ({ slug: p.slug }));
const exampleParams = examplesAPI.all().map(e => ({ slug: e.slug }));
const tutorialParams = tutorialsAPI.all().map(t => ({ slug: t.slug }));

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
