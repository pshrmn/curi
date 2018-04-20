import "jest";
import curi from "../src/curi";
import InMemory from "@hickory/in-memory";
import { Interaction, Response } from "../src/types";

describe("curi", () => {
  let history;

  beforeEach(() => {
    history = InMemory();
  });

  describe("constructor", () => {
    // these tests rely on the fact that the pathname generator
    // is a default interaction
    it("registers routes", () => {
      const routes = [
        { name: "Home", path: "" },
        { name: "About", path: "about" },
        { name: "Contact", path: "contact" }
      ];
      const router = curi(history, routes);

      const names = ["Home", "About", "Contact"];
      names.forEach(n => {
        expect(router.route.pathname(n)).toBeDefined();
      });
    });

    it("registers nested routes", () => {
      const routes = [
        { name: "Home", path: "" },
        { name: "About", path: "about" },
        {
          name: "Contact",
          path: "contact",
          children: [
            { name: "Email", path: "email" },
            { name: "Phone", path: "phone" }
          ]
        }
      ];
      const router = curi(history, routes);
      const names = ["Email", "Phone"];
      names.forEach(n => {
        expect(router.route.pathname(n)).toBeDefined();
      });
    });

    it("makes interactions available through router.route", () => {
      const routes = [{ name: "Home", path: "" }];
      const createfakeInteraction = () => ({
        name: "fake",
        register: () => {},
        reset: () => {},
        get: () => {}
      });
      const router = curi(history, routes, {
        route: [createfakeInteraction()]
      });
      expect(router.route.fake).toBeDefined();
    });

    describe("options", () => {
      describe("interactions", () => {
        it("includes pathname interaction by default", () => {
          const routes = [{ name: "Home", path: "" }];
          const router = curi(history, routes);
          expect(router.route.pathname).toBeDefined();
        });

        it("includes pathname interaction even when other interactions are provided", () => {
          const firstInteractionCache = {};
          const createfirstInteraction = () => {
            return {
              name: "first",
              register: (route, extra) => {
                firstInteractionCache[route.name] = route.path;
              },
              get(route) {},
              reset() {}
            };
          };

          const routes = [{ name: "Home", path: "" }];
          const router = curi(history, routes, {
            route: [createfirstInteraction()]
          });
          expect(router.route.pathname).toBeDefined();
        });

        it("registers all of the routes with all of the interactions", () => {
          // this might be a bit convoluted, but it ensures that the interactions
          // are registered as expected
          const firstInteractionCache = {};
          const secondInteractionCache = {};
          const createfirstInteraction = () => {
            return {
              name: "first",
              register: (route, extra) => {
                firstInteractionCache[route.name] = route.path;
              },
              get(route) {},
              reset() {}
            };
          };

          const createsecondInteraction = () => {
            return {
              name: "second",
              register: (route, extra) => {
                secondInteractionCache[route.name] = `${
                  extra ? extra : "None"
                } + ${route.name}`;
                return route.name;
              },
              get(route) {},
              reset() {}
            };
          };

          const routes = [
            {
              name: "Grandparent",
              path: "grandparent",
              children: [
                {
                  name: "Parent",
                  path: "parent",
                  children: [{ name: "Child", path: "child" }]
                }
              ]
            },
            {
              name: "Cousin",
              path: "cousin"
            }
          ];

          const router = curi(history, routes, {
            route: [createfirstInteraction(), createsecondInteraction()]
          });
          const expected = {
            Grandparent: {
              first: "grandparent",
              second: "None + Grandparent"
            },
            Parent: {
              first: "parent",
              second: "Grandparent + Parent"
            },
            Child: {
              first: "child",
              second: "Parent + Child"
            },
            Cousin: {
              first: "cousin",
              second: "None + Cousin"
            }
          };
          const keys = ["Grandparent", "Parent", "Child", "Cousin"];
          keys.forEach(key => {
            expect(firstInteractionCache[key]).toBe(expected[key].first);
            expect(secondInteractionCache[key]).toBe(expected[key].second);
          });
        });
      });

      describe("sideEffects", () => {
        it("calls side effect methods AFTER a response is generated, passing them response and navigation", done => {
          const routes = [{ name: "All", path: ":all+" }];
          const sideEffect = jest.fn();

          const router = curi(history, routes, {
            sideEffects: [{ fn: sideEffect }]
          });
          router.respond(({ response, navigation }) => {
            expect(sideEffect.mock.calls.length).toBe(1);
            expect(sideEffect.mock.calls[0][0].response).toBe(response);
            expect(sideEffect.mock.calls[0][0].navigation).toBe(navigation);
            done();
          });
        });

        it('calls side effects WITHOUT "after: true" property before response handlers', done => {
          const routes = [{ name: "All", path: ":all+" }];

          const sideEffect1 = jest.fn();
          const sideEffect2 = jest.fn();

          const router = curi(history, routes, {
            sideEffects: [
              { fn: sideEffect1, after: false },
              { fn: sideEffect2 }
            ]
          });

          expect.assertions(2);
          router.respond(({ response }) => {
            expect(sideEffect1.mock.calls.length).toBe(1);
            expect(sideEffect2.mock.calls.length).toBe(1);
            done();
          });
        });

        it('calls side effects WITH "after: true" property AFTER response handlers', done => {
          const routes = [
            {
              name: "All",
              path: ":all+",
              on: {
                initial: () => Promise.resolve() // force async
              }
            }
          ];
          const responseHandler = jest.fn();
          const sideEffect = function() {
            expect(responseHandler.mock.calls.length).toBe(1);
            done();
          };

          const router = curi(history, routes, {
            sideEffects: [{ fn: sideEffect, after: true }]
          });
          router.respond(responseHandler);
        });

        it("passes response, navigation, and router object to side effect", done => {
          const routes = [{ name: "All", path: ":all*" }];
          const responseHandler = jest.fn();
          const sideEffect = function({ response, navigation, router }) {
            expect(response).toMatchObject({
              name: "All",
              location: { pathname: "/" }
            });
            expect(navigation).toMatchObject({
              action: "PUSH"
            });
            expect(router).toBe(router);
            done();
          };

          const router = curi(history, routes, {
            sideEffects: [{ fn: sideEffect, after: true }]
          });
          router.respond(responseHandler);
        });
      });

      describe("cache", () => {
        it("returns cached response for same key on subsequent calls if cache is provided", done => {
          const routes = [
            {
              name: "All",
              path: "(.*)",
              response: ({ set }) => {
                set.data(Math.random());
              }
            }
          ];
          const createSimpleCache = () => {
            const cache = {};

            return {
              get: ({ key }) => cache[key],
              set: response => {
                const { key } = response.location;
                cache[key] = response;
              }
            };
          };

          const router = curi(history, routes, {
            cache: createSimpleCache()
          });

          let calls = 0;
          let randomValue;
          const steps = [
            r => {
              randomValue = r.data;
              history.push("/new-location");
            },
            r => {
              expect(r.data).not.toEqual(randomValue);
              history.go(-1);
            },
            r => {
              expect(r.data).toEqual(randomValue);
              done();
            }
          ];

          function responseHandler({ response }) {
            let fn = steps[calls++];
            if (fn) {
              fn(response);
            }
          }
          router.respond(responseHandler, { observe: true });
        });

        it("generates new response for same key on subsequent calls if cache is not provided", done => {
          const routes = [
            {
              name: "All",
              path: "(.*)",
              response: ({ set }) => {
                set.data(Math.random());
              }
            }
          ];
          const router = curi(history, routes);

          let calls = 0;
          let randomValue;
          const steps = [
            r => {
              randomValue = r.data;
              history.push("/new-location");
            },
            r => {
              expect(r.data).not.toEqual(randomValue);
              history.go(-1);
            },
            r => {
              expect(r.data).not.toEqual(randomValue);
              done();
            }
          ];

          function responseHandler({ response }) {
            steps[calls++](response);
          }

          router.respond(responseHandler, { observe: true });
        });
      });

      describe("emitRedirects", () => {
        it("emits redirects by default", () => {
          const routes = [
            {
              name: "Start",
              path: "",
              response: ({ set }) => {
                set.redirect({ name: "Other" });
              }
            },
            {
              name: "Other",
              path: "other"
            }
          ];
          let firstCall = true;
          const logger = ({ response }) => {
            if (firstCall) {
              expect(response.name).toBe("Start");
              firstCall = false;
            }
          };
          const router = curi(history, routes, {
            sideEffects: [{ fn: logger }]
          });
        });

        it("does not emit redirects when emitRedirects = false", done => {
          const routes = [
            {
              name: "Start",
              path: "",
              response: ({ set }) => {
                set.redirect({ name: "Other" });
              }
            },
            {
              name: "Other",
              path: "other"
            }
          ];

          const router = curi(history, routes, {
            emitRedirects: false
          });
          router.respond(({ response }) => {
            expect(response.name).toBe("Other");
            done();
          });
        });
      });
    });

    describe("sync/async matching", () => {
      it("does synchronous matching by default", () => {
        const routes = [{ name: "Home", path: "" }];
        const router = curi(history, routes);
        const after = jest.fn();
        router.respond(r => {
          expect(after.mock.calls.length).toBe(0);
        });
        after();
      });

      it("does asynchronous matching when a route has on.initial", () => {
        const routes = [
          {
            name: "Home",
            path: "",
            on: {
              initial: () => Promise.resolve()
            }
          }
        ];
        const router = curi(history, routes);
        const after = jest.fn();
        router.respond(r => {
          expect(after.mock.calls.length).toBe(1);
        });
        after();
      });

      it("does asynchronous matching when a route has on.every", () => {
        const routes = [
          {
            name: "Home",
            path: "",
            on: {
              every: () => Promise.resolve()
            }
          }
        ];
        const router = curi(history, routes);
        const after = jest.fn();
        router.respond(r => {
          expect(after.mock.calls.length).toBe(1);
        });
        after();
      });

      it("does asynchronous matching when a nested route has on.initial/every", () => {
        const routes = [
          {
            name: "Parent",
            path: "",
            children: [
              {
                name: "Child",
                path: "child",
                on: {
                  initial: () => Promise.resolve()
                }
              }
            ]
          }
        ];
        const router = curi(history, routes);
        const after = jest.fn();
        router.respond(r => {
          expect(after.mock.calls.length).toBe(1);
        });
        after();
      });
    });
  });

  describe("current", () => {
    describe("sync", () => {
      it("initial value is an object with resolved response and navigation properties", () => {
        const router = curi(history, [{ name: "Catch All", path: "(.*)" }]);
        expect(router.current()).toMatchObject({
          response: { name: "Catch All" },
          navigation: { action: "PUSH" }
        });
      });
    });

    describe("on", () => {
      it("initial value is an object with null response and navigation properties", () => {
        const router = curi(history, [
          {
            name: "Catch All",
            path: "(.*)",
            on: {
              initial: () => Promise.resolve()
            }
          }
        ]);
        expect(router.current()).toMatchObject({
          response: null,
          navigation: null
        });
      });
    });

    it("response and navigation are the last resolved response and navigation", () => {
      const router = curi(history, [{ name: "Home", path: "" }]);
      router.respond(({ response, navigation }) => {
        expect(router.current()).toMatchObject({
          response,
          navigation
        });
      });
    });

    it("updates properties when a new response is resolved", done => {
      const router = curi(history, [
        { name: "Home", path: "" },
        { name: "About", path: "about" }
      ]);
      let calls = 0;
      router.respond(
        ({ response, navigation }) => {
          calls++;
          expect(router.current()).toMatchObject({
            response,
            navigation
          });
          if (calls === 2) {
            done();
          } else {
            router.history.push("/about");
          }
        },
        { observe: true }
      );
    });
  });

  describe("replaceRoutes", () => {
    const err = console.error;

    beforeEach(() => {
      console.error = jest.fn();
    });

    afterEach(() => {
      console.error = err;
    });

    it("resets and replaces registered routes", () => {
      const englishRoutes = [
        { name: "Home", path: "" },
        { name: "About", path: "about" },
        { name: "Contact", path: "contact" }
      ];
      const spanishRoutes = [
        { name: "Casa", path: "" },
        { name: "Acerca De", path: "acerca-de" },
        { name: "Contacto", path: "contacto" }
      ];

      const router = curi(history, englishRoutes);

      router.replaceRoutes(spanishRoutes);

      const englishNames = ["Home", "About", "Contact"];
      englishNames.forEach(n => {
        expect(router.route.pathname(n)).toBeUndefined();
      });

      const spanishNames = ["Casa", "Acerca De", "Contacto"];
      spanishNames.forEach(n => {
        expect(router.route.pathname(n)).toBeDefined();
      });
    });
  });

  describe("respond", () => {
    let history;
    beforeEach(() => {
      history = InMemory({ locations: ["/"] });
    });

    it("returns a function to unsubscribe when called", () => {
      const router = curi(history, [{ name: "Home", path: "" }]);

      const sub1 = jest.fn();
      const sub2 = jest.fn();

      // wait for the first response to be generated to ensure that both
      // response handler functions are called when subscribing
      const unsub1 = router.respond(sub1, { observe: true, initial: false });
      const unsub2 = router.respond(sub2, { observe: true, initial: false });

      expect(sub1.mock.calls.length).toBe(0);
      expect(sub2.mock.calls.length).toBe(0);
      unsub1();
      history.push({ pathname: "/next" });

      expect(sub1.mock.calls.length).toBe(0);
      expect(sub2.mock.calls.length).toBe(1);
    });

    it("passes response, navigation, and router object to response handler", done => {
      const routes = [{ name: "All", path: ":all*" }];
      const responseHandler = function({ response, navigation, router }) {
        expect(response).toMatchObject({
          name: "All",
          location: { pathname: "/" }
        });
        expect(navigation).toMatchObject({
          action: "PUSH"
        });
        expect(router).toBe(router);
        done();
      };

      const router = curi(history, routes);
      router.respond(responseHandler);
    });

    it("notifies response handlers of new response and navigation when location changes", () => {
      const How = { name: "How", path: ":method" };
      const routes = [
        { name: "Home", path: "" },
        { name: "About", path: "about" },
        { name: "Contact", path: "contact", children: [How] }
      ];

      const check = ({ response, navigation }) => {
        expect(response).toMatchObject({
          name: "How",
          partials: ["Contact"],
          params: {
            method: "mail"
          }
        });
        expect(navigation).toMatchObject({
          action: "PUSH"
        });
      };

      const router = curi(history, routes);
      history.push("/contact/mail");
      router.respond(check);
    });

    it("[async] notifies response handlers AFTER promises have resolved", done => {
      let promiseResolved = false;
      const routes = [
        { name: "Home", path: "" },
        { name: "About", path: "about" },
        {
          name: "Contact",
          path: "contact",
          children: [
            {
              name: "How",
              path: ":method",
              on: {
                every: () => {
                  promiseResolved = true;
                  return Promise.resolve(promiseResolved);
                }
              }
            }
          ]
        }
      ];

      const check = response => {
        expect(promiseResolved).toBe(true);
        done();
      };

      const router = curi(history, routes);
      router.respond(check);
      history.push("/contact/phone");
    });

    it("[async] does not emit responses for cancelled navigation", done => {
      const routes = [
        { name: "Home", path: "" },
        { name: "About", path: "about" },
        {
          name: "Contact",
          path: "contact",
          children: [
            {
              name: "How",
              path: ":method",
              on: {
                initial: () => Promise.resolve()
              }
            }
          ]
        }
      ];
      const check = ({ response }) => {
        expect(response.params.method).toBe("mail");
        done();
      };

      const router = curi(history, routes);
      router.respond(check);
      history.push("/contact/phone");
      history.push("/contact/mail");
    });

    describe("response handler options", () => {
      describe("{ initial: true } (default)", () => {
        it("immediately called with most recent response/navigation", () => {
          const routes = [{ name: "Home", path: "" }];
          const sub = jest.fn();
          const router = curi(history, routes);
          const { response, navigation } = router.current();
          router.respond(sub, { initial: true });
          expect(sub.mock.calls.length).toBe(1);
          const {
            response: mockResponse,
            navigation: mockNavigation
          } = sub.mock.calls[0][0];
          expect(mockResponse).toBe(response);
          expect(mockNavigation).toBe(navigation);
        });

        it("[async] immediately called if initial response has resolved", done => {
          const routes = [
            {
              name: "Home",
              path: "",
              on: { initial: () => Promise.resolve() }
            }
          ];
          const sub = jest.fn();
          const router = curi(history, routes);
          router.respond(() => {
            router.respond(sub, { initial: true });
            expect(sub.mock.calls.length).toBe(1);
            done();
          });
        });

        it("[async] not immediately called if initial response hasn't resolved", () => {
          const routes = [
            {
              name: "Home",
              path: "",
              on: { initial: () => Promise.resolve() }
            }
          ];
          const sub = jest.fn();
          const router = curi(history, routes);
          router.respond(sub, { initial: true });
          expect(sub.mock.calls.length).toBe(0);
        });
      });

      describe("{ observe: false } (default)", () => {
        it("is called once", () => {
          const routes = [{ name: "Home", path: "" }];
          const oneTime = jest.fn();
          const responseHandler = jest.fn(() => {
            expect(oneTime.mock.calls.length).toBe(1);
            expect(responseHandler.mock.calls.length).toBe(1);
          });
          const router = curi(history, routes);
          router.respond(oneTime);
          router.respond(responseHandler, { observe: true });
        });

        it("isn't re-called for new responses", done => {
          const routes = [{ name: "Home", path: "" }];
          const oneTime = jest.fn();
          let called = false;
          const responseHandler = jest.fn(() => {
            if (called) {
              expect(oneTime.mock.calls.length).toBe(1);
              expect(responseHandler.mock.calls.length).toBe(2);
              done();
            } else {
              called = true;
              // trigger another navigation to verify that the once sub
              // is not called again
              router.history.push("/another-one");
            }
          });
          const router = curi(history, routes);
          router.respond(oneTime);
          router.respond(responseHandler, { observe: true });
        });

        it("[async] no initial response, called AFTER regular response handlers", done => {
          const routes = [
            {
              name: "Home",
              path: "",
              on: { initial: () => Promise.resolve() }
            },
            { name: "Catch All", path: "(.*)" }
          ];
          const oneTime = jest.fn(() => {
            expect(responseHandler.mock.calls.length).toBe(1);
            done();
          });
          let called = false;
          const responseHandler = jest.fn();
          const router = curi(history, routes);
          router.respond(oneTime);
          router.respond(responseHandler, { observe: true });
        });
      });

      describe("{ observe: true }", () => {
        it("has response, immediate call", done => {
          const routes = [{ name: "Home", path: "" }];
          const sub = jest.fn();
          const router = curi(history, routes);
          router.respond(() => {
            router.respond(sub, { observe: true });
            expect(sub.mock.calls.length).toBe(1);
            done();
          });
        });

        it("is re-called for new responses", done => {
          const routes = [{ name: "Home", path: "" }];
          const everyTime = jest.fn();
          let called = false;
          const responseHandler = jest.fn(() => {
            if (called) {
              expect(everyTime.mock.calls.length).toBe(2);
              expect(responseHandler.mock.calls.length).toBe(2);
              done();
            } else {
              called = true;
              // trigger another navigation to verify that the observer
              // is called again
              router.history.push("/another-one");
            }
          });
          const router = curi(history, routes);
          router.respond(everyTime, { observe: true });
          router.respond(responseHandler, { observe: true });
        });

        it("[async] no initial response, is called before one time response handlers", done => {
          const routes = [
            {
              name: "Home",
              path: "",
              on: { initial: () => Promise.resolve() }
            },
            { name: "Catch All", path: "(.*)" }
          ];
          const oneTime = jest.fn();
          let called = false;
          const responseHandler = jest.fn(() => {
            expect(oneTime.mock.calls.length).toBe(0);
            done();
          });
          const router = curi(history, routes);
          router.respond(oneTime);
          router.respond(responseHandler, { observe: true });
        });
      });

      describe("{ initial: false }", () => {
        it("has response, is not immediately called", done => {
          const routes = [{ name: "Home", path: "" }];
          const oneTime = jest.fn();
          const router = curi(history, routes);
          router.respond(() => {
            router.respond(oneTime, { initial: false });
            expect(oneTime.mock.calls.length).toBe(0);
            done();
          });
        });
      });

      describe("{ observe: false, initial: false }", () => {
        it("has response, is not immediately called", done => {
          const routes = [{ name: "Home", path: "" }];
          const oneTime = jest.fn();
          const router = curi(history, routes);
          router.respond(() => {
            router.respond(oneTime, { initial: false, observe: false });
            expect(oneTime.mock.calls.length).toBe(0);
            done();
          });
        });

        it("is called AFTER next navigation", done => {
          const routes = [
            { name: "Home", path: "" },
            { name: "Catch All", path: "(.*)" }
          ];
          const oneTime = jest.fn(({ response }) => {
            expect(response.name).toBe("Catch All");
            done();
          });
          const router = curi(history, routes);
          router.respond(() => {
            router.respond(oneTime, { initial: false, observe: false });
            expect(oneTime.mock.calls.length).toBe(0);
            history.push("/somewhere-else");
          });
        });
      });
    });
  });

  describe("response.redirectTo", () => {
    it("triggers a history.replace call AFTER emitting initial response", done => {
      let callPosition = 0;
      const routes = [
        {
          name: "A Route",
          path: "",
          response: ({ set }) => {
            set.redirect({ name: "B Route", status: 301 });
          }
        },
        {
          name: "B Route",
          path: "somewhere-else"
        }
      ];
      let hasEmitted = false;

      history.replace = jest.fn(() => {
        expect(hasEmitted).toBe(true);
        done();
      });
      let emissionDetector = {
        fn: () => {
          hasEmitted = true;
        }
      };
      const router = curi(history, routes, {
        sideEffects: [emissionDetector]
      });
    });
  });
});
