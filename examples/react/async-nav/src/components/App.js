import React from "react";
import { useResponse } from "@curi/react-dom";

import Cancel from "./Cancel";

export default function App() {
  let { response } = useResponse();

  let { body: Body } = response;

  return (
    <React.Fragment>
      <Cancel />
      <Body response={response} />
    </React.Fragment>
  );
}
