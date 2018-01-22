import React from "react";
import { Redirect } from "@curi/react";

import Nav from "./components/Nav";
import NotFound from "./components/NotFound";

function render(response, navigation, router) {
  if (!response || response.redirectTo) {
    return null;
  }
  const { location, params } = response;

  return (
    <div>
      <Nav />
      {response.body ? (
        <response.body
          params={params}
          history={router.history}
          location={location}
        />
      ) : (
        <NotFound />
      )}
    </div>
  );
}

export default render;
