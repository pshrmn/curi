import React from 'react';
import { shallow, mount } from 'enzyme';
import { createMemoryHistory } from 'history';
import { createConfig, path } from '../../curi/src';
import Redirect from '../src/Redirect';

describe('<Redirect>', () => {
  it('calls history.replace(props.to) after mounting', () => {
    const fakeHistory = { replace: jest.fn() };
    const fakeConfig = { history: fakeHistory };
    const to = { pathname: '/other-place' }
    const wrapper = mount(
      <Redirect to={to} />,
      { context: { curi: fakeConfig } }
    );
    expect(fakeHistory.replace.mock.calls.length).toBe(1);
    expect(fakeHistory.replace.mock.calls[0][0]).toBe(to);
  });

  it('works with to strings', () => {
    const fakeHistory = { replace: jest.fn() };
    const fakeConfig = { history: fakeHistory };
    const to = '/other-place';
    expect(() => {
      shallow(
        <Redirect to={to} />,
        { context: { curi: fakeConfig }}
      );
    }).not.toThrow()
  });

  it('works with to objects', () => {
    const fakeHistory = { replace: jest.fn() };
    const fakeConfig = { history: fakeHistory };
    const to = { pathname: '/other-place' };
    expect(() => {
      shallow(
        <Redirect to={to} />,
        { context: { curi: fakeConfig }}
      );
    }).not.toThrow()
  });
});
