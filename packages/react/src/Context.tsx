/// <reference types="../typings/react-broadcast" />
import React from "react";
import { createContext } from "react-broadcast";

const { Provider, Consumer } = createContext({
  router: null,
  response: null,
  navigation: null
});

export { Provider, Consumer };
