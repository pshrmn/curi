import React from "react";
import ReactDOM from "react-dom";
import { CuriProvider } from "@curi/react";
import Browser from "@hickory/browser";
import { curi } from "@curi/router";
import prefetch from "@curi/route-prefetch";

import NavLinks from "./components/NavLinks";
import routes from "./routes";

const history = Browser();

const router = curi(history, routes, {
  route: [prefetch()]
});
const root = document.getElementById("root");

router.respond(() => {
  ReactDOM.render(
    <CuriProvider router={router}>
      {({ response, router }) => {
        const { body: Body, data } = response;

        return (
          <div>
            <NavLinks />
            <Body response={response} />
          </div>
        );
      }}
    </CuriProvider>,
    document.getElementById("root")
  );
});
