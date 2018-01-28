import React from "react";
import { createContext } from "react-broadcast";

const { Provider, Consumer } = createContext({
  router: null,
  response: null,
  navigation: null
});
