import React from "react";
import { useCuri } from "@curi/react-dom";

import NavLinks from "./NavLinks";

export default function App() {
  const { response, router } = useCuri();

  const { body: Body } = response;
  return (
    <div>
      <NavLinks />
      <Body response={response} router={router} />
    </div>
  );
}
