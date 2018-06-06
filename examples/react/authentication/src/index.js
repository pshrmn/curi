import React from "react";
import ReactDOM from "react-dom";
import curi from "@curi/router";
import Browser from "@hickory/browser";
import { parse, stringify } from "qs";
import { CuriProvider } from "@curi/react";

import NavLinks from "./components/NavLinks";
import routes from "./routes";

const history = Browser({
  query: { parse, stringify }
});
const router = curi(history, routes, {
  emitRedirects: false
});

ReactDOM.render(
  <CuriProvider router={router}>
    {({ response, router }) => {
      const { body: Body, location, params } = response;
      return (
        <div>
          <NavLinks />
          <Body params={params} history={router.history} location={location} />
        </div>
      );
    }}
  </CuriProvider>,
  document.getElementById("root")
);
