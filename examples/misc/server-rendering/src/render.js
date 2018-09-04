import React from "react";

import NavLinks from "./components/NavLinks";

// maintain this in a separate file to re-use it
// on the server and the client
export const renderResponse = ({ response }) => {
  const { body: Body, params } = response;
  return (
    <div>
      <NavLinks />
      <Body params={params} />
    </div>
  );
};
