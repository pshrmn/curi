import React from "react";
import { useResponse } from "@curi/react-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import NavLinks from "./NavLinks";

export default function App() {
  const { response } = useResponse();

  const { location, body: Body } = response;
  return (
    <div>
      <NavLinks />
      <TransitionGroup>
        <CSSTransition key={location.pathname} classNames="fade" timeout={500}>
          <Body response={response} />
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}
