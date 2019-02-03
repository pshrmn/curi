import React from "react";
import { useCuri } from "@curi/react-dom";

import Cancel from "./Cancel";

export default function App() {
  const { response } = useCuri();

  const { body: Body, data } = response;

  return (
    <React.Fragment>
      <Cancel />
      <Body response={response} />
    </React.Fragment>
  );
}
