import "jest";
import { pathname as pathnameInteraction } from "@curi/interactions";

import { prepareRoutes } from "@curi/router";

import { AsyncRoute } from "@curi/types";

describe("prepareRoutes()", () => {
  describe("route properties", () => {
    describe("name", () => {
      describe("unique names", () => {
        it("throws if multiple routes have the same name", () => {
          expect(() => {
            prepareRoutes([
              { name: "Home", path: "" },
              { name: "Home", path: "home" },
              { name: "Catch All", path: "(.*)" }
            ]);
          }).toThrow(
            `Multiple routes have the name "Home". Route names must be unique.`
          );
        });

        it("throws with non-unique nested routes", () => {
          expect(() => {
            prepareRoutes([
              {
                name: "Home",
                path: "",
                children: [{ name: "Child", path: "child" }]
              },
              {
                name: "About",
                path: "about",
                children: [{ name: "Child", path: "child" }]
              },
              { name: "Catch All", path: "(.*)" }
            ]);
          }).toThrow(
            `Multiple routes have the name "Child". Route names must be unique.`
          );
        });
      });
    });

    describe("path", () => {
      it("throws if a path begins with a forward slash", () => {
        expect(() => {
          const routes = prepareRoutes([
            { name: "Home", path: "/" },
            { name: "Catch All", path: "(.*)" }
          ]);
        }).toThrow(
          `Route paths cannot start with a forward slash (/). (Received "/")`
        );
      });
    });

    describe("pathOptions", () => {
      describe("match", () => {
        describe("sensitive", () => {
          it("does case-insensitive matching when false (default)", () => {
            const routes = prepareRoutes([
              {
                name: "Test",
                path: "here"
              },
              {
                name: "Not Found",
                path: "(.*)"
              }
            ]);
            const match = routes.match({
              pathname: "/Here",
              hash: "",
              query: "",
              key: [0, 0]
            });
            expect(match.match.name).toBe("Test");
          });

          it("does case sensitive matchign when true", () => {
            const routes = prepareRoutes([
              {
                name: "Test",
                path: "here",
                pathOptions: { match: { sensitive: true } }
              },
              {
                name: "Not Found",
                path: "(.*)"
              }
            ]);
            const match = routes.match({
              pathname: "/Here",
              hash: "",
              query: "",
              key: [0, 0]
            });
            expect(match.match.name).toBe("Not Found");
          });
        });

        describe("strict", () => {
          it("will match a trailing delimiter when false", () => {
            const routes = prepareRoutes([
              {
                name: "Test",
                path: "here"
              },
              {
                name: "Not Found",
                path: "(.*)"
              }
            ]);
            const match = routes.match({
              pathname: "/here/",
              hash: "",
              query: "",
              key: [0, 0]
            });
            expect(match.match.name).toBe("Test");
          });

          it("will not match a trailing delimiter when true", () => {
            const routes = prepareRoutes([
              {
                name: "Test",
                path: "here",
                pathOptions: { match: { strict: true } }
              },
              {
                name: "Not Found",
                path: "(.*)"
              }
            ]);
            const match = routes.match({
              pathname: "/here/",
              hash: "",
              query: "",
              key: [0, 0]
            });
            expect(match.match.name).toBe("Not Found");
          });
        });

        describe("end", () => {
          it("does not match if there are segments after the path when true", () => {
            const routes = prepareRoutes([
              {
                name: "Test",
                path: "here"
              },
              {
                name: "Not Found",
                path: "(.*)"
              }
            ]);
            const match = routes.match({
              pathname: "/here/again",
              hash: "",
              query: "",
              key: [0, 0]
            });
            expect(match.match.name).toBe("Not Found");
          });

          it("matches when there are segments after the path when false", () => {
            const routes = prepareRoutes([
              {
                name: "Test",
                path: "here",
                pathOptions: { match: { end: false } }
              },
              {
                name: "Not Found",
                path: "(.*)"
              }
            ]);
            const match = routes.match({
              pathname: "/here/again",
              hash: "",
              query: "",
              key: [0, 0]
            });
            expect(match.match.name).toBe("Test");
          });

          describe("with children routes", () => {
            it("matches if path matches exactly", () => {
              const routes = prepareRoutes([
                {
                  name: "Test",
                  path: "test",
                  children: [
                    {
                      name: "Ing",
                      path: "ing"
                    }
                  ]
                },
                {
                  name: "Not Found",
                  path: "(.*)"
                }
              ]);
              const match = routes.match({
                pathname: "/test",
                hash: "",
                query: "",
                key: [0, 0]
              });
              expect(match.match.name).toBe("Test");
            });

            it("acts as if end is false in order to match children routes", () => {
              const routes = prepareRoutes([
                {
                  name: "Test",
                  path: "test",
                  children: [
                    {
                      name: "Ing",
                      path: "ing"
                    }
                  ]
                },
                {
                  name: "Not Found",
                  path: "(.*)"
                }
              ]);
              const match = routes.match({
                pathname: "/test/ing",
                hash: "",
                query: "",
                key: [0, 0]
              });
              expect(match.match.name).toBe("Ing");
            });

            it("when end is true, path doesn't match exactly, and no children match, it does not match", () => {
              const routes = prepareRoutes([
                {
                  name: "Test",
                  path: "test",
                  children: [
                    {
                      name: "Ing",
                      path: "ing"
                    }
                  ]
                },
                {
                  name: "Not Found",
                  path: "(.*)"
                }
              ]);
              const match = routes.match({
                pathname: "/test/ed",
                hash: "",
                query: "",
                key: [0, 0]
              });
              expect(match.match.name).toBe("Not Found");
            });

            it("when end is false, path doesn't match exactly, and no children match, it matches", () => {
              const routes = prepareRoutes([
                {
                  name: "Test",
                  path: "test",
                  pathOptions: {
                    match: {
                      end: false
                    }
                  },
                  children: [
                    {
                      name: "Ing",
                      path: "ing"
                    }
                  ]
                },
                {
                  name: "Not Found",
                  path: "(.*)"
                }
              ]);
              const match = routes.match({
                pathname: "/test/ed",
                hash: "",
                query: "",
                key: [0, 0]
              });
              expect(match.match.name).toBe("Test");
            });
          });
        });
      });

      describe("compile", () => {
        it("uses default encode function if none is provided", () => {
          const routes = prepareRoutes([
            {
              name: "Artist",
              path: "a/:name"
            },
            {
              name: "Not Found",
              path: "(.*)"
            }
          ]);
          const route = routes.route("Artist");
          const pathname = pathnameInteraction(route, {
            name: "Beyoncé"
          });
          expect(pathname).toBe("/a/Beyonc%C3%A9");
        });

        it("uses custom encode function if provided", () => {
          const routes = prepareRoutes([
            {
              name: "Artist",
              path: "a/:name",
              pathOptions: {
                compile: {
                  encode: n => n
                }
              }
            },
            {
              name: "Not Found",
              path: "(.*)"
            }
          ]);
          const route = routes.route("Artist");
          const pathname = pathnameInteraction(route, {
            name: "Beyoncé"
          });
          expect(pathname).toBe("/a/Beyoncé");
        });
      });
    });
  });

  describe("route", () => {
    it("returns the public route for the named route", () => {
      const routes = prepareRoutes([
        { name: "Home", path: "" },
        { name: "Catch All", path: "(.*)" }
      ]);

      expect(routes.route("Home")).toMatchObject({
        name: "Home"
      });
    });

    it("returns undefined if no route with provided name exists", () => {
      const realWarn = console.warn;
      const fakeWarn = jest.fn();
      console.warn = fakeWarn;

      const routes = prepareRoutes([
        { name: "Home", path: "" },
        { name: "Catch All", path: "(.*)" }
      ]);

      expect(routes.route("About")).toBeUndefined();

      console.warn = realWarn;
    });

    it("warns when no route matches", () => {
      const realWarn = console.warn;
      const fakeWarn = jest.fn();
      console.warn = fakeWarn;

      const routes = prepareRoutes([
        { name: "Home", path: "" },
        { name: "Catch All", path: "(.*)" }
      ]);

      routes.route("About");

      expect(fakeWarn.mock.calls.length).toBe(1);
      expect(fakeWarn.mock.calls[0][0]).toBe(
        `Attempting to use route "About", but no route with that name exists.`
      );

      console.warn = realWarn;
    });

    describe("public route properties", () => {
      describe("properties", () => {
        describe("name", () => {
          it("is the provided value", () => {
            const routes = prepareRoutes([
              {
                name: "Test",
                path: "test"
              },
              {
                name: "Not Found",
                path: "(.*)"
              }
            ]);
            const route = routes.route("Test");
            expect(route.name).toBe("Test");
          });
        });

        describe("keys", () => {
          it("is the array of param names parsed from the path", () => {
            const routes = prepareRoutes([
              {
                name: "Test",
                path: ":one/:two/:three"
              },
              {
                name: "Not Found",
                path: "(.*)"
              }
            ]);
            const route = routes.route("Test");
            expect(route.keys).toEqual(["one", "two", "three"]);
          });

          it("is an empty array when the path has no params", () => {
            const routes = prepareRoutes([
              {
                name: "Test",
                path: "one/two/three"
              },
              {
                name: "Not Found",
                path: "(.*)"
              }
            ]);
            const route = routes.route("Test");
            expect(route.keys).toEqual([]);
          });
        });

        describe("extra", () => {
          it("is the provided value", () => {
            const extra = {
              unofficial: true,
              another: 1
            };
            const routes = prepareRoutes([
              {
                name: "Test",
                path: "test",
                extra
              },
              {
                name: "Not Found",
                path: "(.*)"
              }
            ]);
            const route = routes.route("Test");
            expect(route.extra).toBe(extra);
          });
        });
      });

      describe("methods", () => {
        describe("resolve", () => {
          it("is the resolve function", done => {
            const routes = prepareRoutes([
              {
                name: "Test",
                path: "test",
                resolve() {
                  return Promise.all([
                    Promise.resolve("iTest"),
                    Promise.resolve("eTest")
                  ]);
                }
              }
            ]);
            const route: AsyncRoute = routes.route("Test") as AsyncRoute;

            route.methods.resolve().then(([iResult, eResult]) => {
              expect(iResult).toBe("iTest");
              expect(eResult).toBe("eTest");
              done();
            });
          });

          it("is undefined when route.resolve isn't provided", done => {
            const routes = prepareRoutes([
              {
                name: "Test",
                path: "test"
              },
              {
                name: "Not Found",
                path: "(.*)"
              }
            ]);
            const route = routes.route("Test");
            expect(route.methods.resolve).toBeUndefined();
            done();
          });
        });

        describe("respond", () => {
          it("is the respond function", () => {
            const routes = prepareRoutes([
              {
                name: "Test",
                path: "test",
                respond() {
                  return { data: "hi!" };
                }
              }
            ]);
            const route = routes.route("Test");

            expect(route.methods.respond).toBeDefined();
          });

          it("is undefined when route.respond isn't provided", () => {
            const routes = prepareRoutes([
              {
                name: "Test",
                path: "test"
              },
              {
                name: "Not Found",
                path: "(.*)"
              }
            ]);
            const route = routes.route("Test");
            expect(route.methods.respond).toBeUndefined();
          });
        });
      });
    });
  });

  describe("match", () => {
    it("matches the pathname and returns object with match/route properties", () => {
      const routes = prepareRoutes([
        {
          name: "Test",
          path: "test"
        }
      ]);
      const match = routes.match({
        pathname: "/test",
        hash: "",
        query: "",
        key: [0, 0]
      });
      expect(match).toMatchObject({
        match: {
          name: "Test"
        },
        route: routes.route("Test")
      });
    });

    describe("exact matching", () => {
      it("does exact matching", () => {
        const routes = prepareRoutes([
          {
            name: "Test",
            path: "test"
          },
          {
            name: "Not Found",
            path: "(.*)"
          }
        ]);
        const match = routes.match({
          pathname: "/test/leftovers",
          hash: "",
          query: "",
          key: [0, 0]
        });
        expect(match.match.name).toBe("Not Found");
      });

      it("matches partially if route.pathOptions.match.end=false", () => {
        const routes = prepareRoutes([
          {
            name: "State",
            path: ":state",
            pathOptions: { match: { end: false } }
          },
          {
            name: "Not Found",
            path: "(.*)"
          }
        ]);
        const match = routes.match({
          pathname: "/SD/Sioux%20City",
          hash: "",
          query: "",
          key: [0, 0]
        });
        expect(match.match.name).toBe("State");
      });
    });

    it("returns undefined if no routes match", () => {
      const routes = prepareRoutes([]);
      const match = routes.match({
        pathname: "/test",
        hash: "",
        query: "",
        key: [0, 0]
      });
      expect(match).toBeUndefined();
    });

    describe("nested routes", () => {
      it("matches child routes", () => {
        const routes = prepareRoutes([
          {
            name: "State",
            path: ":state",
            children: [
              {
                name: "City",
                path: ":city"
              }
            ]
          }
        ]);
        const match = routes.match({
          pathname: "/ND/Fargo",
          hash: "",
          query: "",
          key: [0, 0]
        });
        expect(match.match.name).toBe("City");
      });

      it("is not affected by parent route having pathOptions.match.end=true", () => {
        const routes = prepareRoutes([
          {
            name: "State",
            path: ":state",
            pathOptions: { match: { end: true } },
            children: [
              {
                name: "City",
                path: ":city"
              }
            ]
          }
        ]);
        const match = routes.match({
          pathname: "/ND/Fargo",
          hash: "",
          query: "",
          key: [0, 0]
        });
        expect(match.match.name).toBe("City");
      });

      it("works when parent route's path has trailing slash", () => {
        const routes = prepareRoutes([
          {
            name: "State",
            path: ":state/",
            children: [
              {
                name: "City",
                path: ":city/"
              }
            ]
          },
          {
            name: "Not Found",
            path: "(.*)"
          }
        ]);
        const match = routes.match({
          pathname: "/ND/Fargo/",
          hash: "",
          query: "",
          key: [0, 0]
        });

        expect(match.match.name).toBe("City");
      });

      it("skips partial parent match if no children match (effective exact)", () => {
        const routes = prepareRoutes([
          {
            name: "State",
            path: ":state",
            children: [
              {
                name: "Wat",
                path: "wat"
              }
            ]
          },
          {
            name: "Not Found",
            path: "(.*)"
          }
        ]);
        const match = routes.match({
          pathname: "/MT/Bozeman",
          hash: "",
          query: "",
          key: [0, 0]
        });
        expect(match.match.name).toBe("Not Found");
      });

      it("uses partial parent match if pathOptions.match.end=false", () => {
        const routes = prepareRoutes([
          {
            name: "State",
            path: ":state",
            pathOptions: {
              match: { end: false }
            },
            children: [
              {
                name: "Wat",
                path: "wat"
              }
            ]
          },
          {
            name: "Not Found",
            path: "(.*)"
          }
        ]);
        const match = routes.match({
          pathname: "/MT/Bozeman",
          hash: "",
          query: "",
          key: [0, 0]
        });
        expect(match.match.name).toBe("State");
      });
    });

    describe("optional path parameters", () => {
      it("works when optional param is included", () => {
        const routes = prepareRoutes([
          {
            name: "State",
            path: ":state?/about",
            pathOptions: { match: { end: false } }
          },
          {
            name: "Not Found",
            path: "(.*)"
          }
        ]);
        const match = routes.match({
          pathname: "/NY/about",
          hash: "",
          query: "",
          key: [0, 0]
        });
        expect(match.match.name).toBe("State");
      });

      it("works when optional param is NOT included", () => {
        const routes = prepareRoutes([
          {
            name: "State",
            path: ":state?/about",
            pathOptions: { match: { end: false } }
          },
          {
            name: "Not Found",
            path: "(.*)"
          }
        ]);
        const match = routes.match({
          pathname: "/about",
          hash: "",
          query: "",
          key: [0, 0]
        });
        expect(match.match.name).toBe("State");
      });
    });
  });
});
