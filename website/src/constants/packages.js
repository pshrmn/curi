import versions from "./versions";

const packages = [
  {
    name: "router",
    globalName: "Curi",
    type: "router",
    script: true,
    latest: "v1",
    versions: {
      v1: versions["router"]
    },
    import: () =>
      import(/* webpackChunkName: 'package--router' */
      `../pages/Packages/router/v1/index.js`)
  },
  {
    name: "react-dom",
    globalName: "CuriReactDOM",
    type: "render",
    script: true,
    latest: "v1",
    versions: {
      v1: versions["react-dom"]
    },
    import: version => {
      switch (version) {
        case "v1":
        default:
          return import(/* webpackChunkName: 'package--react-dom-v1' */
          `../pages/Packages/react-dom/v1/index.js`);
      }
    }
  },
  {
    name: "react-native",
    version: versions["react-native"],
    globalName: "CuriReactNative",
    type: "render",
    script: false,
    latest: "v1",
    versions: {
      v1: versions["react-native"]
    },
    import: () =>
      import(/* webpackChunkName: 'package--react-native' */
      `../pages/Packages/react-native/v1/index.js`)
  },
  {
    name: "svelte",
    version: versions["svelte"],
    globalName: "CuriSvelte",
    type: "render",
    script: false,
    latest: "v1",
    versions: {
      v1: versions["svelte"]
    },
    import: () =>
      import(/* webpackChunkName: 'package--svelte' */
      `../pages/Packages/svelte/v1/index.js`)
  },
  {
    name: "vue",
    version: versions["vue"],
    globalName: "CuriVue",
    type: "render",
    script: true,
    latest: "v1",
    versions: {
      v1: versions["vue"]
    },
    import: () =>
      import(/* webpackChunkName: 'package--vue' */
      `../pages/Packages/vue/v1/index.js`)
  },
  {
    name: "route-active",
    version: versions["route-active"],
    globalName: "CuriRouteActive",
    type: "route interactions",
    script: true,
    latest: "v1",
    versions: {
      v1: versions["route-active"]
    },
    import: () =>
      import(/* webpackChunkName: 'package--route-active' */
      `../pages/Packages/route-active/v1/index.js`)
  },
  {
    name: "route-ancestors",
    version: versions["route-ancestors"],
    globalName: "CuriRouteAncestors",
    type: "route interactions",
    script: true,
    latest: "v1",
    versions: {
      v1: versions["route-ancestors"]
    },
    import: () =>
      import(/* webpackChunkName: 'package--route-ancestors' */
      `../pages/Packages/route-ancestors/v1/index.js`)
  },
  {
    name: "route-prefetch",
    version: versions["route-prefetch"],
    globalName: "CuriRoutePrefetch",
    type: "route interactions",
    script: true,
    latest: "v1",
    versions: {
      v1: versions["route-prefetch"]
    },
    import: () =>
      import(/* webpackChunkName: 'package--route-prefetch' */
      `../pages/Packages/route-prefetch/v1/index.js`)
  },
  {
    name: "side-effect-aria-live",
    version: versions["side-effect-aria-live"],
    globalName: "CuriSideEffectAriaLive",
    type: "side effects",
    script: true,
    latest: "v1",
    versions: {
      v1: versions["side-effect-aria-live"]
    },
    import: () =>
      import(/* webpackChunkName: 'package--side-effect-aria-live' */
      `../pages/Packages/side-effect-aria-live/v1/index.js`)
  },
  {
    name: "side-effect-scroll",
    version: versions["side-effect-scroll"],
    globalName: "CuriSideEffectScroll",
    type: "side effects",
    script: true,
    latest: "v1",
    versions: {
      v1: versions["side-effect-scroll"]
    },
    import: () =>
      import(/* webpackChunkName: 'package--side-effect-scroll' */
      `../pages/Packages/side-effect-scroll/v1/index.js`)
  },
  {
    name: "side-effect-title",
    version: versions["side-effect-title"],
    globalName: "CuriSideEffectTitle",
    type: "side effects",
    script: true,
    latest: "v1",
    versions: {
      v1: versions["side-effect-title"]
    },
    import: () =>
      import(/* webpackChunkName: 'package--side-effect-title' */
      `../pages/Packages/side-effect-title/v1/index.js`)
  },
  {
    name: "static",
    version: versions["static"],
    globalName: "CuriStatic",
    type: "other",
    script: false,
    latest: "v1",
    versions: {
      v1: versions["static"]
    },
    import: () =>
      import(/* webpackChunkName: 'package--static' */
      `../pages/Packages/static/v1/index.js`)
  },
  {
    name: "helpers",
    version: versions["helpers"],
    globalName: "CuriHelpers",
    type: "other",
    script: true,
    latest: "v1",
    versions: {
      v1: versions["helpers"]
    },
    import: () =>
      import(/* webpackChunkName: 'package--helpers' */
      `../pages/Packages/helpers/v1/index.js`)
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
