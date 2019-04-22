import "jest";
import { createLocalVue } from "@vue/test-utils";
import { inMemory } from "@hickory/in-memory";
import { createRouter, prepareRoutes } from "@curi/router";

import { CuriPlugin } from "@curi/vue";

describe("<curi-link>", () => {
  let Vue, node, router, wrapper;
  const routes = prepareRoutes({
    routes: [
      { name: "Place", path: "place/:name" },
      { name: "Catch All", path: "(.*)" }
    ]
  });

  beforeEach(() => {
    node = document.createElement("div");
    document.body.appendChild(node);

    router = createRouter(inMemory, routes);

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
            <curi-link name="Place" :params="{ name: 'Aruba' }">
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
              name="Place"
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

    it("if name is not provided, pathname is inherited from current location", () => {
      const Vue = createLocalVue();
      const router = createRouter(inMemory, routes, {
        history: {
          locations: [{ url: "/place/somewhere" }]
        }
      });
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
            <curi-link name="Place" :params="{ name: 'Kokomo' }">
              <span>Kokomo</span>
            </curi-link>
          </div>
        `
      });
      const a = document.querySelector("a");
      expect(a.textContent).toBe("Kokomo");
    });

    it("spreads forward object onto anchor", () => {
      wrapper = new Vue({
        el: node,
        template: `
          <div>
            <curi-link
              name="Place"
              :params="{ name: 'Aruba' }"
              :forward="{ class: 'hooray' }"
            >
              Aruba
            </curi-link>
          </div>
        `
      });
      const a = document.querySelector("a");
      expect(a.classList.contains("hooray")).toBe(true);
    });
  });

  describe("clicking a <curi-link>", () => {
    let mockNavigate;
    beforeEach(() => {
      mockNavigate = jest.fn();
      router.history.navigate = mockNavigate;
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
              name="Place"
              :params="{ name: 'Bermuda' }"
              hash="beach-boys"
              query="name=Bermuda"
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
      expect(mockNavigate.mock.calls[0][0]).toMatchObject({
        url: "/place/Bermuda?name=Bermuda#beach-boys"
      });
    });

    it("does not navigate if event.defaultPrevented is true", () => {
      wrapper = new Vue({
        el: node,
        template: `
          <div>
            <curi-link name="Place" :params="{ name: 'Bahamas' }" :click="click">
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
            <curi-link name="Place" :params="{ name: 'Key Largo' }">
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
            <curi-link name="Place" :params="{ name: 'Montego' }">
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
              <curi-link name="Place" :params="{ name: 'Montego' }" :click="click">
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
              <curi-link name="Place" :params="{ name: 'Montego' }" :click="click">
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
