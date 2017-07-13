const express = require('express');
const path = require('path');
const createRenderer = require('./renderer').default;


module.exports = function createApp() {
  const app = express();

  const STATIC_DIR = path.join(__dirname, '..', '..', 'gh-pages', 'static')
  app.use('/static', express.static(STATIC_DIR));

  const renderer = createRenderer();
  app.get('*', renderer);
  return app;
}
