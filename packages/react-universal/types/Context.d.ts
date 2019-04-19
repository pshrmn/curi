import React from "react";
import { CuriRouter, ResponseAndNav } from "@curi/types";
declare const responseContext: React.Context<ResponseAndNav>;
declare const ResponseProvider: React.ProviderExoticComponent<React.ProviderProps<ResponseAndNav>>, ResponseConsumer: React.ExoticComponent<React.ConsumerProps<ResponseAndNav>>;
declare const routerContext: React.Context<CuriRouter>;
declare const RouterProvider: React.ProviderExoticComponent<React.ProviderProps<CuriRouter>>, RouterConsumer: React.ExoticComponent<React.ConsumerProps<CuriRouter>>;
export { ResponseProvider, ResponseConsumer, responseContext, RouterProvider, RouterConsumer, routerContext };
