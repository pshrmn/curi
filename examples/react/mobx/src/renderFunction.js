import React from "react";
import NavLinks from "./components/NavLinks";

export default function(response) {
  const { body: Body } = response;
  return (
    <div>
      <NavLinks />
      <Body response={response} />
    </div>
  );
}
