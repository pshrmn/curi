import React from 'react';
import { shallow } from 'enzyme';
import { InMemory } from 'hickory';
import createConfig from '../../curi/src';
import createActiveAddon from '../../curi-addon-active/src';
import Active from '../src';

describe('<Active>', () => {
  let history;
  let config;
  const routes = [
    { name: 'Home', path: '' },
    {
      name: 'Contact',
      path: 'contact',
      children: [{ name: 'Method', path: ':method' }]
    }
  ];

  beforeEach(() => {
    history = InMemory();
    config = createConfig(history, routes, {
      addons: [createActiveAddon]
    });
  });

  describe('no active addon', () => {
    it('warns if attempting to use in a Curi config without the "active" addon', () => {
      const config = createConfig(history, routes);
      const fakeResponse = { name: 'Fake', params: {}, partials: [] };
      const Test = () => null;
      function merge(props) {
        return props;
      }

      expect(() => {
        shallow(
          <Active name="Home" merge={merge}>
            <Test />
          </Active>,
          { context: { curi: config, curiResponse: fakeResponse } }
        );
      }).toThrow(
        'You are attempting to use the "active" prop, but have not included the "active" ' +
          'addon (curi-addon-active) in your Curi configuration object.'
      );
    });
  });

  describe('children', () => {
    it('re-renders the children element it is passed', () => {
      const fakeResponse = { name: 'Fake', params: {}, partials: [] };
      const Test = () => null;
      function merge(props) {
        return props;
      }

      const wrapper = shallow(
        <Active name="Home" merge={merge}>
          <Test />
        </Active>,
        { context: { curi: config, curiResponse: fakeResponse } }
      );
      expect(wrapper.type()).toBe(Test);
    });
  });

  describe('merge', () => {
    it('does not call merge function when not active', () => {
      const fakeResponse = { name: 'Fake', params: {}, partials: [] };
      const Test = () => null;
      const merge = jest.fn();

      const wrapper = shallow(
        <Active name="Home" merge={merge}>
          <Test />
        </Active>,
        { context: { curi: config, curiResponse: fakeResponse } }
      );
      expect(merge.mock.calls.length).toBe(0);
    });

    it('calls merge function when active', () => {
      const fakeResponse = { name: 'Home', params: {}, partials: [] };
      const Test = () => null;
      const merge = jest.fn();

      const wrapper = shallow(
        <Active name="Home" merge={merge}>
          <Test />
        </Active>,
        { context: { curi: config, curiResponse: fakeResponse } }
      );
      expect(merge.mock.calls.length).toBe(1);
    });

    it("merges props into children element's props when active", () => {
      const fakeResponse = { name: 'Home', params: {}, partials: [] };
      const Test = () => null;
      function merge(props) {
        props.className = 'not-a-test';
        return props;
      }

      const wrapper = shallow(
        <Active name="Home" merge={merge}>
          <div className="test" />
        </Active>,
        { context: { curi: config, curiResponse: fakeResponse } }
      );
      expect(wrapper.prop('className')).toBe('not-a-test');
    });
  });

  describe('partial', () => {
    it('works for partial matches when partial=true', () => {
      const fakeResponse = {
        name: 'Method',
        params: {},
        partials: ['Contact']
      };
      const Test = () => null;
      function merge(props) {
        props.className = 'not-a-test';
        return props;
      }

      const wrapper = shallow(
        <Active name="Contact" partial={true} merge={merge}>
          <div className="test" />
        </Active>,
        { context: { curi: config, curiResponse: fakeResponse } }
      );
      expect(wrapper.prop('className')).toBe('not-a-test');
    });
  });
});
