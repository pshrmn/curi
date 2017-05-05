require('babel-core/register');
const express = require('express');
const path = require('path');
const renderer = require('./renderer').default;

const app = express();

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('*', renderer);

app.listen('8000', () => {
  console.log(`Server started at ${new Date()}. Listening on port 8000.`);
});
