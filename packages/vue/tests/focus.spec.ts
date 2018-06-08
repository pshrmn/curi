import "jest";
import { createLocalVue } from "@vue/test-utils";
import InMemory from "@hickory/in-memory";
import curi from "@curi/router";
import CuriPlugin from "../src/plugin";

jest.useFakeTimers();

describe("curi-focus directive", () => {
  let vueWrapper;
  const history = InMemory();

  const routes = [
    { name: "Place", path: "place/:name" },
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

    jest.runAllTimers();

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

    jest.runAllTimers();

    const wrapper = document.querySelector("main");
    const initialFocus = document.activeElement;
    expect(initialFocus).toBe(wrapper);

    const input = document.querySelector("input");
    // steal the focus
    input.focus();
    const stolenFocus = document.activeElement;
    expect(stolenFocus).toBe(input);

    vueWrapper.type = "number";

    jest.runAllTimers();

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

    jest.runAllTimers();

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

    // need to switch to real timers
    // TODO: figure out why...
    jest.useRealTimers();
    setTimeout(() => {
      const postNavFocus = document.activeElement;
      expect(postNavFocus).toBe(wrapper);
      jest.useFakeTimers();
      done();
    }, 15);
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

    jest.runAllTimers();

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
      const realWarn = console.warn;
      const fakeWarn = (console.warn = jest.fn());

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
      console.warn = realWarn;
    });

    it("does not warn when element with directive does not have a tabIndex attribute, but ele is already focusable", () => {
      const realWarn = console.warn;
      const fakeWarn = (console.warn = jest.fn());

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

      jest.runAllTimers();

      expect(fakeWarn.mock.calls.length).toBe(0);
      const input = document.body.querySelector("input");
      expect(document.activeElement).toBe(input);
      console.warn = realWarn;
    });
  });
});
