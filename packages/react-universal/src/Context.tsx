import React from "react";
import { CuriRouter, Emitted } from "@curi/types";

const key: Emitted = {
  router: null,
  response: null,
  navigation: null
};

const response_context = React.createContext<Emitted>(key);
const {
  Provider: ResponseProvider,
  Consumer: ResponseConsumer
} = response_context;

const router_context = React.createContext<CuriRouter>(null);
const { Provider: RouterProvider, Consumer: RouterConsumer } = router_context;

export {
  ResponseProvider,
  ResponseConsumer,
  response_context,
  RouterProvider,
  RouterConsumer,
  router_context
};
