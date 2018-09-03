import React from "react";
import ReactDOM from "react-dom";
import { curi } from "@curi/router";
import Browser from "@hickory/browser";
import { CuriProvider } from "@curi/react-dom";

import routes from "./routes";
import Display from "./components/Display";
import NavLinks from "./components/NavLinks";

const history = Browser();
const router = curi(history, routes);

ReactDOM.render(
  <CuriProvider router={router}>
    {({ response, navigation }) => (
      <div>
        <NavLinks />
        <Display
          response={response}
          navigation={navigation}
          render={response => <response.body response={response} />}
        />
      </div>
    )}
  </CuriProvider>,
  document.getElementById("root")
);
