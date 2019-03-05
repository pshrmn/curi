import React from "react";
import ReactDOM from "react-dom";
import { curiProvider } from "@curi/react-dom";
import { Browser } from "@hickory/browser";
import { curi } from "@curi/router";
import prefetch from "@curi/route-prefetch";

import routes from "./routes";
import App from "./components/App";

const router = curi(Browser, routes, {
  route: [prefetch()]
});
const Router = curiProvider(router);
const root = document.getElementById("root");

router.once(() => {
  ReactDOM.render(
    <Router>
      <App />
    </Router>,
    document.getElementById("root")
  );
});
