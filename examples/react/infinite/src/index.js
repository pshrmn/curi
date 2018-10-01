import React from "react";
import ReactDOM from "react-dom";
import Browser from "@hickory/browser";
import { curi } from "@curi/router";
import { curiProvider } from "@curi/react-dom";

import routes from "./routes";

const history = Browser();
const router = curi(history, routes);
const Router = curiProvider(router);
const root = document.getElementById("root");

ReactDOM.render(
  <Router>
    {({ response, router }) => {
      const { body: Body } = response;
      return <Body response={response} router={router} />;
    }}
  </Router>,
  document.getElementById("root")
);
