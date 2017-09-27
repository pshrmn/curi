import 'jest';
import { Spy } from 'jest';
import React from 'react';
import { shallow, mount } from 'enzyme';
import InMemory from '@hickory/in-memory';
import createConfig from '@curi/core';
import Redirect from '../src/Redirect';

describe('<Redirect>', () => {
  it('calls history.replace(props.to) after mounting', () => {
    const fakeHistory = { replace: jest.fn() };
    const fakeConfig = { history: fakeHistory };
    const loc = { pathname: '/other-place' };
    const wrapper = mount(<Redirect details={loc} />, {
      context: { curi: fakeConfig }
    });
    expect(fakeHistory.replace.mock.calls.length).toBe(1);
    expect(fakeHistory.replace.mock.calls[0][0]).toBe(loc);
  });

  describe('to & params', () => {
    let history;

    beforeEach(() => {
      history = InMemory();
      history.replace = jest.fn();
    });

    it('generates pathname using the to prop', () => {
      const config = createConfig(history, [
        {
          name: 'Park',
          path: 'park'
        }
      ]);
      const wrapper = mount(<Redirect to="Park" />, {
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
          path: 'park/:name'
        }
      ]);
      const wrapper = mount(
        <Redirect to="Park" params={{ name: 'Denali' }} />,
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
          path: 'park'
        }
      ]);
      const loc = { search: '?camping=true' };
      const wrapper = mount(<Redirect to="Park" details={loc} />, {
        context: { curi: config }
      });
      expect(history.replace.mock.calls.length).toBe(1);
      const redirectingTo = history.replace.mock.calls[0][0];
      expect(redirectingTo.search).toBe(loc.search);
    });

    it('will use to.pathname over generated pathname', () => {
      const config = createConfig(history, [
        {
          name: 'Park',
          path: 'park/:name'
        }
      ]);
      const loc = { pathname: '/park/Canyon+Land' };
      const wrapper = mount(
        <Redirect to="Park" params={{ name: 'Everglades' }} details={loc} />,
        { context: { curi: config } }
      );
      expect(history.replace.mock.calls.length).toBe(1);
      const redirectingTo = history.replace.mock.calls[0][0];
      expect(redirectingTo.pathname).toBe(loc.pathname);
    });
  });

  describe('details', () => {
    it('sets non-pathname location props using the details', () => {
      const history = InMemory();
      history.replace = jest.fn();
      const config = createConfig(history, [
        {
          name: 'Park',
          path: 'park/:name'
        }
      ]);
      const loc = { search: '?yes=no', hash: '#never' };
      mount(
        <Redirect to="Park" params={{ name: 'Yosemite' }} details={loc} />,
        { context: { curi: config } }
      );
      const redirectedTo = (history.replace as Spy).mock.calls[0][0];
      expect(redirectedTo.search).toEqual(loc.search);
      expect(redirectedTo.hash).toEqual(loc.hash);
    });

    it('overwrites pathname from to if details object includes one', () => {
      const history = InMemory();
      history.replace = jest.fn();
      const config = createConfig(history, [
        {
          name: 'Park',
          path: 'park/:name'
        }
      ]);
      const loc = { pathname: '/other-place' };
      mount(<Redirect details={loc} />, { context: { curi: config } });
      const redirectedTo = (history.replace as Spy).mock.calls[0][0];
      expect(redirectedTo.pathname).toEqual('/other-place');
    });
  });

  describe('children', () => {
    it('renders null when it has no children', () => {
      const history = InMemory();
      history.replace = jest.fn();
      const config = createConfig(history, [
        { name: 'Home', path: '' }
      ]);
      const loc = { pathname: '/other-place' };
      const wrapper = shallow(<Redirect details={loc} />, {
        context: { curi: config }
      });
      expect(wrapper.type()).toBe(null);
    });

    it('renders its children element', () => {
      const history = InMemory();
      history.replace = jest.fn();
      const config = createConfig(history, [
        { name: 'Home', path: '' }
      ]);
      const loc = { pathname: '/other-place' };
      const wrapper = shallow(
        <Redirect details={loc}>
          <div>Redirecting...</div>
        </Redirect>,
        { context: { curi: config } }
      );
      expect(wrapper.type()).toBe('div');
      expect(wrapper.text()).toBe('Redirecting...');
    });
  });
});
