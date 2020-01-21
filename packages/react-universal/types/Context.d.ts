import React from "react";
import { CuriRouter, ResponseAndNav } from "@curi/types";
declare let responseContext: React.Context<ResponseAndNav>;
declare let ResponseProvider: React.ProviderExoticComponent<React.ProviderProps<ResponseAndNav>>, ResponseConsumer: React.ExoticComponent<React.ConsumerProps<ResponseAndNav>>;
declare let routerContext: React.Context<CuriRouter>;
declare let RouterProvider: React.ProviderExoticComponent<React.ProviderProps<CuriRouter>>, RouterConsumer: React.ExoticComponent<React.ConsumerProps<CuriRouter>>;
export { ResponseProvider, ResponseConsumer, responseContext, RouterProvider, RouterConsumer, routerContext };
