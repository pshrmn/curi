import versions from "./versions";
import preferDefault from "../preferDefault";

const packages = [
  {
    name: "router",
    version: versions["router"],
    globalName: "Curi",
    type: "router",
    script: true,
    import: () =>
      import(/* webpackChunkName: 'package--router' */
      `../pages/Packages/router.js`)
  },
  {
    name: "react-dom",
    version: versions["react-dom"],
    globalName: "CuriReactDOM",
    type: "render",
    script: true,
    import: () =>
      import(/* webpackChunkName: 'package--react-dom' */
      `../pages/Packages/react-dom.js`)
  },
  {
    name: "react-native",
    version: versions["react-native"],
    globalName: "CuriReactNative",
    type: "render",
    script: false,
    import: () =>
      import(/* webpackChunkName: 'package--react-native' */
      `../pages/Packages/react-native.js`)
  },
  {
    name: "svelte",
    version: versions["svelte"],
    globalName: "CuriSvelte",
    type: "render",
    script: false,
    import: () =>
      import(/* webpackChunkName: 'package--svelte' */
      `../pages/Packages/svelte.js`)
  },
  {
    name: "vue",
    version: versions["vue"],
    globalName: "CuriVue",
    type: "render",
    script: true,
    import: () =>
      import(/* webpackChunkName: 'package--vue' */
      `../pages/Packages/vue.js`)
  },
  {
    name: "route-active",
    version: versions["route-active"],
    globalName: "CuriRouteActive",
    type: "route interactions",
    script: true,
    import: () =>
      import(/* webpackChunkName: 'package--route-active' */
      `../pages/Packages/route-active.js`)
  },
  {
    name: "route-ancestors",
    version: versions["route-ancestors"],
    globalName: "CuriRouteAncestors",
    type: "route interactions",
    script: true,
    import: () =>
      import(/* webpackChunkName: 'package--route-ancestors' */
      `../pages/Packages/route-ancestors.js`)
  },
  {
    name: "route-prefetch",
    version: versions["route-prefetch"],
    globalName: "CuriRoutePrefetch",
    type: "route interactions",
    script: true,
    import: () =>
      import(/* webpackChunkName: 'package--route-prefetch' */
      `../pages/Packages/route-prefetch.js`)
  },
  {
    name: "side-effect-aria-live",
    version: versions["side-effect-aria-live"],
    globalName: "CuriSideEffectAriaLive",
    type: "side effects",
    script: true,
    import: () =>
      import(/* webpackChunkName: 'package--side-effect-aria-live' */
      `../pages/Packages/side-effect-aria-live.js`)
  },
  {
    name: "side-effect-scroll",
    version: versions["side-effect-scroll"],
    globalName: "CuriSideEffectScroll",
    type: "side effects",
    script: true,
    import: () =>
      import(/* webpackChunkName: 'package--side-effect-scroll' */
      `../pages/Packages/side-effect-scroll.js`)
  },
  {
    name: "side-effect-title",
    version: versions["side-effect-title"],
    globalName: "CuriSideEffectTitle",
    type: "side effects",
    script: true,
    import: () =>
      import(/* webpackChunkName: 'package--side-effect-title' */
      `../pages/Packages/side-effect-title.js`)
  },
  {
    name: "static",
    version: versions["static"],
    globalName: "CuriStatic",
    type: "other",
    script: false,
    import: () =>
      import(/* webpackChunkName: 'package--static' */
      `../pages/Packages/static.js`)
  },
  {
    name: "helpers",
    version: versions["helpers"],
    globalName: "CuriHelpers",
    type: "other",
    script: true,
    import: () =>
      import(/* webpackChunkName: 'package--helpers' */
      `../pages/Packages/helpers.js`)
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
