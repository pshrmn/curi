import React from "react";
import { Emitted } from "@curi/core";

const key: Emitted = {
  router: null,
  response: null,
  navigation: null
};

const { Provider, Consumer } = React.createContext<Emitted>(key);

export { Provider, Consumer as Curious };
