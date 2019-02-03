import React from "react";
import { useCuri } from "@curi/react-dom";

import NavLinks from "./NavLinks";

export default function App() {
  const { response } = useCuri();
  const { body: Body } = response;
  return (
    <div>
      <NavLinks />
      <Body response={response} />
    </div>
  );
}
