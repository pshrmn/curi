import React from "react";
import ReactDOM from "react-dom";
import { CuriProvider } from "@curi/react";

export default ({ router }) => {
  ReactDOM.render(
    <CuriProvider router={router}>
      {({ response }) => {
        const { Main, Menu } = response.body;
        return (
          <div>
            {Menu ? <Menu /> : null}
            {Main ? <Main params={response.params} /> : null}
          </div>
        );
      }}
    </CuriProvider>,
    document.getElementById("root")
  );
};
