import Router from "./router";
import RouteActive from "./route-active";
import RouteAncestors from "./route-ancestors";
import RoutePrefetch from "./route-prefetch";
import SideEffectAriaLive from "./side-effect-aria-live";
import SideEffectScroll from "./side-effect-scroll";
import SideEffectTitle from "./side-effect-title";
import ReactPkg from "./react-dom";
import ReactNativePkg from "./react-native";
import Static from "./static";
import Svelte from "./svelte";
import Vue from "./vue";

export default {
  router: Router,
  "route-active": RouteActive,
  "route-ancestors": RouteAncestors,
  "route-prefetch": RoutePrefetch,
  "side-effect-aria-live": SideEffectAriaLive,
  "side-effect-title": SideEffectTitle,
  "side-effect-scroll": SideEffectScroll,
  "react-dom": ReactPkg,
  "react-native": ReactNativePkg,
  static: Static,
  svelte: Svelte,
  vue: Vue
};
