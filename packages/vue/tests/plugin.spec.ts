import 'jest';
import { createLocalVue, shallow, mount } from 'vue-test-utils';
import createConfig from '@curi/core';
import InMemory from '@hickory/in-memory';
import CuriPlugin from '../src/plugin';
import reactiveCuri from '../src/reactive';

describe('CuriPlugin', () => {
  const history = InMemory();
  const routes = [];
  const config = createConfig(history, routes);

  describe('$curi', () => {
    it('Adds a mixin that sets $curi property for all components', done => {
      const Vue = createLocalVue();
      const FakeComponent = {
        render: function(h) {
          return h('div');
        }
      };
      config.respond(
        (response, action) => {
          const curi = reactiveCuri(config);
          Vue.use(CuriPlugin, { curi });

          const wrapper = shallow(FakeComponent, {
            localVue: Vue
          });

          expect(wrapper.vm.$curi.config).toBe(config);
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

      let history, config;
      const routes = [];

      beforeEach(() => {
        history = InMemory();
        config = createConfig(history, routes);
      });

      it('re-renders when updating curi object', done => {
        const Vue = createLocalVue();
        const FakeComponent = makeFake(done);

        let wrapper;
        const curi = reactiveCuri(config);
        Vue.use(CuriPlugin, { curi });

        config.respond((response, action) => {
          curi.response = response;
          curi.action = action;

          if (!wrapper) {
            wrapper = shallow(FakeComponent, {
              localVue: Vue
            });
            config.history.push('/another-one');
          }
        });
      });

      it('re-renders nested components', done => {
        const Vue = createLocalVue();
        const FakeComponent = makeFake(done);

        let wrapper;
        const curi = reactiveCuri(config);
        Vue.use(CuriPlugin, { curi });

        config.respond((response, action) => {
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
            config.history.push('/another-one');
          }
        });
      });
    });
  });

  describe('<curi-link>', () => {
    it('Registers the Link component as <curi-link>', () => {
      const Vue = createLocalVue();
      Vue.use(CuriPlugin, {
        curi: { config, response: null, action: null }
      });
      expect(Vue.options.components['curi-link']).toBeDefined();
    });
  });

  describe('<curi-block>', () => {
    it('Registers the Block component as <curi-block>', () => {
      const Vue = createLocalVue();
      Vue.use(CuriPlugin, {
        curi: { config, response: null, action: null }
      });
      expect(Vue.options.components['curi-block']).toBeDefined();
    });
  });
});
