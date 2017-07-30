const express = require('express');
const path = require('path');
const createRenderer = require('./renderer').default;


module.exports = function createApp(debug) {
  const app = express();

  debug = debug != undefined ? debug : false;

  const STATIC_DIR = path.join(__dirname, '..', '..', 'gh-pages', 'static')
  app.use('/static', express.static(STATIC_DIR));

  const renderer = createRenderer(debug);
  app.get('*', renderer);
  return app;
}
