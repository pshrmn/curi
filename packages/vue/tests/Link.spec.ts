import 'jest';
import { createLocalVue, shallow } from 'vue-test-utils';
import InMemory from '@hickory/in-memory';
import createConfig from '@curi/core';
import CuriPlugin from '../src/plugin';
import Link from '../src/Link';

describe('Link component', () => {
  const history = InMemory();
  const mockPush = jest.fn();
  history.push = mockPush;

  const routes = [{ name: 'Place', path: '/place/:name' }];
  const config = createConfig(history, routes);

  const Vue = createLocalVue();
  Vue.use(CuriPlugin, { config });

  afterEach(() => {
    mockPush.mockReset();
  });

  it('registers with the name curi-link', () => {
    expect(Vue.options.components['curi-link']).toBeDefined();
  });

  it('renders an anchor element', () => {
    const wrapper = shallow(Link, {
      localVue: Vue,
      propsData: {
        to: 'Place',
        params: { name: 'Aruba' },
        text: 'Aruba'
      }
    });
    expect(wrapper.is('a')).toBe(true);
  });

  it('computes the expected href using the props', () => {
    const wrapper = shallow(Link, {
      localVue: Vue,
      propsData: {
        to: 'Place',
        params: { name: 'Jamaica' },
        text: 'Jamaica'
      }
    });
    expect(wrapper.hasAttribute('href', '/place/Jamaica')).toBe(true);
  });

  describe('clicking a <curi-link>', () => {
    it('navigates to expected location when clicked', () => {
      const wrapper = shallow(Link, {
        localVue: Vue,
        propsData: {
          to: 'Place',
          params: { name: 'Bermuda' },
          details: {
            query: 'to=Bermuda',
            hash: 'beach-boys'
          },
          text: 'Bermuda'
        }
      });

      const mockClick = new MouseEvent('click');
      expect(mockPush.mock.calls.length).toBe(0);
      wrapper.vm.$el.dispatchEvent(mockClick);
      expect(mockPush.mock.calls.length).toBe(1);
      expect(mockPush.mock.calls[0][0]).toEqual({
        pathname: '/place/Bermuda',
        query: 'to=Bermuda',
        hash: 'beach-boys'
      });
    });

    it.skip('does not navigate if event.defaultPrevented is true', () => {
      // need to figure out how to do this. have not yet implemented
      // a click prop, which is where this would actually be triggered.
      const wrapper = shallow(Link, {
        localVue: Vue,
        propsData: {
          to: 'Place',
          params: { name: 'Bahamas' },
          text: 'Bahamas'
        }
      });

      const mockClick = new MouseEvent('click');
      mockClick.preventDefault();
      expect(mockPush.mock.calls.length).toBe(0);
      wrapper.vm.$el.dispatchEvent(mockClick);
      expect(mockPush.mock.calls.length).toBe(0);
    });

    it('does not navigate if a modifier key is held while clicking', () => {
      const wrapper = shallow(Link, {
        localVue: Vue,
        propsData: {
          to: 'Place',
          params: { name: 'Key Largo' },
          text: 'Key Largo'
        }
      });

      expect(mockPush.mock.calls.length).toBe(0);
      const modifiers = ['metaKey', 'altKey', 'ctrlKey', 'shiftKey'];
      modifiers.forEach(m => {
        const mockClick = new MouseEvent('click', {
          [m]: true
        });
        wrapper.vm.$el.dispatchEvent(mockClick);
        expect(mockPush.mock.calls.length).toBe(0);
      });
    });

    it('does not navigate for non left mouse button clicks', () => {
      const wrapper = shallow(Link, {
        localVue: Vue,
        propsData: {
          to: 'Place',
          params: { name: 'Montego' },
          text: 'Montego'
        }
      });
      const mockClick = new MouseEvent('click', { button: 1 });
      expect(mockPush.mock.calls.length).toBe(0);
      wrapper.vm.$el.dispatchEvent(mockClick);
      expect(mockPush.mock.calls.length).toBe(0);
    });
  });

  it("sets the slots as the link's text", () => {
    const wrapper = shallow(Link, {
      localVue: Vue,
      slots: {
        default: '<span>Kokomo</span>'
      },
      propsData: {
        to: 'Place',
        params: { name: 'Kokomo' }
      }
    });
    expect(wrapper.text()).toBe('Kokomo');
  });
});
