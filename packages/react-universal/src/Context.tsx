import React from "react";
import { CuriRouter, ResponseAndNav } from "@curi/types";

let key: ResponseAndNav = {
  response: null,
  navigation: null
};

let responseContext = React.createContext<ResponseAndNav>(key);
let {
  Provider: ResponseProvider,
  Consumer: ResponseConsumer
} = responseContext;

let routerContext = React.createContext<CuriRouter>(null);
let { Provider: RouterProvider, Consumer: RouterConsumer } = routerContext;

export {
  ResponseProvider,
  ResponseConsumer,
  responseContext,
  RouterProvider,
  RouterConsumer,
  routerContext
};
