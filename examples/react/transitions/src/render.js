import React from "react";
import ReactDOM from "react-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { CuriProvider } from "@curi/react";

import NavLinks from "./components/NavLinks";

export default ({ router }) => {
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
};
