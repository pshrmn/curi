import React from "react";
import ReactDOM from "react-dom";
import { curi } from "@curi/router";
import Browser from "@hickory/browser";
import createTitleSideEffect from "@curi/side-effect-title";
import { CuriProvider } from "@curi/react";

import routes from "./routes";
import NavLinks from "./components/NavLinks";

const setTitle = createTitleSideEffect({ suffix: "| Middleware Example" });
const history = Browser();
const router = curi(history, routes, {
  sideEffects: [{ effect: setTitle }]
});

ReactDOM.render(
  <CuriProvider router={router}>
    {({ response }) => {
      const { params, body: Body } = response;
      return (
        <div>
          <NavLinks />
          <Body params={params} />
        </div>
      );
    }}
  </CuriProvider>,
  document.getElementById("root")
);
