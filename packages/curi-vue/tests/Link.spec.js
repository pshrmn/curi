import Vue from 'vue';
import { createMemoryHistory } from 'history';
import createConfig from 'curi';
import CuriPlugin from '../src/plugin';
import Link from '../src/Link';

describe('Link component', () => {
  let LinkConstructor;
  const history = createMemoryHistory();
  history.push = jest.fn();

  const routes = [
    { name: 'Place', path: '/place/:name' }
  ];
  const config = createConfig(history, routes);

  beforeEach(() => {
    LinkConstructor = Vue.extend(Link);
    LinkConstructor.use(CuriPlugin, { config });
  });

  afterEach(() => {
    history.push.mockReset();
  });

  it('registers with the name curi-link', () => {
    expect(LinkConstructor.options.components['curi-link']).toBeDefined();
  });

  it('renders an anchor element', () => {
    const vm = new LinkConstructor({
      propsData: {
        to: 'Place',
        params: { name: 'Aruba' }
      }
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
    const mockClick = {
      defaultPrevented: false,
      preventDefault() {
        this.defaultPrevented = true;
      }
    };
    expect(history.push.mock.calls.length).toBe(0);
    vm.click(mockClick);
    expect(history.push.mock.calls.length).toBe(1);
  });
});
