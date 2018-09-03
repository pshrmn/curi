import React from "react";
import ReactDOM from "react-dom";
import { CuriProvider } from "@curi/react-dom";

import NavLinks from "./components/NavLinks";

export const renderResponse = ({ response }) => {
  const { body: Body, params } = response;
  return (
    <div>
      <NavLinks />
      <Body params={params} />
    </div>
  );
};

export const responseHandler = ({ router }) => {
  ReactDOM.hydrate(
    <CuriProvider router={router}>{renderResponse}</CuriProvider>,
    document.getElementById("root")
  );
};
