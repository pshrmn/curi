require('babel-core/register');

const createApp = require('./app');
const app = createApp();

app.listen('8000', () => {
  console.log(`Server started at ${new Date()}. Listening on port 8000.`);
});

