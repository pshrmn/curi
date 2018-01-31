import React from "react";
import ReactDOM from "react-dom";
import { CuriProvider } from "@curi/react";

import NavLinks from "./components/NavLinks";

export default ({ router }) => {
  ReactDOM.render(
    <CuriProvider router={router}>
      {({ response, router }) => {
        const { body: Body, params, data } = response;
        return (
          <div>
            <NavLinks />
            <Body params={params} data={data} />
          </div>
        );
      }}
    </CuriProvider>,
    document.getElementById("root")
  );
};
