import "jest";
import { inMemory } from "@hickory/in-memory";

import { createRouter, prepareRoutes } from "@curi/router";

describe("route matching/response generation", () => {
  describe("route matching", () => {
    it("ignores leading slash on the pathname", () => {
      const routes = prepareRoutes([
        {
          name: "Test",
          path: "test"
        }
      ]);
      const router = createRouter(inMemory, routes, {
        history: {
          locations: ["/test"]
        }
      });
      const { response } = router.current();
      expect(response.name).toBe("Test");
    });

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
      const router = createRouter(inMemory, routes, {
        history: {
          locations: ["/test/leftovers"]
        }
      });
      const { response } = router.current();
      expect(response.name).toBe("Not Found");
    });

    describe("no matching routes", () => {
      it("no response is emitted", () => {
        // suppress the warning
        const realWarn = console.warn;
        console.warn = () => {};

        const routes = prepareRoutes([]);
        const router = createRouter(inMemory, routes, {
          history: {
            locations: ["/test"]
          }
        });

        const observer = jest.fn();
        router.once(observer);
        expect(observer.mock.calls.length).toBe(0);

        console.warn = realWarn;
      });

      it("warns that no route matched", () => {
        const realWarn = console.warn;
        const fakeWarn = (console.warn = jest.fn());

        const routes = prepareRoutes([]);
        const router = createRouter(inMemory, routes, {
          history: {
            locations: ["/test"]
          }
        });
        const observer = jest.fn();

        router.once(observer);
        expect(fakeWarn.mock.calls[0][0]).toBe(
          `The current location (/test) has no matching route, so a response could not be emitted. A catch-all route ({ path: "(.*)" }) can be used to match locations with no other matching route.`
        );
        console.warn = realWarn;
      });
    });

    describe("nested routes", () => {
      it("includes parent in partials if a child matches", () => {
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
            locations: ["/ND/Fargo"]
          }
        });
        const { response } = router.current();
        expect(response.name).toBe("City");
        expect(response.partials).toEqual(["State"]);
      });

      it("matches children when parent has trailing slash", () => {
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
        const router = createRouter(inMemory, routes, {
          history: {
            locations: ["/ND/Fargo/"]
          }
        });
        const { response } = router.current();
        expect(response.name).toBe("City");
      });

      it("does non-end parent matching when there are child routes, even if pathOptions.match.end=true", () => {
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
        const router = createRouter(inMemory, routes, {
          history: {
            locations: ["/ND/Fargo"]
          }
        });
        const { response } = router.current();
        expect(response.name).toBe("City");
        expect(response.partials).toEqual(["State"]);
      });

      it("skips parent match if no children match", () => {
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
        const router = createRouter(inMemory, routes, {
          history: {
            locations: ["/MT/Bozeman"]
          }
        });
        const { response } = router.current();
        expect(response.name).toBe("Not Found");
        expect(response.partials).toEqual([]);
      });
    });

    it("matches partial routes if route.pathOptions.match.end=false", () => {
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
      const router = createRouter(inMemory, routes, {
        history: {
          locations: ["/SD/Sioux City"]
        }
      });
      const { response } = router.current();
      expect(response.name).toBe("State");
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
        const router = createRouter(inMemory, routes, {
          history: {
            locations: ["/NY/about"]
          }
        });
        const { response } = router.current();
        expect(response.name).toBe("State");
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
        const router = createRouter(inMemory, routes, {
          history: {
            locations: ["/about"]
          }
        });
        const { response } = router.current();
        expect(response.name).toBe("State");
      });
    });
  });

  describe("response", () => {
    describe("properties", () => {
      describe("location", () => {
        it("is the location used to match routes", () => {
          const routes = prepareRoutes([{ name: "Catch All", path: "(.*)" }]);
          const router = createRouter(inMemory, routes, {
            history: {
              locations: ["/other-page"]
            }
          });
          const { response } = router.current();
          expect(response.location).toBe(router.history.location);
        });
      });

      describe("body", () => {
        it("is undefined if not set by route.response()", () => {
          const routes = prepareRoutes([
            {
              name: "Test",
              path: "test"
            }
          ]);
          const router = createRouter(inMemory, routes, {
            history: {
              locations: ["/test"]
            }
          });
          const { response } = router.current();
          expect(response.body).toBeUndefined();
        });

        it("is the body value of the object returned by route.response()", () => {
          const body = () => "anybody out there?";
          const routes = prepareRoutes([
            {
              name: "Test",
              path: "test",
              response: () => {
                return {
                  body: body
                };
              }
            }
          ]);
          const router = createRouter(inMemory, routes, {
            history: {
              locations: ["/test"]
            }
          });
          const { response } = router.current();
          expect(response.body).toBe(body);
        });
      });

      describe("status", () => {
        it("is undefined if not set by route.response()", () => {
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
              locations: ["/contact"]
            }
          });
          const { response } = router.current();
          expect(response.status).toBeUndefined();
        });

        it("is the status value of object returned by route.response()", () => {
          const routes = prepareRoutes([
            {
              name: "A Route",
              path: "",
              response: () => {
                return {
                  status: 451
                };
              }
            }
          ]);
          const router = createRouter(inMemory, routes, {
            history: {
              locations: ["/"]
            }
          });
          const { response } = router.current();
          expect(response.status).toBe(451);
        });
      });

      describe("data", () => {
        it("is undefined if not set by route.response()", () => {
          const routes = prepareRoutes([
            {
              name: "A Route",
              path: ""
            }
          ]);
          const router = createRouter(inMemory, routes, {
            history: {
              locations: ["/"]
            }
          });
          const { response } = router.current();
          expect(response.data).toBeUndefined();
        });

        it("is the data value of the object returned by route.response()", () => {
          const routes = prepareRoutes([
            {
              name: "A Route",
              path: "",
              response: () => {
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
              locations: ["/"]
            }
          });
          const { response } = router.current();
          expect(response.data).toMatchObject({ test: "value" });
        });
      });

      describe("title", () => {
        it("is undefined if not set by route.response()", () => {
          const routes = prepareRoutes([
            {
              name: "State",
              path: ":state"
            }
          ]);
          const router = createRouter(inMemory, routes, {
            history: {
              locations: ["/AZ"]
            }
          });

          const { response } = router.current();
          expect(response.title).toBeUndefined();
        });

        it("is the title value of the object returned by route.response()", () => {
          const routes = prepareRoutes([
            {
              name: "State",
              path: ":state",
              response: () => {
                return {
                  title: "A State"
                };
              }
            }
          ]);
          const router = createRouter(inMemory, routes, {
            history: {
              locations: ["/VA"]
            }
          });

          const { response } = router.current();
          expect(response.title).toBe("A State");
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
              locations: ["/a-route"]
            }
          });
          const { response } = router.current();
          expect(response.name).toBe("A Route");
        });
      });

      describe("partials", () => {
        it("is set using the names of all partially matching routes", () => {
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
              locations: ["/TX/Austin"]
            }
          });
          const { response } = router.current();
          expect(response.partials).toEqual(["State"]);
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
              locations: ["/MT/Bozeman"]
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
              locations: ["/1/2"]
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
                locations: ["/123"]
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
                locations: ["/123/456"]
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
                locations: ["/123/test%20ing"]
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
                  locations: ["/%"]
                }
              });
            }).toThrow();
          });
        });
      });

      describe("error", () => {
        it("is undefined for good responses", () => {
          const routes = prepareRoutes([{ name: "Contact", path: "contact" }]);
          const router = createRouter(inMemory, routes, {
            history: {
              locations: ["/contact"]
            }
          });
          const { response } = router.current();
          expect(response.error).toBeUndefined();
        });

        it("is the error value on the object returned by route.response()", () => {
          const routes = prepareRoutes([
            {
              name: "A Route",
              path: "",
              response: () => {
                return {
                  error: "woops"
                };
              }
            }
          ]);
          const router = createRouter(inMemory, routes, {
            history: {
              locations: ["/"]
            }
          });
          const { response } = router.current();
          expect(response.error).toBe("woops");
        });
      });

      describe("redirect", () => {
        it("contains the expected properties", () => {
          const routes = prepareRoutes([
            {
              name: "A Route",
              path: "",
              response: () => {
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
                pathname: "/b/bee",
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
              locations: ["/"]
            }
          });
        });

        it("works with external redirects", () => {
          const routes = prepareRoutes([
            {
              name: "A Route",
              path: "",
              response: () => {
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
              locations: ["/"]
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
              response() {
                return {
                  bad: "property"
                };
              }
            }
          ]);
          expect(fakeWarn.mock.calls.length).toBe(0);
          const router = createRouter(inMemory, routes, {
            history: {
              locations: ["/contact"]
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
        it("doesn't merge properties whose values is undefined", () => {
          const routes = prepareRoutes([
            {
              name: "A Route",
              path: "",
              response: () => {
                return {
                  body: "body",
                  status: undefined
                };
              }
            }
          ]);
          const router = createRouter(inMemory, routes);
          const { response } = router.current();
          expect(response.name).toBe("A Route");
          expect(response.hasOwnProperty("body")).toBe(true);
          expect(response.hasOwnProperty("status")).toBe(false);
        });
      });

      describe("route.response doesn't return anything", () => {
        it("warns", () => {
          const realWarn = console.warn;
          console.warn = jest.fn();

          const routes = prepareRoutes([
            {
              name: "A Route",
              path: "",
              // @ts-ignore
              response: () => {}
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

  describe("resolve functions", () => {
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
            locations: ["/hello?one=two"]
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
            locations: ["/hello?one=two"]
          }
        });
      });
    });

    describe("response", () => {
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
            response: responseSpy
          },
          {
            name: "Second",
            path: "second",
            response: () => {
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
            locations: ["/first"]
          }
        });
        router.navigate({ name: "Second" });
      });

      describe("resolved", () => {
        it("is null when route has no resolve functions", () => {
          const routes = prepareRoutes([
            {
              name: "Catch All",
              path: ":anything",
              response: ({ resolved }) => {
                expect(resolved).toBe(null);
                return {};
              }
            }
          ]);
          const router = createRouter(inMemory, routes, {
            history: {
              locations: ["/hello?one=two"]
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
              response: ({ resolved }) => {
                expect(resolved).toBe(null);
                return {};
              }
            }
          ]);
          const router = createRouter(inMemory, routes, {
            history: {
              locations: ["/hello?one=two"]
            }
          });
        });

        it("is the resolve results", () => {
          const routes = prepareRoutes([
            {
              name: "Catch All",
              path: ":anything",
              response: ({ resolved }) => {
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
              locations: ["/hello?one=two"]
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
              response: spy,
              resolve() {
                return Promise.reject("rejected");
              }
            }
          ]);
          const router = createRouter(inMemory, routes, {
            history: {
              locations: ["/hello?one=two"]
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
              response: spy,
              resolve() {
                return Promise.resolve("hurray!");
              }
            }
          ]);
          const router = createRouter(inMemory, routes, {
            history: {
              locations: ["/hello?one=two"]
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
              response: props => {
                expect(props.match).toMatchObject({
                  name: "Catch All",
                  params: { anything: "hello" },
                  partials: [],
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
              locations: ["/hello?one=two"]
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
          response: () => {
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

      router.navigate({ name: "Redirects" });

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
          response: () => {
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

      router.navigate({ name: "Redirects" });

      expect((history.navigate as jest.Mock).mock.calls.length).toBe(1);

      router.navigate({ name: "Other" });

      expect((history.navigate as jest.Mock).mock.calls.length).toBe(2);
    });
  });
});
