import React from "react";
import { CuriRouter, Emitted } from "@curi/types";
declare const emitted_context: React.Context<Emitted>;
declare const EmittedProvider: React.ProviderExoticComponent<React.ProviderProps<Emitted>>, Curious: React.ExoticComponent<React.ConsumerProps<Emitted>>;
declare const router_context: React.Context<CuriRouter>;
declare const RouterProvider: React.ProviderExoticComponent<React.ProviderProps<CuriRouter>>, RouterConsumer: React.ExoticComponent<React.ConsumerProps<CuriRouter>>;
export { EmittedProvider, Curious, emitted_context, RouterProvider, RouterConsumer, router_context };
