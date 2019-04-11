import React from "react";
import { useResponse } from "@curi/react-dom";

export default function App() {
  const { response } = useResponse();
  const { Main, Menu } = response.body;
  return (
    <div>
      {Menu ? <Menu /> : null}
      {Main ? <Main response={response} /> : null}
    </div>
  );
}
