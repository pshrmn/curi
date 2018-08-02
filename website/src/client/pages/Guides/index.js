import Installation from "./Installation";
import CreatingARouter from "./CreatingARouter";
import RoutesAndResponses from "./RoutesAndResponses";
import SyncAsync from "./SyncAsync";
import NavigatingAndObserving from "./NavigatingAndObserving";

import ReactRendering from "./React";
import ReactNativeRendering from "./ReactNative";
import VueRendering from "./Vue";
import SvelteRendering from "./Svelte";

import RouteInteractions from "./RouteInteractions";
import SideEffects from "./UsingSideEffects";
import CodeSplitting from "./CodeSplitting";
import LoadingData from "./Loading";
import Accessibility from "./Accessibility";
import Apollo from "./Apollo";

import MigrateReactRouterv3 from "./MigrateReactRouterv3";
import MigrateReactRouterv4 from "./MigrateReactRouterv4";

export default {
  // basic
  installation: Installation,
  "creating-a-router": CreatingARouter,
  "routes-and-responses": RoutesAndResponses,
  "sync-or-async": SyncAsync,
  "navigating-and-observing": NavigatingAndObserving,

  // rendering
  react: ReactRendering,
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

  // migration
  "migrate-rrv3": MigrateReactRouterv3,
  "migrate-rrv4": MigrateReactRouterv4
};
