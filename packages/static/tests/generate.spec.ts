import "jest";
import { ensureDir, remove, existsSync } from "fs-extra";
import { join } from "path";

// resolved by jest
import { generate } from "@curi/static";

// types
import { Emitted } from "@curi/router";

const FIXTURES_ROOT = join(__dirname, "fixtures");

const DEFAULT_RENDER = (emitted: Emitted) => emitted.response.body;
const DEFAULT_INSERT = (markup: string, emitted: Emitted) => {
  return `<html><body>${markup}</body</html>`;
};

describe("generate()", () => {
  it("creates HTML files for each route in the correct location", async () => {
    const fixtures = join(FIXTURES_ROOT, "basic");
    await remove(fixtures);
    await ensureDir(fixtures);

    const routes = [
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
    ];
    const pages = [{ name: "Home" }, { name: "About" }];
    await generate({
      routes,
      pages,
      render: DEFAULT_RENDER,
      insert: DEFAULT_INSERT,
      outputDir: fixtures
    });
    const expectedPaths = [
      join(fixtures, "index.html"),
      join(fixtures, "about", "index.html")
    ];
    expectedPaths.forEach(path => {
      expect(existsSync(path)).toBe(true);
    });
  });

  describe("outputRedirects", () => {
    it("when false, does not create a files if the route redirects ", async () => {
      const fixtures = join(FIXTURES_ROOT, "redirects-false");
      await remove(fixtures);
      await ensureDir(fixtures);

      const routes = [
        {
          name: "Home",
          path: "",
          response() {
            return { redirectTo: { name: "About" } };
          }
        },
        {
          name: "About",
          path: "about",
          response() {
            return { body: "About" };
          }
        }
      ];
      const pages = [{ name: "Home" }, { name: "About" }];
      await generate({
        routes,
        pages,
        render: DEFAULT_RENDER,
        insert: DEFAULT_INSERT,
        outputDir: fixtures,
        outputRedirects: false
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

      const routes = [
        {
          name: "Home",
          path: "",
          response() {
            return {
              body: "Home",
              redirectTo: { name: "About" }
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
      ];
      const pages = [{ name: "Home" }, { name: "About" }];
      await generate({
        routes,
        pages,
        render: DEFAULT_RENDER,
        insert: DEFAULT_INSERT,
        outputDir: fixtures,
        outputRedirects: true
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

      const routes = [
        {
          name: "Home",
          path: "",
          response() {
            return { body: "Home" };
          }
        }
      ];
      const pages = [{ name: "Home" }];
      const render = jest.fn(({ response }) => response.body);
      await generate({
        routes,
        pages,
        render,
        insert: DEFAULT_INSERT,
        outputDir: fixtures
      });
      expect(render.mock.calls[0][0]).toMatchObject({
        response: {
          name: "Home"
        },
        navigation: {
          previous: null,
          action: "PUSH"
        }
      });
    });
  });

  describe("insert()", () => {
    it("calls insert() with the results of return() and the emitted response information", async () => {
      const fixtures = join(FIXTURES_ROOT, "render");
      await remove(fixtures);
      await ensureDir(fixtures);

      const routes = [
        {
          name: "Home",
          path: "",
          response() {
            return { body: "Home" };
          }
        }
      ];
      const pages = [{ name: "Home" }];
      const render = DEFAULT_RENDER;
      const insert = jest.fn(html => html);
      await generate({
        routes,
        pages,
        render,
        insert,
        outputDir: fixtures
      });
      expect(insert.mock.calls[0][0]).toBe("Home");
      expect(insert.mock.calls[0][1]).toMatchObject({
        response: {
          name: "Home"
        },
        navigation: {
          previous: null,
          action: "PUSH"
        }
      });
    });
  });

  describe("routerOptions", () => {
    it("calls routerOptions function to get options for a router", async () => {
      const fixtures = join(FIXTURES_ROOT, "routerOptions");
      await remove(fixtures);
      await ensureDir(fixtures);

      const routes = [
        {
          name: "Home",
          path: "",
          response() {
            return { body: "Home" };
          }
        }
      ];
      const pages = [{ name: "Home" }];
      const routerOptions = jest.fn();
      await generate({
        routes,
        pages,
        render: DEFAULT_RENDER,
        insert: DEFAULT_INSERT,
        outputDir: fixtures,
        routerOptions
      });
      // once to generate pathnames and again for the Home markup
      expect(routerOptions.mock.calls.length).toBe(2);
    });
  });
});
