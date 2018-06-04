import "jest";
import { createLocalVue } from "@vue/test-utils";
import InMemory from "@hickory/in-memory";
import curi from "@curi/router";
import CuriPlugin from "../src/plugin";

describe("curi-focus directive", () => {
  let vueWrapper;
  const history = InMemory();
  const mockConfirmWith = jest.fn();
  const mockRemoveConfirmation = jest.fn();

  const routes = [
    { name: "Place", path: "/place/:name" },
    { name: "Catch All", path: "(.*)" }
  ];
  const router = curi(history, routes);

  const Vue = createLocalVue();
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

  it("focuses when it renders", () => {
    vueWrapper = new Vue({
      template: `
        <div>
          <main
            v-curi-focus="$curi.response"
            tabIndex="-1"
          />
        </div>
      `,
      el: node
    });
    const main = document.querySelector("main");
    expect(document.activeElement).toBe(main);
  });

  it("does not re-focus for regular re-renders", () => {
    vueWrapper = new Vue({
      template: `
        <div>
          <main
            v-curi-focus="$curi.response"
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
    const wrapper = document.querySelector("main");
    const initialFocus = document.activeElement;
    expect(initialFocus).toBe(wrapper);

    const input = document.querySelector("input");
    // steal the focus
    input.focus();
    const stolenFocus = document.activeElement;
    expect(stolenFocus).toBe(input);

    vueWrapper.type = "number";

    expect(stolenFocus).toBe(input);
  });

  it("re-focuses for new response re-renders", done => {
    vueWrapper = new Vue({
      template: `
        <div>
          <main
            v-curi-focus="$curi.response"
            tabIndex="-1"
          >
            <input />
          </main>
        </div>
      `,
      el: node
    });
    const input = document.querySelector("input");
    const wrapper = input.parentElement;
    const initialFocused = document.activeElement;

    expect(initialFocused).toBe(wrapper);

    // steal the focus
    input.focus();
    const stolenFocus = document.activeElement;
    expect(stolenFocus).toBe(input);

    // navigate and verify wrapper is re-focused
    router.navigate({ name: "Place", params: { name: "Hawaii" } });

    // need to wait a tick
    Vue.nextTick(() => {
      const postNavFocus = document.activeElement;
      expect(postNavFocus).toBe(wrapper);
      done();
    });
  });

  it("isn't affected by prop changes", done => {
    vueWrapper = new Vue({
      template: `
        <div>
          <main v-curi-focus="$curi.response" tabIndex="-1" :class="wat">
            <input />
          </main>
        </div>
      `,
      el: node,
      data: {
        wat: "no"
      }
    });
    const input = document.querySelector("input");
    const wrapper = input.parentElement;
    const initialFocused = document.activeElement;

    expect(initialFocused).toBe(wrapper);
    expect(wrapper.className).toBe("no");

    // steal the focus
    input.focus();
    const stolenFocus = document.activeElement;
    expect(stolenFocus).toBe(input);

    vueWrapper.wat = "yes";

    Vue.nextTick(() => {
      const postUpdateFocus = document.activeElement;
      expect(postUpdateFocus).toBe(input);

      expect(wrapper.className).toBe("yes");
      done();
    });
  });

  describe("tabIndex", () => {
    it("warns when element with directive does not have a tabIndex attribute", () => {
      const realWarn = console.error;
      const fakeWarn = (console.error = jest.fn());

      vueWrapper = new Vue({
        template: `
          <div>
            <main v-curi-focus="$curi.response" />
          </div>
        `,
        el: node
      });
      expect(fakeWarn.mock.calls.length).toBe(1);
      expect(document.activeElement).toBe(document.body);
      console.error = realWarn;
    });

    it("does not warn when element with directive does not have a tabIndex attribute, but ele is already focusable", () => {
      const realWarn = console.error;
      const fakeWarn = (console.error = jest.fn());

      vueWrapper = new Vue({
        template: `
          <div>
            <input
              type="text"
              v-curi-focus="$curi.response"
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
      expect(fakeWarn.mock.calls.length).toBe(0);
      const input = document.body.querySelector("input");
      expect(document.activeElement).toBe(input);
      console.error = realWarn;
    });
  });
});
