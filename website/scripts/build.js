require("@babel/register");
const path = require("path");
const generateStaticFiles = require("@curi/static");

const createApp = require("../src/server/app");
const routes = require("../src/client/routes").default;
const packages_api = require("../src/client/constants/packages").default;
const guides_api = require("../src/client/constants/guides").default;
const examples_api = require("../src/client/constants/examples").default;
const tutorials_api = require("../src/client/constants/tutorials").default;

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

let server;
const app = createApp();
server = app.listen("8000", () => {
  generateStaticFiles(
    routes,
    [
      { name: "Home" },

      { name: "Packages" },
      ...packageParams.map(params => ({ name: "Package", params })),

      { name: "Guides" },
      ...guideParams.map(params => ({ name: "Guide", params })),

      { name: "Examples" },
      ...exampleParams.map(params => ({ name: "Example", params })),

      { name: "Tutorials" },
      ...tutorialParams.map(params => ({ name: "Tutorial", params }))
    ],
    {
      outputDir: path.join(__dirname, "..", "gh-pages")
    }
  ).then(() => {
    server.close();
  });
});
