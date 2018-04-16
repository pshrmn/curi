require("@babel/register");

const generateStaticFiles = require("./generateStaticFiles");
const updatePackageVersions = require("./updatePackageVersions");

const createApp = require("../src/server/app");
const routes = require("../src/client/routes").default;
const packages_api = require("../src/client/constants/packages").default;
const guides_api = require("../src/client/constants/guides").default;
const examples_api = require("../src/client/constants/examples").default;
const tutorials_api = require("../src/client/constants/tutorials").default;

const packageNames = packages_api.all().map(p => ({ package: p.name }));
const guideNames = guides_api.all().map(p => ({ slug: p.slug }));
const categories = examples_api.all();
const exampleParams = Object.keys(categories)
  .map(key => categories[key])
  .reduce((acc, category) => {
    const params = category.map(e => ({ category: e.category, slug: e.slug }));
    acc = acc.concat(params);
    return acc;
  }, []);
const tutorialNames = tutorials_api.all().map(t => ({ slug: t.slug }));

updatePackageVersions();

let server;
const app = createApp();
server = app.listen("8000", () => {
  generateStaticFiles(routes, {
    Packages: {
      children: {
        Package: {
          params: packageNames
        }
      }
    },
    Guides: {
      children: {
        Guide: {
          params: guideNames
        }
      }
    },
    Examples: {
      children: {
        Example: {
          params: exampleParams
        }
      }
    },
    Tutorials: {
      children: {
        Tutorial: {
          params: tutorialNames
        }
      }
    }
  }).then(() => {
    server.close();
  });
});
