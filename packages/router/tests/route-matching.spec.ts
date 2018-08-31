import "jest";
import InMemory from "@hickory/in-memory";

// resolved by jest
import { curi } from "@curi/router";

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

    describe("no matching routes", () => {
      const realError = console.error;
      const fakeError = (console.error = jest.fn());

      afterAll(() => {
        console.error = realError;
      });

      it("no response is emitted", () => {
        const history = InMemory({ locations: ["/test"] });
        const routes = [];
        const router = curi(history, routes);

        const observer = jest.fn();
        router.respond(observer);
        expect(observer.mock.calls.length).toBe(0);
      });

      it("warns that no route matched", () => {
        const history = InMemory({ locations: ["/test"] });
        const routes = [];
        const router = curi(history, routes);
        const observer = jest.fn();

        router.respond(observer);
        expect(fakeError.mock.calls[0][0]).toBe(
          `The current location (/test) has no matching route, so a response could not be emitted. A catch-all route ({ path: "(.*)" }) can be used to match locations with no other matching route.`
        );
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

    describe("optional path parameters", () => {
      it("works when optional param is included", () => {
        const history = InMemory({ locations: ["/NY/about"] });
        const routes = [
          {
            name: "State",
            path: ":state?/about",
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
        });
      });

      it("works when optional param is NOT included", () => {
        const history = InMemory({ locations: ["/about"] });
        const routes = [
          {
            name: "State",
            path: ":state?/about",
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
        });
      });
    });
  });

  describe("response", () => {
    describe("properties", () => {
      describe("location", () => {
        it("is the location used to match routes", done => {
          const routes = [{ name: "Catch All", path: "(.*)" }];
          const history = InMemory({ locations: ["/other-page"] });
          const router = curi(history, routes);
          router.respond(({ response }) => {
            expect(response.location).toBe(history.location);
            done();
          });
        });
      });

      describe("body", () => {
        it("is undefined if not set by route.response()", done => {
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

        it("is the body value of the object returned by route.response()", done => {
          const history = InMemory({ locations: ["/test"] });
          const body = () => "anybody out there?";
          const routes = [
            {
              name: "Test",
              path: "test",
              response: () => {
                return {
                  body: body
                };
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
        it("is undefined if not set by route.response()", done => {
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
            expect(response.status).toBeUndefined();
            done();
          });
        });

        it("is the status value of object returned by route.response()", done => {
          const routes = [
            {
              name: "A Route",
              path: "",
              response: () => {
                return {
                  status: 451
                };
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
      });

      describe("data", () => {
        it("is undefined if not set by route.response()", done => {
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

        it("is the data value of the object returned by route.response()", done => {
          const routes = [
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
        it("is undefined if not set by route.response()", done => {
          const routes = [
            {
              name: "State",
              path: ":state"
            }
          ];
          const history = InMemory({ locations: ["/AZ"] });
          const router = curi(history, routes);

          router.respond(({ response }) => {
            expect(response.title).toBeUndefined();
            done();
          });
        });

        it("is the title value of the object returned by route.response()", done => {
          const routes = [
            {
              name: "State",
              path: ":state",
              response: () => {
                return {
                  title: "A State"
                };
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

        it("is the error value on the object returned by route.response()", done => {
          const routes = [
            {
              name: "A Route",
              path: "",
              response: () => {
                return {
                  error: "woops"
                };
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
        it("is the redirectTo value of the object returned by route.response()", () => {
          const routes = [
            {
              name: "A Route",
              path: "",
              response: () => {
                return {
                  redirectTo: {
                    name: "B Route"
                  }
                };
              }
            },
            {
              name: "B Route",
              path: "b"
            }
          ];
          const history = InMemory({ locations: ["/"] });
          let firstCall = true;
          const logger = ({ response }) => {
            if (firstCall) {
              expect(response.redirectTo).toMatchObject({ pathname: "/b" });
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

  describe("the match functions", () => {
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
        });

        const CatchAll = {
          name: "Catch All",
          path: ":anything",
          match: { spy }
        };

        const history = InMemory({ locations: ["/hello?one=two"] });
        curi(history, [CatchAll]);
      });

      it("calls all match functions", done => {
        const one = jest.fn();
        const two = jest.fn();
        const CatchAll = {
          name: "Catch All",
          path: ":anything",
          match: {
            one,
            two
          }
        };

        const history = InMemory({ locations: ["/hello?one=two"] });
        const router = curi(history, [CatchAll]);
        router.respond(() => {
          expect(one.mock.calls.length).toBe(1);
          expect(one.mock.calls.length).toBe(1);
          done();
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

        const routes = [
          {
            name: "First",
            path: "first",
            match: {
              spy
            },
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
            match: {
              // re-use the spy so that this route's response
              // fn isn't call until after the first route's spy
              // fn has resolved
              spy
            }
          }
        ];

        const history = InMemory({ locations: ["/first"] });
        const router = curi(history, routes);
        history.navigate("/second");
      });

      describe("resolved", () => {
        it("is null when route has no match functions", () => {
          const CatchAll = {
            name: "Catch All",
            path: ":anything",
            response: ({ resolved }) => {
              expect(resolved).toBe(null);
              return {};
            }
          };

          const history = InMemory({ locations: ["/hello?one=two"] });
          const router = curi(history, [CatchAll]);
        });

        it("is null when route a match function throws", () => {
          const CatchAll = {
            name: "Catch All",
            path: ":anything",
            match: {
              fails: () => Promise.reject("woops!")
            },
            response: ({ resolved }) => {
              expect(resolved).toBe(null);
              return {};
            }
          };

          const history = InMemory({ locations: ["/hello?one=two"] });
          const router = curi(history, [CatchAll]);
        });

        it("is an object named match function properties when router is asynchronous", () => {
          const CatchAll = {
            name: "Catch All",
            path: ":anything",
            response: ({ resolved }) => {
              expect(resolved.test).toBe(1);
              expect(resolved.yo).toBe("yo!");
              return {};
            },
            match: {
              test: () => Promise.resolve(1),
              yo: () => Promise.resolve("yo!")
            }
          };

          const history = InMemory({ locations: ["/hello?one=two"] });
          const router = curi(history, [CatchAll]);
        });
      });

      describe("error", () => {
        it("receives the error rejected by a match function", done => {
          const spy = jest.fn(({ error }) => {
            expect(error).toBe("rejected");
            done();
          });

          const CatchAll = {
            name: "Catch All",
            path: ":anything",
            response: spy,
            match: {
              fails: () => Promise.reject("rejected")
            }
          };

          const history = InMemory({ locations: ["/hello?one=two"] });
          const router = curi(history, [CatchAll]);
        });

        it("is null when all match functions succeed", done => {
          const spy = jest.fn(({ error }) => {
            expect(error).toBe(null);
            done();
          });

          const CatchAll = {
            name: "Catch All",
            path: ":anything",
            response: spy,
            match: {
              succeed: () => Promise.resolve("hurray!")
            }
          };

          const history = InMemory({ locations: ["/hello?one=two"] });
          const router = curi(history, [CatchAll]);
        });
      });

      describe("match", () => {
        it("receives the response properties based on the matched route", () => {
          const CatchAll = {
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
          };

          const history = InMemory({ locations: ["/hello?one=two"] });
          const router = curi(history, [CatchAll]);
        });
      });
    });
  });
});
