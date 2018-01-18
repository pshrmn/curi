import versions from "./versions";

const packages = [
  {
    name: "core",
    version: versions["core"],
    globalName: "Curi",
    type: "core"
  },
  {
    name: "addon-active",
    version: versions["addon-active"],
    globalName: "CuriAddonActive",
    type: "addon"
  },
  {
    name: "addon-ancestors",
    version: versions["addon-ancestors"],
    globalName: "CuriAddonAncestors",
    type: "addon"
  },
  {
    name: "addon-prefetch",
    version: versions["addon-prefetch"],
    globalName: "CuriAddonPrefetch",
    type: "addon"
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

export const groupedPackages = packages.reduce((acc, curr) => {
  if (!acc[curr.type]) {
    acc[curr.type] = [curr];
  } else {
    acc[curr.type].push(curr);
  }
  return acc;
}, {});

export const byName = packages.reduce((acc, curr) => {
  acc[curr.name] = curr;
  return acc;
}, {});

export default packages;
