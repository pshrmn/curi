import React from "react";
import { Emitted } from "@curi/types";

const key: Emitted = {
  router: null,
  response: null,
  navigation: null
};

const context = React.createContext<Emitted>(key);
const { Provider, Consumer: Curious } = context;

export { Provider, Curious, context };
