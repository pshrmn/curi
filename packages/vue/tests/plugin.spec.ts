import 'jest';
import { createLocalVue, shallow } from 'vue-test-utils';
import CuriPlugin from '../src/plugin';
import createConfig from '@curi/core';
import InMemory from '@hickory/in-memory';

describe('CuriPlugin', () => {
  const history = InMemory();
  const routes = [];
  const config = createConfig(history, routes);

  it('Adds a mixin that sets $curi property for all components', done => {
    const Vue = createLocalVue();
    const FakeComponent = {
      render: function(h) {
        return h('div');
      }
    };
    let curi;
    config.subscribe(
      (response, action) => {
        curi = { config, response, action };
        Vue.use(CuriPlugin, { curi });
        const wrapper = shallow(FakeComponent, {
          localVue: Vue
        });

        expect(wrapper.vm.$curi).toMatchObject({
          config,
          response,
          action
        });
        done();
      },
      { once: true }
    );
  });

  it('Adds the Link component as <curi-link>', () => {
    const Vue = createLocalVue();
    Vue.use(CuriPlugin, {
      curi: { config, response: null, action: null }
    });
    expect(Vue.options.components['curi-link']).toBeDefined();
  });

  it('Adds the Block component as <curi-block>', () => {
    const Vue = createLocalVue();
    Vue.use(CuriPlugin, {
      curi: { config, response: null, action: null }
    });
    expect(Vue.options.components['curi-block']).toBeDefined();
  });

  it('re-renders when updating curi object', done => {
    const Vue = createLocalVue();
    let renderCount = 0;
    const FakeComponent = {
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

    let wrapper,
      curi = { config };
    Vue.use(CuriPlugin, { curi });

    config.subscribe((response, action) => {
      curi = Object.assign(curi, { response, action });
      if (!wrapper) {
        wrapper = shallow(FakeComponent, {
          localVue: Vue
        });
        config.history.push('/another-one');
      }
    });
  });
});
