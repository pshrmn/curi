import React from "react";
import ReactDOM from "react-dom";
import { CuriProvider } from "@curi/react";

import Display from "./components/Display";
import NavLinks from "./components/NavLinks";

export default ({ router }) => {
  ReactDOM.render(
    <CuriProvider router={router}>
      {({ response, navigation }) => {
        return (
          <div>
            <NavLinks />
            <Display
              response={response}
              navigation={navigation}
              render={response => <response.body response={response} />}
            />
          </div>
        );
      }}
    </CuriProvider>,
    document.getElementById("root")
  );
};
