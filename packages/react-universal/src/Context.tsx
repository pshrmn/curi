import React from "react";
import { Emitted } from "@curi/router";

const key: Emitted = {
  router: null,
  response: null,
  navigation: null
};

const { Provider, Consumer: Curious } = React.createContext<Emitted>(key);

export { Provider, Curious };
