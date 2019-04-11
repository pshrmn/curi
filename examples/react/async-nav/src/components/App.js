import React from "react";
import { useResponse } from "@curi/react-dom";

import Cancel from "./Cancel";

export default function App() {
  const { response } = useResponse();

  const { body: Body } = response;

  return (
    <React.Fragment>
      <Cancel />
      <Body response={response} />
    </React.Fragment>
  );
}
