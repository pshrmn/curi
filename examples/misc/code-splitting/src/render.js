import React from "react";
import ReactDOM from "react-dom";
import { CuriProvider } from "@curi/react";

import NavLinks from "./components/NavLinks";

export default ({ router }) => {
  ReactDOM.render(
    <CuriProvider router={router}>
      {({ response }) => {
        return (
          <div>
            <NavLinks />
            <response.body />
          </div>
        );
      }}
    </CuriProvider>,
    document.getElementById("root")
  );
};
