import Vue from 'vue';
import { createMemoryHistory } from 'history';
import createConfig from 'curi';

import Link from '../src/Link';

describe('Link component', () => {
  let LinkConstructor;
  let history;
  let config;
  beforeEach(() => {
    LinkConstructor = Vue.extend(Link);
    history = createMemoryHistory();
    jest.spyOn(history, 'push')
    const routes = [
      { name: 'Place', path: '/place/:name' }
    ];
    config = createConfig(history, routes);
    LinkConstructor.Curi = config;
    LinkConstructor.component(Link.name, Link);
    Vue.$curi = config;
  });

  afterEach(() => {
    history.push.mockRestore();
  })

  it('registers with the name curi-link', () => {
    expect(LinkConstructor.options.components['curi-link']).toBeDefined();
  });

  it('renders an anchor element', () => {
    const vm = new LinkConstructor({
      propsData: {
        to: 'Place',
        params: { name: 'Aruba' }
      },
      curi: config
    }).$mount();
    const element = vm.$el;
    expect(element.tagName).toBe('A');
  });

  it('computes the expected href using the props', () => {
    const vm = new LinkConstructor({
      propsData: {
        to: 'Place',
        params: { name: 'Aruba' }
      }
    }).$mount();
    const element = vm.$el;
    expect(vm.href).toBe('/place/Aruba');
  });

  it('computes the expected location using the props', () => {
    const vm = new LinkConstructor({
      propsData: {
        to: 'Place',
        params: { name: 'Jamaica' },
        details: {
          search: '?to[]=bermuda&to[]=bahamas',
          hash: '#beach-boys'
        }
      }
    }).$mount();
    const element = vm.$el;
    expect(vm.location).toEqual({
      pathname: '/place/Jamaica',
      search: '?to[]=bermuda&to[]=bahamas',
      hash: '#beach-boys'
    });
  });

  it('navigates when clicked', () => {
    const vm = new LinkConstructor({
      propsData: {
        to: 'Place',
        params: { name: 'Key+Largo' },
      }
    }).$mount();
    expect(history.push.mock.calls.length).toBe(0);
    const mockClick = {
      defaultPrevented: false,
      preventDefault() {
        this.defaultPrevented = true;
      }
    };
    vm.click(mockClick);
    expect(history.push.mock.calls.length).toBe(1);
  });
});
