require('@babel/register');

console.log('yo....');

const createApp = require('./app');
const app = createApp(true);

app.listen('8000', () => {
  console.log(`Server started at ${new Date()}. Listening on port 8000.`);
});

