import React from "react";
import { useResponse } from "@curi/react-dom";

import NavLinks from "./NavLinks";

export default function App() {
  const { response } = useResponse();
  const { body: Body } = response;
  return (
    <div>
      <NavLinks />
      <Body response={response} />
    </div>
  );
}
