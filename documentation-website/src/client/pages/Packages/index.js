import Core from "./Core";
import RouteActive from "./RouteActive";
import RouteAncestors from "./RouteAncestors";
import RoutePrefetch from "./RoutePrefetch";
import SideEffectTitle from "./SideEffectTitle";
import SideEffectScroll from "./SideEffectScroll";
import ReactPkg from "./ReactPkg";
import ReactNativePkg from "./ReactNativePkg";
import Redux from "./Redux";
import MobX from "./MobX";
import Svelte from "./Svelte";
import Vue from "./Vue";

export default {
  core: Core,
  "route-active": RouteActive,
  "route-ancestors": RouteAncestors,
  "route-prefetch": RoutePrefetch,
  "side-effect-title": SideEffectTitle,
  "side-effect-scroll": SideEffectScroll,
  react: ReactPkg,
  "react-native": ReactNativePkg,
  mobx: MobX,
  redux: Redux,
  svelte: Svelte,
  vue: Vue
};
