import React from "react";
import ReactDOM from "react-dom";
import Browser from "@hickory/browser";
import { curi } from "@curi/router";
import { curiProvider, Navigating } from "@curi/react-dom";

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
          <React.Fragment>
            <Controls />
            <Navigating>
              {cancel => {
                return cancel ? (
                  <button
                    onClick={() => {
                      cancel();
                    }}
                  >
                    cancel navigation
                  </button>
                ) : null;
              }}
            </Navigating>
            <Body response={response} />
          </React.Fragment>
        );
      }}
    </Router>,
    document.getElementById("root")
  );
});
