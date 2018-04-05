import React from "react";
import ReactDOM from "react-dom";
import curi from "@curi/core";
import Browser from "@hickory/browser";
import { Provider } from "react-redux";
import { CuriProvider } from "@curi/react";
import { syncResponses } from "@curi/redux";

import routes from "./routes";
import store from "./reduxStuff";
import NavLinks from "./components/NavLinks";

const history = Browser();
const router = curi(history, routes);

syncResponses(store, router);

ReactDOM.render(
  <Provider store={store}>
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
    </CuriProvider>
  </Provider>,
  document.getElementById("root")
);
