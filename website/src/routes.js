import { prepareRoutes } from "@curi/router";
import { preferDefault } from "@curi/helpers";

// components that are not code split
import Home from "./components/routes/Home";
import PackageList from "./components/routes/PackageList";
import GuideList from "./components/routes/GuideList";
import ExampleList from "./components/routes/ExampleList";
import TutorialList from "./components/routes/TutorialList";
import NotFound from "./components/routes/NotFound";

import TUTORIAL_API from "./constants/tutorials";
import GUIDE_API from "./constants/guides";
import PACKAGE_API from "./constants/packages";
import EXAMPLE_API from "./constants/examples";

import catchImportError from "./catchImportError";

export default prepareRoutes([
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
    path: "tutorial/",
    response: () => {
      return {
        body: TutorialList,
        title: "Tutorials"
      };
    },
    children: [
      {
        name: "Tutorial",
        path: ":slug/",
        resolve({ params }) {
          const tutorial = TUTORIAL_API.find(params.slug);
          const body = import(/* webpackChunkName: 'tutorial', webpackPrefetch: true */
          "./components/routes/Tutorial").then(
            preferDefault,
            catchImportError("tutorial")
          );
          const content = tutorial
            ? tutorial
                .import()
                .catch(catchImportError(`tutorial: ${params.slug}`))
            : import(/* webpackChunkName: 'tutorial404' */
              "./pages/Tutorials/404.js").then(
                preferDefault,
                catchImportError("tutorial 404")
              );
          return Promise.all([body, content]);
        },
        response: ({ match, resolved }) => {
          const tutorial = TUTORIAL_API.find(match.params.slug);
          const [body, content] = resolved;
          return {
            body: body,
            data: {
              content: content
            },
            title: tutorial
              ? `Tutorial ${tutorial.title}`
              : "Tutorial Not Found"
          };
        }
      }
    ]
  },
  {
    name: "Guides",
    path: "guides/",
    response: () => {
      return {
        body: GuideList,
        title: "Guides"
      };
    },
    children: [
      {
        name: "Guide",
        path: ":slug/",
        resolve({ params }) {
          const body = import(/* webpackChunkName: 'guide', webpackPrefetch: true */
          "./components/routes/Guide").then(
            preferDefault,
            catchImportError(`guide`)
          );
          const guide = GUIDE_API.find(params.slug);
          const content = guide
            ? guide.import().catch(catchImportError(`guide: ${params.slug}`))
            : import(/* webpackChunkName: 'guide404' */
              "./pages/Guides/404.js").then(
                preferDefault,
                catchImportError(`guide 404`)
              );
          return Promise.all([body, content]);
        },
        response: ({ match, resolved }) => {
          const guide = GUIDE_API.find(match.params.slug);
          const [body, content] = resolved;
          return {
            body: body,
            data: {
              content: content
            },
            title: guide ? `${guide.name} Guide` : "Guide Not Found"
          };
        }
      }
    ]
  },
  {
    name: "Packages",
    path: "packages/",
    response: () => {
      return {
        body: PackageList,
        title: "Curi Packages"
      };
    },
    children: [
      {
        name: "Package",
        path: "@curi/:package/:version(v\\d)?/",
        resolve({ params }) {
          const pkg = PACKAGE_API.find(params.package);
          if (!pkg) {
            return Promise.reject("Package does not exist");
          }

          const body = import(/* webpackChunkName: 'package', webpackPrefetch: true */
          "./components/routes/Package").then(
            preferDefault,
            catchImportError(`package`)
          );
          const content = pkg
            ? pkg
                .import(params.version)
                .catch(catchImportError(`package: ${params.package}`))
            : import(/* webpackChunkName: 'package404' */
              "./pages/Packages/404.js").then(
                preferDefault,
                catchImportError(`package 404`)
              );
          return Promise.all([body, content]);
        },
        response: ({ match, error, resolved }) => {
          // for unknown packages, redirect to Packages list
          if (error) {
            return {
              redirectTo: {
                name: "Packages"
              }
            };
          }

          const pkg = PACKAGE_API.find(match.params.package);
          const [body, content] = resolved;

          // for unknown versions, redirect to current version
          if (
            match.params.version === undefined ||
            (match.params.version &&
              pkg.versions[match.params.version] === undefined)
          ) {
            return {
              redirectTo: {
                name: "Package",
                params: {
                  package: match.params.package,
                  version: pkg.latest
                }
              }
            };
          }

          return {
            body,
            title: `@curi/${match.params.package}`,
            data: {
              ...pkg,
              content
            }
          };
        }
      }
    ]
  },
  {
    name: "Examples",
    path: "examples/",
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
        resolve({ params }) {
          const example = EXAMPLE_API.find(params.category, params.slug);
          const body = import(/* webpackChunkName: 'example', webpackPrefetch: true */
          "./components/routes/Example").then(
            preferDefault,
            catchImportError(`example`)
          );
          const content = example
            ? example
                .import()
                .then(
                  preferDefault,
                  catchImportError(`example: ${params.category}/${params.slug}`)
                )
            : import(/* webpackChunkName: 'example404' */
              "./pages/Examples/404.js").then(
                preferDefault,
                catchImportError(`example 404`)
              );
          return Promise.all([body, content]);
        },
        response: ({ match, resolved }) => {
          const { category, slug } = match.params;
          const example = EXAMPLE_API.find(category, slug);
          const [body, content] = resolved;
          return {
            body,
            data: {
              content
            },
            title: example ? `${example.name} Example` : "Example Not Found"
          };
        }
      }
    ]
  },
  {
    name: "Not Found",
    path: "(.*)",
    response: () => {
      return {
        body: NotFound
      };
    }
  }
]);
