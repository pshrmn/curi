const express = require('express');
const path = require('path');
const createRenderer = require('./renderer').default;


module.exports = function createApp() {
  const app = express();

  const STATIC_DIR = path.join(__dirname, '..', '..', '..', 'docs', 'static')
  app.use('/curi/static', express.static(STATIC_DIR));

  const renderer = createRenderer();
  app.get('/curi/*', renderer);
  return app;
}
