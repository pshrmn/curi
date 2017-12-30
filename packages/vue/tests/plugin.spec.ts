import 'jest';
import { createLocalVue, shallow, mount } from 'vue-test-utils';
import curi from '@curi/core';
import InMemory from '@hickory/in-memory';
import CuriPlugin from '../src/plugin';
import reactiveCuri from '../src/reactive';

describe('CuriPlugin', () => {
  const history = InMemory();
  const routes = [];
  const router = curi(history, routes);

  describe('$curi', () => {
    it('Adds a mixin that sets $curi property for all components', done => {
      const Vue = createLocalVue();
      const FakeComponent = {
        render: function(h) {
          return h('div');
        }
      };
      router.respond(
        (response, action) => {
          const curi = reactiveCuri(router);
          Vue.use(CuriPlugin, { curi });

          const wrapper = shallow(FakeComponent, {
            localVue: Vue
          });

          expect(wrapper.vm.$curi.router).toBe(router);
          expect(wrapper.vm.$curi.response).toBe(null);
          expect(wrapper.vm.$curi.action).toBe(null);

          done();
        },
        { once: true }
      );
    });

    describe('reactive properties', () => {
      function makeFake(done) {
        return {
          render: function(h) {
            // need to include response to trigger re-render
            return h('div', {}, this.$curi.response.location.pathname);
          },
          mounted: function() {
            expect(this.$curi.response.location.pathname).toBe('/');
          },
          updated: function() {
            expect(this.$curi.response.location.pathname).toBe('/another-one');
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

      it('re-renders when updating curi object', done => {
        const Vue = createLocalVue();
        const FakeComponent = makeFake(done);

        let wrapper;
        const curi = reactiveCuri(router);
        Vue.use(CuriPlugin, { curi });

        router.respond((response, action) => {
          curi.response = response;
          curi.action = action;

          if (!wrapper) {
            wrapper = shallow(FakeComponent, {
              localVue: Vue
            });
            router.history.push('/another-one');
          }
        });
      });

      it('re-renders nested components', done => {
        const Vue = createLocalVue();
        const FakeComponent = makeFake(done);

        let wrapper;
        const curi = reactiveCuri(router);
        Vue.use(CuriPlugin, { curi });

        router.respond((response, action) => {
          curi.response = response;
          curi.action = action;
          if (!wrapper) {
            wrapper = mount(
              {
                template: '<div><FakeComponent /></div>',
                components: { FakeComponent }
              },
              {
                localVue: Vue
              }
            );
            router.history.push('/another-one');
          }
        });
      });
    });
  });

  describe('<curi-link>', () => {
    it('Registers the Link component as <curi-link>', () => {
      const Vue = createLocalVue();
      Vue.use(CuriPlugin, {
        curi: { router, response: null, action: null }
      });
      expect(Vue.options.components['curi-link']).toBeDefined();
    });
  });

  describe('<curi-block>', () => {
    it('Registers the Block component as <curi-block>', () => {
      const Vue = createLocalVue();
      Vue.use(CuriPlugin, {
        curi: { router, response: null, action: null }
      });
      expect(Vue.options.components['curi-block']).toBeDefined();
    });
  });
});
