import Vue from 'vue';
import { createMemoryHistory } from 'history';
import createConfig from 'curi';

import Link from '../src/Link';

describe('Link component', () => {
  let VueConstructor;
  let history;
  beforeEach(() => {
    VueConstructor = Vue.extend(Link);
    history = createMemoryHistory();
    jest.spyOn(history, 'push')
    const routes = [
      { name: 'Place', path: '/place/:name' }
    ];
    const config = createConfig(history, routes);
    VueConstructor.Curi = config;
    VueConstructor.component(Link.name, Link);

    Vue.Curi = config;
  });

  afterEach(() => {
    history.push.mockRestore();
  })

  it('registers with the name curi-link', () => {
    expect(VueConstructor.options.components['curi-link']).toBeDefined();
  });

  it('renders an anchor element', () => {
    const vm = new VueConstructor({
      propsData: {
        to: 'Place',
        params: { name: 'Aruba' }
      }
    }).$mount();
    const element = vm.$el;
    expect(element.tagName).toBe('A');
  });

  it('computes the expected href using the props', () => {
    const vm = new VueConstructor({
      propsData: {
        to: 'Place',
        params: { name: 'Aruba' }
      }
    }).$mount();
    const element = vm.$el;
    expect(vm.href).toBe('/place/Aruba');
  });

  it('computes the expected location using the props', () => {
    const vm = new VueConstructor({
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
    const vm = new VueConstructor({
      propsData: {
        to: 'Place',
        params: { name: 'Jamaica' },
        details: {
          search: '?to[]=bermuda&to[]=bahamas',
          hash: '#beach-boys'
        }
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
