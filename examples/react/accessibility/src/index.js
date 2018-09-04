import React from "react";
import ReactDOM from "react-dom";
import { curi } from "@curi/router";
import Browser from "@hickory/browser";
import { curiProvider, Focus } from "@curi/react-dom";

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
  </Router>,
  document.getElementById("root")
);
