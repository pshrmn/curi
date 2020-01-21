import versions from "./versions";

let packages = [
  {
    name: "router",
    globalName: "Curi",
    type: "router",
    script: true,
    latest: "v2",
    versions: {
      v1: "1.1.1",
      v2: versions["router"]
    },
    import: version => {
      switch (version) {
        case "v1":
          return import(
            /* webpackChunkName: 'package--router-v1' */
            `../pages/Packages/v1/router/index.js`
          );
        case "v2":
        default:
          return import(
            /* webpackChunkName: 'package--router-v2' */
            `../pages/Packages/v2/router/index.js`
          );
      }
    }
  },
  {
    name: "interactions",
    globalName: "CuriInteractions",
    type: "router",
    script: true,
    latest: "v2",
    versions: {
      v2: versions["interactions"]
    },
    import: version => {
      switch (version) {
        case "v2":
        default:
          return import(
            /* webpackChunkName: 'package--interactions-v2' */
            `../pages/Packages/v2/interactions/index.js`
          );
      }
    }
  },
  {
    name: "react-dom",
    globalName: "CuriReactDOM",
    type: "render",
    script: true,
    latest: "v2",
    versions: {
      v1: "1.2.1",
      v2: versions["react-dom"]
    },
    import: version => {
      switch (version) {
        case "v1":
          return import(
            /* webpackChunkName: 'package--react-dom-v1' */
            `../pages/Packages/v1/react-dom/index.js`
          );
        case "v2":
        default:
          return import(
            /* webpackChunkName: 'package--react-dom-v2' */
            `../pages/Packages/v2/react-dom/index.js`
          );
      }
    }
  },
  {
    name: "react-native",
    version: versions["react-native"],
    globalName: "CuriReactNative",
    type: "render",
    script: false,
    latest: "v2",
    versions: {
      v1: "1.1.1",
      v2: versions["react-native"]
    },
    import: version => {
      switch (version) {
        case "v1":
          return import(
            /* webpackChunkName: 'package--react-native-v1' */
            `../pages/Packages/v1/react-native/index.js`
          );
        case "v2":
        default:
          return import(
            /* webpackChunkName: 'package--react-native-v2' */
            `../pages/Packages/v2/react-native/index.js`
          );
      }
    }
  },
  {
    name: "svelte",
    version: versions["svelte"],
    globalName: "CuriSvelte",
    type: "render",
    script: false,
    latest: "v2",
    versions: {
      v2: versions["svelte"]
    },
    import: () =>
      import(
        /* webpackChunkName: 'package--svelte' */
        `../pages/Packages/v2/svelte/index.js`
      )
  },
  {
    name: "vue",
    version: versions["vue"],
    globalName: "CuriVue",
    type: "render",
    script: true,
    latest: "v2",
    versions: {
      v2: versions["vue"]
    },
    import: () =>
      import(
        /* webpackChunkName: 'package--vue' */
        `../pages/Packages/v2/vue/index.js`
      )
  },
  {
    name: "route-ancestors",
    version: versions["route-ancestors"],
    globalName: "CuriRouteAncestors",
    type: "route interactions",
    script: true,
    latest: "v1",
    versions: {
      v1: "1.1.0"
    },
    import: () => {
      return import(
        /* webpackChunkName: 'package--route-ancestors-v1' */
        `../pages/Packages/v1/route-ancestors/index.js`
      );
    }
  },
  {
    name: "route-prefetch",
    version: versions["route-prefetch"],
    globalName: "CuriRoutePrefetch",
    type: "route interactions",
    script: true,
    latest: "v1",
    versions: {
      v1: "1.1.0"
    },
    import: () => {
      return import(
        /* webpackChunkName: 'package--route-prefetch-v1' */
        `../pages/Packages/v1/route-prefetch/index.js`
      );
    }
  },
  {
    name: "route-active",
    version: versions["route-active"],
    globalName: "CuriRouteActive",
    type: "route interactions",
    script: true,
    latest: "v1",
    versions: {
      v1: "1.1.0"
    },
    import: () => {
      return import(
        /* webpackChunkName: 'package--route-active-v1' */
        `../pages/Packages/v1/route-active/index.js`
      );
    }
  },
  {
    name: "side-effect-aria-live",
    version: versions["side-effect-aria-live"],
    globalName: "CuriSideEffectAriaLive",
    type: "side effects",
    script: true,
    latest: "v1",
    versions: {
      v1: "1.0.1"
    },
    import: () => {
      return import(
        /* webpackChunkName: 'package--side-effect-aria-live-v1' */
        `../pages/Packages/v1/side-effect-aria-live/index.js`
      );
    }
  },
  {
    name: "side-effect-scroll",
    version: versions["side-effect-scroll"],
    globalName: "CuriSideEffectScroll",
    type: "side effects",
    script: true,
    latest: "v1",
    versions: {
      v1: "1.0.1"
    },
    import: () => {
      return import(
        /* webpackChunkName: 'package--side-effect-scroll-v1' */
        `../pages/Packages/v1/side-effect-scroll/index.js`
      );
    }
  },
  {
    name: "side-effect-title",
    version: versions["side-effect-title"],
    globalName: "CuriSideEffectTitle",
    type: "side effects",
    script: true,
    latest: "v1",
    versions: {
      v1: "1.0.1"
    },
    import: () => {
      return import(
        /* webpackChunkName: 'package--side-effect-title-v1' */
        `../pages/Packages/v1/side-effect-title/index.js`
      );
    }
  },
  {
    name: "static",
    version: versions["static"],
    globalName: "CuriStatic",
    type: "other",
    script: false,
    latest: "v2",
    versions: {
      v2: versions["static"]
    },
    import: () =>
      import(
        /* webpackChunkName: 'package--static' */
        `../pages/Packages/v2/static/index.js`
      )
  },
  {
    name: "helpers",
    version: versions["helpers"],
    globalName: "CuriHelpers",
    type: "other",
    script: true,
    latest: "v2",
    versions: {
      v1: "1.0.0",
      v2: versions["helpers"]
    },
    import: version => {
      switch (version) {
        case "v1":
          return import(
            /* webpackChunkName: 'package--helpers-v1' */
            `../pages/Packages/v1/helpers/index.js`
          );
        case "v2":
        default:
          return import(
            /* webpackChunkName: 'package--helpers-v2' */
            `../pages/Packages/v2/helpers/index.js`
          );
      }
    }
  },
  {
    name: "types",
    version: versions["types"],
    globalName: "CuriTypes",
    type: "other",
    script: false,
    latest: "v2",
    versions: {
      v2: versions["types"]
    },
    import: version => {
      switch (version) {
        case "v2":
        default:
          return import(
            /* webpackChunkName: 'package--types-v2' */
            `../pages/Packages/v2/types/index.js`
          );
      }
    }
  }
];

let groupedPackages;
let versionedPackages = {};

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
  versioned: function versionPackages(version) {
    if (!versionedPackages[version]) {
      versionedPackages[version] = packages.reduce((acc, curr) => {
        if (!(version in curr.versions)) {
          return acc;
        }
        if (!acc[curr.type]) {
          acc[curr.type] = [curr];
        } else {
          acc[curr.type].push(curr);
        }
        return acc;
      }, {});
    }
    return versionedPackages[version];
  },
  all: function() {
    return packages;
  }
};
