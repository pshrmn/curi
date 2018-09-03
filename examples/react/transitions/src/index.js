import React from "react";
import ReactDOM from "react-dom";
import { curi } from "@curi/router";
import Browser from "@hickory/browser";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { CuriProvider } from "@curi/react-dom";

import routes from "./routes";
import NavLinks from "./components/NavLinks";

const history = Browser();
const router = curi(history, routes);

ReactDOM.render(
  <CuriProvider router={router}>
    {({ response }) => {
      const { location, params, body: Body } = response;
      return (
        <div>
          <NavLinks />
          <TransitionGroup>
            <CSSTransition
              key={location.pathname}
              classNames="fade"
              timeout={500}
            >
              <Body params={params} />
            </CSSTransition>
          </TransitionGroup>
        </div>
      );
    }}
  </CuriProvider>,
  document.getElementById("root")
);
