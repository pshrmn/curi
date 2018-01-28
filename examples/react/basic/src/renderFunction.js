import React from "react";
import NavLinks from "./components/NavLinks";

export default function({ response }) {
  if (!response) {
    return null;
  }
  return (
    <div>
      <NavLinks />
      {response.body ? <response.body params={response.params} /> : null}
    </div>
  );
}
