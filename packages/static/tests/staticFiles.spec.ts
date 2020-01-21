import "jest";
import { ensureDir, remove, existsSync } from "fs-extra";
import { join } from "path";
import { prepareRoutes } from "@curi/router";
import * as qs from "qs";

import { staticFiles } from "@curi/static";

import { Emitted } from "@curi/types";

let FIXTURES_ROOT = join(__dirname, "fixtures");

let DEFAULT_RENDER = (emitted: Emitted) => {
  return `<html><body>${emitted.response.body}</body</html>`;
};

describe("staticFiles()", () => {
  describe("output files", () => {
    it("creates HTML files for each route in the correct location", async () => {
      let fixtures = join(FIXTURES_ROOT, "basic");
      await remove(fixtures);
      await ensureDir(fixtures);

      let routes = prepareRoutes([
        {
          name: "Home",
          path: "",
          respond() {
            return { body: "Home" };
          }
        },
        {
          name: "About",
          path: "about",
          respond() {
            return { body: "About" };
          }
        }
      ]);
      let pages = [{ name: "Home" }, { name: "About" }];
      await staticFiles({
        pages,
        router: {
          routes
        },
        output: {
          render: DEFAULT_RENDER,
          dir: fixtures
        }
      });
      let expectedPaths = [
        join(fixtures, "index.html"),
        join(fixtures, "about", "index.html")
      ];
      expectedPaths.forEach(path => {
        expect(existsSync(path)).toBe(true);
      });
    });

    describe("fallback", () => {
      it("generates a catch all file if provided", async () => {
        let fixtures = join(FIXTURES_ROOT, "basic-fallback");
        await remove(fixtures);
        await ensureDir(fixtures);

        let routes = prepareRoutes([
          {
            name: "Home",
            path: "",
            respond() {
              return { body: "Home" };
            }
          },
          {
            name: "About",
            path: "about",
            respond() {
              return { body: "About" };
            }
          },
          {
            name: "Catch All",
            path: "(.*)",
            respond() {
              return { body: "404" };
            }
          }
        ]);
        let pages = [{ name: "Home" }, { name: "About" }];
        await staticFiles({
          pages,
          fallback: {
            filename: "404.html",
            pathname: "/404"
          },
          router: {
            routes
          },
          output: {
            render: DEFAULT_RENDER,
            dir: fixtures
          }
        });
        let expectedPaths = [
          join(fixtures, "index.html"),
          join(fixtures, "about", "index.html"),
          join(fixtures, "404.html")
        ];
        expectedPaths.forEach(path => {
          expect(existsSync(path)).toBe(true);
        });
      });
    });
  });

  describe("redirects", () => {
    it("handles render functions that throw ", async () => {
      let fixtures = join(FIXTURES_ROOT, "redirect-throws");
      await remove(fixtures);
      await ensureDir(fixtures);

      function render(emitted: Emitted) {
        if (emitted.response.redirect) {
          throw new Error("Do not render redirects.");
        }
        return `<html><body>${emitted.response.body}</body</html>`;
      }

      let routes = prepareRoutes([
        {
          name: "Home",
          path: "",
          respond() {
            return { redirect: { name: "About" } };
          }
        },
        {
          name: "About",
          path: "about",
          respond() {
            return { body: "About" };
          }
        }
      ]);
      let pages = [{ name: "Home" }, { name: "About" }];
      let results = await staticFiles({
        pages,
        router: {
          routes
        },
        output: {
          render,
          dir: fixtures
        }
      });

      let [homeResult, aboutResult] = results;
      expect(homeResult).toMatchObject({
        pathname: "/",
        success: false
      });
      expect(aboutResult).toMatchObject({
        pathname: "/about",
        success: true
      });

      let expectedPaths = [
        { path: join(fixtures, "index.html"), exists: false },
        { path: join(fixtures, "about", "index.html"), exists: true }
      ];
      expectedPaths.forEach(({ path, exists }) => {
        expect(existsSync(path)).toBe(exists);
      });
    });

    it("treats the redirect like any other response ", async () => {
      let fixtures = join(FIXTURES_ROOT, "redirect-render");
      await remove(fixtures);
      await ensureDir(fixtures);

      let routes = prepareRoutes([
        {
          name: "Home",
          path: "",
          respond() {
            return {
              body: "Home",
              redirect: { name: "About" }
            };
          }
        },
        {
          name: "About",
          path: "about",
          respond() {
            return { body: "About" };
          }
        }
      ]);
      let pages = [{ name: "Home" }, { name: "About" }];
      await staticFiles({
        pages,
        router: {
          routes
        },
        output: {
          render: DEFAULT_RENDER,
          dir: fixtures
        }
      });
      let expectedPaths = [
        { path: join(fixtures, "index.html"), exists: true },
        { path: join(fixtures, "about", "index.html"), exists: true }
      ];
      expectedPaths.forEach(({ path, exists }) => {
        expect(existsSync(path)).toBe(exists);
      });
    });
  });

  describe("render()", () => {
    it("calls render() with the emitted response information", async () => {
      let fixtures = join(FIXTURES_ROOT, "render");
      await remove(fixtures);
      await ensureDir(fixtures);

      let routes = prepareRoutes([
        {
          name: "Home",
          path: "",
          respond() {
            return { body: "Home" };
          }
        }
      ]);
      let pages = [{ name: "Home" }];
      let render = jest.fn(({ response }) => response.body);
      await staticFiles({
        pages,
        router: {
          routes
        },
        output: {
          render,
          dir: fixtures
        }
      });
      expect(render.mock.calls[0][0]).toMatchObject({
        response: {
          name: "Home"
        },
        navigation: {
          previous: undefined,
          action: "push"
        }
      });
    });
  });

  describe("router.options", () => {
    it("passes provided options to router", async () => {
      let fixtures = join(FIXTURES_ROOT, "routerOptions");
      await remove(fixtures);
      await ensureDir(fixtures);

      let routes = prepareRoutes([
        {
          name: "Home",
          path: "",
          respond({ external }) {
            expect(external).toBe(providedExternal);
            return { body: "Home" };
          }
        }
      ]);
      let pages = [{ name: "Home" }];

      // verify that provided options are used by checking that the
      // provided external is available to routes
      let providedExternal = {};
      let options = { external: providedExternal };
      await staticFiles({
        pages,
        router: {
          routes,
          options
        },
        output: {
          render: DEFAULT_RENDER,
          dir: fixtures
        }
      });
    });
  });

  describe("history", () => {
    it("uses provided history options in history instance", async done => {
      let fixtures = join(FIXTURES_ROOT, "history");
      await remove(fixtures);
      await ensureDir(fixtures);

      let routes = prepareRoutes([
        {
          name: "Home",
          path: "",
          respond() {
            return { body: "Home" };
          }
        }
      ]);
      let pages = [{ name: "Home" }];
      await staticFiles({
        pages,
        router: {
          routes
        },
        history: {
          query: {
            parse: qs.parse,
            stringify: qs.stringify
          }
        },
        output: {
          render: (emitted: Emitted) => {
            let url = emitted.router.history.url({
              pathname: "/",
              query: { x: "y" }
            });
            expect(url).toBe("/?x=y");
            done();
            return emitted.response.body;
          },
          dir: fixtures
        }
      });
    });
  });

  describe("errors", () => {
    describe("async routes", () => {
      it("catches errors", async () => {
        let fixtures = join(FIXTURES_ROOT, "render-errors");
        await remove(fixtures);
        await ensureDir(fixtures);

        let routes = prepareRoutes([
          {
            name: "Home",
            path: "",
            resolve() {
              return Promise.resolve(true);
            },
            respond() {
              return { body: "Home" };
            }
          }
        ]);
        let pages = [{ name: "Home" }];
        let results = await staticFiles({
          pages,
          router: {
            routes
          },
          output: {
            render: () => {
              throw new Error("uh oh");
            },
            dir: fixtures
          }
        });
        expect(results[0]).toMatchObject({
          pathname: "/",
          success: false
        });
      });
    });
  });
});
