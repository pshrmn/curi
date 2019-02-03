import React from "react";
import { useCuri } from "@curi/react-dom";

export default function App() {
  const { response } = useCuri();
  const { Main, Menu } = response.body;
  return (
    <div>
      {Menu ? <Menu /> : null}
      {Main ? <Main response={response} /> : null}
    </div>
  );
}
