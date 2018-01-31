import React from "react";
import ReactDOM from "react-dom";
import { CuriProvider } from "@curi/react";

import Cacher from "./components/Cacher";
import NavLinks from "./components/NavLinks";

export default ({ router }) => {
  ReactDOM.render(
    <CuriProvider router={router}>
      {({ response, router }) => {
        const { location, params, body: Body } = response;
        return (
          <div>
            <NavLinks />
            <Cacher response={response} history={router.history}>
              <Body params={params} location={location} />
            </Cacher>
          </div>
        );
      }}
    </CuriProvider>,
    document.getElementById("root")
  );
};
