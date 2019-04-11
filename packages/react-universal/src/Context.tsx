import React from "react";
import { CuriRouter, Emitted } from "@curi/types";

const key: Emitted = {
  router: null,
  response: null,
  navigation: null
};

const responseContext = React.createContext<Emitted>(key);
const {
  Provider: ResponseProvider,
  Consumer: ResponseConsumer
} = responseContext;

const routerContext = React.createContext<CuriRouter>(null);
const { Provider: RouterProvider, Consumer: RouterConsumer } = routerContext;

export {
  ResponseProvider,
  ResponseConsumer,
  responseContext,
  RouterProvider,
  RouterConsumer,
  routerContext
};
