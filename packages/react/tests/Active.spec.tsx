import 'jest';
import React from 'react';
import { shallow } from 'enzyme';
import InMemory from '@hickory/in-memory';
import { HickoryLocation } from '@hickory/root';
import createConfig, { Response } from '@curi/core';
import createActiveAddon from '@curi/addon-active';
import Active from '../src/Active';

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
      addons: [createActiveAddon()]
    });
  });

  describe('curi and response', () => {
    function merge(props) {
      return { ...props, className: 'not-a-test' };
    }
    const Test = () => null;

    it('can get the config/response values from props', () => {
      const fakeResponse = {
        name: 'Home',
        params: {},
        partials: []
      } as Response;

      const wrapper = shallow(
        <Active name="Home" merge={merge} curi={config} response={fakeResponse}>
          <Test />
        </Active>
      );
      expect(wrapper.type()).toBe(Test);
      expect(wrapper.prop('className')).toBe('not-a-test');
    });

    it('can get the values from context', () => {
      const fakeResponse = {
        name: 'Home',
        params: {},
        partials: []
      } as Response;

      const wrapper = shallow(
        <Active name="Home" merge={merge}>
          <Test />
        </Active>,
        { context: { curi: { config, response: fakeResponse } } }
      );
      expect(wrapper.type()).toBe(Test);
      expect(wrapper.prop('className')).toBe('not-a-test');
    });

    it('prefers props over context', () => {
      const propResponse = {
        name: 'Home',
        params: {},
        partials: []
      } as Response;
      const contextResponse = {
        name: 'House',
        params: {},
        partials: []
      } as Response;

      const wrapper = shallow(
        <Active name="Home" merge={merge} curi={config} response={propResponse}>
          <Test />
        </Active>,
        { context: { curi: { config, response: contextResponse } } }
      );
      expect(wrapper.type()).toBe(Test);
      expect(wrapper.prop('className')).toBe('not-a-test');
    });

    it('errors if it cannot access a curi config', () => {
      const err = console.error;
      console.error = () => {};

      expect(() => {
        const wrapper = shallow(
          <Active name="Home" merge={merge}>
            <Test />
          </Active>
        );
      }).toThrow();

      console.error = err;
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
          { context: { curi: { config, response: fakeResponse } } }
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
        { context: { curi: { config, response: fakeResponse } } }
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
        { context: { curi: { config, response: fakeResponse } } }
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
        { context: { curi: { config, response: fakeResponse } } }
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
        { context: { curi: { config, response: fakeResponse } } }
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
        { context: { curi: { config, response: fakeResponse } } }
      );
      expect(wrapper.prop('className')).toBe('not-a-test');
    });
  });

  describe('extra', () => {
    it('does nothing when not provided', () => {
      const fakeResponse = { name: 'Home', params: {}, partials: [] };
      const Test = () => null;
      const merge = jest.fn();

      const wrapper = shallow(
        <Active name="Home" merge={merge}>
          <Test />
        </Active>,
        { context: { curi: { config, response: fakeResponse } } }
      );
      expect(merge.mock.calls.length).toBe(1);
    });

    it('passes current location and details to the extra function', () => {
      const fakeResponse: Response = {
        name: 'Home',
        params: {},
        partials: [],
        location: { pathname: '/', query: 'test=ing' }
      } as Response;
      const Test = () => null;
      const merge = jest.fn();
      const details = { query: 'test=ing' };
      const extra = jest.fn((loc: HickoryLocation, deets: object): boolean => {
        expect(loc).toBe(fakeResponse.location);
        expect(deets).toBe(details);
        return true;
      });

      const wrapper = shallow(
        <Active name="Home" merge={merge} extra={extra} details={details}>
          <Test />
        </Active>,
        { context: { curi: { config, response: fakeResponse } } }
      );
      expect(extra.mock.calls.length).toBe(1);
    });

    it('component is not active if extra returns false', () => {
      const fakeResponse: Response = {
        name: 'Home',
        params: {},
        partials: [],
        location: { pathname: '/', query: 'test=ing' }
      } as Response;
      const Test = () => null;
      const merge = jest.fn();
      const extra = () => false;

      const wrapper = shallow(
        <Active name="Home" merge={merge} extra={extra}>
          <Test />
        </Active>,
        { context: { curi: { config, response: fakeResponse } } }
      );
      expect(merge.mock.calls.length).toBe(0);
    });
  });
});
