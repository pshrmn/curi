import React from "react";
import ReactDOM from "react-dom";
import { curi } from "@curi/router";
import Browser from "@hickory/browser";
import createTitleSideEffect from "@curi/side-effect-title";
import { curiProvider } from "@curi/react-dom";

import routes from "./routes";
import NavLinks from "./components/NavLinks";

const setTitle = createTitleSideEffect(
  ({ response }) => `${response.title} | Middleware Example`
);
const history = Browser();
const router = curi(history, routes, {
  sideEffects: [{ effect: setTitle }]
});
const Router = curiProvider(router);

ReactDOM.render(
  <Router>
    {({ response }) => {
      const { params, body: Body } = response;
      return (
        <div>
          <NavLinks />
          <Body params={params} />
        </div>
      );
    }}
  </Router>,
  document.getElementById("root")
);
