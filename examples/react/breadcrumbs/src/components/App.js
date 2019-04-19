import React from "react";
import { useResponse } from "@curi/react-dom";

export default function App() {
  const { response } = useResponse();

  const { body: Body } = response;
  return (
    <div>
      <Body response={response} />
    </div>
  );
}
