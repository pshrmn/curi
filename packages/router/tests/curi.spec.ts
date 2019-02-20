import "jest";
import { InMemory } from "@hickory/in-memory";

import { NavType } from "@hickory/root";

// @ts-ignore (resolved by jest)
import { curi, prepareRoutes } from "@curi/router";

describe("curi", () => {
  let history;

  beforeEach(() => {
    history = InMemory();
  });

  describe("constructor", () => {
    // these tests rely on the fact that the pathname generator
    // is a default interaction
    it("registers routes", () => {
      const routes = prepareRoutes([
        { name: "Home", path: "" },
        { name: "About", path: "about" },
        { name: "Contact", path: "contact" }
      ]);
      const router = curi(history, routes);

      const names = ["Home", "About", "Contact"];
      names.forEach(n => {
        expect(router.route.pathname(n)).toBeDefined();
      });
    });

    it("registers nested routes", () => {
      const routes = prepareRoutes([
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
      ]);
      const router = curi(history, routes);
      const names = ["Email", "Phone"];
      names.forEach(n => {
        expect(router.route.pathname(n)).toBeDefined();
      });
    });

    it("makes interactions available through router.route", () => {
      const routes = prepareRoutes([{ name: "Home", path: "" }]);
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
          const routes = prepareRoutes([{ name: "Home", path: "" }]);
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

          const routes = prepareRoutes([{ name: "Home", path: "" }]);
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

          const routes = prepareRoutes([
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
          ]);
          const history = InMemory({ locations: ["/grandparent"] });
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
        it("calls side effect methods AFTER a response is generated, passing response, navigation, and router", done => {
          const routes = prepareRoutes([{ name: "All", path: "(.*)" }]);
          const sideEffect = jest.fn();

          const router = curi(history, routes, {
            sideEffects: [sideEffect]
          });
          router.once(({ response, navigation }) => {
            expect(sideEffect.mock.calls.length).toBe(1);
            expect(sideEffect.mock.calls[0][0].response).toBe(response);
            expect(sideEffect.mock.calls[0][0].navigation).toBe(navigation);
            expect(sideEffect.mock.calls[0][0].router).toBe(router);
            done();
          });
        });

        it("passes response, navigation, and router object to side effect", done => {
          const routes = prepareRoutes([{ name: "All", path: "(.*)" }]);
          const sideEffect = function({ response, navigation, router }) {
            expect(response).toMatchObject({
              name: "All",
              location: { pathname: "/" }
            });
            expect(navigation).toMatchObject({
              action: "push"
            });
            expect(router).toBe(router);
            done();
          };

          const router = curi(history, routes, {
            sideEffects: [sideEffect]
          });
        });
      });

      describe("emitRedirects", () => {
        it("emits redirects by default", () => {
          const routes = prepareRoutes([
            {
              name: "Start",
              path: "",
              response: () => {
                return {
                  redirectTo: {
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
          let firstCall = true;
          const logger = ({ response }) => {
            if (firstCall) {
              expect(response.name).toBe("Start");
              firstCall = false;
            }
          };
          const router = curi(history, routes, {
            sideEffects: [logger]
          });
        });

        it("does not emit redirects when emitRedirects = false", done => {
          const routes = prepareRoutes([
            {
              name: "Start",
              path: "",
              response: () => {
                return {
                  redirectTo: {
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

          const router = curi(history, routes, {
            emitRedirects: false
          });
          // the first emitted response is the location that was redirected to
          router.once(({ response }) => {
            expect(response.name).toBe("Other");
            done();
          });
        });
      });

      describe("automaticRedirects", () => {
        it("automatically redirects by default", () => {
          const routes = prepareRoutes([
            {
              name: "Start",
              path: "",
              response: () => {
                return {
                  redirectTo: {
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
          const router = curi(history, routes);
          // because the routes are not asynchronous, an automatic redirect
          // will be triggered before once is called, so its response
          // will be for the redirected location
          router.once(({ response, navigation }) => {
            expect(response).toMatchObject({
              name: "Other"
            });
            expect(navigation).toMatchObject({
              action: "replace",
              previous: {
                name: "Start"
              }
            });
          });
        });

        it("does not automatically redirect when automaticRedirects = false", () => {
          const routes = prepareRoutes([
            {
              name: "Start",
              path: "",
              response: () => {
                return {
                  redirectTo: {
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
          const router = curi(history, routes, {
            automaticRedirects: false
          });
          router.once(({ response, navigation }) => {
            expect(response).toMatchObject({
              name: "Start"
            });
            expect(navigation).toMatchObject({
              action: "push",
              previous: null
            });
          });
        });
      });

      describe("external", () => {
        it("gets passed to resolve functions", done => {
          const history = InMemory();
          const external = "hey!";
          const routes = prepareRoutes([
            {
              name: "Start",
              path: "",
              resolve(match, e) {
                expect(e).toBe(external);
                done();
                return Promise.resolve(true);
              }
            },
            {
              name: "Other",
              path: "other"
            },
            {
              name: "Not Found",
              path: "(.*)"
            }
          ]);
          const router = curi(history, routes, { external });
        });

        it("gets passed to response function", () => {
          const history = InMemory();
          const external = "hey!";
          const routes = prepareRoutes([
            {
              name: "Start",
              path: "",
              response({ external: e }) {
                expect(e).toBe(external);
                return {};
              }
            },
            {
              name: "Not Found",
              path: "(.*)"
            }
          ]);
          const router = curi(history, routes, { external });
        });

        it("is available from the router", () => {
          const history = InMemory();
          const external = "hey!";
          const routes = prepareRoutes([
            {
              name: "Not Found",
              path: "(.*)"
            }
          ]);
          const router = curi(history, routes, { external });
          expect(router.external).toBe(external);
        });
      });
    });

    describe("sync/async matching", () => {
      it("does synchronous matching by default", () => {
        const routes = prepareRoutes([{ name: "Home", path: "" }]);
        const router = curi(history, routes);
        const after = jest.fn();
        router.once(r => {
          expect(after.mock.calls.length).toBe(0);
        });
        after();
      });

      it("does asynchronous matching when route.resolve isn't empty", () => {
        const routes = prepareRoutes([
          {
            name: "Home",
            path: "",
            resolve() {
              return Promise.resolve();
            }
          }
        ]);
        const router = curi(history, routes);
        const after = jest.fn();
        router.once(r => {
          expect(after.mock.calls.length).toBe(1);
        });
        after();
      });

      it("still does synchronous matching when a different route is async", done => {
        const routes = prepareRoutes([
          {
            name: "Parent",
            path: "parent",
            children: [
              {
                name: "Child",
                path: "child",
                resolve() {
                  return Promise.resolve();
                }
              }
            ]
          }
        ]);
        const history = InMemory({ locations: ["/parent/child"] });
        const router = curi(history, routes);
        const after = jest.fn();
        let navigated = false;
        router.observe(r => {
          if (!navigated) {
            navigated = true;
            history.navigate({ pathname: "/parent" });
            after();
            return;
          }
          expect(after.mock.calls.length).toBe(0);
          done();
        });
      });
    });
  });

  describe("current", () => {
    describe("sync", () => {
      it("initial value is an object with resolved response and navigation properties", () => {
        const routes = prepareRoutes([{ name: "Catch All", path: "(.*)" }]);
        const router = curi(history, routes);
        expect(router.current()).toMatchObject({
          response: { name: "Catch All" },
          navigation: { action: "push" }
        });
      });
    });

    describe("async", () => {
      it("initial value is an object with null response and navigation properties", () => {
        const routes = prepareRoutes([
          {
            name: "Catch All",
            path: "(.*)",
            resolve() {
              return Promise.resolve();
            }
          }
        ]);
        const router = curi(history, routes);
        expect(router.current()).toMatchObject({
          response: null,
          navigation: null
        });
      });
    });

    it("response and navigation are the last resolved response and navigation", () => {
      const routes = prepareRoutes([{ name: "Home", path: "" }]);
      const router = curi(history, routes);
      router.once(({ response, navigation }) => {
        expect(router.current()).toMatchObject({
          response,
          navigation
        });
      });
    });

    it("updates properties when a new response is resolved", done => {
      const routes = prepareRoutes([
        { name: "Home", path: "" },
        { name: "About", path: "about" }
      ]);
      const router = curi(history, routes);
      let calls = 0;
      router.observe(({ response, navigation }) => {
        calls++;
        expect(router.current()).toMatchObject({
          response,
          navigation
        });
        if (calls === 2) {
          done();
        } else {
          router.navigate({ name: "About" });
        }
      });
    });
  });

  describe("refresh", () => {
    const err = console.error;

    beforeEach(() => {
      console.error = jest.fn();
    });

    afterEach(() => {
      console.error = err;
    });

    it("resets and replaces registered routes", () => {
      const englishRoutes = prepareRoutes([
        { name: "Home", path: "" },
        { name: "About", path: "about" },
        { name: "Contact", path: "contact" }
      ]);
      const spanishRoutes = prepareRoutes([
        { name: "Casa", path: "" },
        { name: "Acerca De", path: "acerca-de" },
        { name: "Contacto", path: "contacto" }
      ]);

      const router = curi(history, englishRoutes);

      router.refresh(spanishRoutes);

      const englishNames = ["Home", "About", "Contact"];
      englishNames.forEach(n => {
        expect(router.route.pathname(n)).toBeUndefined();
      });

      const spanishNames = ["Casa", "Acerca De", "Contacto"];
      spanishNames.forEach(n => {
        expect(router.route.pathname(n)).toBeDefined();
      });
    });

    it("emits a new response handler for new routes", () => {
      const history = InMemory({
        locations: ["/admin"]
      });
      const nonAuthRoutes = prepareRoutes([
        { name: "Home", path: "" },
        { name: "Not Found", path: "(.*)" }
      ]);
      const authRoutes = prepareRoutes([
        { name: "Home", path: "" },
        { name: "Admin", path: "admin" },
        { name: "Not Found", path: "(.*)" }
      ]);

      const router = curi(history, nonAuthRoutes);

      const { response: initialResponse } = router.current();
      expect(initialResponse.name).toBe("Not Found");

      router.refresh(authRoutes);

      const { response: replacedResponse, navigation } = router.current();
      expect(replacedResponse.name).toBe("Admin");
    });

    it("emits a response when called with no argument", done => {
      const englishRoutes = prepareRoutes([
        { name: "Home", path: "" },
        { name: "About", path: "about" },
        { name: "Contact", path: "contact" }
      ]);
      const history = InMemory({ locations: ["/about"] });
      const router = curi(history, englishRoutes);

      const { response: initialResponse } = router.current();

      expect(initialResponse.name).toBe("About");

      // setup a response handler, but ensure it doesn't get called
      // with existing response.
      router.once(
        ({ response, navigation }) => {
          expect(response.name).toBe("About");
          done();
        },
        { initial: false }
      );
      // then refresh the router. the response handler should be called
      // with a response for the current location.
      router.refresh();
    });

    it("re-uses previously emitted navigation.previous", done => {
      const englishRoutes = prepareRoutes([
        { name: "Home", path: "" },
        { name: "About", path: "about" },
        { name: "Contact", path: "contact" }
      ]);
      const history = InMemory({ locations: ["/about"] });
      const router = curi(history, englishRoutes);

      const { navigation: initialNavigation } = router.current();

      // setup a response handler, but ensure it doesn't get called
      // with existing response.
      router.once(
        ({ response, navigation }) => {
          expect(navigation).toMatchObject(initialNavigation);
          done();
        },
        { initial: false }
      );
      // then refresh the router. the response handler should be called
      // with a response for the current location.
      router.refresh();
    });
  });

  describe("observe(fn)", () => {
    let history;
    beforeEach(() => {
      history = InMemory({ locations: ["/"] });
    });

    it("returns a function to unsubscribe when called", () => {
      const routes = prepareRoutes([
        { name: "Home", path: "" },
        { name: "Not Found", path: "(.*)" }
      ]);
      const router = curi(history, routes);

      const sub1 = jest.fn();
      const sub2 = jest.fn();

      // wait for the first response to be generated to ensure that both
      // response handler functions are called when subscribing
      const unsub1 = router.observe(sub1, { initial: false });
      const unsub2 = router.observe(sub2, { initial: false });

      expect(sub1.mock.calls.length).toBe(0);
      expect(sub2.mock.calls.length).toBe(0);
      unsub1();
      history.navigate({ pathname: "/next" });

      expect(sub1.mock.calls.length).toBe(0);
      expect(sub2.mock.calls.length).toBe(1);
    });

    describe("response handler", () => {
      it("is passed object with response, navigation, and router", done => {
        const routes = prepareRoutes([{ name: "All", path: "(.*)" }]);
        const responseHandler = function({ response, navigation, router }) {
          expect(response).toMatchObject({
            name: "All",
            location: { pathname: "/" }
          });
          expect(navigation).toMatchObject({
            action: "push"
          });
          expect(router).toBe(router);
          done();
        };

        const router = curi(history, routes);
        router.observe(responseHandler);
      });

      it("is called when response is emitted", () => {
        const How = { name: "How", path: ":method" };
        const routes = prepareRoutes([
          { name: "Home", path: "" },
          { name: "About", path: "about" },
          { name: "Contact", path: "contact", children: [How] }
        ]);

        const check = ({ response, navigation }) => {
          expect(response).toMatchObject({
            name: "How",
            partials: ["Contact"],
            params: {
              method: "mail"
            }
          });
          expect(navigation).toMatchObject({
            action: "push"
          });
        };

        const router = curi(history, routes);
        // register before navigation, but don't call with existing response
        router.observe(check, { initial: false });
        history.navigate("/contact/mail");
      });

      it("is re-called for new responses", done => {
        const routes = prepareRoutes([
          { name: "Home", path: "" },
          { name: "Contact", path: "contact" },
          { name: "Not Found", path: "(.*)" }
        ]);
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
            router.navigate({ name: "Contact" });
          }
        });
        const router = curi(history, routes);
        router.observe(everyTime);
        router.observe(responseHandler);
      });

      it("is called BEFORE once() response handlers", done => {
        // need to use an async route so that handlers are registered before
        // the initial response is ready
        const routes = prepareRoutes([
          {
            name: "Home",
            path: "",
            resolve() {
              return Promise.resolve();
            }
          },
          { name: "Catch All", path: "(.*)" }
        ]);
        const oneTime = jest.fn();
        let called = false;
        const responseHandler = jest.fn(() => {
          expect(oneTime.mock.calls.length).toBe(0);
          done();
        });
        const router = curi(history, routes);
        router.once(oneTime);
        router.observe(responseHandler);
      });

      describe("matched route is async", () => {
        it("is called AFTER promises have resolved", done => {
          let promiseResolved = false;
          const routes = prepareRoutes([
            { name: "Home", path: "" },
            { name: "About", path: "about" },
            {
              name: "Contact",
              path: "contact",
              children: [
                {
                  name: "How",
                  path: ":method",
                  resolve() {
                    promiseResolved = true;
                    return Promise.resolve(promiseResolved);
                  }
                }
              ]
            }
          ]);

          const check = response => {
            expect(promiseResolved).toBe(true);
            done();
          };
          const history = InMemory({ locations: ["/contact/phone"] });
          const router = curi(history, routes);
          router.observe(check);
        });

        it("does not emit responses for cancelled navigation", done => {
          const routes = prepareRoutes([
            { name: "Home", path: "" },
            { name: "About", path: "about" },
            {
              name: "Contact",
              path: "contact",
              children: [
                {
                  name: "How",
                  path: ":method",
                  resolve() {
                    return Promise.resolve();
                  }
                }
              ]
            }
          ]);
          const check = ({ response }) => {
            expect(response.params.method).toBe("mail");
            done();
          };
          const history = InMemory({ locations: ["/contact/fax"] });
          const router = curi(history, routes);
          router.observe(check);
          history.navigate("/contact/phone");
          history.navigate("/contact/mail");
        });
      });
    });

    describe("response handler options", () => {
      describe("{ initial: true } (default)", () => {
        it("immediately called with most recent response/navigation", () => {
          const routes = prepareRoutes([{ name: "Home", path: "" }]);
          const sub = jest.fn();
          const router = curi(history, routes);
          const { response, navigation } = router.current();
          router.observe(sub, { initial: true });
          expect(sub.mock.calls.length).toBe(1);
          const {
            response: mockResponse,
            navigation: mockNavigation
          } = sub.mock.calls[0][0];
          expect(mockResponse).toBe(response);
          expect(mockNavigation).toBe(navigation);
        });

        it("[async] immediately called if initial response has resolved", done => {
          const routes = prepareRoutes([
            {
              name: "Home",
              path: "",
              resolve() {
                return Promise.resolve();
              }
            }
          ]);
          const sub = jest.fn();
          const router = curi(history, routes);
          router.once(() => {
            router.observe(sub, { initial: true });
            expect(sub.mock.calls.length).toBe(1);
            done();
          });
        });

        it("[async] not immediately called if initial response hasn't resolved", () => {
          const routes = prepareRoutes([
            {
              name: "Home",
              path: "",
              resolve() {
                return Promise.resolve();
              }
            }
          ]);
          const sub = jest.fn();
          const router = curi(history, routes);
          router.observe(sub, { initial: true });
          expect(sub.mock.calls.length).toBe(0);
        });
      });

      describe("{ initial: false }", () => {
        it("has response, is not immediately called", done => {
          const routes = prepareRoutes([{ name: "Home", path: "" }]);
          const everyTime = jest.fn();
          const router = curi(history, routes);
          router.once(() => {
            router.observe(everyTime, { initial: false });
            expect(everyTime.mock.calls.length).toBe(0);
            done();
          });
        });

        it("is called AFTER next navigation", done => {
          const routes = prepareRoutes([
            { name: "Home", path: "" },
            { name: "Catch All", path: "(.*)" }
          ]);
          const everyTime = jest.fn(({ response }) => {
            expect(response.name).toBe("Catch All");
            done();
          });
          const router = curi(history, routes);
          router.once(() => {
            router.observe(everyTime, { initial: false });
            expect(everyTime.mock.calls.length).toBe(0);
            history.navigate("/somewhere-else");
          });
        });
      });
    });
  });

  describe("once(fn)", () => {
    let history;
    beforeEach(() => {
      history = InMemory({ locations: ["/"] });
    });

    describe("response handler", () => {
      it("is passed object with response, navigation, and router", done => {
        const routes = prepareRoutes([{ name: "All", path: "(.*)" }]);
        const responseHandler = function({ response, navigation, router }) {
          expect(response).toMatchObject({
            name: "All",
            location: { pathname: "/" }
          });
          expect(navigation).toMatchObject({
            action: "push"
          });
          expect(router).toBe(router);
          done();
        };

        const router = curi(history, routes);
        router.once(responseHandler);
      });

      it("is called when response is emitted", () => {
        const routes = prepareRoutes([
          { name: "Home", path: "" },
          { name: "Contact", path: "contact" },
          { name: "Not Found", path: "(.*)" }
        ]);
        const oneTime = jest.fn();
        const router = curi(history, routes);
        router.once(oneTime);
        expect(oneTime.mock.calls.length).toBe(1);
      });

      it("isn't re-called for new responses", () => {
        //
        const routes = prepareRoutes([
          { name: "Home", path: "" },
          { name: "Contact", path: "contact" },
          { name: "Not Found", path: "(.*)" }
        ]);
        const firstOnce = jest.fn();
        const secondOnce = jest.fn();
        const router = curi(history, routes);
        router.once(firstOnce);
        expect(firstOnce.mock.calls.length).toBe(1);
        expect(firstOnce.mock.calls[0][0].response).toMatchObject({
          name: "Home"
        });
        router.navigate({ name: "Contact" });
        // register a second one time response handler
        // to verify that another response is emitted,
        // but first one timer isn't re-called
        router.once(secondOnce);

        expect(secondOnce.mock.calls.length).toBe(1);
        expect(secondOnce.mock.calls[0][0].response).toMatchObject({
          name: "Contact"
        });
        expect(firstOnce.mock.calls.length).toBe(1);
      });

      it("is called AFTER observe() response handlers", done => {
        // need to use an async route so that handlers are registered before
        // the initial response is ready
        const routes = prepareRoutes([
          {
            name: "Home",
            path: "",
            resolve() {
              return Promise.resolve();
            }
          },
          { name: "Catch All", path: "(.*)" }
        ]);
        const oneTime = jest.fn(() => {
          expect(responseHandler.mock.calls.length).toBe(1);
          done();
        });
        let called = false;
        const responseHandler = jest.fn();
        const router = curi(history, routes);
        router.once(oneTime);
        router.observe(responseHandler);
      });

      describe("matched route is async", () => {
        it("is called AFTER promises have resolved", done => {
          let promiseResolved = false;
          const routes = prepareRoutes([
            { name: "Home", path: "" },
            { name: "About", path: "about" },
            {
              name: "Contact",
              path: "contact",
              children: [
                {
                  name: "How",
                  path: ":method",
                  resolve() {
                    promiseResolved = true;
                    return Promise.resolve(promiseResolved);
                  }
                }
              ]
            }
          ]);

          const check = response => {
            expect(promiseResolved).toBe(true);
            done();
          };
          const history = InMemory({ locations: ["/contact/phone"] });
          const router = curi(history, routes);
          router.once(check);
        });

        it("does not emit responses for cancelled navigation", done => {
          const routes = prepareRoutes([
            { name: "Home", path: "" },
            { name: "About", path: "about" },
            {
              name: "Contact",
              path: "contact",
              children: [
                {
                  name: "How",
                  path: ":method",
                  resolve() {
                    return Promise.resolve();
                  }
                }
              ]
            }
          ]);
          const check = ({ response }) => {
            expect(response.params.method).toBe("mail");
            done();
          };
          const history = InMemory({ locations: ["/contact/fax"] });
          const router = curi(history, routes);
          router.once(check);
          history.navigate("/contact/phone");
          history.navigate("/contact/mail");
        });
      });
    });

    describe("response handler options", () => {
      describe("{ initial: true } (default)", () => {
        it("immediately called with most recent response/navigation", () => {
          const routes = prepareRoutes([{ name: "Home", path: "" }]);
          const sub = jest.fn();
          const router = curi(history, routes);
          const { response, navigation } = router.current();
          router.once(sub, { initial: true });
          expect(sub.mock.calls.length).toBe(1);
          const {
            response: mockResponse,
            navigation: mockNavigation
          } = sub.mock.calls[0][0];
          expect(mockResponse).toBe(response);
          expect(mockNavigation).toBe(navigation);
        });

        it("[async] immediately called if initial response has resolved", done => {
          const routes = prepareRoutes([
            {
              name: "Home",
              path: "",
              resolve() {
                return Promise.resolve();
              }
            }
          ]);
          const sub = jest.fn();
          const router = curi(history, routes);
          router.once(() => {
            router.once(sub, { initial: true });
            expect(sub.mock.calls.length).toBe(1);
            done();
          });
        });

        it("[async] not immediately called if initial response hasn't resolved", () => {
          const routes = prepareRoutes([
            {
              name: "Home",
              path: "",
              resolve() {
                return Promise.resolve();
              }
            }
          ]);
          const sub = jest.fn();
          const router = curi(history, routes);
          router.once(sub, { initial: true });
          expect(sub.mock.calls.length).toBe(0);
        });
      });

      describe("{ initial: false }", () => {
        it("has response, is not immediately called", done => {
          const routes = prepareRoutes([{ name: "Home", path: "" }]);
          const oneTime = jest.fn();
          const router = curi(history, routes);
          router.once(() => {
            router.once(oneTime, { initial: false });
            expect(oneTime.mock.calls.length).toBe(0);
            done();
          });
        });

        it("is called AFTER next navigation", done => {
          const routes = prepareRoutes([
            { name: "Home", path: "" },
            { name: "Catch All", path: "(.*)" }
          ]);
          const oneTime = jest.fn(({ response }) => {
            expect(response.name).toBe("Catch All");
            done();
          });
          const router = curi(history, routes);
          router.once(() => {
            router.once(oneTime, { initial: false });
            expect(oneTime.mock.calls.length).toBe(0);
            history.navigate("/somewhere-else");
          });
        });
      });
    });
  });

  describe("navigate()", () => {
    const routes = prepareRoutes([
      { name: "Home", path: "" },
      {
        name: "Contact",
        path: "contact",
        children: [{ name: "Method", path: ":method" }]
      },
      { name: "Catch All", path: "(.*)" }
    ]);
    const history = InMemory();
    const router = curi(history, routes);
    const mockNavigate = (history.navigate = jest.fn());

    afterEach(() => {
      mockNavigate.mockReset();
    });

    describe("navigation method", () => {
      it("lets the history object decide if no method is provided", () => {
        const history = InMemory();
        const router = curi(history, routes);
        expect(() => {
          router.navigate({ name: "Contact" });
        }).not.toThrow();
      });

      it("anchor", () => {
        router.navigate({ name: "Contact", method: "anchor" });
        expect(mockNavigate.mock.calls[0][1]).toBe("anchor");
      });

      it("push", () => {
        router.navigate({ name: "Contact", method: "push" });
        expect(mockNavigate.mock.calls[0][1]).toBe("push");
      });

      it("replace", () => {
        router.navigate({ name: "Contact", method: "replace" });
        expect(mockNavigate.mock.calls[0][1]).toBe("replace");
      });

      it("throws if given a bad navigation type", () => {
        const history = InMemory();
        const router = curi(history, routes);
        expect(() => {
          router.navigate({ name: "Contact", method: "BAAAAAAD" as NavType });
        }).toThrow();
      });
    });

    describe("navigation location", () => {
      it("generates the expected pathname", () => {
        router.navigate({ name: "Contact" });
        expect(mockNavigate.mock.calls[0][0]).toMatchObject({
          pathname: "/contact"
        });
      });

      it("uses params to create pathname", () => {
        router.navigate({ name: "Method", params: { method: "fax" } });
        expect(mockNavigate.mock.calls[0][0]).toMatchObject({
          pathname: "/contact/fax"
        });
      });

      it("re-uses current pathname if no name is provided", () => {
        const history = InMemory({ locations: ["/reuse"] });
        const router = curi(history, routes);
        const mockNavigate = (history.navigate = jest.fn());
        router.navigate({});
        expect(mockNavigate.mock.calls[0][0]).toMatchObject({
          pathname: "/reuse"
        });
      });

      it("includes the provided hash", () => {
        router.navigate({ name: "Home", hash: "trending" });
        expect(mockNavigate.mock.calls[0][0]).toMatchObject({
          hash: "trending"
        });
      });

      it("includes the provided query", () => {
        router.navigate({ name: "Home", query: "key=value" });
        expect(mockNavigate.mock.calls[0][0]).toMatchObject({
          query: "key=value"
        });
      });

      it("includes the provided state", () => {
        const state = { test: true };
        router.navigate({ name: "Home", state });
        expect(mockNavigate.mock.calls[0][0]).toMatchObject({
          state
        });
      });
    });

    describe("cancelling a navigation", () => {
      it("calls the navigation's cancelled function", () => {
        const routes = prepareRoutes([
          { name: "Home", path: "" },
          {
            name: "Slow",
            path: "slow",
            resolve() {
              // takes 500ms to resolve
              return new Promise(resolve => {
                setTimeout(() => {
                  resolve("done");
                }, 500);
              });
            }
          },
          {
            name: "Fast",
            path: "fast",
            resolve() {
              return Promise.resolve("complete");
            }
          },
          { name: "Catch All", path: "(.*)" }
        ]);
        const history = InMemory();
        const router = curi(history, routes);
        const cancelled = jest.fn();
        router.navigate({
          name: "Slow",
          cancelled
        });
        expect(cancelled.mock.calls.length).toBe(0);
        router.navigate({ name: "Fast" });
        expect(cancelled.mock.calls.length).toBe(1);
      });

      it("does not call the previous navigation's cancelled function", done => {
        const routes = prepareRoutes([
          { name: "Home", path: "" },
          {
            name: "Loader",
            path: "loader/:id",
            resolve() {
              return Promise.resolve("complete");
            }
          },
          { name: "Catch All", path: "(.*)" }
        ]);
        const history = InMemory();
        const router = curi(history, routes);
        const cancelled = jest.fn();
        router.navigate({
          name: "Loader",
          params: { id: 1 },
          cancelled
        });
        router.once(
          ({ response }) => {
            // verify this is running after the first navigation completes
            expect(response.name).toBe("Loader");

            expect(cancelled.mock.calls.length).toBe(0);
            router.navigate({
              name: "Loader",
              params: { id: 2 }
            });
            expect(cancelled.mock.calls.length).toBe(0);
            done();
          },
          { initial: false }
        );
      });
    });

    describe("finishing a navigation", () => {
      it("does not calls the navigation's finished function when the navigation is cancelled", () => {
        const routes = prepareRoutes([
          { name: "Home", path: "" },
          {
            name: "Slow",
            path: "slow",
            resolve() {
              // takes 500ms to resolve
              return new Promise(resolve => {
                setTimeout(() => {
                  resolve("done");
                }, 500);
              });
            }
          },
          {
            name: "Fast",
            path: "fast",
            resolve() {
              return Promise.resolve("complete");
            }
          },
          { name: "Catch All", path: "(.*)" }
        ]);
        const history = InMemory();
        const router = curi(history, routes);
        const finished = jest.fn();
        router.navigate({
          name: "Slow",
          finished
        });
        router.navigate({ name: "Fast" });
        expect(finished.mock.calls.length).toBe(0);
      });

      it("calls the navigation's finished function", done => {
        const routes = prepareRoutes([
          { name: "Home", path: "" },
          {
            name: "Loader",
            path: "loader/:id",
            resolve() {
              return Promise.resolve("complete");
            }
          },
          { name: "Catch All", path: "(.*)" }
        ]);
        const history = InMemory();
        const router = curi(history, routes);
        const finished = jest.fn();
        router.navigate({
          name: "Loader",
          params: { id: 1 },
          finished
        });
        router.once(
          ({ response }) => {
            // verify this is running after the first navigation completes
            expect(response.name).toBe("Loader");

            expect(finished.mock.calls.length).toBe(1);
            done();
          },
          { initial: false }
        );
      });
    });

    describe("cancelling callbacks", () => {
      it("does not call finish callback after navigation finishes", done => {
        const routes = prepareRoutes([
          { name: "Home", path: "" },
          {
            name: "Loader",
            path: "loader/:id",
            resolve() {
              return Promise.resolve("complete");
            }
          },
          { name: "Catch All", path: "(.*)" }
        ]);
        const history = InMemory();
        const router = curi(history, routes);
        const finished = jest.fn();
        const cancelCallbacks = router.navigate({
          name: "Loader",
          params: { id: 1 },
          finished
        });
        cancelCallbacks();

        router.once(
          ({ response }) => {
            // verify this is running after the first navigation completes
            expect(response.name).toBe("Loader");

            expect(finished.mock.calls.length).toBe(0);
            done();
          },
          { initial: false }
        );
      });

      it("does not call cancel callback after navigation is cancelled", () => {
        const routes = prepareRoutes([
          { name: "Home", path: "" },
          {
            name: "Slow",
            path: "slow",
            resolve() {
              // takes 500ms to resolve
              return new Promise(resolve => {
                setTimeout(() => {
                  resolve("done");
                }, 500);
              });
            }
          },
          {
            name: "Fast",
            path: "fast",
            resolve() {
              return Promise.resolve("complete");
            }
          },
          { name: "Catch All", path: "(.*)" }
        ]);
        const history = InMemory();
        const router = curi(history, routes);
        const cancelled = jest.fn();
        const cancelCallbacks = router.navigate({
          name: "Slow",
          cancelled
        });
        cancelCallbacks();
        router.navigate({ name: "Fast" });
        expect(cancelled.mock.calls.length).toBe(0);
      });
    });
  });

  describe("cancel(fn)", () => {
    it("does not call function for sync routes", () => {
      const history = InMemory();
      const routes = prepareRoutes([
        { name: "Home", path: "" },
        { name: "About", path: "about" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = curi(history, routes);
      const cancellable = jest.fn();
      router.cancel(cancellable);

      router.navigate({ name: "About" });

      const { response } = router.current();
      // just to verify that navigation did occur
      expect(response.name).toBe("About");
      expect(cancellable.mock.calls.length).toBe(0);
    });

    it("calls function with cancel fn when navigating to async routes", () => {
      const history = InMemory();
      const routes = prepareRoutes([
        { name: "Home", path: "" },
        {
          name: "About",
          path: "about",
          resolve() {
            return Promise.resolve("wait");
          }
        },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = curi(history, routes);
      const cancellable = jest.fn();
      router.cancel(cancellable);

      router.navigate({ name: "About" });
      // called immediately after navigation
      expect(cancellable.mock.calls.length).toBe(1);
      expect(typeof cancellable.mock.calls[0][0]).toBe("function");
    });

    describe("non-cancelled navigation", () => {
      it("calls function with no args once async actions are complete", done => {
        const history = InMemory();
        const routes = prepareRoutes([
          { name: "Home", path: "" },
          {
            name: "About",
            path: "about",
            resolve() {
              return Promise.resolve("wait");
            }
          },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = curi(history, routes);
        const cancellable = jest.fn();
        router.cancel(cancellable);

        router.navigate({ name: "About" });

        router.once(
          ({ response }) => {
            expect(response.name).toBe("About");
            // second call is for deactivation
            expect(cancellable.mock.calls.length).toBe(2);
            expect(cancellable.mock.calls[1][0]).toBeUndefined();
            done();
          },
          { initial: false }
        );
      });
    });

    describe("cancelling active navigation", () => {
      it("deactivates immediately if cancel function is called", () => {
        const history = InMemory();
        const routes = prepareRoutes([
          { name: "Home", path: "" },
          {
            name: "About",
            path: "about",
            resolve() {
              return Promise.resolve("wait");
            }
          },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = curi(history, routes);
        let cancel;
        const cancellable = jest.fn(cancelFn => {
          cancel = cancelFn;
        });
        router.cancel(cancellable);

        router.navigate({ name: "About" });
        // called immediately after navigation
        expect(cancellable.mock.calls.length).toBe(1);
        cancel();
        // called after navigation is cancelled
        expect(cancellable.mock.calls.length).toBe(2);
      });

      it("doesn't change locations", () => {
        const history = InMemory();
        const routes = prepareRoutes([
          { name: "Home", path: "" },
          {
            name: "About",
            path: "about",
            resolve() {
              return Promise.resolve("wait");
            }
          },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = curi(history, routes);
        let cancel;
        const cancellable = jest.fn(cancelFn => {
          cancel = cancelFn;
        });
        router.cancel(cancellable);
        const { response: beforeResponse } = router.current();
        expect(beforeResponse.name).toBe("Home");

        router.navigate({ name: "About" });
        // called immediately after navigation
        expect(cancellable.mock.calls.length).toBe(1);
        cancel();
        const { response: afterResponse } = router.current();
        expect(afterResponse.name).toBe("Home");
      });
    });

    it("returns a function to stop being called", () => {
      const history = InMemory();
      const routes = prepareRoutes([
        { name: "Home", path: "" },
        {
          name: "About",
          path: "about",
          resolve() {
            return Promise.resolve("wait");
          }
        },
        {
          name: "Contact",
          path: "contact",
          resolve() {
            return Promise.resolve("wait");
          }
        },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = curi(history, routes);
      const cancellable = jest.fn();
      const stopCancelling = router.cancel(cancellable);

      router.navigate({ name: "About" });
      expect(cancellable.mock.calls.length).toBe(1);

      stopCancelling();

      router.navigate({ name: "Contact" });
      expect(cancellable.mock.calls.length).toBe(1);
    });
  });

  describe("response.redirectTo", () => {
    it("triggers a replace navigation AFTER emitting initial response", done => {
      let callPosition = 0;
      const routes = prepareRoutes([
        {
          name: "A Route",
          path: "",
          response: () => {
            return {
              status: 301,
              redirectTo: {
                name: "B Route"
              }
            };
          }
        },
        {
          name: "B Route",
          path: "somewhere-else"
        }
      ]);
      let hasEmitted = false;

      history.navigate = jest.fn((loc, navType) => {
        expect(navType).toBe("replace");
        expect(hasEmitted).toBe(true);
        done();
      });
      const router = curi(history, routes, {
        sideEffects: [
          () => {
            hasEmitted = true;
          }
        ]
      });
    });
  });
});
