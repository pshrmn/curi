import 'jest';
import Vue from 'vue/dist/vue.common.js';
import CuriPlugin from '../src/plugin';
import createConfig from '@curi/core';
import InMemory from '@hickory/in-memory';

describe('CuriPlugin', () => {
  const history = InMemory();
  const routes = [];
  const config = createConfig(history, routes);
  Vue.use(CuriPlugin, { config });

  it('Adds a mixin that sets $curi for all components', () => {
    const FakeComponent = {
      render: function(h) {
        return h('div');
      }
    };
    const fakeConsructor = Vue.extend(FakeComponent);
    const vm = new fakeConsructor().$mount();
    expect(vm.$curi).toBe(config);
  });

  it('Adds the Link component as <curi-link>', () => {
    expect(Vue.options.components['curi-link']).toBeDefined();
  });
});
