import React from 'react';
import { shallow, mount } from 'enzyme';
import { createMemoryHistory } from 'history';
import createConfig from '../../curi/src';
import Redirect from '../src';

describe('<Redirect>', () => {
  it('calls history.replace(props.to) after mounting', () => {
    const fakeHistory = { replace: jest.fn() };
    const fakeConfig = { history: fakeHistory };
    const to = { pathname: '/other-place' };
    const wrapper = mount(<Redirect to={to} />, {
      context: { curi: fakeConfig }
    });
    expect(fakeHistory.replace.mock.calls.length).toBe(1);
    expect(fakeHistory.replace.mock.calls[0][0]).toBe(to);
  });

  describe('to', () => {
    it('works with to strings', () => {
      const fakeHistory = { replace: jest.fn() };
      const fakeConfig = { history: fakeHistory };
      const to = '/other-place';
      expect(() => {
        shallow(<Redirect to={to} />, { context: { curi: fakeConfig } });
      }).not.toThrow();
    });

    it('works with to objects', () => {
      const fakeHistory = { replace: jest.fn() };
      const fakeConfig = { history: fakeHistory };
      const to = { pathname: '/other-place' };
      expect(() => {
        shallow(<Redirect to={to} />, { context: { curi: fakeConfig } });
      }).not.toThrow();
    });
  });

  describe('name & params', () => {
    let history;

    beforeEach(() => {
      history = createMemoryHistory();
      history.replace = jest.fn();
    });

    it('generates pathname using the name prop', () => {
      const config = createConfig(history, [
        {
          name: 'Park',
          path: '/park'
        }
      ]);
      const wrapper = mount(<Redirect name="Park" />, {
        context: { curi: config }
      });
      expect(history.replace.mock.calls.length).toBe(1);
      const redirectingTo = history.replace.mock.calls[0][0];
      expect(redirectingTo.pathname).toBe('/park');
    });

    it('uses params prop to generate pathname', () => {
      const config = createConfig(history, [
        {
          name: 'Park',
          path: '/park/:name'
        }
      ]);
      const wrapper = mount(
        <Redirect name="Park" params={{ name: 'Denali' }} />,
        { context: { curi: config } }
      );
      expect(history.replace.mock.calls.length).toBe(1);
      const redirectingTo = history.replace.mock.calls[0][0];
      expect(redirectingTo.pathname).toBe('/park/Denali');
    });

    it('merges generated pathname with to prop', () => {
      const config = createConfig(history, [
        {
          name: 'Park',
          path: '/park'
        }
      ]);
      const to = { search: '?camping=true' };
      const wrapper = mount(<Redirect name="Park" to={to} />, {
        context: { curi: config }
      });
      expect(history.replace.mock.calls.length).toBe(1);
      const redirectingTo = history.replace.mock.calls[0][0];
      expect(redirectingTo.search).toBe(to.search);
    });

    it('will use to.pathname over generated pathname', () => {
      const config = createConfig(history, [
        {
          name: 'Park',
          path: '/park/:name'
        }
      ]);
      const to = { pathname: '/park/Canyon+Land' };
      const wrapper = mount(
        <Redirect name="Park" params={{ name: 'Everglades' }} to={to} />,
        { context: { curi: config } }
      );
      expect(history.replace.mock.calls.length).toBe(1);
      const redirectingTo = history.replace.mock.calls[0][0];
      expect(redirectingTo.pathname).toBe(to.pathname);
    });
  });

  describe('children', () => {
    it('renders null when it has no children', () => {
      const fakeConfig = {};
      const to = { pathname: '/other-place' };
      const wrapper = shallow(<Redirect to={to} />, {
        context: { curi: fakeConfig }
      });
      expect(wrapper.type()).toBe(null);
    });

    it('renders its children element', () => {
      const fakeConfig = {};
      const to = { pathname: '/other-place' };
      const wrapper = shallow(
        <Redirect to={to}>
          <div>Redirecting...</div>
        </Redirect>,
        { context: { curi: fakeConfig }}
      );
      expect(wrapper.type()).toBe('div');
      expect(wrapper.text()).toBe('Redirecting...');
    });
  });
});
