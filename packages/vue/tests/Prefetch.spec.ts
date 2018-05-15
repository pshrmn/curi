import "jest";
import { createLocalVue } from "@vue/test-utils";
import InMemory from "@hickory/in-memory";
import curi from "@curi/core";
import prefetchInteraction from "@curi/route-prefetch";
import CuriPlugin from "../src/plugin";

// simulate IntersectionObserver
// https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver
function createIntersectionObserver() {
  let entries = [];
  // noop
  let callback: (...any: Array<any>) => void = () => {};
  let intersectionRatio = 1;
  function flush() {
    callback(entries);
  }
  const observe = jest.fn(target => {
    entries.push({
      target,
      intersectionRatio
    });
    flush();
  });
  function update(target, ratio) {
    entries = entries.map(
      e =>
        e.target !== target
          ? e
          : {
              target,
              intersectionRatio: ratio
            }
    );
    flush();
  }
  const disconnect = jest.fn();
  const unobserve = jest.fn();

  return {
    entries,
    observe,
    disconnect,
    unobserve,
    update,
    setRatio(ratio) {
      intersectionRatio = ratio;
    },
    io(fn) {
      callback = fn;
      return {
        observe,
        disconnect,
        unobserve
      };
    }
  };
}

describe("prefetch", () => {
  let node, intersection;

  beforeEach(() => {
    node = document.createElement("div");
    document.body.appendChild(node);
    intersection = createIntersectionObserver();
    global.IntersectionObserver = intersection.io;
  });

  afterEach(() => {
    document.body.innerHTML = "";
    jest.resetAllMocks();
  });

  describe("no prefetch interaction", () => {
    it("throws if @curi/route-prefetch is not present", () => {
      const realError = console.error;
      console.error = jest.fn();

      const history = InMemory();
      const match = { name: "Prefetch" };
      const prefetchRoute = {
        name: "Prefetch",
        path: "prefetch",
        on: {
          initial: jest.fn(),
          every: jest.fn()
        }
      };
      const routes = [
        {
          name: "Home",
          path: ""
        },
        prefetchRoute,
        { name: "Not Found", path: "(.*)" }
      ];
      const router = curi(history, routes);

      const Vue = createLocalVue();
      Vue.use(CuriPlugin, { router });

      const wrapper = new Vue({
        el: node,
        template: `
          <div>
            <curi-prefetch :match="{ name: 'Prefetch' }">
              <span slot-scope="prefetch">
                Test
              </span>
            </curi-prefetch>
          </div>
        `,
        errorCaptured: function(error) {
          expect(error.message).toBe(
            'You are attempting to use the "prefetch" function, but have not included the "prefetch" ' +
              "route interaction (@curi/route-prefetch) in your Curi router."
          );
        }
      });

      console.error = realError;
    });
  });

  describe("on fns", () => {
    const history = InMemory();
    const prefetchRoute = {
      name: "Prefetch",
      path: "prefetch",
      on: {
        // use on.every instead of on.initial so that the routes
        // can be re-used (on.initial() is only called once)
        every: jest.fn()
      }
    };
    const routes = [
      {
        name: "Home",
        path: ""
      },
      prefetchRoute,
      { name: "Not Found", path: "(.*)" }
    ];
    const router = curi(history, routes, {
      route: [prefetchInteraction()]
    });

    const Vue = createLocalVue();
    Vue.use(CuriPlugin, { router });

    afterEach(() => {
      prefetchRoute.on.every.mockReset();
    });

    it('calls "on" fns immediately if the element is immediately visible', () => {
      const wrapper = new Vue({
        el: node,
        template: `
          <div>
            <curi-prefetch :match="{ name: 'Prefetch' }">
              <span slot-scope="prefetch" id="5">
                Test
              </span>
            </curi-prefetch>
          </div>
        `
      });
      expect(prefetchRoute.on.every.mock.calls.length).toBe(1);
    });

    it('does not call "on" fns immediately if the element is not visible', () => {
      intersection.setRatio(0);
      const wrapper = new Vue({
        el: node,
        template: `
          <div>
            <curi-prefetch :match="{ name: 'Prefetch' }">
              <span slot-scope="prefetch">
                Test
              </span>
            </curi-prefetch>
          </div>
        `
      });
      expect(prefetchRoute.on.every.mock.calls.length).toBe(0);
    });

    it('calls "on" fns when element becomes visible', () => {
      intersection.setRatio(0);
      const wrapper = new Vue({
        el: node,
        template: `
          <div>
            <curi-prefetch :match="{ name: 'Prefetch' }">
              <span slot-scope="prefetch" id="test">
                Test
              </span>
            </curi-prefetch>
          </div>
        `
      });
      expect(prefetchRoute.on.every.mock.calls.length).toBe(0);
      const ref = document.querySelector("#test");
      intersection.update(ref, 1);
      expect(prefetchRoute.on.every.mock.calls.length).toBe(1);
    });

    it("stops observing ref and disconnects observer after calling callback", () => {
      expect(intersection.unobserve.mock.calls.length).toBe(0);
      expect(intersection.disconnect.mock.calls.length).toBe(0);
      const wrapper = new Vue({
        el: node,
        template: `
          <div>
            <curi-prefetch :match="{ name: 'Prefetch' }">
              <span slot-scope="prefetch" id="test">
                Test
              </span>
            </curi-prefetch>
          </div>
        `
      });
      expect(prefetchRoute.on.every.mock.calls.length).toBe(1);
      expect(intersection.unobserve.mock.calls.length).toBe(1);
      expect(intersection.disconnect.mock.calls.length).toBe(1);
      const div = document.querySelector("#test");
      expect(intersection.unobserve.mock.calls[0][0]).toBe(div);
    });
  });

  describe("match", () => {
    let history, router, Vue;

    const match = { name: "Prefetch" };
    const prefetchRoute = {
      name: "Prefetch",
      path: "prefetch",
      on: {
        initial: jest.fn(),
        every: jest.fn()
      }
    };
    const routes = [
      {
        name: "Home",
        path: ""
      },
      prefetchRoute,
      { name: "Not Found", path: "(.*)" }
    ];

    beforeEach(() => {
      history = InMemory();
      router = curi(history, routes, {
        route: [prefetchInteraction()]
      });
      Vue = createLocalVue();
      Vue.use(CuriPlugin, { router });
    });

    afterEach(() => {
      prefetchRoute.on.every.mockReset();
    });

    it('passes match object to "on" fns', () => {
      const wrapper = new Vue({
        el: node,
        template: `
          <div>
            <curi-prefetch :match="{ name: 'Prefetch' }">
              <span slot-scope="prefetch" id="test">
                Test
              </span>
            </curi-prefetch>
          </div>
        `
      });
      expect(prefetchRoute.on.initial.mock.calls[0][0]).toMatchObject(match);
      expect(prefetchRoute.on.every.mock.calls[0][0]).toMatchObject(match);
    });
  });

  describe("which", () => {
    let history, router, Vue;
    const match = { name: "Prefetch" };
    const prefetchRoute = {
      name: "Prefetch",
      path: "prefetch",
      on: {
        initial: jest.fn(),
        every: jest.fn()
      }
    };
    const routes = [
      {
        name: "Home",
        path: ""
      },
      prefetchRoute,
      { name: "Not Found", path: "(.*)" }
    ];

    beforeEach(() => {
      history = InMemory();
      router = curi(history, routes, {
        route: [prefetchInteraction()]
      });
      Vue = createLocalVue();
      Vue.use(CuriPlugin, { router });
    });

    afterEach(() => {
      prefetchRoute.on.every.mockReset();
    });

    it("calls both on.initial() and on.every() by default", () => {
      const wrapper = new Vue({
        el: node,
        template: `
          <div>
            <curi-prefetch :match="{ name: 'Prefetch' }">
              <span slot-scope="prefetch" id="test">
                Test
              </span>
            </curi-prefetch>
          </div>
        `
      });
      expect(prefetchRoute.on.initial.mock.calls.length).toBe(1);
      expect(prefetchRoute.on.every.mock.calls.length).toBe(1);
    });

    describe("{ initial: true } (implicit every=false)", () => {
      it("calls on.initial(), does not call on.every()", () => {
        const wrapper = new Vue({
          el: node,
          template: `
            <div>
              <curi-prefetch
                :match="{ name: 'Prefetch' }"
                :which="{ initial: true }"
              >
                <span slot-scope="prefetch" id="test">
                  Test
                </span>
              </curi-prefetch>
            </div>
          `
        });

        expect(prefetchRoute.on.initial.mock.calls.length).toBe(1);
        expect(prefetchRoute.on.every.mock.calls.length).toBe(0);
      });
    });

    describe("{ every: true } (implicit initial=false)", () => {
      it("calls on.initial(), does not call on.every()", () => {
        const wrapper = new Vue({
          el: node,
          template: `
            <div>
              <curi-prefetch
                :match="{ name: 'Prefetch' }"
                :which="{ every: true }"
              >
                <span slot-scope="prefetch" id="test">
                  Test
                </span>
              </curi-prefetch>
            </div>
          `
        });

        expect(prefetchRoute.on.initial.mock.calls.length).toBe(0);
        expect(prefetchRoute.on.every.mock.calls.length).toBe(1);
      });
    });
  });

  describe("scoped slot", () => {
    let history, router, Vue;
    const match = { name: "Prefetch" };
    const prefetchRoute = {
      name: "Prefetch",
      path: "prefetch",
      on: {
        initial: () => Promise.resolve("initial"),
        every: () => Promise.resolve("every")
      }
    };
    const routes = [
      {
        name: "Home",
        path: ""
      },
      prefetchRoute,
      { name: "Not Found", path: "(.*)" }
    ];

    beforeEach(() => {
      history = InMemory();
      router = curi(history, routes, {
        route: [prefetchInteraction()]
      });
      Vue = createLocalVue();
      Vue.use(CuriPlugin, { router });
    });

    describe("resolved", () => {
      it("starts out null", () => {
        intersection.setRatio(0);
        const CheckPrefetch = {
          props: ["resolved"],
          render() {
            expect(this.resolved).toBe(null);
            return null;
          }
        };

        const wrapper = new Vue({
          el: node,
          components: { CheckPrefetch },
          template: `
            <div>
              <curi-prefetch
                :match="{ name: 'Prefetch' }"
                :which="{ every: true }"
              >
                <CheckPrefetch slot-scope="prefetch" :resolved="prefetch.resolved" />
              </curi-prefetch>
            </div>
          `
        });
      });

      it("is the prefetch results once prefetched", done => {
        const CheckPrefetch = {
          props: ["resolved"],
          render(h) {
            // need to reference resolved to update
            return h("div", this.resolved && this.resolved.toString());
          },
          updated: function() {
            expect(this.resolved).toMatchObject({
              initial: "initial",
              every: "every",
              error: null
            });
            done();
          }
        };

        const wrapper = new Vue({
          el: node,
          components: { CheckPrefetch },
          template: `
            <div>
              <curi-prefetch :match="{ name: 'Prefetch' }">
                <CheckPrefetch slot-scope="prefetch" :resolved="prefetch.resolved" />
              </curi-prefetch>
            </div>
          `
        });
      });
    });
  });
});
