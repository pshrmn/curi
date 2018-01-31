import React from "react";
import ReactDOM from "react-dom";
import { CuriProvider } from "@curi/react";

import NavLinks from "./components/NavLinks";

export default ({ router }) => {
  ReactDOM.render(
    <CuriProvider router={router}>
      {({ response, router }) => {
        const { body: Body, data } = response;
        return <Body response={response} router={router} />;
      }}
    </CuriProvider>,
    document.getElementById("root")
  );
};
