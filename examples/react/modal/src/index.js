import React from "react";
import ReactDOM from "react-dom";
import { curi } from "@curi/router";
import Browser from "@hickory/browser";
import { curiProvider } from "@curi/react-dom";

import routes from "./routes";
import Display from "./components/Display";
import NavLinks from "./components/NavLinks";

const history = Browser();
const router = curi(history, routes);
const Router = curiProvider(router);

ReactDOM.render(
  <Router>
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
  </Router>,
  document.getElementById("root")
);
