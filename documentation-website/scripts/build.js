require("@babel/register");

const generateStaticFiles = require("./generateStaticFiles");
const updatePackageVersions = require("./updatePackageVersions");

const createApp = require("../src/server/app");
const routes = require("../src/client/routes").default;
const packages = require("../src/client/constants/packages").default;
const guides = require("../src/client/constants/guides").default;
const EXAMPLES = require("../src/client/constants/examples").default;
const tutorialsByName = require("../src/client/constants/tutorials").byName;

const packageNames = packages.map(p => ({ package: p.name }));
const guideNames = guides.map(p => ({ slug: p.slug }));
const categories = EXAMPLES.all();
const exampleParams = Object.keys(categories)
  .map(key => categories[key])
  .reduce((acc, category) => {
    const params = category.map(e => ({ category: e.category, slug: e.slug }));
    acc = acc.concat(params);
    return acc;
  }, []);

const tutorialNames = Object.keys(tutorialsByName).map(slug => ({ slug }));

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
