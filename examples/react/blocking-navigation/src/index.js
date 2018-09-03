import React from "react";
import ReactDOM from "react-dom";
import { curi } from "@curi/router";
import Browser from "@hickory/browser";
import { CuriProvider } from "@curi/react-dom";

import NavLinks from "./components/NavLinks";
import routes from "./routes";

const history = Browser();
const router = curi(history, routes);

ReactDOM.render(
  <CuriProvider router={router}>
    {({ response }) => {
      const { body: Body } = response;
      return (
        <div>
          <NavLinks />
          <Body />
        </div>
      );
    }}
  </CuriProvider>,
  document.getElementById("root")
);
