import Installation from "./installation";
import CreatingARouter from "./creating-a-router";
import RoutesAndResponses from "./routes-and-responses";
import SyncAsync from "./sync-or-async";
import NavigatingAndObserving from "./navigating-and-observing";

import ReactDOMRendering from "./react-dom";
import ReactNativeRendering from "./react-native";
import SvelteRendering from "./svelte";
import VueRendering from "./vue";

import RouteInteractions from "./routes-and-responses";
import SideEffects from "./side-effects";
import CodeSplitting from "./code-splitting";
import LoadingData from "./loading";
import Accessibility from "./accessibility";
import Apollo from "./apollo";
import DevTips from "./dev-tips";

import MigrateReactRouterv3 from "./migrate-rrv3";
import MigrateReactRouterv4 from "./migrate-rrv4";

export default {
  // basic
  installation: Installation,
  "creating-a-router": CreatingARouter,
  "routes-and-responses": RoutesAndResponses,
  "sync-or-async": SyncAsync,
  "navigating-and-observing": NavigatingAndObserving,

  // rendering
  "react-dom": ReactDOMRendering,
  "react-native": ReactNativeRendering,
  vue: VueRendering,
  svelte: SvelteRendering,

  // advanced
  "route-interactions": RouteInteractions,
  "side-effects": SideEffects,
  "code-splitting": CodeSplitting,
  loading: LoadingData,
  accessibility: Accessibility,
  apollo: Apollo,
  "dev-tips": DevTips,

  // migration
  "migrate-rrv3": MigrateReactRouterv3,
  "migrate-rrv4": MigrateReactRouterv4
};
