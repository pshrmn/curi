import "jest";
import { createLocalVue, shallow } from "@vue/test-utils";
import InMemory from "@hickory/in-memory";
import curi from "@curi/core";
import createActiveAddon from "@curi/addon-active";
import CuriPlugin from "../src/plugin";
import Link from "../src/Link";

describe("Link component", () => {
  describe("basics", () => {
    const history = InMemory();
    const routes = [{ name: "Place", path: "place/:name" }];
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
          text: "Jamaica"
        }
      });
      expect(wrapper.attributes().href).toBe("/place/Jamaica");
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

  describe("active", () => {
    const routes = [
      {
        name: "Places",
        path: "place",
        children: [{ name: "Place", path: ":name" }]
      }
    ];

    function merge(props) {
      props.class = "active";
      return props;
    }

    describe("without the @curi/addon-active addon", () => {
      const realError = console.error;
      console.error = jest.fn();

      afterEach(() => {
        console.error.mockReset();
      });

      afterAll(() => {
        console.error = realError;
      });

      it("is always non-active", done => {
        const Vue = createLocalVue();
        const history = InMemory({
          locations: ["/place/somewhere"]
        });
        const router = curi(history, routes);
        Vue.use(CuriPlugin, { router });
        router.respond(() => {
          const wrapper = shallow(Link, {
            localVue: Vue,
            propsData: {
              to: "Place",
              params: { name: "somewhere" },
              text: "somewhere",
              active: { merge }
            }
          });
          expect(wrapper.classes()).not.toContain("active");
          done();
        });
      });

      it("calls console.error", done => {
        const Vue = createLocalVue();
        const history = InMemory({
          locations: ["/place/somewhere"]
        });
        const router = curi(history, routes);
        Vue.use(CuriPlugin, { router });
        router.respond(() => {
          const wrapper = shallow(Link, {
            localVue: Vue,
            propsData: {
              to: "Place",
              params: { name: "somewhere" },
              text: "somewhere",
              active: { merge }
            }
          });
          expect(console.error.mock.calls.length).toBe(1);
          done();
        });
      });
    });

    describe("merge", () => {
      it("merges active props when the location is active", done => {
        const Vue = createLocalVue();
        const history = InMemory({
          locations: ["/place/somewhere"]
        });

        const router = curi(history, routes, {
          addons: [createActiveAddon()]
        });
        Vue.use(CuriPlugin, { router });
        router.respond(() => {
          const wrapper = shallow(Link, {
            localVue: Vue,
            propsData: {
              to: "Place",
              params: { name: "somewhere" },
              text: "somewhere",
              active: { merge }
            }
          });
          expect(wrapper.classes()).toContain("active");
          done();
        });
      });

      it("does not merge active props when the location is not active", done => {
        const Vue = createLocalVue();
        const history = InMemory({
          locations: ["/place/somewhere"]
        });

        const router = curi(history, routes, {
          addons: [createActiveAddon()]
        });
        Vue.use(CuriPlugin, { router });
        router.respond(() => {
          const wrapper = shallow(Link, {
            localVue: Vue,
            propsData: {
              to: "Place",
              params: { name: "nowhere" },
              text: "nowhere",
              active: { merge }
            }
          });
          expect(wrapper.classes()).not.toContain("active");
          done();
        });
      });
    });

    describe("partial", () => {
      it("merges active props for partial matches when active.partial = true", done => {
        const Vue = createLocalVue();
        const history = InMemory({
          locations: ["/place/somewhere"]
        });

        const router = curi(history, routes, {
          addons: [createActiveAddon()]
        });
        Vue.use(CuriPlugin, { router });
        router.respond(() => {
          const wrapper = shallow(Link, {
            localVue: Vue,
            propsData: {
              to: "Places",
              text: "Places",
              active: { merge, partial: true }
            }
          });
          expect(wrapper.classes()).toContain("active");
          done();
        });
      });

      it("does not merge active props for partial matches when active.partial is falsy", done => {
        const Vue = createLocalVue();
        const history = InMemory({
          locations: ["/place/somewhere"]
        });

        const router = curi(history, routes, {
          addons: [createActiveAddon()]
        });
        Vue.use(CuriPlugin, { router });
        router.respond(() => {
          const wrapper = shallow(Link, {
            localVue: Vue,
            propsData: {
              to: "Places",
              text: "Places",
              active: { merge }
            }
          });
          expect(wrapper.classes()).not.toContain("active");
          done();
        });
      });
    });

    describe("extra", () => {
      it("calls the extra function, passing it the location and details", done => {
        const Vue = createLocalVue();
        const history = InMemory({
          locations: ["/place/somewhere?test=ing"]
        });

        const router = curi(history, routes, {
          addons: [createActiveAddon()]
        });
        const details = { query: "test=ing" };

        function extra(loc, deets) {
          expect(loc).toBe(history.location);
          expect(deets).toBe(details);
          done();
          return true;
        }

        Vue.use(CuriPlugin, { router });
        router.respond(() => {
          const wrapper = shallow(Link, {
            localVue: Vue,
            propsData: {
              to: "Place",
              params: { name: "somewhere" },
              text: "somewhere",
              details,
              active: { merge, extra }
            }
          });
        });
      });

      it("sets active when extra returns true", done => {
        const Vue = createLocalVue();
        const history = InMemory({
          locations: ["/place/somewhere?test=ing"]
        });

        const router = curi(history, routes, {
          addons: [createActiveAddon()]
        });
        const details = { query: "test=ing" };

        function extra() {
          return true;
        }

        Vue.use(CuriPlugin, { router });
        router.respond(() => {
          const wrapper = shallow(Link, {
            localVue: Vue,
            propsData: {
              to: "Place",
              params: { name: "somewhere" },
              text: "somewhere",
              details,
              active: { merge, extra }
            }
          });
          expect(wrapper.classes()).toContain("active");
          done();
        });
      });

      it("does not set active when extra returns false", done => {
        const Vue = createLocalVue();
        const history = InMemory({
          locations: ["/place/somewhere?test=ing"]
        });

        const router = curi(history, routes, {
          addons: [createActiveAddon()]
        });
        const details = { query: "test=ing" };

        function extra() {
          return false;
        }

        Vue.use(CuriPlugin, { router });
        router.respond(() => {
          const wrapper = shallow(Link, {
            localVue: Vue,
            propsData: {
              to: "Place",
              params: { name: "somewhere" },
              text: "somewhere",
              details,
              active: { merge, extra }
            }
          });
          expect(wrapper.classes()).not.toContain("active");
          done();
        });
      });
    });

    describe("location changes", () => {
      it("recomputes active using new response", done => {
        const Vue = createLocalVue();
        const history = InMemory({
          locations: ["/place/somewhere"]
        });
        const router = curi(history, routes, {
          addons: [createActiveAddon()]
        });
        Vue.use(CuriPlugin, { router });
        let wrapper;
        router.respond(
          () => {
            if (!wrapper) {
              wrapper = shallow(Link, {
                localVue: Vue,
                propsData: {
                  to: "Place",
                  params: { name: "somewhere" },
                  text: "somewhere",
                  active: { merge }
                }
              });
              expect(wrapper.classes()).toContain("active");
              router.history.push("/place/nowhere");
            } else {
              Vue.nextTick(() => {
                expect(wrapper.classes()).not.toContain("active");
                done();
              });
            }
          },
          { observe: true }
        );
      });
    });
  });

  describe("clicking a <curi-link>", () => {
    const history = InMemory();
    const mockNavigate = jest.fn();
    history.navigate = mockNavigate;

    const routes = [{ name: "Place", path: "place/:name" }];
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
          details: {
            query: "to=Bermuda",
            hash: "beach-boys"
          },
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
