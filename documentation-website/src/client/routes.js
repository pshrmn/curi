import React from "react";

// components that are not code split
import Home from "./route-components/Home";
import PackageList from "./route-components/PackageList";
import ExampleList from "./route-components/ExampleList";
import TutorialBase from "./route-components/TutorialBase";

import TUTORIAL_API from "./constants/tutorials";
import GUIDE_API from "./constants/guides";
import PACKAGE_API from "./constants/packages";
import EXAMPLE_API from "./constants/examples";

function catchImportError(name) {
  return function caught(error) {
    console.error("Failed to load module for:", name, error);
    return () => <div>Sorry, something went wrong...</div>;
  };
}

export default [
  {
    name: "Home",
    path: "",
    response: () => {
      return {
        body: Home,
        title: "Curi"
      };
    }
  },
  {
    name: "Tutorials",
    path: "tutorial",
    response: () => {
      return {
        body: TutorialBase,
        title: "Tutorials"
      };
    },
    children: [
      {
        name: "Tutorial",
        path: ":slug",
        response: ({ params, resolved }) => {
          const tutorial = TUTORIAL_API.find(params.slug);
          return {
            body: resolved.initial,
            tutorial: tutorial
              ? `Tutorial ${tutorial.title}`
              : "Tutorial Not Found"
          };
        },
        on: {
          initial: () =>
            import(/* webpackChunkName: 'tutorial' */ "./route-components/Tutorial").then(
              module => module.default,
              catchImportError("tutorial")
            )
        }
      }
    ]
  },
  {
    name: "Guides",
    path: "guides",
    response: () => {
      return {
        redirectTo: {
          name: "Guide",
          params: {
            slug: "getting-started"
          }
        },
        title: "Guides"
      };
    },
    children: [
      {
        name: "Guide",
        path: ":slug/",
        response: ({ params, resolved, set }) => {
          const guide = GUIDE_API.find(params.slug);
          return {
            body: resolved.initial,
            data: guide,
            title: guide ? `${guide.name} Guide` : "Guide Not Found"
          };
        },
        on: {
          initial: () =>
            import(/* webpackChunkName: 'guide' */ "./route-components/Guide").then(
              module => module.default,
              catchImportError("guide")
            )
        }
      }
    ]
  },
  {
    name: "Packages",
    path: "packages",
    response: () => {
      return {
        body: PackageList,
        title: "Curi Packages"
      };
    },
    children: [
      {
        name: "Package",
        path: "@curi/:package/",
        response: ({ params, resolved }) => {
          const pkg = PACKAGE_API.find(params.package);
          return {
            body: resolved.initial,
            title: `@curi/${params.package}`,
            data: pkg
          };
        },
        on: {
          initial: () =>
            import(/* webpackChunkName: 'package' */ "./route-components/Package").then(
              module => module.default,
              catchImportError("package")
            )
        }
      }
    ]
  },
  {
    name: "Examples",
    path: "examples",
    response: () => {
      return {
        body: ExampleList,
        title: "Examples"
      };
    },
    children: [
      {
        name: "Example",
        path: ":category/:slug/",
        response: ({ params, resolved }) => {
          const { category, slug } = params;
          const example = EXAMPLE_API.find(category, slug);
          return {
            body: resolved.initial,
            data: example,
            title: example ? `${example.name} Example` : "Example Not Found"
          };
        },
        on: {
          initial: () =>
            import(/* webpackChunkName: 'example' */ "./route-components/Example").then(
              module => module.default,
              catchImportError("example")
            )
        }
      }
    ]
  }
];
