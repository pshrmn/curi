import React from "react";
import ReactDOM from "react-dom";
import { Browser } from "@hickory/browser";
import { curi } from "@curi/router";
import { curiProvider } from "@curi/react-dom";

import routes from "./routes";
import Controls from "./components/Controls";
import App from "./components/App";

const history = Browser();
const router = curi(history, routes);
const Router = curiProvider(router);

router.once(() => {
  ReactDOM.render(
    <Router>
      <Controls />
      <App />
    </Router>,
    document.getElementById("root")
  );
});
