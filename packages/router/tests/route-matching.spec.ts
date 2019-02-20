import "jest";
import { InMemory } from "@hickory/in-memory";

// @ts-ignore (resolved by jest)
import { curi, prepareRoutes } from "@curi/router";

describe("route matching/response generation", () => {
  describe("route matching", () => {
    it("ignores leading slash on the pathname", () => {
      const history = InMemory({ locations: ["/test"] });
      const routes = prepareRoutes([
        {
          name: "Test",
          path: "test"
        }
      ]);
      const router = curi(history, routes);
      const { response } = router.current();
      expect(response.name).toBe("Test");
    });

    it("does exact matching", () => {
      const history = InMemory({ locations: ["/test/leftovers"] });
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
      const router = curi(history, routes);
      const { response } = router.current();
      expect(response.name).toBe("Not Found");
    });

    describe("no matching routes", () => {
      const realWarn = console.warn;
      const fakeWarn = (console.warn = jest.fn());

      afterAll(() => {
        console.error = realWarn;
      });

      it("no response is emitted", () => {
        const history = InMemory({ locations: ["/test"] });
        const routes = prepareRoutes([]);
        const router = curi(history, routes);

        const observer = jest.fn();
        router.once(observer);
        expect(observer.mock.calls.length).toBe(0);
      });

      it("warns that no route matched", () => {
        const history = InMemory({ locations: ["/test"] });
        const routes = prepareRoutes([]);
        const router = curi(history, routes);
        const observer = jest.fn();

        router.once(observer);
        expect(fakeWarn.mock.calls[0][0]).toBe(
          `The current location (/test) has no matching route, so a response could not be emitted. A catch-all route ({ path: "(.*)" }) can be used to match locations with no other matching route.`
        );
      });
    });

    describe("nested routes", () => {
      it("includes parent in partials if a child matches", () => {
        const history = InMemory({ locations: ["/ND/Fargo"] });
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
        const router = curi(history, routes);
        const { response } = router.current();
        expect(response.name).toBe("City");
        expect(response.partials).toEqual(["State"]);
      });

      it("matches children when parent has trailing slash", () => {
        const history = InMemory({ locations: ["/ND/Fargo/"] });
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
        const router = curi(history, routes);
        const { response } = router.current();
        expect(response.name).toBe("City");
      });

      it("does non-end parent matching when there are child routes, even if pathOptions.end=true", () => {
        const history = InMemory({ locations: ["/ND/Fargo"] });
        const routes = prepareRoutes([
          {
            name: "State",
            path: ":state",
            pathOptions: { end: true },
            children: [
              {
                name: "City",
                path: ":city"
              }
            ]
          }
        ]);
        const router = curi(history, routes);
        const { response } = router.current();
        expect(response.name).toBe("City");
        expect(response.partials).toEqual(["State"]);
      });

      it("skips parent match if no children match", () => {
        const history = InMemory({ locations: ["/MT/Bozeman"] });
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
        const router = curi(history, routes);
        const { response } = router.current();
        expect(response.name).toBe("Not Found");
        expect(response.partials).toEqual([]);
      });
    });

    it("matches partial routes if route.pathOptions.end=false", () => {
      const history = InMemory({ locations: ["/SD/Sioux City"] });
      const routes = prepareRoutes([
        {
          name: "State",
          path: ":state",
          pathOptions: { end: false }
        },
        {
          name: "Not Found",
          path: "(.*)"
        }
      ]);
      const router = curi(history, routes);
      const { response } = router.current();
      expect(response.name).toBe("State");
    });

    describe("optional path parameters", () => {
      it("works when optional param is included", () => {
        const history = InMemory({ locations: ["/NY/about"] });
        const routes = prepareRoutes([
          {
            name: "State",
            path: ":state?/about",
            pathOptions: { end: false }
          },
          {
            name: "Not Found",
            path: "(.*)"
          }
        ]);
        const router = curi(history, routes);
        const { response } = router.current();
        expect(response.name).toBe("State");
      });

      it("works when optional param is NOT included", () => {
        const history = InMemory({ locations: ["/about"] });
        const routes = prepareRoutes([
          {
            name: "State",
            path: ":state?/about",
            pathOptions: { end: false }
          },
          {
            name: "Not Found",
            path: "(.*)"
          }
        ]);
        const router = curi(history, routes);
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
          const history = InMemory({ locations: ["/other-page"] });
          const router = curi(history, routes);
          const { response } = router.current();
          expect(response.location).toBe(history.location);
        });
      });

      describe("body", () => {
        it("is undefined if not set by route.response()", () => {
          const history = InMemory({ locations: ["/test"] });
          const routes = prepareRoutes([
            {
              name: "Test",
              path: "test"
            }
          ]);
          const router = curi(history, routes);
          const { response } = router.current();
          expect(response.body).toBeUndefined();
        });

        it("is the body value of the object returned by route.response()", () => {
          const history = InMemory({ locations: ["/test"] });
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
          const router = curi(history, routes);
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
          const history = InMemory({ locations: ["/contact"] });
          const router = curi(history, routes);
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
          const history = InMemory({ locations: ["/"] });
          const router = curi(history, routes);
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
          const history = InMemory({ locations: ["/"] });
          const router = curi(history, routes);
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
          const history = InMemory({ locations: ["/"] });
          const router = curi(history, routes);
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
          const history = InMemory({ locations: ["/AZ"] });
          const router = curi(history, routes);

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
          const history = InMemory({ locations: ["/VA"] });
          const router = curi(history, routes);

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
          const history = InMemory({ locations: ["/a-route"] });
          const router = curi(history, routes);
          const { response } = router.current();
          expect(response.name).toBe("A Route");
        });
      });

      describe("partials", () => {
        it("is set using the names of all partially matching routes", () => {
          const history = InMemory({ locations: ["/TX/Austin"] });
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
          const router = curi(history, routes);
          const { response } = router.current();
          expect(response.partials).toEqual(["State"]);
        });
      });

      describe("params", () => {
        it("includes params from partially matched routes", () => {
          const history = InMemory({ locations: ["/MT/Bozeman"] });
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
          const router = curi(history, routes);
          const { response } = router.current();
          expect(response.params).toEqual({
            state: "MT",
            city: "Bozeman"
          });
        });

        it("overwrites param name conflicts", () => {
          const history = InMemory({ locations: ["/1/2"] });
          const routes = prepareRoutes([
            {
              name: "One",
              path: ":id",
              children: [{ name: "Two", path: ":id" }]
            }
          ]);
          const router = curi(history, routes);
          const { response } = router.current();
          expect(response.params["id"]).toBe("2");
        });

        describe("parsing params", () => {
          it("uses route.params to parse params", () => {
            const history = InMemory({ locations: ["/123"] });
            const routes = prepareRoutes([
              {
                name: "number",
                path: ":num",
                params: {
                  num: n => parseInt(n, 10)
                }
              }
            ]);
            const router = curi(history, routes);
            const { response } = router.current();
            expect(response.params).toEqual({ num: 123 });
          });

          it("parses params from parent routes", () => {
            const history = InMemory({ locations: ["/123/456"] });
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
            const router = curi(history, routes);
            const { response } = router.current();
            expect(response.params).toEqual({
              first: 123,
              second: 456
            });
          });

          it("uses string for any params not in route.params", () => {
            const history = InMemory({ locations: ["/123/456"] });
            const routes = prepareRoutes([
              {
                name: "combo",
                path: ":first/:second",
                params: {
                  first: n => parseInt(n, 10)
                }
              }
            ]);
            const router = curi(history, routes);
            const { response } = router.current();
            expect(response.params).toEqual({
              first: 123,
              second: "456"
            });
          });

          it("falls back to string value if param parser throws", () => {
            const originalError = console.error;
            const errorMock = jest.fn();
            console.error = errorMock;

            const history = InMemory({ locations: ["/123"] });
            const routes = prepareRoutes([
              {
                name: "number",
                path: ":num",
                params: {
                  num: n => {
                    throw new Error("This will fail.");
                  }
                }
              }
            ]);
            const router = curi(history, routes);
            const { response } = router.current();
            expect(response.params).toEqual({
              num: "123"
            });
            expect(errorMock.mock.calls.length).toBe(1);
            expect(errorMock.mock.calls[0][0].message).toBe("This will fail.");
            console.error = originalError;
          });
        });
      });

      describe("error", () => {
        it("is undefined for good responses", () => {
          const routes = prepareRoutes([{ name: "Contact", path: "contact" }]);
          const history = InMemory({
            locations: ["/contact"]
          });
          const router = curi(history, routes);
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
          const history = InMemory({ locations: ["/"] });
          const router = curi(history, routes);
          const { response } = router.current();
          expect(response.error).toBe("woops");
        });
      });

      describe("redirectTo", () => {
        it("contains the expected properties", () => {
          const history = InMemory({ locations: ["/"] });
          const routes = prepareRoutes([
            {
              name: "A Route",
              path: "",
              response: () => {
                return {
                  redirectTo: {
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
              expect(response.redirectTo).toMatchObject({
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
          const router = curi(history, routes, {
            sideEffects: [logger]
          });
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

        const history = InMemory({ locations: ["/hello?one=two"] });
        curi(history, routes);
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

        const history = InMemory({ locations: ["/hello?one=two"] });
        curi(history, routes, { external });
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

        const history = InMemory({ locations: ["/first"] });
        const router = curi(history, routes);
        history.navigate("/second");
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

          const history = InMemory({ locations: ["/hello?one=two"] });
          const router = curi(history, routes);
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

          const history = InMemory({ locations: ["/hello?one=two"] });
          const router = curi(history, routes);
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

          const history = InMemory({ locations: ["/hello?one=two"] });
          const router = curi(history, routes);
        });
      });

      describe("error", () => {
        it("receives the error rejected by a resolve function", done => {
          const spy = jest.fn(({ error }) => {
            expect(error).toBe("rejected");
            done();
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

          const history = InMemory({ locations: ["/hello?one=two"] });
          const router = curi(history, routes);
        });

        it("is null when all resolve functions succeed", done => {
          const spy = jest.fn(({ error }) => {
            expect(error).toBe(null);
            done();
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

          const history = InMemory({ locations: ["/hello?one=two"] });
          const router = curi(history, routes);
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

          const history = InMemory({ locations: ["/hello?one=two"] });
          const router = curi(history, routes);
        });
      });
    });
  });
});
