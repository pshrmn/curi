import "jest";
import { inMemory } from "@hickory/in-memory";

import { NavType } from "@hickory/root";

import { createRouter, prepareRoutes } from "@curi/router";

describe("createRouter", () => {
  describe("constructor", () => {
    // these tests rely on the fact that the pathname interaction is built-in
    it("registers routes", () => {
      const routes = prepareRoutes([
        { name: "Home", path: "" },
        { name: "About", path: "about" },
        { name: "Contact", path: "contact" }
      ]);
      const router = createRouter(inMemory, routes);

      const names = ["Home", "About", "Contact"];
      names.forEach(n => {
        expect(router.route(n)).toBeDefined();
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
        expect(router.route(n)).toBeDefined();
      });
    });

    it("makes routes available through router.route", () => {
      const routes = prepareRoutes([{ name: "Home", path: "" }]);
      const router = createRouter(inMemory, routes);
      const route = router.route("Home");
      expect(route).toMatchObject({
        name: "Home"
      });
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
              respond({ external: e }) {
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

      describe("suspend", () => {
        describe("router.suspends()", () => {
          it("returns true when suspend is true", () => {
            const routes = prepareRoutes([
              {
                name: "Home",
                path: ""
              },
              {
                name: "Not Found",
                path: "(.*)"
              }
            ]);
            const router = createRouter(inMemory, routes, {
              suspend: true
            });
            expect(router.suspends()).toBe(true);
          });

          it("returns false when suspend is false", () => {
            const routes = prepareRoutes([
              {
                name: "Home",
                path: ""
              },
              {
                name: "Not Found",
                path: "(.*)"
              }
            ]);
            const router = createRouter(inMemory, routes, {
              suspend: false
            });
            expect(router.suspends()).toBe(false);
          });

          it("returns false when suspend is undefined", () => {
            const routes = prepareRoutes([
              {
                name: "Home",
                path: ""
              },
              {
                name: "Not Found",
                path: "(.*)"
              }
            ]);
            const router = createRouter(inMemory, routes);
            expect(router.suspends()).toBe(false);
          });
        });

        it("when false (default), emits navigation objects without a finish() fn", () => {
          const routes = prepareRoutes([
            {
              name: "Home",
              path: ""
            },
            {
              name: "Not Found",
              path: "(.*)"
            }
          ]);
          const router = createRouter(inMemory, routes, {
            suspend: false
          });

          const { navigation } = router.current();
          expect(navigation.finish).toBeUndefined();
        });

        it("when true, emits navigation objects with a finish() fn", () => {
          const routes = prepareRoutes([
            {
              name: "Home",
              path: ""
            },
            {
              name: "Not Found",
              path: "(.*)"
            }
          ]);
          const router = createRouter(inMemory, routes, {
            suspend: true
          });

          const { navigation } = router.current();
          expect(typeof navigation.finish).toBe("function");
        });

        it("calls correct navigation's finish() fn", () => {
          const routes = prepareRoutes([
            {
              name: "Home",
              path: ""
            },
            {
              name: "One",
              path: "one"
            },
            {
              name: "Two",
              path: "two"
            },
            {
              name: "Not Found",
              path: "(.*)"
            }
          ]);
          const router = createRouter(inMemory, routes, {
            suspend: true
          });
          // start a navigation, but don't finish it
          let oneNavigation;
          const oneURL = router.url({ name: "One" });
          router.navigate({ url: oneURL });
          router.once(({ navigation }) => {
            oneNavigation = navigation;
          });

          // start a second navigation, but don't finish it
          // at this point, the first navigation has been cancelled
          let twoNavigation;
          const twoURL = router.url({ name: "Two" });
          router.navigate({ url: twoURL });
          router.once(({ navigation }) => {
            twoNavigation = navigation;
          });

          // try to finish the first navigation
          oneNavigation.finish();
          // the navigation is cancelled, so still at Home
          expect(router.history.location.pathname).toBe("/");

          twoNavigation.finish();
          expect(router.history.location.pathname).toBe("/two");
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
            locations: [{ url: "/parent/child" }]
          }
        });
        const after = jest.fn();
        let navigated = false;
        router.observe(r => {
          if (!navigated) {
            navigated = true;
            const url = router.url({ name: "Parent" });
            router.navigate({ url });
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
        const router = createRouter(inMemory, routes);
        expect(router.current()).toMatchObject({
          response: { name: "Catch All" },
          navigation: { action: "push" }
        });
      });
    });

    describe("async", () => {
      it("initial value is an object with undefined response and navigation properties", () => {
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
          response: undefined,
          navigation: undefined
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
          const url = router.url({ name: "About" });
          router.navigate({ url });
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

      const url = router.url({ name: "Next" });
      router.navigate({ url });

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
        const url = router.url({ name: "How", params: { method: "mail" } });
        router.navigate({ url });
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
            const url = router.url({ name: "Contact" });
            router.navigate({ url });
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
              locations: [{ url: "/contact/phone" }]
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
              locations: [{ url: "/contact/fax" }]
            }
          });
          router.observe(check);
          const phoneURL = router.url({
            name: "How",
            params: { method: "phone" }
          });
          const mailURL = router.url({
            name: "How",
            params: { method: "mail" }
          });
          router.navigate({ url: phoneURL });
          router.navigate({ url: mailURL });
        });

        describe("suspend", () => {
          it("calls function before navigation is finished", done => {
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
            const router = createRouter(inMemory, routes, {
              suspend: true
            });
            // Register an observer function, but don't call it immediately
            // so that we can compare its received location to the history's
            // current location.
            router.observe(
              ({ response }) => {
                expect(response.location.pathname).toBe("/contact/phone");
                expect(router.history.location.pathname).toBe("/");
                done();
              },
              { initial: false }
            );
            const url = router.url({
              name: "How",
              params: { method: "phone" }
            });
            router.navigate({ url });
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
            const url = router.url({ name: "About" });
            router.navigate({ url });
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
        const url = router.url({ name: "Contact" });
        router.navigate({ url });
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
              locations: [{ url: "/contact/phone" }]
            }
          });
          router.once(check);
        });

        describe("suspend", () => {
          it("calls function before navigation is finished", done => {
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
            const router = createRouter(inMemory, routes, {
              suspend: true
            });
            // Register a one timer function, but don't call it immediately
            // so that we can compare its received location to the history's
            // current location.
            // While router.once() is typically used with the initial location,
            // the easiest way to verify that a one time function is called before
            // finishing navigation is to verify that its location is the new one,
            // while the history's is the old one.
            router.once(
              ({ response }) => {
                expect(response.location.pathname).toBe("/contact/phone");
                expect(router.history.location.pathname).toBe("/");
                done();
              },
              { initial: false }
            );
            const url = router.url({
              name: "How",
              params: { method: "phone" }
            });
            router.navigate({ url });
          });
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
              locations: [{ url: "/contact/fax" }]
            }
          });
          router.once(check);
          const phoneURL = router.url({
            name: "How",
            params: { method: "phone" }
          });
          const mailURL = router.url({
            name: "How",
            params: { method: "mail" }
          });
          router.navigate({ url: phoneURL });
          router.navigate({ url: mailURL });
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
            const url = router.url({ name: "About" });
            router.navigate({ url });
          });
        });
      });
    });
  });

  describe("url()", () => {
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

    it("generates the expected pathname", () => {
      const url = router.url({ name: "Contact" });
      router.navigate({ url });
      expect(url).toEqual("/contact");
    });

    it("uses params to create pathname", () => {
      const url = router.url({ name: "Method", params: { method: "fax" } });
      router.navigate({ url });
      expect(url).toEqual("/contact/fax");
    });

    it("returns URL with no pathname if name is not provided", () => {
      const router = createRouter(inMemory, routes, {
        history: {
          locations: [{ url: "/test" }]
        }
      });
      const url = router.url({ hash: "test" });
      expect(url).toEqual("#test");
    });

    it("includes the provided hash", () => {
      const url = router.url({ name: "Home", hash: "trending" });
      expect(url).toEqual("/#trending");
    });

    it("includes the provided query", () => {
      const url = router.url({ name: "Home", query: "key=value" });
      expect(url).toEqual("/?key=value");
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
          const url = router.url({ name: "Contact" });
          router.navigate({ url });
        }).not.toThrow();
      });

      it("anchor", () => {
        const url = router.url({ name: "Contact" });
        router.navigate({ url, method: "anchor" });
        expect(mockNavigate.mock.calls[0][1]).toBe("anchor");
      });

      it("push", () => {
        const url = router.url({ name: "Contact" });
        router.navigate({ url, method: "push" });
        expect(mockNavigate.mock.calls[0][1]).toBe("push");
      });

      it("replace", () => {
        const url = router.url({ name: "Contact" });
        router.navigate({ url, method: "replace" });
        expect(mockNavigate.mock.calls[0][1]).toBe("replace");
      });

      it("throws if given a bad navigation type", () => {
        const router = createRouter(inMemory, routes);
        expect(() => {
          const url = router.url({ name: "Contact" });
          router.navigate({ url, method: "BAAAAAAD" as NavType });
        }).toThrow();
      });
    });

    it("includes the provided state", () => {
      const state = { test: true };
      const url = router.url({ name: "Home" });
      router.navigate({ url, state });
      expect(mockNavigate.mock.calls[0][0]).toMatchObject({
        state
      });
    });

    it("location inherits pathname when navigating to URL with no pathname", () => {
      const routes = prepareRoutes([
        { name: "Home", path: "" },
        {
          name: "Contact",
          path: "contact",
          children: [{ name: "Method", path: ":method" }]
        },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = createRouter(inMemory, routes, {
        history: {
          locations: [{ url: "/contact/phone" }]
        }
      });
      const url = router.url({ hash: "test" });
      router.navigate({ url });
      const { response } = router.current();
      expect(response.location).toMatchObject({
        pathname: "/contact/phone"
      });
    });

    describe("return value", () => {
      it("returns a function if a finished property is passed to navigate", () => {
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
        const url = router.url({ name: "Contact" });
        const fn = router.navigate({ url, finished: () => {} });
        expect(fn).not.toBeUndefined();
      });

      it("returns a function if a cancelled property is passed to navigate", () => {
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
        const url = router.url({ name: "Contact" });
        const fn = router.navigate({ url, cancelled: () => {} });
        expect(fn).not.toBeUndefined();
      });

      it("returns undefind if neither finished nor cancelled properties are provided", () => {
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
        const url = router.url({ name: "Contact" });
        const fn = router.navigate({ url });
        expect(fn).toBeUndefined();
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

        const slowURL = router.url({ name: "Slow" });
        router.navigate({ url: slowURL, cancelled });

        expect(cancelled.mock.calls.length).toBe(0);

        const fastURL = router.url({ name: "Fast" });
        router.navigate({ url: fastURL });

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
        const oneURL = router.url({
          name: "Loader",
          params: { id: 1 }
        });
        router.navigate({
          url: oneURL,
          cancelled
        });
        router.once(
          ({ response }) => {
            // verify this is running after the first navigation completes
            expect(response.name).toBe("Loader");

            expect(cancelled.mock.calls.length).toBe(0);

            const twoURL = router.url({
              name: "Loader",
              params: { id: 2 }
            });
            router.navigate({ url: twoURL });
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

        const slowURL = router.url({
          name: "Slow"
        });
        router.navigate({ url: slowURL, finished });

        const fastURL = router.url({ name: "Fast" });
        router.navigate({ url: fastURL });

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
        const url = router.url({
          name: "Loader",
          params: { id: 1 }
        });
        router.navigate({
          url,
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
        const loaderURL = router.url({
          name: "Loader",
          params: { id: 1 }
        });
        const cancelCallbacks = router.navigate({
          url: loaderURL,
          finished
        }) as () => void;
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
        const slowURL = router.url({ name: "Slow" });
        const cancelCallbacks = router.navigate({
          url: slowURL,
          cancelled
        }) as () => void;
        cancelCallbacks();
        const fastURL = router.url({ name: "Fast" });
        router.navigate({ url: fastURL });
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

      const url = router.url({ name: "About" });
      router.navigate({ url });

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

      const url = router.url({ name: "About" });
      router.navigate({ url });

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

        const aboutURL = router.url({ name: "About" });
        router.navigate({ url: aboutURL });

        expect(cancellable.mock.calls.length).toBe(1);

        const contactURL = router.url({ name: "Contact" });
        router.navigate({ url: contactURL });

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

        const aboutURL = router.url({ name: "About" });
        router.navigate({ url: aboutURL });

        expect(cancellable.mock.calls.length).toBe(1);
        expect(typeof cancellable.mock.calls[0][0]).toBe("function");

        const contactURL = router.url({ name: "Contact" });
        router.navigate({ url: contactURL });

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

        const aboutURL = router.url({ name: "About" });
        router.navigate({ url: aboutURL });

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

        const aboutURL = router.url({ name: "About" });
        router.navigate({ url: aboutURL });

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

        const aboutURL = router.url({ name: "About" });
        router.navigate({ url: aboutURL });

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

      const aboutURL = router.url({ name: "About" });
      router.navigate({ url: aboutURL });

      expect(cancellable.mock.calls.length).toBe(1);

      stopCancelling();

      const url = router.url({ name: "Contact" });
      router.navigate({ url });

      expect(cancellable.mock.calls.length).toBe(1);
    });
  });

  describe("route matching", () => {
    describe("no matching routes", () => {
      it("no response is emitted", () => {
        // suppress the warning
        const realWarn = console.warn;
        console.warn = () => {};

        const routes = prepareRoutes([]);
        const router = createRouter(inMemory, routes, {
          history: {
            locations: [{ url: "/test" }]
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
            locations: [{ url: "/test" }]
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

    describe("response generation", () => {
      describe("response object", () => {
        describe("properties", () => {
          describe("location", () => {
            it("is the location used to match routes", () => {
              const routes = prepareRoutes([
                { name: "Catch All", path: "(.*)" }
              ]);
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

        it("triggers a replace navigation AFTER emitting initial response", done => {
          const routes = prepareRoutes([
            {
              name: "A Route",
              path: "",
              respond: () => {
                return {
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
  });

  describe("destroy", () => {
    it("doesn't navigate after destroyed", () => {
      const routes = prepareRoutes([
        { name: "Home", path: "" },
        { name: "About", path: "about" },
        { name: "Catch All", path: "(.*)" }
      ]);
      const router = createRouter(inMemory, routes);

      expect(router.current()).toMatchObject({
        response: { name: "Home" }
      });

      router.destroy();

      router.navigate({ url: "/about" });

      expect(router.current()).toMatchObject({
        response: { name: "Home" }
      });
    });
  });
});
