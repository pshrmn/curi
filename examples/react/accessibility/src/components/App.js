import React from "react";
import { useResponse, useNavigationFocus } from "@curi/react-dom";

import NavLinks from "./NavLinks";

export default function App() {
  const { response } = useResponse();
  const ref = React.useRef(null);
  useNavigationFocus(ref);

  const { body: Body } = response;
  return (
    <div>
      <NavLinks />
      <main tabIndex={-1} ref={ref}>
        <Body params={response.params} />
      </main>
    </div>
  );
}
