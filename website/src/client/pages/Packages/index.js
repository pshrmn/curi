import Router from "./Router";
import RouteActive from "./RouteActive";
import RouteAncestors from "./RouteAncestors";
import RoutePrefetch from "./RoutePrefetch";
import SideEffectAriaLive from "./SideEffectAriaLive";
import SideEffectTitle from "./SideEffectTitle";
import SideEffectScroll from "./SideEffectScroll";
import ReactPkg from "./ReactPkg";
import ReactNativePkg from "./ReactNativePkg";
import Svelte from "./Svelte";
import Vue from "./Vue";

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
  svelte: Svelte,
  vue: Vue
};
