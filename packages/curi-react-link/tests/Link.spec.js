import React from 'react';
import { shallow, mount } from 'enzyme';
import { InMemory } from 'hickory';
import createConfig from '../../curi/src';
import createActiveAddon from '../../curi-addon-active/src';
import Link from '../src';

describe('<Link>', () => {
  it('errors if it cannot access a curi config', () => {
    const err = console.error;
    console.error = () => {};

    expect(() => {
      shallow(<Link to="Test">Test</Link>);
    }).toThrow();

    console.error = err;
  });

  describe('anchor', () => {
    it('renders an <a> by default', () => {
      const history = InMemory();
      const config = createConfig(history, [{ name: 'Test', path: '' }]);
      const wrapper = shallow(<Link to="Test">Test</Link>, {
        context: { curi: config }
      });
      const a = wrapper.find('a');
      expect(a.exists()).toBe(true);
    });

    it('when provided, it renders the component instead of an anchor', () => {
      const history = InMemory();
      const config = createConfig(history, [{ name: 'Test', path: '' }]);
      const StyledAnchor = props => (
        <a style={{ color: 'orange' }} {...props} />
      );
      // need to mount here so that the styled anchor also renders
      const wrapper = mount(<Link anchor={StyledAnchor} to="Test">Test</Link>, {
        context: { curi: config }
      });
      const a = wrapper.find('a');
      expect(a.exists()).toBe(true);
      expect(a.prop('style')).toEqual({ color: 'orange' });
    });
  });

  describe('to', () => {
    it("sets the href attribute using the named route's path", () => {
      const history = InMemory();
      const config = createConfig(history, [{ name: 'Test', path: '' }]);
      const wrapper = shallow(<Link to="Test">Test</Link>, {
        context: { curi: config }
      });
      const a = wrapper.find('a');
      expect(a.prop('href')).toBe('/');
    });

    it('uses the current location\'s pathname if not provided', () => {
      const history = InMemory({
        locations: ['/the-initial-location']
      });
      const config = createConfig(history, []);
      const wrapper = shallow(<Link>Test</Link>, {
        context: { curi: config }
      });
      const a = wrapper.find('a');
      expect(a.prop('href')).toBe('/the-initial-location');
    });
  });

  describe('params', () => {
    it('uses params to generate the href', () => {
      const history = InMemory();
      const config = createConfig(history, [
        { name: 'Park', path: '/park/:name' }
      ]);
      const params = { name: 'Glacier' };
      const wrapper = shallow(<Link to="Park" params={params}>Test</Link>, {
        context: { curi: config }
      });
      const a = wrapper.find('a');
      expect(a.prop('href')).toBe('/park/Glacier');
    });

    it('updates href when props change', () => {
      const history = InMemory();
      const config = createConfig(history, [
        { name: 'Park', path: '/park/:name' }
      ]);
      const params = { name: 'Glacier' };
      const wrapper = shallow(<Link to="Park" params={params}>Test</Link>, {
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
      const history = InMemory();
      const config = createConfig(history, [{ name: 'Test', path: 'test' }]);
      const wrapper = shallow(
        <Link to="Test" details={{ query: 'one=two', hash: '#hashtag' }}>
          Test
        </Link>,
        { context: { curi: config } }
      );
      const a = wrapper.find('a');
      expect(a.prop('href')).toBe('/test?one=two#hashtag');
    });

    it('overwrites the generated pathname if to includes one', () => {
      const history = InMemory();
      const config = createConfig(history, [{ name: 'Test', path: 'test' }]);
      const wrapper = shallow(
        <Link to="Test" details={{ pathname: '/not-a-test' }}>Test</Link>,
        { context: { curi: config } }
      );
      const a = wrapper.find('a');
      expect(a.prop('href')).toBe('/not-a-test');
    });
  });

  describe('active', () => {
    it('throws if attempting to use when curi-addon-active is not "installed"', () => {
      const history = InMemory();
      const config = createConfig(history, [{ name: 'Test', path: 'test' }]);
      const fakeResponse = {};
      function merge(props) {
        props.className += ' active';
        return props;
      }

      expect(() => {
        const wrapper = shallow(
          <Link to="Test" active={{ merge }}>Test</Link>,
          { context: { curi: config, curiResponse: fakeResponse } }
        );
      }).toThrow(
        'You are attempting to use the "active" prop, but have not included the "active" ' +
          'addon (curi-addon-active) in your Curi configuration object.'
      );
    });

    it("does nothing if the <Link>'s props do not match the current response's", () => {
      const history = InMemory();
      const config = createConfig(history, [{ name: 'Test', path: 'test' }], {
        addons: [createActiveAddon]
      });
      const fakeResponse = { name: 'Other' };
      function merge(props) {
        props.className += ' active';
        return props;
      }

      const wrapper = shallow(
        <Link to="Test" className="test" active={{ merge }}>Test</Link>,
        { context: { curi: config, curiResponse: fakeResponse } }
      );
      const link = wrapper.find('a');
      expect(link.prop('className')).toBe('test');
    });

    it("calls merge function when <Link>'s props match the current response's", () => {
      const history = InMemory();
      const config = createConfig(history, [{ name: 'Test', path: 'test' }], {
        addons: [createActiveAddon]
      });
      const fakeResponse = { name: 'Test', params: {} };
      function merge(props) {
        props.className += ' active';
        return props;
      }

      const wrapper = shallow(
        <Link to="Test" className="test" active={{ merge }}>Test</Link>,
        { context: { curi: config, curiResponse: fakeResponse } }
      );
      const link = wrapper.find('a');
      expect(link.prop('className')).toBe('test active');
    });

    it('works with partial matches', () => {
      const history = InMemory();
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
        <Link to="Test" className="test" active={{ partial: true, merge }}>
          Test
        </Link>,
        { context: { curi: config, curiResponse: fakeResponse } }
      );
      const link = wrapper.find('a');
      expect(link.prop('className')).toBe('test active');
    });
  });

  describe('clicking a link', () => {
    it('calls history.update', () => {
      const history = InMemory();
      history.update = jest.fn();

      const config = createConfig(history, [{ name: 'Test', path: '' }]);
      const wrapper = shallow(<Link to="Test">Test</Link>, {
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
      expect(history.update.mock.calls.length).toBe(1);
    });

    describe('onClick', () => {
      it('calls onClick prop func if provided', () => {
        const history = InMemory();
        history.update = jest.fn();
        const onClick = jest.fn();
        const config = createConfig(history, [{ name: 'Test', path: '' }]);
        const wrapper = shallow(<Link to="Test" onClick={onClick}>Test</Link>, {
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
        expect(history.update.mock.calls.length).toBe(1);
      });

      it('does not call history.push if onClick prevents default', () => {
        const history = InMemory();
        history.push = jest.fn();
        const onClick = jest.fn(event => {
          event.preventDefault();
        });
        const config = createConfig(history, [{ name: 'Test', path: '' }]);
        const wrapper = shallow(<Link to="Test" onClick={onClick}>Test</Link>, {
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
      const history = InMemory();
      history.push = jest.fn();

      const config = createConfig(history, [{ name: 'Test', path: '' }]);
      const wrapper = shallow(<Link to="Test">Test</Link>, {
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
      const history = InMemory();
      history.push = jest.fn();

      const config = createConfig(history, [{ name: 'Test', path: '' }]);
      const wrapper = shallow(<Link to="Test">Test</Link>, {
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
