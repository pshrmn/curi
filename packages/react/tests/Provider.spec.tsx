import 'jest';
import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import Provider from '../src/Provider';
import { CuriConfig } from '@curi/core';

describe('<Provider>', () => {
  let receivedContext;

  beforeEach(() => {
    receivedContext = undefined;
  });

  const ConfigReporter: React.StatelessComponent = (props, context) => {
    receivedContext = context;
    return null;
  };

  ConfigReporter.contextTypes = {
    curi: PropTypes.object
  };

  it('places the curi config on the context as "context.curi"', () => {
    const fakeConfig = {} as CuriConfig;;
    const wrapper = mount(
      <Provider curi={fakeConfig}>
        <ConfigReporter />
      </Provider>
    );
    expect(receivedContext.curi).toBe(fakeConfig);
  });

  it('renders its children property', () => {
    const fakeConfig = {} as CuriConfig;
    const wrapper = mount(
      <Provider curi={fakeConfig}>
        <div>Test</div>
      </Provider>
    );
    const div = wrapper.find('div');
    expect(div.exists()).toBe(true);
    expect(div.text()).toBe('Test');
  });
});
