require('babel-core/register');
const PathToRegexp = require('path-to-regexp');
const request = require('request-promise-native');
const fs = require('fs');
const join = require('path').join;

const BASE_DIR = join(__dirname, '..', '..', 'docs');

function generatePaths(routes, params, parent) {
  if (!parent) {
    parent = '/';
  }

  return routes.reduce((acc, curr) => {
    const p = joinSegments(parent, curr.path);
    const routeParams = params  && params[curr.name] ? params[curr.name] : {};
    const paths = compilePath(p, routeParams.params);
    acc = acc.concat(paths);
    if (curr.children) {
      acc = acc.concat(generatePaths(curr.children, routeParams.children, p));
    }
    return acc;
  }, []);
}

function joinSegments(base, newSegment) {
  return base.charAt(base.length-1) === '/'
    ? base + newSegment
    : base + '/' + newSegment;
}

function localURI(path) {
  return `http://localhost:8000/curi${path}`
}

function compilePath(path, params) {
  if (!params) {
    return path;
  }
  const compiler = PathToRegexp.compile(path);
  return params.map(compiler);
}

module.exports = function generateStaticFiles(routes, params) {
  return Promise.all(
    generatePaths(routes, params).map(p => (
      request(localURI(p))
        .then(html => {
          const outputDir = join(BASE_DIR, p)
          if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
          }
          fs.writeFile(
            join(outputDir, 'index.html'),
            html,
            function(err) {
              if (err) {
                console.error('something went wrong with path', p);
                console.error(err);
              }
            }
          )
          console.log(p);
          
        })
        .catch(err => {
          throw Error(err);
        })
    ))
  );
}
