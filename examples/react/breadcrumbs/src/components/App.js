import React from "react";
import { useCuri } from "@curi/react-dom";

export default function App() {
  const { response, router } = useCuri();

  const { body: Body } = response;
  return (
    <div>
      <Body response={response} router={router} />
    </div>
  );
}
