import React from "react";
import ReactDOM from "react-dom";
import { curi } from "@curi/router";
import Browser from "@hickory/browser";
import { parse, stringify } from "qs";
import { curiProvider } from "@curi/react-dom";

import NavLinks from "./components/NavLinks";
import routes from "./routes";

const history = Browser({
  query: { parse, stringify }
});
const router = curi(history, routes, {
  emitRedirects: false
});
const Router = curiProvider(router);

ReactDOM.render(
  <Router>
    {({ response, router }) => {
      const { body: Body, location, params } = response;
      return (
        <div>
          <NavLinks />
          <Body params={params} history={router.history} location={location} />
        </div>
      );
    }}
  </Router>,
  document.getElementById("root")
);
