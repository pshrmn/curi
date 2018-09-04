import React from "react";
import ReactDOM from "react-dom";
import { curi } from "@curi/router";
import Browser from "@hickory/browser";
import active from "@curi/route-active";
import { curiProvider } from "@curi/react-dom";

import NavLinks from "./components/NavLinks";

import routes from "./routes";

const history = Browser();

const router = curi(history, routes, {
  route: [active()]
});
const Router = curiProvider(router);

ReactDOM.render(
  <Router>
    {({ response }) => {
      const { body: Body, params } = response;
      return (
        <div>
          <NavLinks />
          {Body ? <Body params={params} /> : null}
        </div>
      );
    }}
  </Router>,
  document.getElementById("root")
);
