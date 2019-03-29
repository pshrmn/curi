import "jest";
import { ensureDir, remove, existsSync } from "fs-extra";
import { join } from "path";
import { prepare_routes } from "@curi/router";
import * as qs from "qs";

import { static_files } from "@curi/static";

import { Emitted } from "@curi/router";

const FIXTURES_ROOT = join(__dirname, "fixtures");

const DEFAULT_RENDER = (emitted: Emitted) => emitted.response.body;
const DEFAULT_INSERT = (markup: string, emitted: Emitted) => {
  return `<html><body>${markup}</body</html>`;
};

describe("static_files()", () => {
  describe("output files", () => {
    it("creates HTML files for each route in the correct location", async () => {
      const fixtures = join(FIXTURES_ROOT, "basic");
      await remove(fixtures);
      await ensureDir(fixtures);

      const routes = prepare_routes([
        {
          name: "Home",
          path: "",
          response() {
            return { body: "Home" };
          }
        },
        {
          name: "About",
          path: "about",
          response() {
            return { body: "About" };
          }
        }
      ]);
      const pages = [{ name: "Home" }, { name: "About" }];
      await static_files({
        pages,
        router: {
          routes
        },
        output: {
          render: DEFAULT_RENDER,
          insert: DEFAULT_INSERT,
          dir: fixtures
        }
      });
      const expectedPaths = [
        join(fixtures, "index.html"),
        join(fixtures, "about", "index.html")
      ];
      expectedPaths.forEach(path => {
        expect(existsSync(path)).toBe(true);
      });
    });

    describe("fallback", () => {
      it("generates a catch all file if provided", async () => {
        const fixtures = join(FIXTURES_ROOT, "basic-fallback");
        await remove(fixtures);
        await ensureDir(fixtures);

        const routes = prepare_routes([
          {
            name: "Home",
            path: "",
            response() {
              return { body: "Home" };
            }
          },
          {
            name: "About",
            path: "about",
            response() {
              return { body: "About" };
            }
          },
          {
            name: "Catch All",
            path: "(.*)",
            response() {
              return { body: "404" };
            }
          }
        ]);
        const pages = [{ name: "Home" }, { name: "About" }];
        await static_files({
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
            insert: DEFAULT_INSERT,
            dir: fixtures
          }
        });
        const expectedPaths = [
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
    it("when false, does not create a files if the route redirects ", async () => {
      const fixtures = join(FIXTURES_ROOT, "redirects-false");
      await remove(fixtures);
      await ensureDir(fixtures);

      const routes = prepare_routes([
        {
          name: "Home",
          path: "",
          response() {
            return { redirect_to: { name: "About" } };
          }
        },
        {
          name: "About",
          path: "about",
          response() {
            return { body: "About" };
          }
        }
      ]);
      const pages = [{ name: "Home" }, { name: "About" }];
      await static_files({
        pages,
        router: {
          routes
        },
        output: {
          render: DEFAULT_RENDER,
          insert: DEFAULT_INSERT,
          dir: fixtures,
          redirects: false
        }
      });
      const expectedPaths = [
        { path: join(fixtures, "index.html"), exists: false },
        { path: join(fixtures, "about", "index.html"), exists: true }
      ];
      expectedPaths.forEach(({ path, exists }) => {
        expect(existsSync(path)).toBe(exists);
      });
    });

    it("when true, does not create a files if the route redirects ", async () => {
      const fixtures = join(FIXTURES_ROOT, "redirects-true");
      await remove(fixtures);
      await ensureDir(fixtures);

      const routes = prepare_routes([
        {
          name: "Home",
          path: "",
          response() {
            return {
              body: "Home",
              redirect_to: { name: "About" }
            };
          }
        },
        {
          name: "About",
          path: "about",
          response() {
            return { body: "About" };
          }
        }
      ]);
      const pages = [{ name: "Home" }, { name: "About" }];
      await static_files({
        pages,
        router: {
          routes
        },
        output: {
          render: DEFAULT_RENDER,
          insert: DEFAULT_INSERT,
          dir: fixtures,
          redirects: true
        }
      });
      const expectedPaths = [
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
      const fixtures = join(FIXTURES_ROOT, "render");
      await remove(fixtures);
      await ensureDir(fixtures);

      const routes = prepare_routes([
        {
          name: "Home",
          path: "",
          response() {
            return { body: "Home" };
          }
        }
      ]);
      const pages = [{ name: "Home" }];
      const render = jest.fn(({ response }) => response.body);
      await static_files({
        pages,
        router: {
          routes
        },
        output: {
          render,
          insert: DEFAULT_INSERT,
          dir: fixtures
        }
      });
      expect(render.mock.calls[0][0]).toMatchObject({
        response: {
          name: "Home"
        },
        navigation: {
          previous: null,
          action: "push"
        }
      });
    });
  });

  describe("insert()", () => {
    it("calls insert() with the results of render()", async () => {
      const fixtures = join(FIXTURES_ROOT, "insert");
      await remove(fixtures);
      await ensureDir(fixtures);

      const routes = prepare_routes([
        {
          name: "Home",
          path: "",
          response() {
            return { body: "Home" };
          }
        }
      ]);
      const pages = [{ name: "Home" }];
      const render = DEFAULT_RENDER;
      const insert = jest.fn(html => html);
      await static_files({
        pages,
        router: {
          routes
        },
        output: {
          render,
          insert,
          dir: fixtures
        }
      });
      expect(insert.mock.calls[0][0]).toBe("Home");
    });
  });

  describe("get_router_options()", () => {
    it("calls get_router_options function to get options for a router", async () => {
      const fixtures = join(FIXTURES_ROOT, "routerOptions");
      await remove(fixtures);
      await ensureDir(fixtures);

      const routes = prepare_routes([
        {
          name: "Home",
          path: "",
          response() {
            return { body: "Home" };
          }
        }
      ]);
      const pages = [{ name: "Home" }];
      const get_router_options = jest.fn();
      await static_files({
        pages,
        router: {
          routes,
          get_router_options
        },
        output: {
          render: DEFAULT_RENDER,
          insert: DEFAULT_INSERT,
          dir: fixtures
        }
      });
      // once to static pathnames and again for the Home markup
      expect(get_router_options.mock.calls.length).toBe(2);
    });
  });

  describe("history", () => {
    it("uses provided history options in history instance", async done => {
      const fixtures = join(FIXTURES_ROOT, "history");
      await remove(fixtures);
      await ensureDir(fixtures);

      const routes = prepare_routes([
        {
          name: "Home",
          path: "",
          response() {
            return { body: "Home" };
          }
        }
      ]);
      const pages = [{ name: "Home" }];
      await static_files({
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
            const href = emitted.router.history.href({
              pathname: "/",
              query: { x: "y" }
            });
            expect(href).toBe("/?x=y");
            done();
            return emitted.response.body;
          },
          insert: DEFAULT_INSERT,
          dir: fixtures
        }
      });
    });
  });

  describe("errors", () => {
    describe("async routes", () => {
      it("catches errors", async () => {
        const fixtures = join(FIXTURES_ROOT, "render-errors");
        await remove(fixtures);
        await ensureDir(fixtures);

        const routes = prepare_routes([
          {
            name: "Home",
            path: "",
            resolve() {
              return Promise.resolve(true);
            },
            response() {
              return { body: "Home" };
            }
          }
        ]);
        const pages = [{ name: "Home" }];
        const get_router_options = jest.fn();
        const results = await static_files({
          pages,
          router: {
            routes,
            get_router_options
          },
          output: {
            render: () => {
              throw new Error("uh oh");
            },
            insert: DEFAULT_INSERT,
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
