import "jest";
import { createLocalVue } from "@vue/test-utils";
import { inMemory } from "@hickory/in-memory";
import { createRouter, prepareRoutes } from "@curi/router";

import { CuriPlugin } from "@curi/vue";

describe("CuriPlugin", () => {
  let routes = prepareRoutes([{ name: "Catch All", path: "(.*)" }]);
  let router = createRouter(inMemory, routes);

  describe("$router", () => {
    it("Adds the router to global Vue vars as $router", () => {
      let Vue = createLocalVue();
      Vue.use(CuriPlugin, { router });
      let el = new Vue();
      // @ts-ignore
      expect(el.$router).toBe(router);
    });
  });

  describe("$curi", () => {
    it("Adds $curi property to all components", () => {
      let Vue = createLocalVue();
      let { response, navigation } = router.current();
      Vue.use(CuriPlugin, { router });

      let el = new Vue();
      // @ts-ignore
      expect(el.$curi.response).toBe(response);
      // @ts-ignore
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

      let router;
      let routes = prepareRoutes([
        { name: "Contact", path: "contact" },
        { name: "Catch All", path: "(.*)" }
      ]);

      beforeEach(() => {
        router = createRouter(inMemory, routes);
      });

      it("re-renders when updating curi object", done => {
        let Vue = createLocalVue();
        let FakeComponent = makeFake(done);

        let el;
        Vue.use(CuriPlugin, { router });
        if (!el) {
          el = new Vue({
            template: "<div><FakeComponent /></div>",
            components: { FakeComponent }
          }).$mount();
          let url = router.url({ name: "Contact" });
          router.navigate({ url });
        }
      });

      it("re-renders nested components", done => {
        let Vue = createLocalVue();
        let FakeComponent = makeFake(done);

        let wrapper;
        Vue.use(CuriPlugin, { router });

        if (!wrapper) {
          wrapper = new Vue({
            template: "<div><FakeComponent /></div>",
            components: { FakeComponent }
          }).$mount();
          let url = router.url({ name: "Contact" });
          router.navigate({ url });
        }
      });
    });
  });

  describe("registering components components", () => {
    it("Registers the Link component as <curi-link>", () => {
      let Vue = createLocalVue();
      Vue.use(CuriPlugin, { router });
      // @ts-ignore
      expect(Vue.options.components["curi-link"]).toBeDefined();
    });
  });
});
