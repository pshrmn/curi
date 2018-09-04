import React from "react";
import ReactDOM from "react-dom";
import { curiProvider } from "@curi/react-dom";
import Browser from "@hickory/browser";
import { curi } from "@curi/router";
import prefetch from "@curi/route-prefetch";

import NavLinks from "./components/NavLinks";
import routes from "./routes";

const history = Browser();

const router = curi(history, routes, {
  route: [prefetch()]
});
const Router = curiProvider(router);
const root = document.getElementById("root");

router.respond(() => {
  ReactDOM.render(
    <Router>
      {({ response, router }) => {
        const { body: Body, data } = response;

        return (
          <div>
            <NavLinks />
            <Body response={response} />
          </div>
        );
      }}
    </Router>,
    document.getElementById("root")
  );
});
