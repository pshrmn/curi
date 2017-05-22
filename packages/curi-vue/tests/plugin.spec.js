import Vue from 'vue';
import CuriPlugin from '../src/plugin';
import createConfig from 'curi';
import { createMemoryHistory } from 'history';

describe('CuriPlugin', () => {
  const history = createMemoryHistory();
  const routes = [];
  const config = createConfig(history, routes);
  Vue.use(CuriPlugin, { config });

  it('Adds the config as a Vue global called Curi', () => {
    expect(Vue.$curi).toBe(config);
  });

  it('Adds the Link component as <curi-link>', () => {
    expect(Vue.options.components['curi-link']).toBeDefined();
  });
});
