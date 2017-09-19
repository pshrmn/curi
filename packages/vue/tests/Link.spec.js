import Vue from 'vue/dist/vue.common.js';
import InMemory from '@hickory/in-memory';
import createConfig from '@curi/core';
import CuriPlugin from '../src/plugin';
import Link from '../src/Link';

describe('Link component', () => {
  const history = InMemory();
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

  describe('clicking a <curi-link>', () => {
    it('navigates to expected location when clicked', () => {
      const vm = new Vue({
        template: `<curi-link :to="to" :params="params" :details="details">{{text}}</curi-link>`,
        data: {
          to: 'Place',
          params: { name: 'Bermuda' },
          details: {
            query: 'to=Bermuda',
            hash: 'beach-boys'
          },
          text: 'Bermuda'
        }
      }).$mount();
  
      const mockClick = new MouseEvent('click');
      expect(history.push.mock.calls.length).toBe(0);
      vm.$el.dispatchEvent(mockClick);
      expect(history.push.mock.calls.length).toBe(1);
      expect(history.push.mock.calls[0][0]).toEqual({
        pathname: '/place/Bermuda',
        query: 'to=Bermuda',
        hash: 'beach-boys'
      });
    });

    it('does not navigate if event.defaultPrevented is true', () => {
      const vm = new Vue({
        template: `<curi-link :to="to" :params="params">{{text}}</curi-link>`,
        data: {
          to: 'Place',
          params: { name: 'Bahamas' },
          text: 'Bahamas'
        }
      }).$mount();
  
      const mockClick = new MouseEvent('click');
      mockClick.preventDefault();
      expect(history.push.mock.calls.length).toBe(0);
      vm.$el.click(mockClick);
      expect(history.push.mock.calls.length).toBe(0);
    });

    it('does not navigate if a modifier key is held while clicking', () => {
      const vm = new Vue({
        template: `<curi-link :to="to" :params="params">{{text}}</curi-link>`,
        data: {
          to: 'Place',
          params: { name: 'Key Largo' },
          text: 'Key Largo'
        }
      }).$mount();
  
      expect(history.push.mock.calls.length).toBe(0);
      const modifiers = ['metaKey', 'altKey', 'ctrlKey', 'shiftKey'];
      modifiers.forEach(m => {
        const mockClick = new MouseEvent('click', {
          [m]: true
        });
        vm.$el.click(mockClick);
        expect(history.push.mock.calls.length).toBe(0);
      })
    });

    it('does not navigate for non left mouse button clicks', () => {
      const vm = new Vue({
        template: `<curi-link :to="to" :params="params">{{text}}</curi-link>`,
        data: {
          to: 'Place',
          params: { name: 'Montego' },
          text: 'Montego'
        }
      }).$mount();
  
      const mockClick = new MouseEvent('click', { button: 1 });
      expect(history.push.mock.calls.length).toBe(0);
      vm.$el.click(mockClick);
      expect(history.push.mock.calls.length).toBe(0);
    });

  });

  it("sets the slots as the link's text", () => {
    const vm = new Vue({
      template: `<curi-link :to="to" :params="params">{{text}}</curi-link>`,
      data: {
        to: 'Place',
        params: { name: 'Kokomo' },
        text: 'Kokomo'
      }
    }).$mount();
    expect(vm.$el.textContent).toBe('Kokomo');
  });
});
