import versions from "./versions";

const packages = [
  {
    name: "router",
    version: versions["router"],
    globalName: "Curi",
    type: "router"
  },
  {
    name: "react",
    version: versions["react"],
    globalName: "CuriReact",
    type: "render"
  },
  {
    name: "react-native",
    version: versions["react-native"],
    globalName: "CuriReactNative",
    type: "render"
  },
  {
    name: "svelte",
    version: versions["svelte"],
    globalName: "CuriSvelte",
    type: "render"
  },
  {
    name: "vue",
    version: versions["vue"],
    globalName: "CuriVue",
    type: "render"
  },
  {
    name: "route-active",
    version: versions["route-active"],
    globalName: "CuriRouteActive",
    type: "route interactions"
  },
  {
    name: "route-ancestors",
    version: versions["route-ancestors"],
    globalName: "CuriRouteAncestors",
    type: "route interactions"
  },
  {
    name: "route-prefetch",
    version: versions["route-prefetch"],
    globalName: "CuriRoutePrefetch",
    type: "route interactions"
  },
  {
    name: "side-effect-aria-live",
    version: versions["side-effect-aria-live"],
    globalName: "CuriSideEffectAriaLive",
    type: "side effects"
  },
  {
    name: "side-effect-title",
    version: versions["side-effect-title"],
    globalName: "CuriSideEffectTitle",
    type: "side effects"
  },
  {
    name: "side-effect-scroll",
    version: versions["side-effect-scroll"],
    globalName: "CuriSideEffectScroll",
    type: "side effects"
  }
];

let groupedPackages;

export default {
  find: function findPackage(name) {
    return packages.find(p => p.name === name);
  },
  grouped: function groupPackages() {
    if (!groupedPackages) {
      groupedPackages = packages.reduce((acc, curr) => {
        if (!acc[curr.type]) {
          acc[curr.type] = [curr];
        } else {
          acc[curr.type].push(curr);
        }
        return acc;
      }, {});
    }
    return groupedPackages;
  },
  all: function() {
    return packages;
  }
};
