import "jest";
import { createLocalVue, shallow } from "@vue/test-utils";
import InMemory from "@hickory/in-memory";
import curi from "@curi/core";
import activeInteraction from "@curi/route-active";
import CuriPlugin from "../src/plugin";
import Link from "../src/Link";

describe("Link component", () => {
  describe("basics", () => {
    const history = InMemory();
    const routes = [
      { name: "Place", path: "place/:name" },
      { name: "Catch All", path: "(.*)" }
    ];
    const router = curi(history, routes);
    const Vue = createLocalVue();
    Vue.use(CuriPlugin, { router });

    it("renders an anchor element", () => {
      const wrapper = shallow(Link, {
        localVue: Vue,
        propsData: {
          to: "Place",
          params: { name: "Aruba" },
          text: "Aruba"
        }
      });
      expect(wrapper.is("a")).toBe(true);
    });

    it("computes the expected href using the props", () => {
      const wrapper = shallow(Link, {
        localVue: Vue,
        propsData: {
          to: "Place",
          params: { name: "Jamaica" },
          hash: "island-life",
          query: "two=2",
          text: "Jamaica"
        }
      });
      expect(wrapper.attributes().href).toBe(
        "/place/Jamaica?two=2#island-life"
      );
    });

    it('re-uses current pathname if "to" prop is not provided', () => {
      const Vue = createLocalVue();
      const history = InMemory({
        locations: ["/place/somewhere"]
      });
      const router = curi(history, routes);
      Vue.use(CuriPlugin, { router });
      const wrapper = shallow(Link, {
        localVue: Vue,
        propsData: {
          text: "somewhere"
        }
      });
      expect(wrapper.attributes().href).toBe("/place/somewhere");
    });

    it("sets the slots as the link's text", () => {
      const wrapper = shallow(Link, {
        localVue: Vue,
        slots: {
          default: "<span>Kokomo</span>"
        },
        propsData: {
          to: "Place",
          params: { name: "Kokomo" }
        }
      });
      expect(wrapper.text()).toBe("Kokomo");
    });
  });

  describe("clicking a <curi-link>", () => {
    const history = InMemory();
    const mockNavigate = jest.fn();
    history.navigate = mockNavigate;

    const routes = [
      { name: "Place", path: "place/:name" },
      { name: "Catch All", path: "(.*)" }
    ];
    const router = curi(history, routes);

    const Vue = createLocalVue();
    Vue.use(CuriPlugin, { router });

    afterEach(() => {
      mockNavigate.mockReset();
    });

    it("navigates to expected location when clicked", () => {
      const wrapper = shallow(Link, {
        localVue: Vue,
        propsData: {
          to: "Place",
          params: { name: "Bermuda" },
          query: "to=Bermuda",
          hash: "beach-boys",
          text: "Bermuda"
        }
      });

      expect(mockNavigate.mock.calls.length).toBe(0);
      wrapper.trigger("click", { button: 0 });
      expect(mockNavigate.mock.calls.length).toBe(1);
      expect(mockNavigate.mock.calls[0][0]).toEqual({
        pathname: "/place/Bermuda",
        query: "to=Bermuda",
        hash: "beach-boys"
      });
    });

    it("does not navigate if event.defaultPrevented is true", () => {
      const wrapper = shallow(Link, {
        localVue: Vue,
        propsData: {
          to: "Place",
          params: { name: "Bahamas" },
          text: "Bahamas",
          click: function(e) {
            e.preventDefault();
          }
        }
      });

      expect(mockNavigate.mock.calls.length).toBe(0);
      wrapper.trigger("click", { button: 0 });
      expect(mockNavigate.mock.calls.length).toBe(0);
    });

    it("does not navigate if a modifier key is held while clicking", () => {
      const wrapper = shallow(Link, {
        localVue: Vue,
        propsData: {
          to: "Place",
          params: { name: "Key Largo" },
          text: "Key Largo"
        }
      });

      expect(mockNavigate.mock.calls.length).toBe(0);
      const modifiers = ["metaKey", "altKey", "ctrlKey", "shiftKey"];
      modifiers.forEach(m => {
        wrapper.trigger("click", { [m]: true, button: 0 });
        expect(mockNavigate.mock.calls.length).toBe(0);
      });
    });

    it("does not navigate for non left mouse button clicks", () => {
      const wrapper = shallow(Link, {
        localVue: Vue,
        propsData: {
          to: "Place",
          params: { name: "Montego" },
          text: "Montego"
        }
      });

      expect(mockNavigate.mock.calls.length).toBe(0);
      wrapper.trigger("click", { button: 1 });
      expect(mockNavigate.mock.calls.length).toBe(0);
    });

    describe("click prop", () => {
      it("will be called prior to navigation", () => {
        const wrapper = shallow(Link, {
          localVue: Vue,
          propsData: {
            to: "Place",
            params: { name: "Montego" },
            text: "Montego",
            click: function(event) {
              expect(mockNavigate.mock.calls.length).toBe(0);
            }
          }
        });

        wrapper.trigger("click", { button: 0 });
        expect(mockNavigate.mock.calls.length).toBe(1);
      });

      it("calling event.preventDefault() in click fn will stop navigation", () => {
        const wrapper = shallow(Link, {
          localVue: Vue,
          propsData: {
            to: "Place",
            params: { name: "Montego" },
            text: "Montego",
            click: function(event) {
              event.preventDefault();
            }
          }
        });

        wrapper.trigger("click", { button: 0 });
        expect(mockNavigate.mock.calls.length).toBe(0);
      });
    });
  });
});
