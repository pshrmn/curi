import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { CuriProvider } from "@curi/react";

import store from "./reduxStuff";
import NavLinks from "./components/NavLinks";

export default ({ router }) => {
  ReactDOM.render(
    <Provider store={store}>
      <CuriProvider router={router}>
        {({ response }) => {
          const { params, body: Body } = response;
          return (
            <div>
              <NavLinks />
              <Body params={params} />
            </div>
          );
        }}
      </CuriProvider>
    </Provider>,
    document.getElementById("root")
  );
};
