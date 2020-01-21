let express = require("express");
let path = require("path");
let renderer = require("./renderer").default;

let app = express();

app.use("/static", express.static(path.join(__dirname, "public")));

app.get("*", renderer);

app.listen("8000", () => {
  console.log(`Server started at ${new Date()}. Listening on port 8000.`);
});
