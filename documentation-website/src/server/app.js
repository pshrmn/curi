const express = require('express');
const path = require('path');
const createRenderer = require('./renderer').default;


module.exports = function createApp(staticSegment) {
  const app = express();

  const STATIC_DIR = path.join(__dirname, '..', '..', '..', 'docs', 'static')
  app.use('/static', express.static(STATIC_DIR));

  const renderer = createRenderer(staticSegment);
  app.get('/curi/*', renderer);
  return app;
}
