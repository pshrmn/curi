import React from 'react';
import { shallow, mount } from 'enzyme';
import PropTypes from 'prop-types';
import createConfig from '../../curi/src';
import ResponseCreator from '../../curi/src/utils/createResponse';
import { InMemory } from 'hickory';
import Navigator from '../src';

describe('<Navigator>', () => {
  it('calls children function when it renders', () => {
    const fakeConfig = { subscribe: () => {} };
    const fn = jest.fn(() => {
      return null;
    });
    const wrapper = shallow(
      <Navigator config={fakeConfig}>
        {fn}
      </Navigator>
    );
    expect(fn.mock.calls.length).toBe(1);
  });

  it('passes the children function a response object', done => {
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
    config.ready().then(resp => {
      const wrapper = shallow(
        <Navigator config={config}>
          {fn}
        </Navigator>
      );

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
      expect(Object.keys(receivedResponse).length).toEqual(properties.length);
      properties.forEach(key => {
        expect(receivedResponse.hasOwnProperty(key)).toBe(true);
      });
      done();
    });
  });

  it('passes the children function the config object', done => {
    const history = InMemory();
    const routes = [
      { name: 'Home', path: '', pathOptions: { end: true } },
      { name: 'About', path: 'about' }
    ];
    const fn = jest.fn(() => {
      return null;
    });

    const config = createConfig(history, routes);
    config.ready().then(resp => {
      const wrapper = shallow(
        <Navigator config={config}>
          {fn}
        </Navigator>
      );

      expect(fn.mock.calls[0][1]).toBe(config);
      done();
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
      const wrapper = shallow(
        <Navigator config={config}>
          {fn}
        </Navigator>
      );
      history.push('/about');
      done();
    });
  });

  describe('response', () => {
    it('renders using response if provided', () => {
      const fakeConfig = {
        subscribe: jest.fn()
      };
      const resp = new ResponseCreator({ pathname: '/testing' });
      const respObj = resp.asObject();
      let received;
      const children = jest.fn(response => {
        received = response;
        return null;
      });
      const wrapper = shallow(
        <Navigator response={respObj} config={fakeConfig} children={children} />
      );
      expect(received).toBe(respObj);
    });

    it('does not call subscribe when passed a response', () => {
      const fakeConfig = {
        subscribe: jest.fn()
      };
      const resp = new ResponseCreator({ pathname: '/testing' });
      const respObj = resp.asObject();
      const wrapper = shallow(
        <Navigator
          response={respObj}
          config={fakeConfig}
          children={() => null}
        />
      );
      expect(fakeConfig.subscribe.mock.calls.length).toBe(0);
    });
  });

  describe('unmount', () => {
    it('unsubscribes from the config', () => {
      const unsub = jest.fn();
      const sub = jest.fn(fn => {
        return unsub;
      });
      const fakeConfig = {
        subscribe: sub
      };

      expect(unsub.mock.calls.length).toBe(0);
      expect(sub.mock.calls.length).toBe(0);

      const wrapper = shallow(
        <Navigator config={fakeConfig} children={() => null} />
      );
      expect(sub.mock.calls.length).toBe(1);
      expect(unsub.mock.calls.length).toBe(0);
      wrapper.unmount();
      expect(unsub.mock.calls.length).toBe(1);
    });
  });

  describe('context', () => {
    let receivedContext;

    beforeEach(() => {
      receivedContext = undefined;
    });

    const ConfigReporter = (props, context) => {
      receivedContext = context;
      return null;
    };

    ConfigReporter.contextTypes = {
      curi: PropTypes.object,
      curiResponse: PropTypes.object
    };

    it('places the curi config on the context as "context.curi"', () => {
      const unsub = jest.fn();
      const sub = jest.fn(fn => {
        return unsub;
      });
      const fakeConfig = {
        subscribe: sub
      };

      const wrapper = mount(
        <Navigator config={fakeConfig} children={() => <ConfigReporter />} />
      );

      expect(receivedContext.curi).toBe(fakeConfig);
    });

    it('places the current response on the context as "context.curiResponse"', () => {
      const unsub = jest.fn();
      const sub = jest.fn(fn => {
        return unsub;
      });
      const fakeConfig = {
        subscribe: sub
      };
      const response = { name: 'Home' };

      const wrapper = mount(
        <Navigator
          config={fakeConfig}
          response={response}
          children={() => <ConfigReporter />}
        />
      );
      expect(receivedContext.curiResponse).toBe(response);
    });
  });
});
