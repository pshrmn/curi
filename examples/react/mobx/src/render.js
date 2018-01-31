import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import { CuriProvider } from "@curi/react";

import NavLinks from "./components/NavLinks";
import fakeData from "./fakeData";

export default ({ router }) => {
  ReactDOM.render(
    <Provider products={fakeData}>
      <CuriProvider router={router}>
        {({ response, router }) => {
          const { body: Body } = response;
          return (
            <div>
              <NavLinks />
              <Body response={response} />
            </div>
          );
        }}
      </CuriProvider>
    </Provider>,
    document.getElementById("root")
  );
};
