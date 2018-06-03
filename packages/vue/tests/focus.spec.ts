import "jest";
import { createLocalVue } from "@vue/test-utils";
import InMemory from "@hickory/in-memory";
import curi from "@curi/core";
import CuriPlugin from "../src/plugin";

describe("curi-focus directive", () => {
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
    document.body.innerHTML = "";
  });

  it("focuses when it renders", () => {
    const wrapper = new Vue({
      template: `
        <div>
          <main v-curi-focus="$curi.response" tabIndex="-1" id="test" />
        </div>
      `,
      el: node
    });
    const div = document.body.querySelector("#test");
    expect(document.activeElement).toBe(div);
  });

  it("does not re-focus for regular re-renders", () => {
    const vueWrapper = new Vue({
      template: `
        <div>
          <main v-curi-focus="$curi.response" tabIndex="-1" id="test">
            <input :type="type" />
          </main>
        </div>
      `,
      el: node,
      data: {
        type: "text"
      }
    });
    const wrapper = document.querySelector("#test");
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
    new Vue({
      template: `
        <div>
          <main v-curi-focus="$curi.response" tabIndex="-1" id="test">
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
    const vueWrapper = new Vue({
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
    it("warns when ref element does not have a tabIndex attribute", () => {
      const realWarn = console.error;
      const fakeWarn = (console.error = jest.fn());

      const wrapper = new Vue({
        template: `
          <div>
            <main v-curi-focus="$curi.response" id="test" />
          </div>
        `,
        el: node
      });
      expect(fakeWarn.mock.calls.length).toBe(1);
      expect(document.activeElement).toBe(document.body);
      console.error = realWarn;
    });

    it("does not warn when ref element does not have a tabIndex attribute, but ele is already focusable", () => {
      const realWarn = console.error;
      const fakeWarn = (console.error = jest.fn());

      const wrapper = new Vue({
        template: `
          <div>
            <input
              type="text"
              v-curi-focus="$curi.response"
              id="test"
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
