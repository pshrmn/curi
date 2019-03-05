import React from "react";
import ReactDOM from "react-dom";
import { curi } from "@curi/router";
import { Browser } from "@hickory/browser";
import createTitleSideEffect from "@curi/side-effect-title";
import { curiProvider } from "@curi/react-dom";

import routes from "./routes";
import App from "./components/App";

const setTitle = createTitleSideEffect(
  ({ response }) => `${response.title} | Side Effect Example`
);
const router = curi(Browser, routes, {
  sideEffects: [setTitle]
});
const Router = curiProvider(router);

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
