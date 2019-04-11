import React from "react";
import { CuriRouter, Emitted } from "@curi/types";

const key: Emitted = {
  router: null,
  response: null,
  navigation: null
};

const emitted_context = React.createContext<Emitted>(key);
const { Provider: EmittedProvider, Consumer: Curious } = emitted_context;

const router_context = React.createContext<CuriRouter>(null);
const { Provider: RouterProvider, Consumer: RouterConsumer } = router_context;

export {
  EmittedProvider,
  Curious,
  emitted_context,
  RouterProvider,
  RouterConsumer,
  router_context
};
