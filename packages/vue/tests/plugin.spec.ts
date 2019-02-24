import "jest";
import { createLocalVue } from "@vue/test-utils";
import { InMemory } from "@hickory/in-memory";
import { curi, prepareRoutes } from "@curi/router";

import { CuriPlugin } from "@curi/vue";

describe("CuriPlugin", () => {
  const history = InMemory();
  const routes = prepareRoutes([{ name: "Catch All", path: "(.*)" }]);
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
      const el = new Vue();
      expect(el.$router).toBe(router);
    });
  });

  describe("$curi", () => {
    it("Adds $curi property to all components", () => {
      const Vue = createLocalVue();
      const FakeComponent = {
        render: function(h) {
          return h("div");
        }
      };
      const { response, navigation } = router.current();
      Vue.use(CuriPlugin, { router });

      const el = new Vue();
      expect(el.$curi.response).toBe(response);
      expect(el.$curi.navigation).toBe(navigation);
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
            expect(this.$curi.response.location.pathname).toBe("/contact");
            done();
          }
        };
      }

      let history, router;
      const routes = prepareRoutes([
        { name: "Contact", path: "contact" },
        { name: "Catch All", path: "(.*)" }
      ]);

      beforeEach(() => {
        history = InMemory();
        router = curi(history, routes);
      });

      it("re-renders when updating curi object", done => {
        const Vue = createLocalVue();
        const FakeComponent = makeFake(done);

        let el;
        Vue.use(CuriPlugin, { router });
        if (!el) {
          el = new Vue({
            template: "<div><FakeComponent /></div>",
            components: { FakeComponent }
          }).$mount();
          router.navigate({ name: "Contact" });
        }
      });

      it("re-renders nested components", done => {
        const Vue = createLocalVue();
        const FakeComponent = makeFake(done);

        let wrapper;
        Vue.use(CuriPlugin, { router });

        if (!wrapper) {
          wrapper = new Vue({
            template: "<div><FakeComponent /></div>",
            components: { FakeComponent }
          }).$mount();
          router.navigate({ name: "Contact" });
        }
      });
    });
  });

  describe("registering components components", () => {
    it("Registers the Link component as <curi-link>", () => {
      const Vue = createLocalVue();
      Vue.use(CuriPlugin, { router });
      expect(Vue.options.components["curi-link"]).toBeDefined();
    });

    it("Registers the Block component as <curi-block>", () => {
      const Vue = createLocalVue();
      Vue.use(CuriPlugin, { router });
      expect(Vue.options.components["curi-block"]).toBeDefined();
    });
  });
});
