import React from "react";
import ReactDOM from "react-dom";
import curi from "@curi/core";
import Browser from "@hickory/browser";
import { Provider } from "mobx-react";
import { CuriProvider } from "@curi/react";

import fakeData from "./fakeData";
import routes from "./routes";
import NavLinks from "./components/NavLinks";

const history = Browser();
const router = curi(history, routes);

ReactDOM.render(
  <Provider products={fakeData}>
    <CuriProvider router={router}>
      {({ response, router }) => {
        const { body: Body } = response;
        return (
          <div>
            <NavLinks />
            <Body response={response} />
          </div>
        );
      }}
    </CuriProvider>
  </Provider>,
  document.getElementById("root")
);
