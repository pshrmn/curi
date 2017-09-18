import { getConfig, setConfig, Link } from '../dist/curi-svelte.common.js';
import InMemory from '@hickory/in-memory';
import createConfig from '@curi/core';
import simulant from 'simulant';

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

  describe('clicking a <Link>', () => {
    it('will navigate to the new location', () => {
      const history = InMemory();
      history.update = jest.fn();
      const routes = [{ name: 'User', path: 'u/:id' }];
      const config = createConfig(history, routes);
      
      setConfig(config);
      
      const node = document.createElement('div');
      const link = new Link({
        target: node,
        data: {
          to: 'User',
          params: { id: 1 }
        }
      });

      const a = node.querySelector('a');
      const event = simulant('click');
      simulant.fire(a, event);
      expect(history.update.mock.calls.length).toBe(1);
    });

    it('will ignore modified clicks', () => {
      const history = InMemory();
      history.update = jest.fn();
      const routes = [{ name: 'User', path: 'u/:id' }];
      const config = createConfig(history, routes);

      setConfig(config);
      
      const node = document.createElement('div');
      const link = new Link({
        target: node,
        data: {
          to: 'User',
          params: { id: 2 }
        }
      });

      const a = node.querySelector('a');

      const modifiers = ['metaKey', 'altKey', 'ctrlKey', 'shiftKey'];
      modifiers.forEach(m => {
        simulant.fire(a, 'click', { [m]: true });
        expect(history.update.mock.calls.length).toBe(0);
      });
    });

    it('will ignore click if event.preventDefault is true', () => {
      const history = InMemory();
      history.update = jest.fn();
      const routes = [{ name: 'User', path: 'u/:id' }];
      const config = createConfig(history, routes);

      setConfig(config);
      
      const node = document.createElement('div');
      const link = new Link({
        target: node,
        data: {
          to: 'User',
          params: { id: 3 }
        }
      });

      const a = node.querySelector('a');
      const event = simulant('click');
      event.preventDefault();
      simulant.fire(a, event);
      expect(history.update.mock.calls.length).toBe(0);
    });

    it('will ignore click if not done with left mouse button', () => {
      const history = InMemory();
      history.update = jest.fn();
      const routes = [{ name: 'User', path: 'u/:id' }];
      const config = createConfig(history, routes);

      setConfig(config);
      
      const node = document.createElement('div');
      const link = new Link({
        target: node,
        data: {
          to: 'User',
          params: { id: 3 }
        }
      });

      const a = node.querySelector('a');
      const event = simulant('click', { button: 1 });
      simulant.fire(a, event);
      expect(history.update.mock.calls.length).toBe(0);
    });
  });
});
