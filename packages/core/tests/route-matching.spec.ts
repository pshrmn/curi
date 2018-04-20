import "jest";
import curi from "../src/curi";
import InMemory from "@hickory/in-memory";

describe("route matching/response generation", () => {
  describe("route matching", () => {
    it("ignores leading slash on the pathname", done => {
      const history = InMemory({ locations: ["/test"] });
      const routes = [
        {
          name: "Test",
          path: "test"
        }
      ];
      const router = curi(history, routes);
      router.respond(({ response }) => {
        expect(response.name).toBe("Test");
        done();
      });
    });

    it("does exact matching", done => {
      const history = InMemory({ locations: ["/test/leftovers"] });
      const routes = [
        {
          name: "Test",
          path: "test"
        },
        {
          name: "Not Found",
          path: "(.*)"
        }
      ];
      const router = curi(history, routes);
      router.respond(({ response }) => {
        expect(response.name).toBe("Not Found");
        done();
      });
    });

    describe("nested routes", () => {
      it("includes parent if partials if a child matches", done => {
        const history = InMemory({ locations: ["/ND/Fargo"] });
        const routes = [
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
        ];
        const router = curi(history, routes);
        router.respond(({ response }) => {
          expect(response.name).toBe("City");
          expect(response.partials).toEqual(["State"]);
          done();
        });
      });

      it("does non-end parent matching when there are child routes, even if pathOptions.end=true", done => {
        const history = InMemory({ locations: ["/ND/Fargo"] });
        const routes = [
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
        ];
        const router = curi(history, routes);
        router.respond(({ response }) => {
          expect(response.name).toBe("City");
          expect(response.partials).toEqual(["State"]);
          done();
        });
      });

      it("skips parent match if no children match", done => {
        const history = InMemory({ locations: ["/MT/Bozeman"] });
        const routes = [
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
        ];
        const router = curi(history, routes);
        router.respond(({ response }) => {
          expect(response.name).toBe("Not Found");
          expect(response.partials).toEqual([]);
          done();
        });
      });
    });

    it("matches partial routes if route.pathOptions.end=false", done => {
      const history = InMemory({ locations: ["/SD/Sioux City"] });
      const routes = [
        {
          name: "State",
          path: ":state",
          pathOptions: { end: false }
        },
        {
          name: "Not Found",
          path: "(.*)"
        }
      ];
      const router = curi(history, routes);
      router.respond(({ response }) => {
        expect(response.name).toBe("State");
        done();
      });
    });
  });

  describe("response", () => {
    it("if either initial or every response fns have uncaught errors, error is passed to response fn", done => {
      const routes = [
        {
          name: "Contact",
          path: "contact",
          response: ({ async }) => {
            expect(async.error).toBe("This is an error");
            done();
          },
          async: {
            every: () => {
              return Promise.reject("This is an error");
            }
          }
        }
      ];
      const history = InMemory({
        locations: ["/contact"]
      });
      const router = curi(history, routes);
    });

    describe("properties", () => {
      describe("key", () => {
        it("is the key property from the location", done => {
          const routes = [];
          const history = InMemory({ locations: ["/other-page"] });
          const router = curi(history, routes);
          router.respond(({ response }) => {
            expect(response.key).toBe(history.location.key);
            done();
          });
        });
      });

      describe("location", () => {
        it("is the location used to match routes", done => {
          const routes = [];
          const history = InMemory({ locations: ["/other-page"] });
          const router = curi(history, routes);
          router.respond(({ response }) => {
            expect(response.location).toBe(history.location);
            done();
          });
        });
      });

      describe("body", () => {
        it("is undefined if it isn't set in response()", done => {
          const history = InMemory({ locations: ["/test"] });
          const routes = [
            {
              name: "Test",
              path: "test"
            }
          ];
          const router = curi(history, routes);
          router.respond(({ response }) => {
            expect(response.body).toBeUndefined();
            done();
          });
        });

        it("is the value set with set.body", done => {
          const history = InMemory({ locations: ["/test"] });
          const body = () => "anybody out there?";
          const routes = [
            {
              name: "Test",
              path: "test",
              response: ({ set }) => {
                set.body(body);
              }
            }
          ];
          const router = curi(history, routes);
          router.respond(({ response }) => {
            expect(response.body).toBe(body);
            done();
          });
        });
      });

      describe("status", () => {
        it("is 200 if a route matches", done => {
          const routes = [
            {
              name: "Contact",
              path: "contact",
              children: [
                { name: "Email", path: "email" },
                { name: "Phone", path: "phone" }
              ]
            }
          ];
          const history = InMemory({ locations: ["/contact"] });
          const router = curi(history, routes);
          router.respond(({ response }) => {
            expect(response.status).toBe(200);
            done();
          });
        });

        it("is 404 if no routes match", done => {
          const routes = [
            {
              name: "Contact",
              path: "contact",
              children: [
                { name: "Email", path: "email" },
                { name: "Phone", path: "phone" }
              ]
            }
          ];
          const history = InMemory({ locations: ["/other-page"] });
          const router = curi(history, routes);
          router.respond(({ response }) => {
            expect(response.status).toBe(404);
            done();
          });
        });

        it("is the value set by calling status in the matching route's response() function", done => {
          const routes = [
            {
              name: "A Route",
              path: "",
              response: ({ set }) => {
                set.status(451);
              }
            }
          ];
          const history = InMemory({ locations: ["/"] });
          const router = curi(history, routes);
          router.respond(({ response }) => {
            expect(response.status).toBe(451);
            done();
          });
        });

        it("is set by calling set.redirect() in the matching response()", () => {
          const routes = [
            {
              name: "New",
              path: "new"
            },
            {
              name: "302 Route",
              path: "old",
              response: ({ set }) => {
                set.redirect({ name: "New", status: 302 });
              }
            }
          ];
          const history = InMemory({ locations: ["/old"] });
          let firstCall = true;
          const logger = ({ response }) => {
            if (firstCall) {
              expect(response.status).toBe(302);
              firstCall = false;
            }
          };
          const router = curi(history, routes, {
            sideEffects: [{ fn: logger }]
          });
        });

        it("is set to 301 by default when calling set.redirect() in response()", () => {
          const routes = [
            {
              name: "New",
              path: "new"
            },
            {
              name: "301 Route",
              path: "old",
              response: ({ set }) => {
                set.redirect({ name: "New" });
              }
            }
          ];
          const history = InMemory({ locations: ["/old"] });
          let firstCall = true;
          const logger = {
            fn: ({ response }) => {
              if (firstCall) {
                expect(response.status).toBe(301);
                firstCall = false;
              }
            }
          };
          const router = curi(history, routes, {
            sideEffects: [logger]
          });
        });
      });

      describe("data", () => {
        it("is undefined by default", done => {
          const routes = [
            {
              name: "A Route",
              path: ""
            }
          ];
          const history = InMemory({ locations: ["/"] });
          const router = curi(history, routes);
          router.respond(({ response }) => {
            expect(response.data).toBeUndefined();
            done();
          });
        });

        it("is the value set by calling set.data() in response()", done => {
          const routes = [
            {
              name: "A Route",
              path: "",
              response: ({ set }) => {
                set.data({ test: "value" });
              }
            }
          ];
          const history = InMemory({ locations: ["/"] });
          const router = curi(history, routes);
          router.respond(({ response }) => {
            expect(response.data).toMatchObject({ test: "value" });
            done();
          });
        });
      });

      describe("title", () => {
        it("is an empty string when there is no matched route", done => {
          const routes = [
            {
              name: "State",
              path: ":state"
            }
          ];
          const history = InMemory({ locations: ["/"] });
          const router = curi(history, routes);

          router.respond(({ response }) => {
            expect(response.title).toBe("");
            done();
          });
        });

        it("is an empty string if the matched route does not have a title property", done => {
          const routes = [
            {
              name: "State",
              path: ":state"
            }
          ];
          const history = InMemory({ locations: ["/AZ"] });
          const router = curi(history, routes);

          router.respond(({ response }) => {
            expect(response.title).toBe("");
            done();
          });
        });

        it("is the value set by calling set.title() in response()", done => {
          const routes = [
            {
              name: "State",
              path: ":state",
              response: ({ set }) => {
                set.title("A State");
              }
            }
          ];
          const history = InMemory({ locations: ["/VA"] });
          const router = curi(history, routes);

          router.respond(({ response }) => {
            expect(response.title).toBe("A State");
            done();
          });
        });
      });

      describe("name", () => {
        it("is the name of the best matching route", done => {
          const Route = {
            name: "A Route",
            path: "a-route"
          };
          const history = InMemory({ locations: ["/a-route"] });
          const router = curi(history, [Route]);
          router.respond(({ response }) => {
            expect(response.name).toBe("A Route");
            done();
          });
        });

        it("is undefined if no routes match", done => {
          const Route = {
            name: "A Route",
            path: "a-route"
          };
          const history = InMemory({ locations: ["/"] });
          const router = curi(history, [Route]);
          router.respond(({ response }) => {
            expect(response.name).toBeUndefined();
            done();
          });
        });
      });

      describe("partials", () => {
        it("is set using the names of all partially matching routes", done => {
          const history = InMemory({ locations: ["/TX/Austin"] });
          const routes = [
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
          ];
          const router = curi(history, routes);
          router.respond(({ response }) => {
            expect(response.partials).toEqual(["State"]);
            done();
          });
        });
      });

      describe("params", () => {
        it("includes params from partially matched routes", done => {
          const history = InMemory({ locations: ["/MT/Bozeman"] });
          const routes = [
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
          ];
          const router = curi(history, routes);
          router.respond(({ response }) => {
            expect(response.params).toEqual({
              state: "MT",
              city: "Bozeman"
            });
            done();
          });
        });

        it("overwrites param name conflicts", done => {
          const history = InMemory({ locations: ["/1/2"] });
          const routes = [
            {
              name: "One",
              path: ":id",
              children: [{ name: "Two", path: ":id" }]
            }
          ];
          const router = curi(history, routes);
          router.respond(({ response }) => {
            expect(response.params["id"]).toBe("2");
            done();
          });
        });

        describe("parsing params", () => {
          it("uses route.params to parse params", done => {
            const history = InMemory({ locations: ["/123"] });
            const routes = [
              {
                name: "number",
                path: ":num",
                params: {
                  num: n => parseInt(n, 10)
                }
              }
            ];
            const router = curi(history, routes);
            router.respond(({ response }) => {
              expect(response.params).toEqual({ num: 123 });
              done();
            });
          });

          it("parses params from parent routes", done => {
            const history = InMemory({ locations: ["/123/456"] });
            const routes = [
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
            ];
            const router = curi(history, routes);
            router.respond(({ response }) => {
              expect(response.params).toEqual({
                first: 123,
                second: 456
              });
              done();
            });
          });

          it("uses string for any params not in route.params", done => {
            const history = InMemory({ locations: ["/123/456"] });
            const routes = [
              {
                name: "combo",
                path: ":first/:second",
                params: {
                  first: n => parseInt(n, 10)
                }
              }
            ];
            const router = curi(history, routes);
            router.respond(({ response }) => {
              expect(response.params).toEqual({
                first: 123,
                second: "456"
              });
              done();
            });
          });

          it("falls back to string value if param parser throws", done => {
            const originalError = console.error;
            const errorMock = jest.fn();
            console.error = errorMock;

            const history = InMemory({ locations: ["/123"] });
            const routes = [
              {
                name: "number",
                path: ":num",
                params: {
                  num: n => {
                    throw new Error("This will fail.");
                  }
                }
              }
            ];
            const router = curi(history, routes);
            router.respond(({ response }) => {
              expect(response.params).toEqual({
                num: "123"
              });
              expect(errorMock.mock.calls.length).toBe(1);
              expect(errorMock.mock.calls[0][0].message).toBe(
                "This will fail."
              );
              console.error = originalError;
              done();
            });
          });
        });
      });

      describe("error", () => {
        it("is undefined for good responses", done => {
          const routes = [{ name: "Contact", path: "contact" }];
          const history = InMemory({
            locations: ["/contact"]
          });
          const router = curi(history, routes);
          router.respond(({ response }) => {
            expect(response.error).toBeUndefined();
            done();
          });
        });

        it("is set by calling the set.error() method from a matched route's response() function", done => {
          const routes = [
            {
              name: "A Route",
              path: "",
              response: ({ set }) => {
                set.error("woops");
              }
            }
          ];
          const history = InMemory({ locations: ["/"] });
          const router = curi(history, routes);
          router.respond(({ response }) => {
            expect(response.error).toBe("woops");
            done();
          });
        });
      });

      describe("redirectTo", () => {
        it("is set by calling set.redirect() in a matching route's response()", () => {
          const routes = [
            {
              name: "A Route",
              path: "",
              response: ({ set }) => {
                set.redirect({
                  name: "B Route",
                  status: 301
                });
              }
            },
            {
              name: "B Route",
              path: "b"
            }
          ];
          const history = InMemory({ locations: ["/"] });
          let firstCall = true;
          const logger = {
            fn: ({ response }) => {
              if (firstCall) {
                expect(response.redirectTo).toMatchObject({ pathname: "/b" });
                firstCall = false;
              }
            }
          };
          const router = curi(history, routes, {
            sideEffects: [logger]
          });
        });
      });
    });
  });

  describe("the async functions", () => {
    describe("initial", () => {
      it("will only be called once", done => {
        /*
         * This test is a bit odd to read, but it verifies that the
         * async.initial function is only called once (while the
         * async.every function is called on every match).
         */
        let initialCount = 0;
        let everyCount = 0;
        const initial = () => Promise.resolve(initialCount++);
        const every = () => Promise.resolve(everyCount++);
        const history = InMemory({ locations: ["/test"] });
        const routes = [
          {
            name: "Test",
            path: ":test",
            async: { initial, every }
          }
        ];
        const router = curi(history, routes);
        let firstCall = true;
        router.respond(
          () => {
            if (firstCall) {
              firstCall = false;
              expect(initialCount).toBe(1);
              expect(everyCount).toBe(1);
              history.push("/another-one");
            } else {
              expect(initialCount).toBe(1);
              expect(everyCount).toBe(2);
              done();
            }
          },
          { observe: true }
        );
      });
    });

    describe("every", () => {
      it("receives the route props from the matching route", done => {
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
        });

        const CatchAll = {
          name: "Catch All",
          path: ":anything",
          async: { every: spy }
        };

        const history = InMemory({ locations: ["/hello?one=two"] });
        const router = curi(history, [CatchAll]);
      });
    });

    describe("response", () => {
      it("is not called if the navigation has been cancelled", done => {
        const responseSpy = jest.fn();
        let firstHasResolved = false;
        const everySpy = jest.fn(() => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              firstHasResolved = true;
              resolve();
            }, 15);
          });
        });

        const routes = [
          {
            name: "First",
            path: "first",
            response: responseSpy,
            async: {
              every: everySpy
            }
          },
          {
            name: "Second",
            path: "second",
            response: () => {
              expect(firstHasResolved).toBe(true);
              expect(everySpy.mock.calls.length).toBe(2);
              expect(responseSpy.mock.calls.length).toBe(0);
              done();
            },
            async: {
              // re-use the every spy so that this route's response
              // fn isn't call until after the first route's every
              // fn has resolved
              every: everySpy
            }
          }
        ];

        const history = InMemory({ locations: ["/first"] });
        const router = curi(history, routes);
        history.push("/second");
      });

      describe("async", () => {
        it("is null when route has no async.initial/every functions", () => {
          const CatchAll = {
            name: "Catch All",
            path: ":anything",
            response: ({ async }) => {
              expect(async).toBe(null);
            }
          };

          const history = InMemory({ locations: ["/hello?one=two"] });
          const router = curi(history, [CatchAll]);
        });

        it("is an object with error/initial/every properties when router is asynchronous", () => {
          const CatchAll = {
            name: "Catch All",
            path: ":anything",
            response: ({ async }) => {
              expect(async).toHaveProperty("error");
              expect(async).toHaveProperty("initial");
              expect(async).toHaveProperty("every");
            },
            async: {
              initial: () => Promise.resolve(1)
            }
          };

          const history = InMemory({ locations: ["/hello?one=two"] });
          const router = curi(history, [CatchAll]);
        });

        describe("error", () => {
          it("receives the error rejected by async.initial", done => {
            const spy = jest.fn(({ async }) => {
              expect(async.error).toBe("rejected by initial");
              done();
            });

            const CatchAll = {
              name: "Catch All",
              path: ":anything",
              response: spy,
              async: {
                initial: () => Promise.reject("rejected by initial")
              }
            };

            const history = InMemory({ locations: ["/hello?one=two"] });
            const router = curi(history, [CatchAll]);
          });

          it("receives the error rejected by async.every", done => {
            const spy = jest.fn(({ async }) => {
              expect(async.error).toBe("rejected by every");
              done();
            });

            const CatchAll = {
              name: "Catch All",
              path: ":anything",
              response: spy,
              async: {
                every: () => Promise.reject("rejected by every")
              }
            };

            const history = InMemory({ locations: ["/hello?one=two"] });
            const router = curi(history, [CatchAll]);
          });
        });

        describe("initial", () => {
          it("is the data resolved by async.initial", done => {
            const spy = jest.fn(({ async }) => {
              expect(async.initial).toMatchObject({ test: "ing" });
              done();
            });

            const CatchAll = {
              name: "Catch All",
              path: ":anything",
              response: spy,
              async: {
                initial: () => Promise.resolve({ test: "ing" })
              }
            };

            const history = InMemory({ locations: ["/hello?one=two"] });
            const router = curi(history, [CatchAll]);
          });

          it("re-use the Promise returned by initial on subsequent matches", done => {
            const history = InMemory({ locations: ["/test"] });
            let hasFinished = false;
            let random;
            const routes = [
              {
                name: "Test",
                path: ":test",
                response: ({ async }) => {
                  if (!hasFinished) {
                    hasFinished = true;
                    random = async.initial;
                  } else {
                    expect(async.initial).toBe(random);
                    done();
                  }
                },
                async: {
                  initial: () => {
                    return Promise.resolve(Math.random());
                  }
                }
              }
            ];
            const router = curi(history, routes);
            router.respond(() => {
              history.push("/another-one");
            });
          });

          it("async.initial is undefined if there is an every fn but no initial fn", done => {
            const spy = jest.fn(({ async }) => {
              expect(async.initial).toBeUndefined();
              done();
            });

            const CatchAll = {
              name: "Catch All",
              path: ":anything",
              response: spy,
              async: {
                every: () => Promise.resolve()
              }
            };

            const history = InMemory({ locations: ["/hello?one=two"] });
            const router = curi(history, [CatchAll]);
          });
        });

        describe("every", () => {
          it("is the data resolved by async.every", done => {
            const spy = jest.fn(({ async }) => {
              expect(async.every).toMatchObject({ test: "ing" });
              done();
            });

            const CatchAll = {
              name: "Catch All",
              path: ":anything",
              response: spy,
              async: {
                every: () => Promise.resolve({ test: "ing" })
              }
            };

            const history = InMemory({ locations: ["/hello?one=two"] });
            const router = curi(history, [CatchAll]);
          });

          it("async.every is undefined if there is an initial fn but no every fn", done => {
            const spy = jest.fn(opts => {
              expect(opts.async.every).toBeUndefined();
              done();
            });

            const CatchAll = {
              name: "Catch All",
              path: ":anything",
              response: spy,
              async: {
                initial: () => Promise.resolve()
              }
            };

            const history = InMemory({ locations: ["/hello?one=two"] });
            const router = curi(history, [CatchAll]);
          });
        });
      });

      describe("route", () => {
        it("receives the route props", done => {
          const spy = jest.fn(({ route }) => {
            expect(route).toMatchObject({
              params: { anything: "hello" },
              location: {
                pathname: "/hello",
                query: "one=two"
              }
            });
            done();
          });

          const CatchAll = {
            name: "Catch All",
            path: ":anything",
            response: spy
          };

          const history = InMemory({ locations: ["/hello?one=two"] });
          const router = curi(history, [CatchAll]);
        });
      });

      describe("set", () => {
        it("receives the response set functions", done => {
          const spy = jest.fn(({ set }) => {
            expect(set).toMatchObject(
              expect.objectContaining({
                body: expect.any(Function),
                data: expect.any(Function),
                status: expect.any(Function),
                redirect: expect.any(Function),
                error: expect.any(Function)
              })
            );
            done();
          });

          const CatchAll = {
            name: "Catch All",
            path: ":anything",
            response: spy
          };

          const history = InMemory({ locations: ["/hello?one=two"] });
          const router = curi(history, [CatchAll]);
        });
      });

      describe("addons", () => {
        it("receives the registered addons object", done => {
          const spy = jest.fn(({ addons }) => {
            expect(typeof addons.pathname).toBe("function");
            done();
          });

          const CatchAll = {
            name: "Catch All",
            path: ":anything",
            response: spy
          };

          const history = InMemory({ locations: ["/hello?one=two"] });
          const router = curi(history, [CatchAll]);
        });

        it("can use registered addons", () => {
          const routes = [
            {
              name: "Old",
              path: "old/:id",
              response: ({ route, set, addons }) => {
                set.redirect({ name: "New", params: route.params });
              }
            },
            {
              name: "New",
              path: "new/:id"
            }
          ];
          const history = InMemory({ locations: ["/old/1"] });
          let firstCall = true;
          let logger = {
            fn: ({ response }) => {
              if (firstCall) {
                expect(response.redirectTo).toMatchObject({
                  pathname: "/new/1"
                });
                firstCall = false;
              }
            }
          };
          const router = curi(history, routes, {
            sideEffects: [logger]
          });
        });
      });
    });
  });
});
