import React from "react";
import { useResponse } from "@curi/react-dom";

export default function App() {
  const { response, router } = useResponse();

  const { body: Body } = response;
  return (
    <div>
      <Body response={response} router={router} />
    </div>
  );
}
