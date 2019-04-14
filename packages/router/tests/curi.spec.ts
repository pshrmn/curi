import "jest";
import { inMemory } from "@hickory/in-memory";

import { NavType } from "@hickory/root";

import { createRouter, prepareRoutes } from "@curi/router";

describe("curi", () => {
  describe("constructor", () => {
    // these tests rely on the fact that the pathname generator
    // is a default interaction
    it("registers routes", () => {
      const routes = prepareRoutes([
        { name: "Home", path: "" },
        { name: "About", path: "about" },
        { name: "Contact", path: "contact" }
      ]);
      const router = createRouter(inMemory, routes);

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
      const router = createRouter(inMemory, routes);
      const names = ["Email", "Phone"];
      names.forEach(n => {
        expect(router.route.pathname(n)).toBeDefined();
      });
    });

    it("makes interactions available through router.route", () => {
      const createfakeInteraction = () => ({
        name: "fake",
        register: () => {},
        reset: () => {},
        get: () => {}
      });
      const routes = prepareRoutes(
        [{ name: "Home", path: "" }],
        [createfakeInteraction()]
      );
      const router = createRouter(inMemory, routes);
      expect(router.route.fake).toBeDefined();
    });

    describe("options", () => {
      describe("sideEffects", () => {
        it("calls side effect methods AFTER a response is generated, passing response, navigation, and router", done => {
          const routes = prepareRoutes([{ name: "All", path: "(.*)" }]);
          const sideEffect = jest.fn();

          const router = createRouter(inMemory, routes, {
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

          const router = createRouter(inMemory, routes, {
            sideEffects: [sideEffect]
          });
        });
      });

      describe("invisibleRedirects", () => {
        it("emits redirects by default", () => {
          const routes = prepareRoutes([
            {
              name: "Start",
              path: "",
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
          let call = 0;
          const logger = ({ response }) => {
            switch (call++) {
              case 0:
                expect(response.name).toBe("Start");
                break;
            }
          };
          const router = createRouter(inMemory, routes, {
            sideEffects: [logger]
          });
        });

        it("does not emit redirects when invisibleRedirects = true", done => {
          const routes = prepareRoutes([
            {
              name: "Start",
              path: "",
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

          const router = createRouter(inMemory, routes, {
            invisibleRedirects: true
          });
          // the first emitted response is the location that was redirected to
          router.once(({ response }) => {
            expect(response.name).toBe("Other");
            done();
          });
        });

        it("emits external redirects when invisibleRedirect = true", () => {
          const routes = prepareRoutes([
            {
              name: "Start",
              path: "",
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

          const router = createRouter(inMemory, routes, {
            invisibleRedirects: true
          });
          const { response } = router.current();
          expect(response).toMatchObject({
            name: "Start",
            redirect: {
              externalURL: "https://example.com"
            }
          });
        });
      });

      describe("external", () => {
        it("gets passed to resolve functions", done => {
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
          const router = createRouter(inMemory, routes, { external });
        });

        it("gets passed to response function", () => {
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
          const router = createRouter(inMemory, routes, { external });
        });

        it("is available from the router", () => {
          const external = "hey!";
          const routes = prepareRoutes([
            {
              name: "Not Found",
              path: "(.*)"
            }
          ]);
          const router = createRouter(inMemory, routes, { external });
          expect(router.external).toBe(external);
        });
      });
    });

    describe("sync/async matching", () => {
      it("does synchronous matching by default", () => {
        const routes = prepareRoutes([{ name: "Home", path: "" }]);
        const router = createRouter(inMemory, routes);
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
        const router = createRouter(inMemory, routes);
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
        const router = createRouter(inMemory, routes, {
          history: {
            locations: ["/parent/child"]
          }
        });
        const after = jest.fn();
        let navigated = false;
        router.observe(r => {
          if (!navigated) {
            navigated = true;
            router.navigate({ name: "Parent" });
            after();
            return;
          }
          expect(after.mock.calls.length).toBe(0);
          done();
        });
      });
    });
  });

  describe("interactions", () => {
    it("includes pathname interaction by default", () => {
      const routes = prepareRoutes([{ name: "Home", path: "" }]);
      const router = createRouter(inMemory, routes);
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

      const routes = prepareRoutes(
        [{ name: "Home", path: "" }],
        [createfirstInteraction()]
      );
      const router = createRouter(inMemory, routes);
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
            secondInteractionCache[route.name] = `${extra ? extra : "None"} + ${
              route.name
            }`;
            return route.name;
          },
          get(route) {},
          reset() {}
        };
      };

      const routes = prepareRoutes(
        [
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
        ],
        [createfirstInteraction(), createsecondInteraction()]
      );
      const router = createRouter(inMemory, routes, {
        history: {
          locations: ["/grandparent"]
        }
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

  describe("current", () => {
    describe("sync", () => {
      it("initial value is an object with resolved response and navigation properties", () => {
        const routes = prepareRoutes([{ name: "Catch All", path: "(.*)" }]);
        const router = createRouter(inMemory, routes);
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
        const router = createRouter(inMemory, routes);
        expect(router.current()).toMatchObject({
          response: null,
          navigation: null
        });
      });
    });

    it("response and navigation are the last resolved response and navigation", () => {
      const routes = prepareRoutes([{ name: "Home", path: "" }]);
      const router = createRouter(inMemory, routes);
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
      const router = createRouter(inMemory, routes);
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

  describe("observe(fn)", () => {
    it("returns a function to unsubscribe when called", () => {
      const routes = prepareRoutes([
        { name: "Home", path: "" },
        { name: "Next", path: "next" },
        { name: "Not Found", path: "(.*)" }
      ]);
      const router = createRouter(inMemory, routes);

      const sub1 = jest.fn();
      const sub2 = jest.fn();

      // wait for the first response to be generated to ensure that both
      // response handler functions are called when subscribing
      const unsub1 = router.observe(sub1, { initial: false });
      const unsub2 = router.observe(sub2, { initial: false });

      expect(sub1.mock.calls.length).toBe(0);
      expect(sub2.mock.calls.length).toBe(0);
      unsub1();
      router.navigate({ name: "Next" });

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
        const router = createRouter(inMemory, routes);
        router.observe(responseHandler);
      });

      it("is called when response is emitted", () => {
        const routes = prepareRoutes([
          { name: "Home", path: "" },
          { name: "About", path: "about" },
          {
            name: "Contact",
            path: "contact",
            children: [{ name: "How", path: ":method" }]
          }
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

        const router = createRouter(inMemory, routes);
        // register before navigation, but don't call with existing response
        router.observe(check, { initial: false });
        router.navigate({ name: "How", params: { method: "mail" } });
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
        const router = createRouter(inMemory, routes);
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
        const router = createRouter(inMemory, routes);
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
          const router = createRouter(inMemory, routes, {
            history: {
              locations: ["/contact/phone"]
            }
          });
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
          const router = createRouter(inMemory, routes, {
            history: {
              locations: ["/contact/fax"]
            }
          });
          router.observe(check);
          router.navigate({
            name: "How",
            params: { method: "phone" }
          });
          router.navigate({
            name: "How",
            params: { method: "mail" }
          });
        });
      });
    });

    describe("response handler options", () => {
      describe("{ initial: true } (default)", () => {
        it("immediately called with most recent response/navigation", () => {
          const routes = prepareRoutes([{ name: "Home", path: "" }]);
          const sub = jest.fn();
          const router = createRouter(inMemory, routes);
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
          const router = createRouter(inMemory, routes);
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
          const router = createRouter(inMemory, routes);
          router.observe(sub, { initial: true });
          expect(sub.mock.calls.length).toBe(0);
        });
      });

      describe("{ initial: false }", () => {
        it("has response, is not immediately called", done => {
          const routes = prepareRoutes([{ name: "Home", path: "" }]);
          const everyTime = jest.fn();
          const router = createRouter(inMemory, routes);
          router.once(() => {
            router.observe(everyTime, { initial: false });
            expect(everyTime.mock.calls.length).toBe(0);
            done();
          });
        });

        it("is called AFTER next navigation", done => {
          const routes = prepareRoutes([
            { name: "Home", path: "" },
            { name: "About", path: "about" },
            { name: "Catch All", path: "(.*)" }
          ]);
          const everyTime = jest.fn(({ response }) => {
            expect(response.name).toBe("About");
            done();
          });
          const router = createRouter(inMemory, routes);
          router.once(() => {
            router.observe(everyTime, { initial: false });
            expect(everyTime.mock.calls.length).toBe(0);
            router.navigate({ name: "About" });
          });
        });
      });
    });
  });

  describe("once(fn)", () => {
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

        const router = createRouter(inMemory, routes);
        router.once(responseHandler);
      });

      it("is called when response is emitted", () => {
        const routes = prepareRoutes([
          { name: "Home", path: "" },
          { name: "Contact", path: "contact" },
          { name: "Not Found", path: "(.*)" }
        ]);
        const oneTime = jest.fn();
        const router = createRouter(inMemory, routes);
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
        const router = createRouter(inMemory, routes);
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
        const router = createRouter(inMemory, routes);
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
          const router = createRouter(inMemory, routes, {
            history: {
              locations: ["/contact/phone"]
            }
          });
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
          const router = createRouter(inMemory, routes, {
            history: {
              locations: ["/contact/fax"]
            }
          });
          router.once(check);
          router.navigate({
            name: "How",
            params: { method: "phone" }
          });
          router.navigate({
            name: "How",
            params: { method: "mail" }
          });
        });
      });
    });

    describe("response handler options", () => {
      describe("{ initial: true } (default)", () => {
        it("immediately called with most recent response/navigation", () => {
          const routes = prepareRoutes([{ name: "Home", path: "" }]);
          const sub = jest.fn();
          const router = createRouter(inMemory, routes);
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
          const router = createRouter(inMemory, routes);
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
          const router = createRouter(inMemory, routes);
          router.once(sub, { initial: true });
          expect(sub.mock.calls.length).toBe(0);
        });
      });

      describe("{ initial: false }", () => {
        it("has response, is not immediately called", done => {
          const routes = prepareRoutes([{ name: "Home", path: "" }]);
          const oneTime = jest.fn();
          const router = createRouter(inMemory, routes);
          router.once(() => {
            router.once(oneTime, { initial: false });
            expect(oneTime.mock.calls.length).toBe(0);
            done();
          });
        });

        it("is called AFTER next navigation", done => {
          const routes = prepareRoutes([
            { name: "Home", path: "" },
            { name: "About", path: "about" },
            { name: "Catch All", path: "(.*)" }
          ]);
          const oneTime = jest.fn(({ response }) => {
            expect(response.name).toBe("About");
            done();
          });
          const router = createRouter(inMemory, routes);
          router.once(() => {
            router.once(oneTime, { initial: false });
            expect(oneTime.mock.calls.length).toBe(0);
            router.navigate({ name: "About" });
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
    const router = createRouter(inMemory, routes);
    const mockNavigate = jest.fn();
    router.history.navigate = mockNavigate;

    afterEach(() => {
      mockNavigate.mockReset();
    });

    describe("navigation method", () => {
      it("lets the history object decide if no method is provided", () => {
        const router = createRouter(inMemory, routes);
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
        const router = createRouter(inMemory, routes);
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
        const router = createRouter(inMemory, routes, {
          history: {
            locations: ["/reuse"]
          }
        });
        const mockNavigate = jest.fn();
        router.history.navigate = mockNavigate;
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
        const router = createRouter(inMemory, routes);
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
        const router = createRouter(inMemory, routes);
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
        const router = createRouter(inMemory, routes);
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
        const router = createRouter(inMemory, routes);
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
        const router = createRouter(inMemory, routes);
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
        const router = createRouter(inMemory, routes);
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
      const routes = prepareRoutes([
        { name: "Home", path: "" },
        { name: "About", path: "about" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = createRouter(inMemory, routes);
      const cancellable = jest.fn();
      router.cancel(cancellable);

      router.navigate({ name: "About" });

      const { response } = router.current();
      // just to verify that navigation did occur
      expect(response.name).toBe("About");
      expect(cancellable.mock.calls.length).toBe(0);
    });

    it("calls function with cancel fn when navigating to async routes", () => {
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
      const router = createRouter(inMemory, routes);
      const cancellable = jest.fn();
      router.cancel(cancellable);

      router.navigate({ name: "About" });
      // called immediately after navigation
      expect(cancellable.mock.calls.length).toBe(1);
      expect(typeof cancellable.mock.calls[0][0]).toBe("function");
    });

    describe("another navigation", () => {
      it("stays active when a second async navigation starts", () => {
        const routes = prepareRoutes([
          { name: "Home", path: "" },
          {
            name: "About",
            path: "about",
            resolve() {
              return new Promise(resolve => {
                setTimeout(() => {
                  resolve("about");
                }, 50);
              });
            }
          },
          {
            name: "Contact",
            path: "contact",
            resolve() {
              return new Promise(resolve => {
                setTimeout(() => {
                  resolve("contact");
                }, 50);
              });
            }
          },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = createRouter(inMemory, routes);
        const cancellable = jest.fn();
        router.cancel(cancellable);

        router.navigate({ name: "About" });
        expect(cancellable.mock.calls.length).toBe(1);
        router.navigate({ name: "Contact" });
        expect(cancellable.mock.calls.length).toBe(1);
      });

      it("is cancelled when a sync navigation starts", () => {
        const routes = prepareRoutes([
          { name: "Home", path: "" },
          {
            name: "About",
            path: "about",
            resolve() {
              return new Promise(resolve => {
                setTimeout(() => {
                  resolve("about");
                }, 50);
              });
            }
          },
          {
            name: "Contact",
            path: "contact"
          },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = createRouter(inMemory, routes);
        const cancellable = jest.fn();
        router.cancel(cancellable);

        router.navigate({ name: "About" });
        expect(cancellable.mock.calls.length).toBe(1);
        expect(typeof cancellable.mock.calls[0][0]).toBe("function");
        router.navigate({ name: "Contact" });
        expect(cancellable.mock.calls.length).toBe(2);
        expect(cancellable.mock.calls[1][0]).toBeUndefined();
      });
    });

    describe("non-cancelled navigation", () => {
      it("calls function with no args once async actions are complete", done => {
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
        const router = createRouter(inMemory, routes);
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
        const router = createRouter(inMemory, routes);
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
        const router = createRouter(inMemory, routes);
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
      const router = createRouter(inMemory, routes);
      const cancellable = jest.fn();
      const stopCancelling = router.cancel(cancellable);

      router.navigate({ name: "About" });
      expect(cancellable.mock.calls.length).toBe(1);

      stopCancelling();

      router.navigate({ name: "Contact" });
      expect(cancellable.mock.calls.length).toBe(1);
    });
  });

  describe("response.redirect", () => {
    it("triggers a replace navigation AFTER emitting initial response", done => {
      const routes = prepareRoutes([
        {
          name: "A Route",
          path: "",
          response: () => {
            return {
              status: 301,
              redirect: {
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
      let calls = 0;
      const router = createRouter(inMemory, routes, {
        sideEffects: [
          ({ response, navigation }) => {
            switch (calls++) {
              case 0:
                expect(response.name).toBe("A Route");
                break;
              case 1:
                expect(response.name).toBe("B Route");
                expect(navigation.action).toBe("replace");
                done();
            }
          }
        ]
      });
    });
  });
});
