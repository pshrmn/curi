import React from 'react';
import { shallow } from 'enzyme';
import { createMemoryHistory } from 'history';
import createConfig from '../../curi/src';
import createActiveAddon from '../../curi-addon-active/src';
import Clickable from '../src';

describe('<Clickable>', () => {
  it('errors if it cannot access a curi config', () => {
    const err = console.error;
    console.error = () => {};

    expect(() => {
      shallow(<Clickable component="div" to="Test">Test</Clickable>);
    }).toThrow(
      'You are attempting to render a <Clickable> without access to a Curi config. ' +
        'Please ensure that your component has access to a Curi config through its ' +
        'context (this is most easily done by using a <Navigator>)'
    );

    console.error = err;
  });

  describe('component', () => {
    it('renders the string components', () => {
      const history = createMemoryHistory();
      const config = createConfig(history, [{ name: 'Test', path: '' }]);
      const wrapper = shallow(
        <Clickable component="div" to="Test">Test</Clickable>,
        {
          context: { curi: config }
        }
      );
      expect(wrapper.type()).toBe('div');
    });

    it('renders the function components', () => {
      const history = createMemoryHistory();
      const config = createConfig(history, [{ name: 'Test', path: '' }]);
      const TestComponent = () => null;
      const wrapper = shallow(
        <Clickable component={TestComponent} to="Test">Test</Clickable>,
        {
          context: { curi: config }
        }
      );
      expect(wrapper.type()).toBe(TestComponent);
    });
  });
  /*
  describe('to', () => {
    it('defaults to pathto="/" if name is not provided', () => {
      const history = createMemoryHistory();
      const config = createConfig(history, []);
      const wrapper = shallow(<Clickable>Test</Clickable>, {
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
      const wrapper = shallow(<Clickable to="Park" params={params}>Test</Clickable>, {
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
      const wrapper = shallow(<Clickable to="Park" params={params}>Test</Clickable>, {
        context: { curi: config }
      });
      let a = wrapper.find('a');
      expect(a.prop('href')).toBe('/park/Glacier');

      wrapper.setProps({ params: { name: 'Yellowstone' } });
      a = wrapper.find('a');
      expect(a.prop('href')).toBe('/park/Yellowstone');
    });
  });

  describe('details', () => {
    it('merges the details prop with the generated pathname when navigating', () => {
      const history = createMemoryHistory();
      const config = createConfig(history, [{ name: 'Test', path: 'test' }]);
      const wrapper = shallow(
        <Clickable to="Test" details={{ search: '?one=two', hash: '#hashtag' }}>
          Test
        </Clickable>,
        { context: { curi: config } }
      );
      const a = wrapper.find('a');
      expect(a.prop('href')).toBe('/test?one=two#hashtag');
    });

    it('overwrites the generated pathname if to includes one', () => {
      const history = createMemoryHistory();
      const config = createConfig(history, [{ name: 'Test', path: 'test' }]);
      const wrapper = shallow(
        <Clickable to="Test" details={{ pathname: '/not-a-test' }}>Test</Clickable>,
        { context: { curi: config } }
      );
      const a = wrapper.find('a');
      expect(a.prop('href')).toBe('/not-a-test');
    });
  });
  */
  describe('active', () => {
    it('throws if attempting to use when curi-addon-active is not "installed"', () => {
      const history = createMemoryHistory();
      const config = createConfig(history, [{ name: 'Test', path: 'test' }]);
      const fakeResponse = {};
      function merge(props) {
        props.className += ' active';
        return props;
      }

      expect(() => {
        const wrapper = shallow(
          <Clickable component="div" to="Test" active={{ merge }}>
            Test
          </Clickable>,
          { context: { curi: config, curiResponse: fakeResponse } }
        );
      }).toThrow(
        'You are attempting to use the "active" prop, but have not included the "active" ' +
          'addon (curi-addon-active) in your Curi configuration object.'
      );
    });

    it("does nothing if the <Clickable>'s props do not match the current response's", () => {
      const history = createMemoryHistory();
      const config = createConfig(history, [{ name: 'Test', path: 'test' }], {
        addons: [createActiveAddon]
      });
      const fakeResponse = { name: 'Other' };
      function merge(props) {
        props.className += ' active';
        return props;
      }

      const wrapper = shallow(
        <Clickable
          component="div"
          to="Test"
          className="test"
          active={{ merge }}
        >
          Test
        </Clickable>,
        { context: { curi: config, curiResponse: fakeResponse } }
      );
      expect(wrapper.prop('className')).toBe('test');
    });

    it("calls merge function when <Clickable>'s props match the current response's", () => {
      const history = createMemoryHistory();
      const config = createConfig(history, [{ name: 'Test', path: 'test' }], {
        addons: [createActiveAddon]
      });
      const fakeResponse = { name: 'Test', params: {} };
      function merge(props) {
        props.className += ' active';
        return props;
      }

      const wrapper = shallow(
        <Clickable
          component="div"
          to="Test"
          className="test"
          active={{ merge }}
        >
          Test
        </Clickable>,
        { context: { curi: config, curiResponse: fakeResponse } }
      );
      expect(wrapper.prop('className')).toBe('test active');
    });

    it('works with partial matches', () => {
      const history = createMemoryHistory();
      const config = createConfig(
        history,
        [
          {
            name: 'Test',
            path: 'test',
            children: [{ name: 'Nested', path: 'nested' }]
          }
        ],
        {
          addons: [createActiveAddon]
        }
      );
      const fakeResponse = { name: 'Nested', partials: ['Test'], params: {} };
      function merge(props) {
        props.className += ' active';
        return props;
      }

      const wrapper = shallow(
        <Clickable
          component="div"
          to="Test"
          className="test"
          active={{ partial: true, merge }}
        >
          Test
        </Clickable>,
        { context: { curi: config, curiResponse: fakeResponse } }
      );
      expect(wrapper.prop('className')).toBe('test active');
    });
  });

  describe('clicking a clickable', () => {
    it('calls history.push', () => {
      const history = createMemoryHistory();
      history.push = jest.fn();

      const config = createConfig(history, [{ name: 'Test', path: '' }]);
      const wrapper = shallow(
        <Clickable component="div" to="Test">Test</Clickable>,
        {
          context: { curi: config }
        }
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
      wrapper.simulate('click', leftClickEvent);
      expect(history.push.mock.calls.length).toBe(1);
    });

    describe('onClick', () => {
      it('calls onClick prop func if provided', () => {
        const history = createMemoryHistory();
        history.push = jest.fn();
        const onClick = jest.fn();
        const config = createConfig(history, [{ name: 'Test', path: '' }]);
        const wrapper = shallow(
          <Clickable component="div" to="Test" onClick={onClick}>
            Test
          </Clickable>,
          {
            context: { curi: config }
          }
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
        wrapper.simulate('click', leftClickEvent);
        expect(onClick.mock.calls.length).toBe(1);
        expect(history.push.mock.calls.length).toBe(1);
      });
    });

    it("doesn't care if event.preventDefault has been called", () => {
      const history = createMemoryHistory();
      history.push = jest.fn();

      const config = createConfig(history, [{ name: 'Test', path: '' }]);
      const wrapper = shallow(
        <Clickable component="div" to="Test">Test</Clickable>,
        {
          context: { curi: config }
        }
      );
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
      wrapper.simulate('click', preventedEvent);
      expect(history.push.mock.calls.length).toBe(1);
    });
  });
});
