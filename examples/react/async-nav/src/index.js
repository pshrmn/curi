import React from "react";
import ReactDOM from "react-dom";
import { CuriProvider } from "@curi/react";
import Browser from "@hickory/browser";
import curi from "@curi/core";
import prefetch from "@curi/route-prefetch";

import routes from "./routes";
import Controls from "./components/Controls";

const history = Browser();

const router = curi(history, routes, {
  route: [prefetch()]
});
const root = document.getElementById("root");

router.respond(() => {
  ReactDOM.render(
    <CuriProvider router={router}>
      {({ response, router }) => {
        const { body: Body, data } = response;

        return (
          <div>
            <Controls />
            <Body response={response} />
          </div>
        );
      }}
    </CuriProvider>,
    document.getElementById("root")
  );
});
