import React from "react";
import ReactDOM from "react-dom";
import { curi } from "@curi/router";
import Browser from "@hickory/browser";
import { curiProvider } from "@curi/react-dom";

import NavLinks from "./components/NavLinks";
import routes from "./routes";

const history = Browser();
const router = curi(history, routes);
const Router = curiProvider(router);

ReactDOM.render(
  <Router>
    {({ response }) => {
      const { body: Body } = response;
      return (
        <div>
          <NavLinks />
          <Body />
        </div>
      );
    }}
  </Router>,
  document.getElementById("root")
);
