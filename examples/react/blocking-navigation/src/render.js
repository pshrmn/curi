import React from "react";
import ReactDOM from "react-dom";
import { CuriProvider } from "@curi/react";

import NavLinks from "./components/NavLinks";

export default ({ router }) => {
  ReactDOM.render(
    <CuriProvider router={router}>
      {({ response }) => {
        const { body: Body } = response;
        return (
          <div>
            <NavLinks />
            <Body />
          </div>
        );
      }}
    </CuriProvider>,
    document.getElementById("root")
  );
};
