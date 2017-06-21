import Vue from 'vue/dist/vue.common.js';
import { createMemoryHistory } from 'history';
import createConfig from '../../curi/src';
import CuriPlugin from '../src/plugin';
import Link from '../src/Link';

describe('Link component', () => {
  let LinkConstructor;
  const history = createMemoryHistory();
  history.push = jest.fn();

  const routes = [{ name: 'Place', path: '/place/:name' }];
  const config = createConfig(history, routes);
  Vue.use(CuriPlugin, { config });

  afterEach(() => {
    history.push.mockReset();
  });

  it('registers with the name curi-link', () => {
    expect(Vue.options.components['curi-link']).toBeDefined();
  });

  it('renders an anchor element', () => {
    const vm = new Vue({
      template: '<curi-link :to="to" :params="params">{{text}}</curi-link>',
      data: {
        to: 'Place',
        params: { name: 'Aruba' },
        text: 'Aruba'
      }
    }).$mount();
    expect(vm.$el.tagName).toBe('A');
  });

  it('computes the expected href using the props', () => {
    const vm = new Vue({
      template: '<curi-link :to="to" :params="params">{{text}}</curi-link>',
      data: {
        to: 'Place',
        params: { name: 'Jamaica' },
        text: 'Jamaica'
      }
    }).$mount();
    expect(vm.$el.href).toBe('/place/Jamaica');
  });

  it('navigates to expected location when clicked', () => {
    const vm = new Vue({
      template: `<curi-link :to="to" :params="params" :details="details">{{text}}</curi-link>`,
      data: {
        to: 'Place',
        params: { name: 'Bermuda' },
        details: {
          search: '?to=bahamas',
          hash: '#beach-boys'
        },
        text: 'Kokomo'
      }
    }).$mount();

    const mockClick = {
      defaultPrevented: false,
      preventDefault() {
        this.defaultPrevented = true;
      }
    };
    expect(history.push.mock.calls.length).toBe(0);
    vm.$el.click(mockClick);
    expect(history.push.mock.calls.length).toBe(1);
    expect(history.push.mock.calls[0][0]).toEqual({
      pathname: '/place/Bermuda',
      search: '?to=bahamas',
      hash: '#beach-boys'
    });
  });

  it("sets the slots as the link's text", () => {
    const vm = new Vue({
      template: `<curi-link :to="to" :params="params">{{text}}</curi-link>`,
      data: {
        to: 'Place',
        params: { name: 'Key+Largo' },
        text: 'Montego'
      }
    }).$mount();
    expect(vm.$el.textContent).toBe('Montego');
  });
});
