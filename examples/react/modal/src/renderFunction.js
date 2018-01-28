import React from "react";
import Nav from "./components/Nav";
import Cacher from "./components/Cacher";

function render({ response, router }) {
  if (!response) {
    return null;
  }
  const { location, params, body: Body } = response;
  return (
    <div>
      <Nav />
      <Cacher response={response} history={router.history}>
        <Body params={params} location={location} />
      </Cacher>
    </div>
  );
}

export default render;
