import "jest";
import { createLocalVue } from "@vue/test-utils";
import InMemory from "@hickory/in-memory";
import { curi, buildRoutes } from "@curi/router";

// @ts-ignore (resolved by jest)
import { CuriPlugin } from "@curi/vue";

describe("<curi-link>", () => {
  let Vue, node, history, router, wrapper;
  const routes = buildRoutes([
    { name: "Place", path: "place/:name" },
    { name: "Catch All", path: "(.*)" }
  ]);

  beforeEach(() => {
    node = document.createElement("div");
    document.body.appendChild(node);

    history = InMemory();
    router = curi(history, routes);

    Vue = createLocalVue();
    Vue.use(CuriPlugin, { router });
  });

  afterEach(() => {
    wrapper.$destroy();
    document.body.innerHTML = "";
  });

  describe("rendering", () => {
    it("renders an anchor element", () => {
      wrapper = new Vue({
        el: node,
        template: `
          <div>
            <curi-link to="Place" :params="{ name: 'Aruba' }">
              Aruba
            </curi-link>
          </div>
        `
      });
      const a = document.querySelector("a");
      expect(a.tagName).toBe("A");
    });

    it("computes the expected href using the props", () => {
      wrapper = new Vue({
        el: node,
        template: `
          <div>
            <curi-link
              to="Place"
              :params="{ name: 'Jamaica' }"
              hash="island-life"
              query="two=2"
            >
              Jamaica
            </curi-link>
          </div>
        `
      });
      const a = document.querySelector("a");
      expect(a.getAttribute("href")).toBe("/place/Jamaica?two=2#island-life");
    });

    it('re-uses current pathname if "to" prop is not provided', () => {
      const Vue = createLocalVue();
      const history = InMemory({
        locations: ["/place/somewhere"]
      });
      const router = curi(history, routes);
      Vue.use(CuriPlugin, { router });

      wrapper = new Vue({
        el: node,
        template: `
          <div>
            <curi-link>somewhere</curi-link>
          </div>
        `
      });
      const a = document.querySelector("a");
      expect(a.getAttribute("href")).toBe("/place/somewhere");
    });

    it("sets the slots as the link's children", () => {
      wrapper = new Vue({
        el: node,
        template: `
          <div>
            <curi-link to="Place" :params="{ name: 'Kokomo' }">
              <span>Kokomo</span>
            </curi-link>
          </div>
        `
      });
      const a = document.querySelector("a");
      expect(a.textContent).toBe("Kokomo");
    });
  });

  describe("clicking a <curi-link>", () => {
    let mockNavigate;
    beforeEach(() => {
      mockNavigate = jest.fn();
      history.navigate = mockNavigate;
    });

    afterEach(() => {
      mockNavigate.mockReset();
    });

    it("navigates to expected location when clicked", () => {
      wrapper = new Vue({
        el: node,
        template: `
          <div>
            <curi-link
              to="Place"
              :params="{ name: 'Bermuda' }"
              hash="beach-boys"
              query="to=Bermuda"
            >
              Bermuda
            </curi-link>
          </div>
        `
      });
      const a = document.querySelector("a");

      expect(mockNavigate.mock.calls.length).toBe(0);
      a.dispatchEvent(
        new MouseEvent("click", {
          button: 0
        })
      );
      expect(mockNavigate.mock.calls.length).toBe(1);
      expect(mockNavigate.mock.calls[0][0]).toEqual({
        pathname: "/place/Bermuda",
        query: "to=Bermuda",
        hash: "beach-boys"
      });
    });

    describe("scoped slot", () => {
      let history;
      const routes = buildRoutes([
        {
          name: "Test",
          path: "test",
          resolve: {
            test: () => {
              return new Promise(resolve => {
                setTimeout(() => {
                  resolve("done");
                }, 100);
              });
            }
          }
        },
        { name: "Catch All", path: "(.*)" }
      ]);

      beforeEach(() => {
        history = InMemory();
      });

      it("navigating = true after clicking", done => {
        const router = curi(history, routes);
        const Vue = createLocalVue();
        Vue.use(CuriPlugin, { router });

        // if a link has no on methods, finished will be called almost
        // immediately (although this style should only be used for routes
        // with on methods)
        const LoadChecker = {
          props: ["navigating"],
          render(h) {
            return h("div", this.navigating);
          },
          updated() {
            expect(this.navigating).toBe(true);
            done();
          }
        };
        wrapper = new Vue({
          el: node,
          template: `
            <div>
              <curi-link to="Test" id="after-click">
                <template slot-scope="{ navigating }">
                  <LoadChecker :navigating="navigating" />
                </template>
              </curi-link>
            </div>
          `,
          components: {
            LoadChecker
          }
        });
        const a = document.querySelector("#after-click");

        a.dispatchEvent(
          new MouseEvent("click", {
            button: 0
          })
        );
      });

      it("navigating = false after navigation completes", done => {
        const router = curi(history, routes);
        const Vue = createLocalVue();
        Vue.use(CuriPlugin, { router });

        // if a link has no on methods, finished will be called almost
        // immediately (although this style should only be used for routes
        // with on methods)
        wrapper = new Vue({
          el: node,
          template: `
            <div>
              <curi-link to="Test" id="nav-complete">
                <template slot-scope="{ navigating }">
                  {{navigating}}
                </template>
              </curi-link>
            </div>
          `
        });
        const a = document.querySelector("#nav-complete");
        a.dispatchEvent(
          new MouseEvent("click", {
            button: 0
          })
        );

        router.once(
          ({ response }) => {
            // navigation is complete, wait for Vue to re-render
            Vue.nextTick(() => {
              expect(a.textContent.trim()).toBe("false");
              done();
            });
          },
          { initial: false }
        );
      });

      it("navigating = false after navigation is cancelled", done => {
        const routes = buildRoutes([
          {
            name: "Slow",
            path: "slow",
            resolve: {
              test: () => {
                return new Promise(resolve => {
                  setTimeout(() => {
                    resolve("slow");
                  }, 100);
                });
              }
            }
          },
          {
            name: "Fast",
            path: "fast",
            resolve: {
              test: () => Promise.resolve("fast")
            }
          },
          { name: "Catch All", path: "(.*)" }
        ]);
        const router = curi(history, routes);
        const Vue = createLocalVue();
        Vue.use(CuriPlugin, { router });

        // if a link has no on methods, finished will be called almost
        // immediately (although this style should only be used for routes
        // with on methods)
        wrapper = new Vue({
          el: node,
          template: `
            <div>
              <curi-link to="Slow" id="slow">
                <template slot-scope="{ navigating }">
                  {{navigating}}
                </template>
              </curi-link>
              <curi-link to="Fast" id="fast">
                <template slot-scope="{ navigating }">
                  {{navigating}}
                </template>
              </curi-link>
            </div>
          `
        });
        const slowLink = document.querySelector("#slow");
        const fastLink = document.querySelector("#slow");

        expect(slowLink.textContent.trim()).toBe("false");

        slowLink.dispatchEvent(
          new MouseEvent("click", {
            button: 0
          })
        );
        Vue.nextTick(() => {
          expect(slowLink.textContent.trim()).toBe("true");
          fastLink.dispatchEvent(
            new MouseEvent("click", {
              button: 0
            })
          );
          router.once(
            ({ response }) => {
              // navigation is cancelled, wait for Vue to re-render
              Vue.nextTick(() => {
                expect(slowLink.textContent.trim()).toBe("false");
                done();
              });
            },
            { initial: false }
          );
        });
      });
    });

    it("does not navigate if event.defaultPrevented is true", () => {
      wrapper = new Vue({
        el: node,
        template: `
          <div>
            <curi-link to="Place" :params="{ name: 'Bahamas' }" :click="click">
              Bahamas
            </curi-link>
          </div>
        `,
        data: {
          click: function(e) {
            e.preventDefault();
          }
        }
      });
      const a = document.querySelector("a");
      expect(mockNavigate.mock.calls.length).toBe(0);
      const event = new MouseEvent("click", {
        button: 0,
        cancelable: true
      });
      a.dispatchEvent(event);
      expect(mockNavigate.mock.calls.length).toBe(0);
    });

    it("does not navigate if a modifier key is held while clicking", () => {
      wrapper = new Vue({
        el: node,
        template: `
          <div>
            <curi-link to="Place" :params="{ name: 'Key Largo' }">
              Key Largo
            </curi-link>
          </div>
        `
      });
      const a = document.querySelector("a");
      expect(mockNavigate.mock.calls.length).toBe(0);
      const modifiers = ["metaKey", "altKey", "ctrlKey", "shiftKey"];
      modifiers.forEach(m => {
        const event = new MouseEvent("click", {
          [m]: true,
          button: 0
        });
        a.dispatchEvent(event);
        expect(mockNavigate.mock.calls.length).toBe(0);
      });
    });

    it("does not navigate for non left mouse button clicks", () => {
      wrapper = new Vue({
        el: node,
        template: `
          <div>
            <curi-link to="Place" :params="{ name: 'Montego' }">
              Montego
            </curi-link>
          </div>
        `
      });
      const a = document.querySelector("a");
      expect(mockNavigate.mock.calls.length).toBe(0);
      const event = new MouseEvent("click", {
        button: 1
      });
      a.dispatchEvent(event);
      expect(mockNavigate.mock.calls.length).toBe(0);
    });

    describe("click prop", () => {
      it("will be called prior to navigation", () => {
        wrapper = new Vue({
          el: node,
          template: `
            <div>
              <curi-link to="Place" :params="{ name: 'Montego' }" :click="click">
                Montego
              </curi-link>
            </div>
          `,
          data: {
            click: function(event) {
              expect(mockNavigate.mock.calls.length).toBe(0);
            }
          }
        });
        const a = document.querySelector("a");
        const event = new MouseEvent("click", {
          button: 0
        });
        a.dispatchEvent(event);
        expect(mockNavigate.mock.calls.length).toBe(1);
      });

      it("calling event.preventDefault() in click fn will stop navigation", () => {
        wrapper = new Vue({
          el: node,
          template: `
            <div>
              <curi-link to="Place" :params="{ name: 'Montego' }" :click="click">
                Montego
              </curi-link>
            </div>
          `,
          data: {
            click: function(event) {
              event.preventDefault();
            }
          }
        });
        const a = document.querySelector("a");
        const event = new MouseEvent("click", {
          button: 0,
          cancelable: true
        });
        a.dispatchEvent(event);
        expect(mockNavigate.mock.calls.length).toBe(0);
      });
    });
  });
});
