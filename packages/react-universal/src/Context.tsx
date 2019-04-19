import React from "react";
import { CuriRouter, ResponseAndNav } from "@curi/types";

const key: ResponseAndNav = {
  response: null,
  navigation: null
};

const responseContext = React.createContext<ResponseAndNav>(key);
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
