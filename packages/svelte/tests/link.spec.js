import { getConfig, setConfig, Link } from '../dist/curi-svelte.common.js';
import InMemory from '@hickory/in-memory';
import createConfig from '@curi/core';

describe('<Link>', () => {
  it('renders an anchor with expected pathname', () => {
    const history = InMemory();
    const routes = [{ name: 'Home', path: '' }];
    const config = createConfig(history, routes);

    setConfig(config);

    const node = document.createElement('div');
    const link = new Link({
      target: node,
      data: {
        to: 'Home'
      }
    });

    const a = node.querySelector('a');
    expect(a).not.toBeUndefined();
    expect(a.href).toEqual('/');
  });

  it('uses params attribute to generate pathname', () => {
    const history = InMemory();
    const routes = [{ name: 'User', path: 'u/:id' }];
    const config = createConfig(history, routes);

    setConfig(config);

    const node = document.createElement('div');
    const link = new Link({
      target: node,
      data: {
        to: 'User',
        params: { id: '1' }
      }
    });

    const a = node.querySelector('a');
    expect(a.href).toEqual('/u/1');
  });

  it('appends details to end of URI', () => {
    const history = InMemory();
    const routes = [{ name: 'Home', path: '' }];
    const config = createConfig(history, routes);

    setConfig(config);

    const node = document.createElement('div');
    const link = new Link({
      target: node,
      data: {
        to: 'Home',
        details: { hash: 'test', query: 'one=two' }
      }
    });

    const a = node.querySelector('a');
    expect(a.href).toEqual('/?one=two#test');
  });
});
