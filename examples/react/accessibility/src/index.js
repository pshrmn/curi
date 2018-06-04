import React from "react";
import ReactDOM from "react-dom";
import curi from "@curi/core";
import Browser from "@hickory/browser";
import { CuriProvider, Focus } from "@curi/react";

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
          <Focus>
            {ref => (
              <main tabIndex={-1} ref={ref}>
                <Body params={response.params} />
              </main>
            )}
          </Focus>
        </div>
      );
    }}
  </CuriProvider>,
  document.getElementById("root")
);
