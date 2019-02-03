import React from "react";
import ReactDOM from "react-dom";
import { curiProvider } from "@curi/react-dom";

import router from "./router";
import App from "./components/App";

const Router = curiProvider(router);
const render =
  process.env.NODE_ENV !== "production" ? ReactDOM.render : ReactDOM.hydrate;
router.once(() => {
  render(
    <Router>
      <App />
    </Router>,
    document.getElementById("root")
  );
});
