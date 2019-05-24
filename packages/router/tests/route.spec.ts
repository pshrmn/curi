import "jest";
import { inMemory } from "@hickory/in-memory";
import { pathname as pathnameInteraction } from "@curi/interactions";

import { createRouter, prepareRoutes } from "@curi/router";

import { AsyncRoute } from "@curi/types";

describe("routes", () => {
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
          const router = createRouter(inMemory, routes, {
            history: {
              locations: [{ url: "/test" }]
            }
          });
          const route = router.route("Test");
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
          const router = createRouter(inMemory, routes, {
            history: {
              locations: [{ url: "/four/five/six" }]
            }
          });
          const route = router.route("Test");
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
          const router = createRouter(inMemory, routes, {
            history: {
              locations: [{ url: "/one/two/three" }]
            }
          });
          const route = router.route("Test");
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
          const router = createRouter(inMemory, routes, {
            history: {
              locations: [{ url: "/test" }]
            }
          });
          const route = router.route("Test");
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
          const router = createRouter(inMemory, routes, {
            history: {
              locations: [{ url: "/test" }]
            }
          });
          const route: AsyncRoute = router.route("Test") as AsyncRoute;

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
          const router = createRouter(inMemory, routes, {
            history: {
              locations: [{ url: "/test" }]
            }
          });
          const route = router.route("Test");
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
          const router = createRouter(inMemory, routes, {
            history: {
              locations: [{ url: "/test" }]
            }
          });
          const route = router.route("Test");

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
          const router = createRouter(inMemory, routes, {
            history: {
              locations: [{ url: "/test" }]
            }
          });
          const route = router.route("Test");
          expect(route.methods.respond).toBeUndefined();
        });
      });
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
          const router = createRouter(inMemory, routes, {
            history: {
              locations: [{ url: "/Here" }]
            }
          });
          const { response } = router.current();
          expect(response.name).toBe("Test");
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
          const router = createRouter(inMemory, routes, {
            history: {
              locations: [{ url: "/Here" }]
            }
          });
          const { response } = router.current();
          expect(response.name).toBe("Not Found");
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
          const router = createRouter(inMemory, routes, {
            history: {
              locations: [{ url: "/here/" }]
            }
          });
          const { response } = router.current();
          expect(response.name).toBe("Test");
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
          const router = createRouter(inMemory, routes, {
            history: {
              locations: [{ url: "/here/" }]
            }
          });
          const { response } = router.current();
          expect(response.name).toBe("Not Found");
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
          const router = createRouter(inMemory, routes, {
            history: {
              locations: [{ url: "/here/again" }]
            }
          });
          const { response } = router.current();
          expect(response.name).toBe("Not Found");
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
          const router = createRouter(inMemory, routes, {
            history: {
              locations: [{ url: "/here/again" }]
            }
          });
          const { response } = router.current();
          expect(response.name).toBe("Test");
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
            const router = createRouter(inMemory, routes, {
              history: {
                locations: [{ url: "/test" }]
              }
            });
            const { response } = router.current();
            expect(response.name).toBe("Test");
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
            const router = createRouter(inMemory, routes, {
              history: {
                locations: [{ url: "/test/ing" }]
              }
            });
            const { response } = router.current();
            expect(response.name).toBe("Ing");
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
            const router = createRouter(inMemory, routes, {
              history: {
                locations: [{ url: "/test/ed" }]
              }
            });
            const { response } = router.current();
            expect(response.name).toBe("Not Found");
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
            const router = createRouter(inMemory, routes, {
              history: {
                locations: [{ url: "/test/ed" }]
              }
            });
            const { response } = router.current();
            expect(response.name).toBe("Test");
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

  describe("response generation", () => {
    describe("response", () => {
      describe("properties", () => {
        describe("location", () => {
          it("is the location used to match routes", () => {
            const routes = prepareRoutes([{ name: "Catch All", path: "(.*)" }]);
            const router = createRouter(inMemory, routes, {
              history: {
                locations: [{ url: "/other-page" }]
              }
            });
            const { response } = router.current();
            expect(response.location).toBe(router.history.location);
          });
        });

        describe("body", () => {
          it("exists on response as undefined if not set by route.respond()", () => {
            const routes = prepareRoutes([
              {
                name: "Test",
                path: "test"
              }
            ]);
            const router = createRouter(inMemory, routes, {
              history: {
                locations: [{ url: "/test" }]
              }
            });
            const { response } = router.current();
            expect(response.hasOwnProperty("body")).toBe(true);
            expect(response.body).toBeUndefined();
          });

          it("is the body value of the object returned by route.respond()", () => {
            const body = () => "anybody out there?";
            const routes = prepareRoutes([
              {
                name: "Test",
                path: "test",
                respond: () => {
                  return {
                    body: body
                  };
                }
              }
            ]);
            const router = createRouter(inMemory, routes, {
              history: {
                locations: [{ url: "/test" }]
              }
            });
            const { response } = router.current();
            expect(response.body).toBe(body);
          });
        });

        describe("meta", () => {
          it("exists on the response as undefined if not set by route.respond()", () => {
            const routes = prepareRoutes([
              {
                name: "Contact",
                path: "contact",
                children: [
                  { name: "Email", path: "email" },
                  { name: "Phone", path: "phone" }
                ]
              }
            ]);
            const router = createRouter(inMemory, routes, {
              history: {
                locations: [{ url: "/contact" }]
              }
            });
            const { response } = router.current();
            expect(response.hasOwnProperty("meta")).toBe(true);
            expect(response.meta).toBeUndefined();
          });

          it("is the meta value of object returned by route.respond()", () => {
            const routes = prepareRoutes([
              {
                name: "A Route",
                path: "",
                respond: () => {
                  return {
                    meta: {
                      title: "A Route",
                      status: 451
                    }
                  };
                }
              }
            ]);
            const router = createRouter(inMemory, routes, {
              history: {
                locations: [{ url: "/" }]
              }
            });
            const { response } = router.current();
            expect(response.meta).toMatchObject({
              title: "A Route",
              status: 451
            });
          });
        });

        describe("data", () => {
          it("exists on response as undefined if not set by route.respond()", () => {
            const routes = prepareRoutes([
              {
                name: "A Route",
                path: ""
              }
            ]);
            const router = createRouter(inMemory, routes, {
              history: {
                locations: [{ url: "/" }]
              }
            });
            const { response } = router.current();
            expect(response.hasOwnProperty("data")).toBe(true);
            expect(response.data).toBeUndefined();
          });

          it("is the data value of the object returned by route.respond()", () => {
            const routes = prepareRoutes([
              {
                name: "A Route",
                path: "",
                respond: () => {
                  return {
                    data: {
                      test: "value"
                    }
                  };
                }
              }
            ]);
            const router = createRouter(inMemory, routes, {
              history: {
                locations: [{ url: "/" }]
              }
            });
            const { response } = router.current();
            expect(response.data).toMatchObject({ test: "value" });
          });
        });

        describe("name", () => {
          it("is the name of the best matching route", () => {
            const routes = prepareRoutes([
              {
                name: "A Route",
                path: "a-route"
              }
            ]);
            const router = createRouter(inMemory, routes, {
              history: {
                locations: [{ url: "/a-route" }]
              }
            });
            const { response } = router.current();
            expect(response.name).toBe("A Route");
          });
        });

        describe("params", () => {
          it("includes params from partially matched routes", () => {
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
            const router = createRouter(inMemory, routes, {
              history: {
                locations: [{ url: "/MT/Bozeman" }]
              }
            });
            const { response } = router.current();
            expect(response.params).toEqual({
              state: "MT",
              city: "Bozeman"
            });
          });

          it("overwrites param name conflicts", () => {
            const routes = prepareRoutes([
              {
                name: "One",
                path: ":id",
                children: [{ name: "Two", path: ":id" }]
              }
            ]);
            const router = createRouter(inMemory, routes, {
              history: {
                locations: [{ url: "/1/2" }]
              }
            });
            const { response } = router.current();
            expect(response.params["id"]).toBe("2");
          });

          describe("parsing params", () => {
            it("uses route.params to parse params", () => {
              const routes = prepareRoutes([
                {
                  name: "number",
                  path: ":num",
                  params: {
                    num: n => parseInt(n, 10)
                  }
                }
              ]);
              const router = createRouter(inMemory, routes, {
                history: {
                  locations: [{ url: "/123" }]
                }
              });
              const { response } = router.current();
              expect(response.params).toEqual({ num: 123 });
            });

            it("parses params from parent routes", () => {
              const routes = prepareRoutes([
                {
                  name: "first",
                  path: ":first",
                  children: [
                    {
                      name: "second",
                      path: ":second",
                      params: {
                        second: n => parseInt(n, 10)
                      }
                    }
                  ],
                  params: {
                    first: n => parseInt(n, 10)
                  }
                }
              ]);
              const router = createRouter(inMemory, routes, {
                history: {
                  locations: [{ url: "/123/456" }]
                }
              });
              const { response } = router.current();
              expect(response.params).toEqual({
                first: 123,
                second: 456
              });
            });

            it("decodes param using decodeURIComponent if param has no function", () => {
              const routes = prepareRoutes([
                {
                  name: "combo",
                  path: ":first/:second",
                  params: {
                    first: n => parseInt(n, 10)
                  }
                }
              ]);
              const router = createRouter(inMemory, routes, {
                history: {
                  locations: [{ url: "/123/test%20ing" }]
                }
              });
              const { response } = router.current();
              expect(response.params).toEqual({
                first: 123,
                second: "test ing"
              });
            });

            it("throws if param parser throws", () => {
              const routes = prepareRoutes([
                {
                  name: "number",
                  path: "(.*)"
                }
              ]);
              expect(() => {
                const router = createRouter(inMemory, routes, {
                  history: {
                    locations: [{ url: "/%" }]
                  }
                });
              }).toThrow();
            });
          });
        });

        describe("redirect", () => {
          it("contains the expected properties", () => {
            const routes = prepareRoutes([
              {
                name: "A Route",
                path: "",
                respond: () => {
                  return {
                    redirect: {
                      name: "B Route",
                      params: { id: "bee" },
                      hash: "bay",
                      query: "type=honey",
                      state: { why: "not" }
                    }
                  };
                }
              },
              {
                name: "B Route",
                path: "b/:id"
              }
            ]);

            let firstCall = true;
            const logger = ({ response }) => {
              if (firstCall) {
                expect(response.redirect).toMatchObject({
                  hash: "bay",
                  query: "type=honey",
                  url: "/b/bee?type=honey#bay",
                  state: { why: "not" },
                  name: "B Route",
                  params: { id: "bee" }
                });
                firstCall = false;
              }
            };
            const router = createRouter(inMemory, routes, {
              sideEffects: [logger],
              history: {
                locations: [{ url: "/" }]
              }
            });
          });

          it("works with external redirects", () => {
            const routes = prepareRoutes([
              {
                name: "A Route",
                path: "",
                respond: () => {
                  return {
                    redirect: {
                      externalURL: "https://example.com"
                    }
                  };
                }
              }
            ]);
            const router = createRouter(inMemory, routes, {
              history: {
                locations: [{ url: "/" }]
              }
            });
            const { response } = router.current();
            expect(response.redirect).toMatchObject({
              externalURL: "https://example.com"
            });
          });
        });

        describe("[invalid properties]", () => {
          it("warns when returned object has an invalid property", () => {
            const realWarn = console.warn;
            const fakeWarn = (console.warn = jest.fn());
            const routes = prepareRoutes([
              {
                name: "Contact",
                path: "contact",
                // @ts-ignore
                respond() {
                  return {
                    bad: "property"
                  };
                }
              }
            ]);
            expect(fakeWarn.mock.calls.length).toBe(0);
            const router = createRouter(inMemory, routes, {
              history: {
                locations: [{ url: "/contact" }]
              }
            });
            const { response } = router.current();
            expect(fakeWarn.mock.calls.length).toBe(1);
            // @ts-ignore
            expect(response.bad).toBeUndefined();

            console.warn = realWarn;
          });
        });

        describe("[undefined properties]", () => {
          it("are set to undefined on the response", () => {
            const routes = prepareRoutes([
              {
                name: "A Route",
                path: "",
                respond: () => {
                  return {
                    body: "body",
                    meta: undefined
                  };
                }
              }
            ]);
            const router = createRouter(inMemory, routes);
            const { response } = router.current();
            expect(response.name).toBe("A Route");
            expect(response.hasOwnProperty("body")).toBe(true);
            expect(response.hasOwnProperty("meta")).toBe(true);
            expect(response.meta).toBeUndefined();
          });
        });

        describe("route.respond doesn't return anything", () => {
          it("warns", () => {
            const realWarn = console.warn;
            console.warn = jest.fn();

            const routes = prepareRoutes([
              {
                name: "A Route",
                path: "",
                // @ts-ignore
                respond: () => {}
              }
            ]);

            const router = createRouter(inMemory, routes);

            expect((console.warn as jest.Mock).mock.calls[0][0]).toBe(
              `"A Route"'s response function did not return anything. Did you forget to include a return statement?`
            );

            console.warn = realWarn;
          });
        });
      });
    });

    describe("resolve", () => {
      describe("calling functions", () => {
        it("is called with location, matched route name, and params", done => {
          const spy = jest.fn(route => {
            expect(route).toMatchObject({
              params: { anything: "hello" },
              location: {
                pathname: "/hello",
                query: "one=two"
              },
              name: "Catch All"
            });
            done();
            return Promise.resolve();
          });

          const routes = prepareRoutes([
            {
              name: "Catch All",
              path: ":anything",
              resolve: spy
            }
          ]);

          createRouter(inMemory, routes, {
            history: {
              locations: [{ url: "/hello?one=two" }]
            }
          });
        });

        it("is called with external provided to router", done => {
          const external = "test";
          const spy = jest.fn((_, e) => {
            expect(e).toBe(external);
            done();
            return Promise.resolve();
          });

          const routes = prepareRoutes([
            {
              name: "Catch All",
              path: ":anything",
              resolve: spy
            }
          ]);
          createRouter(inMemory, routes, {
            external,
            history: {
              locations: [{ url: "/hello?one=two" }]
            }
          });
        });
      });

      describe("respond", () => {
        it("is not called if the navigation has been cancelled", done => {
          const responseSpy = jest.fn();
          let firstHasResolved = false;
          const spy = jest.fn(() => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                firstHasResolved = true;
                resolve();
              }, 15);
            });
          });

          const routes = prepareRoutes([
            {
              name: "First",
              path: "first",
              resolve: spy,
              respond: responseSpy
            },
            {
              name: "Second",
              path: "second",
              respond: () => {
                expect(firstHasResolved).toBe(true);
                expect(spy.mock.calls.length).toBe(2);
                expect(responseSpy.mock.calls.length).toBe(0);
                done();
                return {};
              },
              // re-use the spy so that this route's response
              // fn isn't call until after the first route's spy
              // fn has resolved
              resolve: spy
            }
          ]);
          const router = createRouter(inMemory, routes, {
            history: {
              locations: [{ url: "/first" }]
            }
          });
          const url = router.url({ name: "Second" });
          router.navigate({ url });
        });

        describe("resolved", () => {
          it("is null when route has no resolve functions", () => {
            const routes = prepareRoutes([
              {
                name: "Catch All",
                path: ":anything",
                respond: ({ resolved }) => {
                  expect(resolved).toBe(null);
                  return {};
                }
              }
            ]);
            const router = createRouter(inMemory, routes, {
              history: {
                locations: [{ url: "/hello?one=two" }]
              }
            });
          });

          it("is null when a resolve function throws", () => {
            const routes = prepareRoutes([
              {
                name: "Catch All",
                path: ":anything",
                resolve() {
                  return Promise.reject("woops!");
                },
                respond: ({ resolved }) => {
                  expect(resolved).toBe(null);
                  return {};
                }
              }
            ]);
            const router = createRouter(inMemory, routes, {
              history: {
                locations: [{ url: "/hello?one=two" }]
              }
            });
          });

          it("is the resolve results", () => {
            const routes = prepareRoutes([
              {
                name: "Catch All",
                path: ":anything",
                respond: ({ resolved }) => {
                  expect(resolved.test).toBe(1);
                  expect(resolved.yo).toBe("yo!");
                  return {};
                },
                resolve() {
                  return Promise.resolve({ test: 1, yo: "yo!" });
                }
              }
            ]);
            const router = createRouter(inMemory, routes, {
              history: {
                locations: [{ url: "/hello?one=two" }]
              }
            });
          });
        });

        describe("error", () => {
          it("receives the error rejected by a resolve function", done => {
            const spy = jest.fn(({ error }) => {
              expect(error).toBe("rejected");
              done();
              return {};
            });

            const routes = prepareRoutes([
              {
                name: "Catch All",
                path: ":anything",
                respond: spy,
                resolve() {
                  return Promise.reject("rejected");
                }
              }
            ]);
            const router = createRouter(inMemory, routes, {
              history: {
                locations: [{ url: "/hello?one=two" }]
              }
            });
          });

          it("is null when all resolve functions succeed", done => {
            const spy = jest.fn(({ error }) => {
              expect(error).toBe(null);
              done();
              return {};
            });

            const routes = prepareRoutes([
              {
                name: "Catch All",
                path: ":anything",
                respond: spy,
                resolve() {
                  return Promise.resolve("hurray!");
                }
              }
            ]);
            const router = createRouter(inMemory, routes, {
              history: {
                locations: [{ url: "/hello?one=two" }]
              }
            });
          });
        });

        describe("match", () => {
          it("receives the response properties based on the matched route", () => {
            const routes = prepareRoutes([
              {
                name: "Catch All",
                path: ":anything",
                respond: props => {
                  expect(props.match).toMatchObject({
                    name: "Catch All",
                    params: { anything: "hello" },
                    location: {
                      pathname: "/hello",
                      query: "one=two"
                    }
                  });
                  return {};
                }
              }
            ]);
            const router = createRouter(inMemory, routes, {
              history: {
                locations: [{ url: "/hello?one=two" }]
              }
            });
          });
        });
      });
    });

    describe("redirect responses", () => {
      // these tests mock history.navigate to track how many times
      // it is called.
      it("automatically redirects for internal redirects", () => {
        const routes = prepareRoutes([
          {
            name: "Home",
            path: ""
          },
          {
            name: "Redirects",
            path: "redirects",
            respond: () => {
              return {
                redirect: {
                  name: "Other"
                }
              };
            }
          },
          {
            name: "Other",
            path: "other"
          }
        ]);
        const router = createRouter(inMemory, routes);
        const history = router.history;

        const realNavigate = history.navigate;
        history.navigate = jest.fn((...args) => {
          realNavigate(...args);
        });

        expect((history.navigate as jest.Mock).mock.calls.length).toBe(0);

        const url = router.url({ name: "Redirects" });
        router.navigate({ url });

        expect((history.navigate as jest.Mock).mock.calls.length).toBe(2);
      });

      it("does not try to redirect to external redirects", () => {
        const routes = prepareRoutes([
          {
            name: "Home",
            path: ""
          },
          {
            name: "Redirects",
            path: "redirects",
            respond: () => {
              return {
                redirect: {
                  externalURL: "https://example.com"
                }
              };
            }
          },
          {
            name: "Other",
            path: "other"
          }
        ]);
        const router = createRouter(inMemory, routes);
        const history = router.history;

        const realNavigate = history.navigate;
        history.navigate = jest.fn((...args) => {
          realNavigate(...args);
        });

        expect((history.navigate as jest.Mock).mock.calls.length).toBe(0);

        const redirectsURL = router.url({ name: "Redirects" });
        router.navigate({ url: redirectsURL });

        expect((history.navigate as jest.Mock).mock.calls.length).toBe(1);

        const otherURL = router.url({ name: "Other" });
        router.navigate({ url: otherURL });

        expect((history.navigate as jest.Mock).mock.calls.length).toBe(2);
      });
    });
  });
});
