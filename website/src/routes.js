// components that are not code split
import Home from "./components/routes/Home";
import PackageList from "./components/routes/PackageList";
import GuideList from "./components/routes/GuideList";
import ExampleList from "./components/routes/ExampleList";
import TutorialBase from "./components/routes/TutorialBase";
import NotFound from "./components/routes/NotFound";

import TUTORIAL_API from "./constants/tutorials";
import GUIDE_API from "./constants/guides";
import PACKAGE_API from "./constants/packages";
import EXAMPLE_API from "./constants/examples";

import catchImportError from "./catchImportError";
import preferDefault from "./preferDefault";

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
    path: "tutorial/",
    response: () => {
      return {
        body: TutorialBase,
        title: "Tutorials"
      };
    },
    children: [
      {
        name: "Tutorial",
        path: ":slug/",
        resolve: {
          body: () =>
            preferDefault(
              import(/* webpackChunkName: 'tutorial', webpackPrefetch: true */
              "./components/routes/Tutorial")
            ).catch(catchImportError("tutorial")),
          content: ({ params }) => {
            const tutorial = TUTORIAL_API.find(params.slug);
            return tutorial
              ? tutorial
                  .import()
                  .catch(catchImportError(`tutorial: ${params.slug}`))
              : preferDefault(
                  import(/* webpackChunkName: 'tutorial404' */
                  "./pages/Tutorials/404.js")
                ).catch(catchImportError(`tutorial 404`));
          }
        },
        response: ({ match, resolved }) => {
          const tutorial = TUTORIAL_API.find(match.params.slug);
          return {
            body: resolved.body,
            data: {
              content: resolved.content
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
        pathOptions: {
          strict: true
        },
        resolve: {
          body: () =>
            preferDefault(
              import(/* webpackChunkName: 'guide', webpackPrefetch: true */
              "./components/routes/Guide")
            ).catch(catchImportError("guide")),
          content: ({ params }) => {
            const guide = GUIDE_API.find(params.slug);
            return guide
              ? guide.import().catch(catchImportError(`guide: ${params.slug}`))
              : preferDefault(
                  import(/* webpackChunkName: 'guide404' */
                  "./pages/Guides/404.js")
                ).catch(catchImportError(`guide 404`));
          }
        },
        response: ({ match, resolved }) => {
          const guide = GUIDE_API.find(match.params.slug);
          return {
            body: resolved.body,
            data: {
              ...guide,
              content: resolved.content
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
        path: "@curi/:package/",
        resolve: {
          body: () =>
            preferDefault(
              import(/* webpackChunkName: 'package', webpackPrefetch: true */
              "./components/routes/Package")
            ).catch(catchImportError("package")),
          content: ({ params }) => {
            const pkg = PACKAGE_API.find(params.package);
            return pkg
              ? pkg
                  .import()
                  .catch(catchImportError(`package: ${params.package}`))
              : preferDefault(
                  import(/* webpackChunkName: 'package404' */
                  "./pages/Packages/404.js")
                ).catch(catchImportError(`package 404`));
          }
        },
        response: ({ match, resolved }) => {
          const pkg = PACKAGE_API.find(match.params.package);
          return {
            body: resolved.body,
            title: `@curi/${match.params.package}`,
            data: {
              ...pkg,
              content: resolved.content
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
        resolve: {
          body: () =>
            preferDefault(
              import(/* webpackChunkName: 'example', webpackPrefetch: true */
              "./components/routes/Example")
            ).catch(catchImportError("example")),
          content: ({ params }) => {
            const example = EXAMPLE_API.find(params.category, params.slug);
            return example
              ? example
                  .import()
                  .catch(
                    catchImportError(
                      `example: ${params.category}/${params.slug}`
                    )
                  )
              : preferDefault(
                  import(/* webpackChunkName: 'example404' */
                  "./pages/Examples/404.js")
                ).catch(catchImportError(`example 404`));
          }
        },
        response: ({ match, resolved }) => {
          const { category, slug } = match.params;
          const example = EXAMPLE_API.find(category, slug);
          return {
            body: resolved.body,
            data: {
              ...example,
              content: resolved.content
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
];
