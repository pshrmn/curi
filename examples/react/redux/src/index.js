import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Browser from "@hickory/browser";
import curi from "@curi/core";
import { syncResponses } from "@curi/redux";
import { CuriProvider } from "@curi/react";

import store from "./reduxStuff";
import routes from "./routes";
import renderFunction from "./renderFunction";

const history = Browser();
const router = curi(history, routes);
const root = document.getElementById("root");

syncResponses(store, router);

router.respond(() => {
  ReactDOM.render(
    <Provider store={store}>
      <CuriProvider router={router}>{renderFunction}</CuriProvider>
    </Provider>,
    root
  );
});
