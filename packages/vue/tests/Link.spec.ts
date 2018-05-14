import "jest";
import { createLocalVue } from "@vue/test-utils";
import InMemory from "@hickory/in-memory";

import curi from "@curi/core";
import CuriPlugin from "../src/plugin";

describe("<curi-link>", () => {
  let Vue, node, history, router;
  const routes = [
    { name: "Place", path: "place/:name" },
    { name: "Catch All", path: "(.*)" }
  ];

  beforeEach(() => {
    node = document.createElement("div");
    document.body.appendChild(node);

    history = InMemory();
    router = curi(history, routes);

    Vue = createLocalVue();
    Vue.use(CuriPlugin, { router });
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("rendering", () => {
    it("renders an anchor element", () => {
      const wrapper = new Vue({
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
      const wrapper = new Vue({
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

      const wrapper = new Vue({
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
      const wrapper = new Vue({
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
      const wrapper = new Vue({
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

    it("does not navigate if event.defaultPrevented is true", () => {
      const wrapper = new Vue({
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
      const wrapper = new Vue({
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
      const wrapper = new Vue({
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
        const wrapper = new Vue({
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
        const wrapper = new Vue({
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
