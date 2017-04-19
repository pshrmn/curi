import React from 'react';
import { shallow, mount } from 'enzyme';
import { createMemoryHistory } from 'history';
import prefetchAddon from 'curi/lib/addons/prefetch';
import pathnameAddon from 'curi/lib/addons/pathname';
import { createConfig } from '../../curi/src';
import Link from '../src/Link';

describe('<Link>', () => {
  it('errors if it cannot access a curi config', () => {
    const err = console.error;
    console.error = () => {};

    expect(() => {
      shallow(<Link name="Test">Test</Link>);
    }).toThrow();

    console.error = err;
  });

  it('renders an <a>', () => {
    const history = createMemoryHistory();
    const config = createConfig(history, [{ name: 'Test', path: '' }]);
    const wrapper = shallow(<Link name="Test">Test</Link>, {
      context: { curi: config }
    });
    const a = wrapper.find('a');
    expect(a.exists()).toBe(true);
  });


  describe('name', () => {
    it('sets the href attribute using the named route\'s path', () => {
      const history = createMemoryHistory();
      const config = createConfig(history, [{ name: 'Test', path: '' }]);
      const wrapper = shallow(<Link name="Test">Test</Link>, {
        context: { curi: config }
      });
      const a = wrapper.find('a');
      expect(a.prop('href')).toBe('/');
    });

    it('defaults to pathname="/" if name is not provided', () => {
      const history = createMemoryHistory();
      const config = createConfig(history, []);
      const wrapper = shallow(<Link>Test</Link>, {
        context: { curi: config }
      });
      const a = wrapper.find('a');
      expect(a.prop('href')).toBe('/');
    });
  });

  describe('params', () => {
    it('uses params to generate the href', () => {
      const history = createMemoryHistory();
      const config = createConfig(history, [
        { name: 'Park', path: '/park/:name' }
      ]);
      const params = { name: 'Glacier' };
      const wrapper = shallow(<Link name="Park" params={params}>Test</Link>, {
        context: { curi: config }
      });
      const a = wrapper.find('a');
      expect(a.prop('href')).toBe('/park/Glacier');
    });

    it('updates href when props change', () => {
      const history = createMemoryHistory();
      const config = createConfig(history, [
        { name: 'Park', path: '/park/:name' }
      ]);
      const params = { name: 'Glacier' };
      const wrapper = shallow(<Link name="Park" params={params}>Test</Link>, {
        context: { curi: config }
      });
      let a = wrapper.find('a');
      expect(a.prop('href')).toBe('/park/Glacier');

      wrapper.setProps({ params: { name: 'Yellowstone' } });
      a = wrapper.find('a');
      expect(a.prop('href')).toBe('/park/Yellowstone');
    });
  });

  describe('to', () => {
    it('merges the to prop with the generated pathname when navigating', () => {
      const history = createMemoryHistory();
      const config = createConfig(history, [
        { name: 'Test', path: 'test' }
      ]);
      const wrapper = shallow(
        <Link name="Test" to={{ search: '?one=two', hash: '#hashtag' }}>
          Test
        </Link>,
        { context: { curi: config } }
      );
      const a = wrapper.find('a');
      expect(a.prop('href')).toBe('/test?one=two#hashtag');
    });

    it('overwrites the generated pathname if to includes one', () => {
      const history = createMemoryHistory();
      const config = createConfig(history, [
        { name: 'Test', path: 'test' }
      ]);
      const wrapper = shallow(
        <Link name="Test" to={{ pathname: '/not-a-test' }}>Test</Link>,
        { context: { curi: config } }
      );
      const a = wrapper.find('a');
      expect(a.prop('href')).toBe('/not-a-test');
    });
  });

  describe('prefetch', () => {
    it('errors if using prefetch without prefetch addon', () => {
      const history = createMemoryHistory();
      const config = createConfig(history, [
        { name: 'Test', path: 'test' }
      ]);
      expect(() => {
        const wrapper = shallow(
          <Link prefetch name="Test" to={{ pathname: '/not-a-test' }}>Test</Link>,
          { context: { curi: config } }
        );
      }).toThrow()
    });

    it('calls named route\'s load method before navigating', (done) => {
      const history = createMemoryHistory();
      let loadHasBeenCalled = false;
      history.push = jest.fn(() => {
        // ensure that route.load was called before pushing
        expect(loadHasBeenCalled).toBe(true);
        done();
      });
      const testRoute = {
        name: 'Test',
        path: 'test',
        load: jest.fn(() => {
          loadHasBeenCalled = true;
          return Promise.resolve();
        })
      };
      const config = createConfig(
        history,
        [testRoute],
        [pathnameAddon, prefetchAddon]
      );

      const leftClickEvent = {
        defaultPrevented: false,
        preventDefault() {
          this.defaultPrevented = true;
        },
        metaKey: null,
        altKey: null,
        ctrlKey: null,
        shiftKey: null,
        button: 0
      };

      const wrapper = shallow(
        <Link prefetch name="Test" to={{ pathname: '/not-a-test' }}>Test</Link>,
        { context: { curi: config } }
      );

      wrapper.find('a').simulate('click', leftClickEvent);
    });
  });

  describe('clicking a link', () => {
    it('calls history.push', () => {
      const history = createMemoryHistory();
      history.push = jest.fn();

      const config = createConfig(history, [{ name: 'Test', path: '' }]);
      const wrapper = shallow(<Link name="Test">Test</Link>, {
        context: { curi: config }
      });
      const leftClickEvent = {
        defaultPrevented: false,
        preventDefault() {
          this.defaultPrevented = true;
        },
        metaKey: null,
        altKey: null,
        ctrlKey: null,
        shiftKey: null,
        button: 0
      };
      wrapper.find('a').simulate('click', leftClickEvent);
      expect(history.push.mock.calls.length).toBe(1);
    });

    describe('onClick', () => {
      it('calls onClick prop func if provided', () => {
        const history = createMemoryHistory();
        history.push = jest.fn();
        const onClick = jest.fn();
        const config = createConfig(history, [{ name: 'Test', path: '' }]);
        const wrapper = shallow(<Link name="Test" onClick={onClick}>Test</Link>, {
          context: { curi: config }
        });
        const leftClickEvent = {
          defaultPrevented: false,
          preventDefault() {
            this.defaultPrevented = true;
          },
          metaKey: null,
          altKey: null,
          ctrlKey: null,
          shiftKey: null,
          button: 0
        };
        wrapper.find('a').simulate('click', leftClickEvent);
        expect(onClick.mock.calls.length).toBe(1);
        expect(history.push.mock.calls.length).toBe(1);
      });

      it('does not call history.push if onClick prevents default', () => {
        const history = createMemoryHistory();
        history.push = jest.fn();
        const onClick = jest.fn(event => {
          event.preventDefault();
        });
        const config = createConfig(history, [{ name: 'Test', path: '' }]);
        const wrapper = shallow(<Link name="Test" onClick={onClick}>Test</Link>, {
          context: { curi: config }
        });
        const leftClickEvent = {
          defaultPrevented: false,
          preventDefault() {
            this.defaultPrevented = true;
          },
          metaKey: null,
          altKey: null,
          ctrlKey: null,
          shiftKey: null,
          button: 0
        };
        wrapper.find('a').simulate('click', leftClickEvent);
        expect(onClick.mock.calls.length).toBe(1);
        expect(history.push.mock.calls.length).toBe(0);
      });
    });

    it("doesn't push for modified clicks", () => {
      const history = createMemoryHistory();
      history.push = jest.fn();

      const config = createConfig(history, [{ name: 'Test', path: '' }]);
      const wrapper = shallow(<Link name="Test">Test</Link>, {
        context: { curi: config }
      });
      const modifiedClickEvent = {
        defaultPrevented: false,
        preventDefault() {
          this.defaultPrevented = true;
        },
        metaKey: null,
        altKey: null,
        ctrlKey: null,
        shiftKey: null,
        button: 0
      };
      const modifiers = ['metaKey', 'altKey', 'ctrlKey', 'shiftKey'];
      modifiers.forEach(m => {
        const eventCopy = Object.assign({}, modifiedClickEvent);
        eventCopy[m] = true;
        wrapper.find('a').simulate('click', eventCopy);
        expect(history.push.mock.calls.length).toBe(0);
      });
    });

    it("doesn't push if event.preventDefault has been called", () => {
      const history = createMemoryHistory();
      history.push = jest.fn();

      const config = createConfig(history, [{ name: 'Test', path: '' }]);
      const wrapper = shallow(<Link name="Test">Test</Link>, {
        context: { curi: config }
      });
      const preventedEvent = {
        defaultPrevented: true,
        preventDefault() {
          this.defaultPrevented = true;
        },
        metaKey: null,
        altKey: null,
        ctrlKey: null,
        shiftKey: null,
        button: 0
      };
      wrapper.find('a').simulate('click', preventedEvent);
      expect(history.push.mock.calls.length).toBe(0);
    });
  });
});
