const express = require('express');
const path = require('path');
const fs = require('fs');

if (process.argv.length < 3) {
  console.warn('Usage: node server.js <example-folder>');
  return;
}
const example = process.argv[2];
const exampleDir = path.join(__dirname, example);

if (!fs.existsSync(exampleDir) || !fs.lstatSync(exampleDir).isDirectory()) {
  console.error('The provided example folder does not exist:', example);
  return;
}

const publicDir = path.join(exampleDir, 'public');
const indexFile = path.join(publicDir, 'index.html');

const app = express();

app.use('/static', express.static(publicDir));

app.get('*', function(req, res) {
  res.sendFile(indexFile);
});

app.listen('8000', () => {
  console.log(`Server started at ${new Date()}. Listening on port 8000.`);
});
