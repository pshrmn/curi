import React from "react";
import ReactDOM from "react-dom";
import Browser from "@hickory/browser";
import { curi } from "@curi/router";
import { curiProvider } from "@curi/react-dom";

import routes from "./routes";
import Controls from "./components/Controls";

const history = Browser();
const router = curi(history, routes);
const Router = curiProvider(router);

router.once(() => {
  ReactDOM.render(
    <Router>
      {({ response, router }) => {
        const { body: Body, data } = response;

        return (
          <div>
            <Controls />
            <Body response={response} />
          </div>
        );
      }}
    </Router>,
    document.getElementById("root")
  );
});
