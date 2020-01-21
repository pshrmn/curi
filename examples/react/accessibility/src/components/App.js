import React from "react";
import { useResponse, useNavigationFocus } from "@curi/react-dom";

import NavLinks from "./NavLinks";

export default function App() {
  let { response } = useResponse();
  let ref = React.useRef(null);
  useNavigationFocus(ref);

  let { body: Body } = response;
  return (
    <div>
      <NavLinks />
      <main tabIndex={-1} ref={ref}>
        <Body params={response.params} />
      </main>
    </div>
  );
}
