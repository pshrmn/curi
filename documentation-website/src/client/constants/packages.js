import versions from "./versions";

const packages = [
  {
    name: "core",
    version: versions["core"],
    globalName: "Curi",
    type: "core"
  },
  {
    name: "route-active",
    version: versions["route-active"],
    globalName: "CuriRouteActive",
    type: "route"
  },
  {
    name: "route-ancestors",
    version: versions["route-ancestors"],
    globalName: "CuriRouteAncestors",
    type: "route"
  },
  {
    name: "route-prefetch",
    version: versions["route-prefetch"],
    globalName: "CuriRoutePrefetch",
    type: "route"
  },
  {
    name: "side-effect-title",
    version: versions["side-effect-title"],
    globalName: "CuriSideEffectTitle",
    type: "side-effect"
  },
  {
    name: "side-effect-scroll",
    version: versions["side-effect-scroll"],
    globalName: "CuriSideEffectScroll",
    type: "side-effect"
  },
  {
    name: "react",
    version: versions["react"],
    globalName: "CuriReact",
    type: "renderer"
  },
  {
    name: "react-native",
    version: versions["react-native"],
    globalName: "CuriReactNative",
    type: "renderer"
  },
  {
    name: "mobx",
    version: versions["mobx"],
    globalName: "CuriMobX",
    type: "state"
  },
  {
    name: "redux",
    version: versions["redux"],
    globalName: "CuriRedux",
    type: "state"
  },
  {
    name: "svelte",
    version: versions["svelte"],
    globalName: "CuriSvelte",
    type: "renderer"
  },
  {
    name: "vue",
    version: versions["vue"],
    globalName: "CuriVue",
    type: "renderer"
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
