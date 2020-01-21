import React from "react";
import { useResponse } from "@curi/react-dom";

export default function App() {
  let { response } = useResponse();

  let { body: Body } = response;
  return (
    <div>
      <Body response={response} />
    </div>
  );
}
