import React from "react";
import ReactDOM from "react-dom";
import curi from "@curi/core";
import Browser from "@hickory/browser";
import createActiveAddon from "@curi/addon-active";
import { CuriProvider } from "@curi/react";

import NavLinks from "./components/NavLinks";

import routes from "./routes";

const history = Browser();

const router = curi(history, routes, {
  addons: [createActiveAddon()]
});

ReactDOM.render(
  <CuriProvider router={router}>
    {({ response }) => {
      const { body: Body, params } = response;
      return (
        <div>
          <NavLinks />
          {Body ? <Body params={params} /> : null}
        </div>
      );
    }}
  </CuriProvider>,
  document.getElementById("root")
);
