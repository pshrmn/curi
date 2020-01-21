import "jest";
import { createLocalVue } from "@vue/test-utils";
import { inMemory } from "@hickory/in-memory";
import { createRouter, prepareRoutes } from "@curi/router";

import { CuriPlugin } from "@curi/vue";

describe("curi-focus directive", () => {
  let vueWrapper;

  let routes = prepareRoutes([
    { name: "Place", path: "place/:name" },
    { name: "Catch All", path: "(.*)" }
  ]);
  let router = createRouter(inMemory, routes);

  let Vue = createLocalVue();
  Vue.use(CuriPlugin, { router });

  let node;
  beforeEach(() => {
    node = document.createElement("div");
    document.body.appendChild(node);
  });

  afterEach(() => {
    vueWrapper.$destroy();
    document.body.innerHTML = "";
  });

  describe("mounting", () => {
    it("focuses when it renders", done => {
      vueWrapper = new Vue({
        template: `
          <div>
            <main
              v-curi-focus="{ key: $curi.response }"
              tabIndex="-1"
            />
          </div>
        `,
        el: node
      });

      setTimeout(() => {
        let main = document.querySelector("main");
        expect(document.activeElement).toBe(main);
        done();
      }, 25);
    });
  });

  describe("updates", () => {
    it("does not re-focus for regular re-renders", done => {
      vueWrapper = new Vue({
        template: `
          <div>
            <main
              v-curi-focus="{ key: $curi.response }"
              tabIndex="-1"
            >
              <input :type="type" />
            </main>
          </div>
        `,
        el: node,
        data: {
          type: "text"
        }
      });

      setTimeout(() => {
        let wrapper = document.querySelector("main");
        let initialFocus = document.activeElement;
        expect(initialFocus).toBe(wrapper);

        let input = document.querySelector("input");
        // steal the focus
        input.focus();
        let stolenFocus = document.activeElement;
        expect(stolenFocus).toBe(input);

        vueWrapper.type = "number";

        setTimeout(() => {
          expect(stolenFocus).toBe(input);
          done();
        }, 25);
      }, 25);
    });

    it("re-focuses for new response re-renders", done => {
      vueWrapper = new Vue({
        template: `
          <div>
            <main
              v-curi-focus="{ key: $curi.response }"
              tabIndex="-1"
            >
              <input />
            </main>
          </div>
        `,
        el: node
      });

      setTimeout(() => {
        let input = document.querySelector("input");
        let wrapper = input.parentElement;
        let initialFocused = document.activeElement;

        expect(initialFocused).toBe(wrapper);

        // steal the focus
        input.focus();
        let stolenFocus = document.activeElement;
        expect(stolenFocus).toBe(input);

        // navigate and verify wrapper is re-focused
        let url = router.url({ name: "Place", params: { name: "Hawaii" } });
        router.navigate({ url });
        setTimeout(() => {
          let postNavFocus = document.activeElement;
          expect(postNavFocus).toBe(wrapper);
          done();
        }, 25);
      }, 25);
    });
  });

  it("isn't affected by prop changes", done => {
    vueWrapper = new Vue({
      template: `
        <div>
          <main
            v-curi-focus="{ key: $curi.response }"
            tabIndex="-1"
            :class="wat"
          >
            <input />
          </main>
        </div>
      `,
      el: node,
      data: {
        wat: "no"
      }
    });

    setTimeout(() => {
      let input = document.querySelector("input");
      let wrapper = input.parentElement;
      let initialFocused = document.activeElement;

      expect(initialFocused).toBe(wrapper);
      expect(wrapper.className).toBe("no");

      // steal the focus
      input.focus();
      let stolenFocus = document.activeElement;
      expect(stolenFocus).toBe(input);

      vueWrapper.wat = "yes";

      Vue.nextTick(() => {
        let postUpdateFocus = document.activeElement;
        expect(postUpdateFocus).toBe(input);

        expect(wrapper.className).toBe("yes");
        done();
      });
    }, 25);
  });

  describe("preserve", () => {
    describe("false (default)", () => {
      it("re-focuses for new response re-renders", done => {
        vueWrapper = new Vue({
          template: `
            <div>
              <main
                v-curi-focus="{ key: $curi.response }"
                tabIndex="-1"
              >
                <input />
              </main>
            </div>
          `,
          el: node
        });

        setTimeout(() => {
          let input = document.querySelector("input");
          let wrapper = input.parentElement;
          let initialFocused = document.activeElement;

          expect(wrapper).toBe(initialFocused);

          // steal the focus
          input.focus();
          let stolenFocus = document.activeElement;
          expect(input).toBe(stolenFocus);

          // navigate and verify wrapper is re-focused
          let url = router.url({ name: "Place", params: { name: "maybe" } });
          router.navigate({ url });

          setTimeout(() => {
            let postNavFocus = document.activeElement;
            expect(wrapper).toBe(postNavFocus);
            done();
          }, 25);
        }, 25);
      });
    });

    describe("true", () => {
      it("does not focus ref if something is already ", done => {
        vueWrapper = new Vue({
          template: `
            <div>
              <main
                v-curi-focus="{ key: $curi.response, preserve: true }"
                tabIndex="-1"
              >
                <input />
              </main>
            </div>
          `,
          el: node
        });

        setTimeout(() => {
          let input = document.querySelector("input");
          let wrapper = input.parentElement;
          let initialFocused = document.activeElement;

          expect(wrapper).toBe(initialFocused);

          // steal the focus
          input.focus();
          let stolenFocus = document.activeElement;
          expect(input).toBe(stolenFocus);

          // navigate and verify wrapper is re-focused
          let url = router.url({ name: "Place", params: { name: "maybe" } });
          router.navigate({ url });

          setTimeout(() => {
            let postNavFocus = document.activeElement;
            expect(postNavFocus).toBe(input);
            done();
          }, 25);
        }, 25);
      });
    });
  });

  describe("preventScroll", () => {
    let realFocus = HTMLElement.prototype.focus;
    let fakeFocus;

    beforeEach(() => {
      fakeFocus = HTMLElement.prototype.focus = jest.fn();
    });

    afterEach(() => {
      fakeFocus.mockReset();
      HTMLElement.prototype.focus = realFocus;
    });

    it("calls focus({ preventScroll: false }} when not provided", done => {
      vueWrapper = new Vue({
        template: `
          <div>
            <main
              v-curi-focus="{ key: $curi.response }"
              tabIndex="-1"
            >
              <input />
            </main>
          </div>
        `,
        el: node
      });
      setTimeout(() => {
        expect(fakeFocus.mock.calls[0][0]).toMatchObject({
          preventScroll: false
        });
        done();
      }, 25);
    });

    it("calls focus({ preventScroll: true }} when preventScroll = true", done => {
      vueWrapper = new Vue({
        template: `
          <div>
            <main
              v-curi-focus="{ key: $curi.response, preventScroll: true }"
              tabIndex="-1"
            >
              <input />
            </main>
          </div>
        `,
        el: node
      });
      setTimeout(() => {
        expect(fakeFocus.mock.calls[0][0]).toMatchObject({
          preventScroll: true
        });
        done();
      }, 25);
    });

    it("calls focus({ preventScroll: false }} when preventScroll = false", done => {
      vueWrapper = new Vue({
        template: `
          <div>
            <main
              v-curi-focus="{ key: $curi.response, preventScroll: false }"
              tabIndex="-1"
            >
              <input />
            </main>
          </div>
        `,
        el: node
      });
      setTimeout(() => {
        expect(fakeFocus.mock.calls[0][0]).toMatchObject({
          preventScroll: false
        });
        done();
      }, 25);
    });
  });

  describe("tabIndex", () => {
    it("warns when element with directive does not have a tabIndex attribute", () => {
      let realWarn = console.warn;
      let fakeWarn = (console.warn = jest.fn());

      vueWrapper = new Vue({
        template: `
          <div>
            <main v-curi-focus="{ key: $curi.response }" />
          </div>
        `,
        el: node
      });
      expect(fakeWarn.mock.calls.length).toBe(1);
      expect(document.activeElement).toBe(document.body);
      console.warn = realWarn;
    });

    it("does not warn when element with directive does not have a tabIndex attribute, but ele is already focusable", done => {
      let realWarn = console.warn;
      let fakeWarn = (console.warn = jest.fn());

      vueWrapper = new Vue({
        template: `
          <div>
            <input
              type="text"
              v-curi-focus="{ key: $curi.response }"
            />
          </div>
        `,
        el: node,
        data: {
          response: {
            name: "Test"
          }
        }
      });

      setTimeout(() => {
        expect(fakeWarn.mock.calls.length).toBe(0);
        let input = document.body.querySelector("input");
        expect(document.activeElement).toBe(input);
        console.warn = realWarn;
        done();
      }, 25);
    });
  });
});
