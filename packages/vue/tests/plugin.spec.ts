import "jest";
import { createLocalVue, shallow, mount } from "@vue/test-utils";
import curi from "@curi/core";
import InMemory from "@hickory/in-memory";
import CuriPlugin from "../src/plugin";

describe("CuriPlugin", () => {
  const history = InMemory();
  const routes = [];
  const router = curi(history, routes);

  describe("$router", () => {
    it("Adds the router to global Vue vars as $router", () => {
      const Vue = createLocalVue();
      const FakeComponent = {
        render: function(h) {
          return h("div");
        }
      };
      Vue.use(CuriPlugin, { router });

      const wrapper = shallow(FakeComponent, {
        localVue: Vue
      });

      expect(wrapper.vm.$router).toBe(router);
    });
  });

  describe("$curi", () => {
    it("Adds $curi property to all components", done => {
      const Vue = createLocalVue();
      const FakeComponent = {
        render: function(h) {
          return h("div");
        }
      };
      router.respond(
        (response, action) => {
          Vue.use(CuriPlugin, { router });

          const wrapper = shallow(FakeComponent, {
            localVue: Vue
          });

          expect(wrapper.vm.$curi.response).toBe(response);
          expect(wrapper.vm.$curi.action).toBe(action);

          done();
        },
        { once: true }
      );
    });

    describe("reactive properties", () => {
      function makeFake(done) {
        return {
          render: function(h) {
            // need to include response to trigger re-render
            return h("div", {}, this.$curi.response.location.pathname);
          },
          mounted: function() {
            expect(this.$curi.response.location.pathname).toBe("/");
          },
          updated: function() {
            expect(this.$curi.response.location.pathname).toBe("/another-one");
            done();
          }
        };
      }

      let history, router;
      const routes = [];

      beforeEach(() => {
        history = InMemory();
        router = curi(history, routes);
      });

      it("re-renders when updating curi object", done => {
        const Vue = createLocalVue();
        const FakeComponent = makeFake(done);

        let wrapper;
        Vue.use(CuriPlugin, { router });

        router.respond((response, action) => {
          if (!wrapper) {
            wrapper = shallow(FakeComponent, {
              localVue: Vue
            });
            router.history.push("/another-one");
          }
        });
      });

      it("re-renders nested components", done => {
        const Vue = createLocalVue();
        const FakeComponent = makeFake(done);

        let wrapper;
        Vue.use(CuriPlugin, { router });

        router.respond((response, action) => {
          if (!wrapper) {
            wrapper = mount(
              {
                template: "<div><FakeComponent /></div>",
                components: { FakeComponent }
              },
              {
                localVue: Vue
              }
            );
            router.history.push("/another-one");
          }
        });
      });
    });
  });

  describe("<curi-link>", () => {
    it("Registers the Link component as <curi-link>", () => {
      const Vue = createLocalVue();
      Vue.use(CuriPlugin, {
        router,
        curi: { router, response: null, action: null }
      });
      expect(Vue.options.components["curi-link"]).toBeDefined();
    });
  });

  describe("<curi-block>", () => {
    it("Registers the Block component as <curi-block>", () => {
      const Vue = createLocalVue();
      Vue.use(CuriPlugin, {
        router,
        curi: { router, response: null, action: null }
      });
      expect(Vue.options.components["curi-block"]).toBeDefined();
    });
  });
});
