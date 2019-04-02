import "jest";
import { in_memory } from "@hickory/in-memory";

import { create_router, prepare_routes } from "@curi/router";

describe("route matching/response generation", () => {
  describe("route matching", () => {
    it("ignores leading slash on the pathname", () => {
      const routes = prepare_routes([
        {
          name: "Test",
          path: "test"
        }
      ]);
      const router = create_router(in_memory, routes, {
        history: {
          locations: ["/test"]
        }
      });
      const { response } = router.current();
      expect(response.name).toBe("Test");
    });

    it("does exact matching", () => {
      const routes = prepare_routes([
        {
          name: "Test",
          path: "test"
        },
        {
          name: "Not Found",
          path: "(.*)"
        }
      ]);
      const router = create_router(in_memory, routes, {
        history: {
          locations: ["/test/leftovers"]
        }
      });
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
        const routes = prepare_routes([]);
        const router = create_router(in_memory, routes, {
          history: {
            locations: ["/test"]
          }
        });

        const observer = jest.fn();
        router.once(observer);
        expect(observer.mock.calls.length).toBe(0);
      });

      it("warns that no route matched", () => {
        const routes = prepare_routes([]);
        const router = create_router(in_memory, routes, {
          history: {
            locations: ["/test"]
          }
        });
        const observer = jest.fn();

        router.once(observer);
        expect(fakeWarn.mock.calls[0][0]).toBe(
          `The current location (/test) has no matching route, so a response could not be emitted. A catch-all route ({ path: "(.*)" }) can be used to match locations with no other matching route.`
        );
      });
    });

    describe("nested routes", () => {
      it("includes parent in partials if a child matches", () => {
        const routes = prepare_routes([
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
        const router = create_router(in_memory, routes, {
          history: {
            locations: ["/ND/Fargo"]
          }
        });
        const { response } = router.current();
        expect(response.name).toBe("City");
        expect(response.partials).toEqual(["State"]);
      });

      it("matches children when parent has trailing slash", () => {
        const routes = prepare_routes([
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
        const router = create_router(in_memory, routes, {
          history: {
            locations: ["/ND/Fargo/"]
          }
        });
        const { response } = router.current();
        expect(response.name).toBe("City");
      });

      it("does non-end parent matching when there are child routes, even if path_options.end=true", () => {
        const routes = prepare_routes([
          {
            name: "State",
            path: ":state",
            path_options: { end: true },
            children: [
              {
                name: "City",
                path: ":city"
              }
            ]
          }
        ]);
        const router = create_router(in_memory, routes, {
          history: {
            locations: ["/ND/Fargo"]
          }
        });
        const { response } = router.current();
        expect(response.name).toBe("City");
        expect(response.partials).toEqual(["State"]);
      });

      it("skips parent match if no children match", () => {
        const routes = prepare_routes([
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
        const router = create_router(in_memory, routes, {
          history: {
            locations: ["/MT/Bozeman"]
          }
        });
        const { response } = router.current();
        expect(response.name).toBe("Not Found");
        expect(response.partials).toEqual([]);
      });
    });

    it("matches partial routes if route.path_options.end=false", () => {
      const routes = prepare_routes([
        {
          name: "State",
          path: ":state",
          path_options: { end: false }
        },
        {
          name: "Not Found",
          path: "(.*)"
        }
      ]);
      const router = create_router(in_memory, routes, {
        history: {
          locations: ["/SD/Sioux City"]
        }
      });
      const { response } = router.current();
      expect(response.name).toBe("State");
    });

    describe("optional path parameters", () => {
      it("works when optional param is included", () => {
        const routes = prepare_routes([
          {
            name: "State",
            path: ":state?/about",
            path_options: { end: false }
          },
          {
            name: "Not Found",
            path: "(.*)"
          }
        ]);
        const router = create_router(in_memory, routes, {
          history: {
            locations: ["/NY/about"]
          }
        });
        const { response } = router.current();
        expect(response.name).toBe("State");
      });

      it("works when optional param is NOT included", () => {
        const routes = prepare_routes([
          {
            name: "State",
            path: ":state?/about",
            path_options: { end: false }
          },
          {
            name: "Not Found",
            path: "(.*)"
          }
        ]);
        const router = create_router(in_memory, routes, {
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
          const routes = prepare_routes([{ name: "Catch All", path: "(.*)" }]);
          const router = create_router(in_memory, routes, {
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
          const routes = prepare_routes([
            {
              name: "Test",
              path: "test"
            }
          ]);
          const router = create_router(in_memory, routes, {
            history: {
              locations: ["/test"]
            }
          });
          const { response } = router.current();
          expect(response.body).toBeUndefined();
        });

        it("is the body value of the object returned by route.response()", () => {
          const body = () => "anybody out there?";
          const routes = prepare_routes([
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
          const router = create_router(in_memory, routes, {
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
          const routes = prepare_routes([
            {
              name: "Contact",
              path: "contact",
              children: [
                { name: "Email", path: "email" },
                { name: "Phone", path: "phone" }
              ]
            }
          ]);
          const router = create_router(in_memory, routes, {
            history: {
              locations: ["/contact"]
            }
          });
          const { response } = router.current();
          expect(response.status).toBeUndefined();
        });

        it("is the status value of object returned by route.response()", () => {
          const routes = prepare_routes([
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
          const router = create_router(in_memory, routes, {
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
          const routes = prepare_routes([
            {
              name: "A Route",
              path: ""
            }
          ]);
          const router = create_router(in_memory, routes, {
            history: {
              locations: ["/"]
            }
          });
          const { response } = router.current();
          expect(response.data).toBeUndefined();
        });

        it("is the data value of the object returned by route.response()", () => {
          const routes = prepare_routes([
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
          const router = create_router(in_memory, routes, {
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
          const routes = prepare_routes([
            {
              name: "State",
              path: ":state"
            }
          ]);
          const router = create_router(in_memory, routes, {
            history: {
              locations: ["/AZ"]
            }
          });

          const { response } = router.current();
          expect(response.title).toBeUndefined();
        });

        it("is the title value of the object returned by route.response()", () => {
          const routes = prepare_routes([
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
          const router = create_router(in_memory, routes, {
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
          const routes = prepare_routes([
            {
              name: "A Route",
              path: "a-route"
            }
          ]);
          const router = create_router(in_memory, routes, {
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
          const routes = prepare_routes([
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
          const router = create_router(in_memory, routes, {
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
          const routes = prepare_routes([
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
          const router = create_router(in_memory, routes, {
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
          const routes = prepare_routes([
            {
              name: "One",
              path: ":id",
              children: [{ name: "Two", path: ":id" }]
            }
          ]);
          const router = create_router(in_memory, routes, {
            history: {
              locations: ["/1/2"]
            }
          });
          const { response } = router.current();
          expect(response.params["id"]).toBe("2");
        });

        describe("parsing params", () => {
          it("uses route.params to parse params", () => {
            const routes = prepare_routes([
              {
                name: "number",
                path: ":num",
                params: {
                  num: n => parseInt(n, 10)
                }
              }
            ]);
            const router = create_router(in_memory, routes, {
              history: {
                locations: ["/123"]
              }
            });
            const { response } = router.current();
            expect(response.params).toEqual({ num: 123 });
          });

          it("parses params from parent routes", () => {
            const routes = prepare_routes([
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
            const router = create_router(in_memory, routes, {
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
            const routes = prepare_routes([
              {
                name: "combo",
                path: ":first/:second",
                params: {
                  first: n => parseInt(n, 10)
                }
              }
            ]);
            const router = create_router(in_memory, routes, {
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

          it("falls back to string value if param parser throws", () => {
            const originalError = console.error;
            const errorMock = jest.fn();
            console.error = errorMock;

            const routes = prepare_routes([
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
            const router = create_router(in_memory, routes, {
              history: {
                locations: ["/123"]
              }
            });
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
          const routes = prepare_routes([{ name: "Contact", path: "contact" }]);
          const router = create_router(in_memory, routes, {
            history: {
              locations: ["/contact"]
            }
          });
          const { response } = router.current();
          expect(response.error).toBeUndefined();
        });

        it("is the error value on the object returned by route.response()", () => {
          const routes = prepare_routes([
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
          const router = create_router(in_memory, routes, {
            history: {
              locations: ["/"]
            }
          });
          const { response } = router.current();
          expect(response.error).toBe("woops");
        });
      });

      describe("redirect_to", () => {
        it("contains the expected properties", () => {
          const routes = prepare_routes([
            {
              name: "A Route",
              path: "",
              response: () => {
                return {
                  redirect_to: {
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
              expect(response.redirect_to).toMatchObject({
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
          const router = create_router(in_memory, routes, {
            side_effects: [logger],
            history: {
              locations: ["/"]
            }
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

        const routes = prepare_routes([
          {
            name: "Catch All",
            path: ":anything",
            resolve: spy
          }
        ]);

        create_router(in_memory, routes, {
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

        const routes = prepare_routes([
          {
            name: "Catch All",
            path: ":anything",
            resolve: spy
          }
        ]);
        create_router(in_memory, routes, {
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

        const routes = prepare_routes([
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
        const router = create_router(in_memory, routes, {
          history: {
            locations: ["/first"]
          }
        });
        router.navigate({ name: "Second" });
      });

      describe("resolved", () => {
        it("is null when route has no resolve functions", () => {
          const routes = prepare_routes([
            {
              name: "Catch All",
              path: ":anything",
              response: ({ resolved }) => {
                expect(resolved).toBe(null);
                return {};
              }
            }
          ]);
          const router = create_router(in_memory, routes, {
            history: {
              locations: ["/hello?one=two"]
            }
          });
        });

        it("is null when a resolve function throws", () => {
          const routes = prepare_routes([
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
          const router = create_router(in_memory, routes, {
            history: {
              locations: ["/hello?one=two"]
            }
          });
        });

        it("is the resolve results", () => {
          const routes = prepare_routes([
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
          const router = create_router(in_memory, routes, {
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

          const routes = prepare_routes([
            {
              name: "Catch All",
              path: ":anything",
              response: spy,
              resolve() {
                return Promise.reject("rejected");
              }
            }
          ]);
          const router = create_router(in_memory, routes, {
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

          const routes = prepare_routes([
            {
              name: "Catch All",
              path: ":anything",
              response: spy,
              resolve() {
                return Promise.resolve("hurray!");
              }
            }
          ]);
          const router = create_router(in_memory, routes, {
            history: {
              locations: ["/hello?one=two"]
            }
          });
        });
      });

      describe("match", () => {
        it("receives the response properties based on the matched route", () => {
          const routes = prepare_routes([
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
          const router = create_router(in_memory, routes, {
            history: {
              locations: ["/hello?one=two"]
            }
          });
        });
      });
    });
  });
});
