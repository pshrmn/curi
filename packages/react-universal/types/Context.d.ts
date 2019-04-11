import React from "react";
import { CuriRouter, Emitted } from "@curi/types";
declare const response_context: React.Context<Emitted>;
declare const ResponseProvider: React.ProviderExoticComponent<React.ProviderProps<Emitted>>, ResponseConsumer: React.ExoticComponent<React.ConsumerProps<Emitted>>;
declare const router_context: React.Context<CuriRouter>;
declare const RouterProvider: React.ProviderExoticComponent<React.ProviderProps<CuriRouter>>, RouterConsumer: React.ExoticComponent<React.ConsumerProps<CuriRouter>>;
export { ResponseProvider, ResponseConsumer, response_context, RouterProvider, RouterConsumer, router_context };
