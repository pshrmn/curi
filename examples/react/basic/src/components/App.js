import React from "react";
import { useResponse } from "@curi/react-dom";

import NavLinks from "./NavLinks";

export default function App() {
  let { response } = useResponse();

  let { body: Body } = response;
  return (
    <div>
      <NavLinks />
      <Body response={response} />
    </div>
  );
}
