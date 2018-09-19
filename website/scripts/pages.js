const routes = require("../src/routes").default;
const packages_api = require("../src/constants/packages").default;
const guides_api = require("../src/constants/guides").default;
const examples_api = require("../src/constants/examples").default;
const tutorials_api = require("../src/constants/tutorials").default;

const packageParams = packages_api.all().map(p => ({ package: p.name }));
const guideParams = guides_api.all().map(p => ({ slug: p.slug }));
const categories = examples_api.all();
const exampleParams = Object.keys(categories)
  .map(key => categories[key])
  .reduce((acc, category) => {
    const params = category.map(e => ({ category: e.category, slug: e.slug }));
    acc = acc.concat(params);
    return acc;
  }, []);
const tutorialParams = tutorials_api.all().map(t => ({ slug: t.slug }));

module.exports = [
  { name: "Home" },

  { name: "Packages" },
  ...packageParams.map(params => ({ name: "Package", params })),

  { name: "Guides" },
  ...guideParams.map(params => ({ name: "Guide", params })),

  { name: "Examples" },
  ...exampleParams.map(params => ({ name: "Example", params })),

  { name: "Tutorials" },
  ...tutorialParams.map(params => ({ name: "Tutorial", params }))
];
