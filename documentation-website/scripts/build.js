require('babel-core/register');

const generateStaticFiles = require('./generateStaticFiles');
const updatePackageVersions = require('./updatePackageVersions');

const createApp = require('../src/server/app');
const routes = require('../src/client/routes').default;
const packages = require('../src/client/Packages').default;
const guides = require('../src/client/Guides').default;
const examples = require('../src/client/Examples').default;

const packageNames = packages.map(p => ({ package: p.name }));
const guideNames = guides.map(p => ({ slug: p.slug }));
const exampleNames = examples.map(p => ({ slug: p.slug }));

updatePackageVersions();

let server;
const app = createApp();
server = app.listen('8000', () => {
  generateStaticFiles(
    routes,
    {
      'Packages': {
        children: {
          'Package': {
            params: packageNames
          }
        }
      },
      'Guide': {
        params: guideNames
      },
      'Examples': {
        children: {
          'Example': {
            params: exampleNames
          }
        }
      }
    }
  )
    .then(() => {
      server.close();
    });
});
