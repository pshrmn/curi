var express = require('express');

const app = express();

app.use('/static', express.static(__dirname + "/public/"));
app.get('*', function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(8000);
