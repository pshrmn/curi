import Vue from 'vue/dist/vue.common.js';
import { createMemoryHistory } from 'history';
import createConfig from 'curi';
import CuriPlugin from '../src/plugin';
import Redirect from '../src/Redirect';

describe('Redirect component', () => {
  const history = createMemoryHistory();
  history.replace = jest.fn();
  const routes = [{ name: 'Place', path: '/place/:name' }];
  const config = createConfig(history, routes);
  Vue.use(CuriPlugin, { config });

  afterEach(() => {
    history.replace.mockReset();
  });

  it('registers with the name curi-redirect', () => {
    expect(Vue.options.components['curi-redirect']).toBeDefined();
  });

  it('redirects to expected location after mounting', () => {
    expect(history.replace.mock.calls.length).toBe(0);
    const vm = new Vue({
      template: '<curi-redirect :to="to" :params="params" :details="details" />',
      data: {
        to: 'Place',
        params: { name: 'Jamaica' },
        details: {
          search: '?to[]=bermuda&to[]=bahamas',
          hash: '#beach-boys'
        }
      }
    }).$mount();
    const { calls } = history.replace.mock;
    expect(calls.length).toBe(1);
    expect(calls[0][0]).toEqual({
      pathname: '/place/Jamaica',
      search: '?to[]=bermuda&to[]=bahamas',
      hash: '#beach-boys'
    });
  });

  it('renders nothing when not given slots', () => {
    const vm = new Vue({
      template: '<curi-redirect :to="to" :params="params" :details="details" />',
      data: {
        to: 'Place',
        params: { name: 'Jamaica' },
        details: {
          search: '?to[]=bermuda&to[]=bahamas',
          hash: '#beach-boys'
        }
      }
    }).$mount();

    expect(vm.$el.textContent).toEqual('');
  });

  it('renders provided content', () => {
    const vm = new Vue({
      template: `<curi-redirect :to="to" :params="params" :details="details">
        Loading...
      </curi-redirect>`,
      data: {
        to: 'Place',
        params: { name: 'Jamaica' },
        details: {
          search: '?to[]=bermuda&to[]=bahamas',
          hash: '#beach-boys'
        }
      }
    }).$mount();

    expect(vm.$el.textContent.trim()).toEqual('Loading...');
  });

  it('warns when multiple slots are provided', () => {
    const warn = console.warn;
    console.warn = jest.fn();
    const vm = new Vue({
      template: `<curi-redirect :to="to" :params="params" :details="details">
        <div>Loading...</div><div>...still</div>
      </curi-redirect>`,
      data: {
        to: 'Place',
        params: { name: 'Jamaica' },
        details: {
          search: '?to[]=bermuda&to[]=bahamas',
          hash: '#beach-boys'
        }
      }
    }).$mount();

    expect(vm.$el.textContent.trim()).toEqual('Loading...');
    expect(console.warn.mock.calls.length).toBe(1);
    expect(console.warn.mock.calls[0][0]).toEqual(
      'A <curi-redirect> should only render one slot, but was given 2'
    );
    // restore
    console.warn = warn;
  });
});
