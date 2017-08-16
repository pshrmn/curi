import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import CuriProvider from '../src';

describe('<CuriProvider>', () => {
  let receivedContext;

  beforeEach(() => {
    receivedContext = undefined;
  });

  const ConfigReporter = (props, context) => {
    receivedContext = context;
    return null;
  };

  ConfigReporter.contextTypes = {
    curi: PropTypes.object
  };

  it('places the curi config on the context as "context.curi"', () => {
    const fakeConfig = {};
    const wrapper = mount(
      <CuriProvider curi={fakeConfig}>
        <ConfigReporter />
      </CuriProvider>
    );
    expect(receivedContext.curi).toBe(fakeConfig);
  });

  it('renders its children property', () => {
    const fakeConfig = {};
    const wrapper = mount(
      <CuriProvider curi={fakeConfig}>
        <div>Test</div>
      </CuriProvider>
    );
    const div = wrapper.find('div');
    expect(div.exists()).toBe(true);
    expect(div.text()).toBe('Test');
  });
});
