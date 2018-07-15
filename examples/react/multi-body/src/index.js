import React from "react";
import ReactDOM from "react-dom";
import { curi } from "@curi/router";
import Browser from "@hickory/browser";
import { CuriProvider } from "@curi/react";

import routes from "./routes";

const history = Browser();
const router = curi(history, routes);

ReactDOM.render(
  <CuriProvider router={router}>
    {({ response }) => {
      const { Main, Menu } = response.body;
      return (
        <div>
          {Menu ? <Menu /> : null}
          {Main ? <Main params={response.params} /> : null}
        </div>
      );
    }}
  </CuriProvider>,
  document.getElementById("root")
);
