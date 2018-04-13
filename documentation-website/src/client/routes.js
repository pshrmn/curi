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
    match: {
      response: ({ set }) => {
        set.body(Home);
        set.title("Curi");
      }
    }
  },
  {
    name: "Tutorials",
    path: "tutorial",
    match: {
      response: ({ set }) => {
        set.body(TutorialBase);
        set.title("Tutorial");
      }
    },
    children: [
      {
        name: "Tutorial",
        path: ":slug",
        match: {
          initial: () =>
            import(/* webpackChunkName: 'tutorial' */ "./route-components/Tutorial").then(
              module => module.default,
              catchImportError("tutorial")
            ),
          response: ({ route, resolved, set }) => {
            set.body(resolved.initial);
            const tutorial = TUTORIAL_API.find(route.params.slug);
            if (tutorial) {
              set.title(`Tutorial ${tutorial.title}`);
            }
          }
        }
      }
    ]
  },
  {
    name: "Guides",
    path: "guides",
    match: {
      response: ({ set, addons }) => {
        const defaultGuide = addons.pathname("Guide", {
          slug: "getting-started"
        });
        set.redirect(defaultGuide);
        set.title("Guides");
      }
    },
    children: [
      {
        name: "Guide",
        path: ":slug/",
        match: {
          initial: () =>
            import(/* webpackChunkName: 'guide' */ "./route-components/Guide").then(
              module => module.default,
              catchImportError("guide")
            ),
          response: ({ route, resolved, set }) => {
            set.body(resolved.initial);
            const guide = GUIDE_API.find(route.params.slug);
            if (guide) {
              set.data(guide);
              set.title(`${guide.name} Guide`);
            }
          }
        }
      }
    ]
  },
  {
    name: "Packages",
    path: "packages",
    match: {
      response: ({ set }) => {
        set.body(PackageList);
        set.title("Curi Packages");
      }
    },
    children: [
      {
        name: "Package",
        path: "@curi/:package/",
        match: {
          initial: () =>
            import(/* webpackChunkName: 'package' */ "./route-components/Package").then(
              module => module.default,
              catchImportError("package")
            ),
          response: ({ route, resolved, set }) => {
            set.body(resolved.initial);
            const pkg = PACKAGE_API.find(route.params.package);
            set.title(`@curi/${route.params.package}`);
            if (pkg) {
              set.data(pkg);
            }
          }
        }
      }
    ]
  },
  {
    name: "Examples",
    path: "examples",
    match: {
      response: ({ set }) => {
        set.body(ExampleList);
        set.title("Examples");
      }
    },
    children: [
      {
        name: "Example",
        path: ":category/:slug/",
        match: {
          initial: () =>
            import(/* webpackChunkName: 'example' */ "./route-components/Example").then(
              module => module.default,
              catchImportError("example")
            ),
          response: ({ route, resolved, set }) => {
            set.body(resolved.initial);
            const { category, slug } = route.params;
            const example = EXAMPLE_API.find(category, slug);
            if (example) {
              set.data(example);
              set.title(`${example.name} Example`);
            }
          }
        }
      }
    ]
  }
];
