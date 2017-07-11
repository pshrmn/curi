require('babel-core/register');

const generateStaticFiles = require('./generateStaticFiles');

const createApp = require('../src/server/app');
const routes = require('../src/client/routes').default;
const packages = require('../src/client/Packages').default;
const guides = require('../src/client/Guides').default;

const packageNames = packages.map(p => ({ package: p.name }));
const guideNames = guides.map(p => ({ slug: p.slug }));

let server;
const app = createApp('/curi');
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
      }
    }
  )
    .then(() => {
      server.close();
    });
});
