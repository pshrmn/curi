import Core from "./Core";
import AddonActive from "./AddonActive";
import AddonAncestors from "./AddonAncestors";
import AddonPrefetch from "./AddonPrefetch";
import SideEffectTitle from "./SideEffectTitle";
import SideEffectScroll from "./SideEffectScroll";
import ReactPkg from "./ReactPkg";
import ReactNativePkg from "./ReactNativePkg";
import Redux from "./Redux";
import Svelte from "./Svelte";
import Vue from "./Vue";

export default {
  core: Core,
  "addon-active": AddonActive,
  "addon-ancestors": AddonAncestors,
  "addon-prefetch": AddonPrefetch,
  "side-effect-title": SideEffectTitle,
  "side-effect-scroll": SideEffectScroll,
  react: ReactPkg,
  "react-native": ReactNativePkg,
  redux: Redux,
  svelte: Svelte,
  vue: Vue
};
