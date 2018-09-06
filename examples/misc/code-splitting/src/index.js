import React from "react";
import ReactDOM from "react-dom";
import { curiProvider } from "@curi/react-dom";

import Browser from "@hickory/browser";
import { curi } from "@curi/router";

import routes from "./routes";

import NavLinks from "./components/NavLinks";

const history = Browser();
const router = curi(history, routes);
const Router = curiProvider(router);

router.once(() => {
  ReactDOM.render(
    <Router>
      {({ response }) => {
        return (
          <div>
            <NavLinks />
            <response.body />
          </div>
        );
      }}
    </Router>,
    document.getElementById("root")
  );
});
