import React from "react";
import ReactDOM from "react-dom";
import { curiProvider } from "@curi/react-dom";

import router from "./router";
import renderApp from "./render";

const Router = curiProvider(router);
const render =
  process.env.NODE_ENV !== "production" ? ReactDOM.render : ReactDOM.hydrate;
router.once(() => {
  render(<Router>{renderApp}</Router>, document.getElementById("root"));
});
