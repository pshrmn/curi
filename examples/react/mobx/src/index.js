import React from "react";
import ReactDOM from "react-dom";
import Browser from "@hickory/browser";
import curi from "@curi/core";
import { Provider } from "mobx-react";
import CuriStore from "@curi/mobx";
import { CuriProvider } from "@curi/react";

import routes from "./routes";
import renderFunction from "./renderFunction";
import fakeData from "./fakeData";

const history = Browser();
const router = curi(history, routes);
const root = document.getElementById("root");

const curiStore = new CuriStore(router);

router.respond(() => {
  ReactDOM.render(
    <Provider curi={curiStore} products={fakeData}>
      <CuriProvider router={router}>{renderFunction}</CuriProvider>
    </Provider>,
    root
  );
});
