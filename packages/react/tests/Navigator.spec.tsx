import 'jest';
import { Spy } from 'jest';
import React from 'react';
import { shallow, mount } from 'enzyme';
import PropTypes from 'prop-types';
import createConfig from '@curi/core';
import InMemory from '@hickory/in-memory';
import Navigator from '../src/Navigator';
import { AnyResponse } from '@curi/core';

describe('<Navigator>', () => {
  it('calls render function when it renders', () => {
    const history = InMemory();
    const config = createConfig(history, []);
    const fakeConfig = { subscribe: () => {} };
    const fn = jest.fn(() => {
      return null;
    });
    const wrapper = shallow(<Navigator config={config} render={fn} />);
    expect(fn.mock.calls.length).toBe(1);
  });

  it('passes the render function a response object', () => {
    const history = InMemory();
    const routes = [
      { name: 'Home', path: '', pathOptions: { end: true } },
      { name: 'About', path: 'about' }
    ];
    let receivedResponse;
    const fn = jest.fn(response => {
      receivedResponse = response;
      return null;
    });

    const config = createConfig(history, routes);
    const properties = [
      'key',
      'location',
      'status',
      'name',
      'partials',
      'params',
      'body',
      'error',
      'data',
      'title'
    ];
    expect.assertions(properties.length + 1);
    return config.ready().then(resp => {
      const wrapper = shallow(<Navigator config={config} render={fn} />);

      expect(Object.keys(receivedResponse).length).toEqual(properties.length);
      properties.forEach(key => {
        expect(receivedResponse.hasOwnProperty(key)).toBe(true);
      });
    });
  });

  it('passes the render function the action string "PUSH" as default', () => {
    const history = InMemory();
    const routes = [
      { name: 'Home', path: '', pathOptions: { end: true } },
      { name: 'About', path: 'about' }
    ];
    const fn = jest.fn(() => {
      return null;
    });

    const config = createConfig(history, routes);
    expect.assertions(1);
    return config.ready().then(() => {
      const wrapper = shallow(<Navigator config={config} render={fn} />);
      expect(fn.mock.calls[0][1]).toBe('PUSH');
    });
  });

  it('passes the render function the action string', () => {
    const history = InMemory();
    const routes = [
      { name: 'Home', path: '', pathOptions: { end: true } },
      { name: 'About', path: 'about' }
    ];
    const fn = jest.fn(() => {
      return null;
    });

    const config = createConfig(history, routes);
    // by calling this before config.ready, we know that config.ready
    // will resolve with this response instead of initial one
    config.history.replace({ pathname: '/about' });
    expect.assertions(1);
    return config.ready().then(resp => {
      const wrapper = shallow(<Navigator config={config} render={fn} />);
      expect(fn.mock.calls[0][1]).toBe('REPLACE');
    });
  });

  it('passes the render function the config object', () => {
    const history = InMemory();
    const routes = [
      { name: 'Home', path: '', pathOptions: { end: true } },
      { name: 'About', path: 'about' }
    ];
    const fn = jest.fn(() => {
      return null;
    });

    const config = createConfig(history, routes);
    expect.assertions(1);
    return config.ready().then(resp => {
      const wrapper = shallow(<Navigator config={config} render={fn} />);
      expect(fn.mock.calls[0][2]).toBe(config);
    });
  });

  it('updates on location changes', done => {
    const history = InMemory();
    const routes = [
      { name: 'Home', path: '', pathOptions: { end: true } },
      { name: 'About', path: 'about' }
    ];

    let first = true;
    const fn = jest.fn(resp => {
      if (first) {
        expect(resp.name).toBe('Home');
        first = false;
      } else {
        expect(resp.name).toBe('About');
      }
      return null;
    });

    const config = createConfig(history, routes);
    config.ready().then(() => {
      const wrapper = shallow(<Navigator config={config} render={fn} />);
      history.push('/about');
      done();
    });
  });

  describe('response', () => {
    it('renders using response if provided', () => {
      const history = InMemory();
      const routes = [
        { name: 'Home', path: '', pathOptions: { end: true } },
        { name: 'About', path: 'about' }
      ];
      const config = createConfig(history, routes);

      let received;
      const fn = jest.fn(response => {
        received = response;
        return null;
      });

      return config.ready().then(response => {
        const wrapper = shallow(
          <Navigator response={response} config={config} render={fn} />
        );
        expect(received).toBe(response);
      });
    });

    it('does not call subscribe when passed a response', () => {
      const history = InMemory();
      const routes = [
        { name: 'Home', path: '', pathOptions: { end: true } },
        { name: 'About', path: 'about' }
      ];
      const config = createConfig(history, routes);
      config.subscribe = jest.fn(config.subscribe);

      return config.ready().then(response => {
        const wrapper = shallow(
          <Navigator response={response} config={config} render={r => null} />
        );
        expect((config.subscribe as Spy).mock.calls.length).toBe(0);
      });
    });
  });

  describe('unmount', () => {
    it('unsubscribes from the config', () => {
      const history = InMemory();
      const routes = [
        { name: 'Home', path: '', pathOptions: { end: true } },
        { name: 'About', path: 'about' }
      ];
      const config = createConfig(history, routes);
      const unsub = jest.fn();
      config.subscribe = jest.fn(fn => unsub);

      let received;
      const fn = jest.fn(response => {
        received = response;
        return null;
      });

      expect(unsub.mock.calls.length).toBe(0);
      expect((config.subscribe as Spy).mock.calls.length).toBe(0);

      return config.ready().then(response => {
        const wrapper = shallow(<Navigator config={config} render={fn} />);
        expect((config.subscribe as Spy).mock.calls.length).toBe(1);
        expect(unsub.mock.calls.length).toBe(0);
        wrapper.unmount();
        expect(unsub.mock.calls.length).toBe(1);
      });
    });
  });

  describe('context', () => {
    let receivedContext;

    beforeEach(() => {
      receivedContext = undefined;
    });

    const ConfigReporter: React.StatelessComponent = (props, context) => {
      receivedContext = context;
      return null;
    };

    ConfigReporter.contextTypes = {
      curi: PropTypes.object,
      curiResponse: PropTypes.object
    };

    it('places the curi config on the context as "context.curi"', () => {
      const history = InMemory();
      const routes = [
        { name: 'Home', path: '', pathOptions: { end: true } },
        { name: 'About', path: 'about' }
      ];
      const config = createConfig(history, routes);

      const wrapper = mount(
        <Navigator config={config} render={response => <ConfigReporter />} />
      );

      expect(receivedContext.curi).toBe(config);
    });

    it('places the current response on the context as "context.curiResponse"', () => {
      const history = InMemory();
      const routes = [
        { name: 'Home', path: '', pathOptions: { end: true } },
        { name: 'About', path: 'about' }
      ];
      const config = createConfig(history, routes);

      return config.ready().then(resp => {
        const wrapper = mount(
          <Navigator
            config={config}
            response={resp}
            render={() => <ConfigReporter />}
          />
        );
        expect(receivedContext.curiResponse).toBe(resp);
      });
    });
  });
});
