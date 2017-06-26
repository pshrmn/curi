import Vue from 'vue';
import CuriPlugin from '../src/plugin';
import createConfig from '../../curi/src';
import { InMemory } from 'hickory';

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
