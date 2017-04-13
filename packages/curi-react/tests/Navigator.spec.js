import React from 'react';
import { shallow } from 'enzyme';
import { createConfig, path } from '../../curi/src';
import Response from '../../curi/src/response';
import { createMemoryHistory } from 'history';
import Navigator from '../src/Navigator';


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
  
  it('passes the children function a response object', (done) => {
    const history = createMemoryHistory();
    const routes = [
      { name: 'Home', path: path('', { end: true })},
      { name: 'About', path: path('about') }
    ];
    let receivedResponse;
    const fn = jest.fn((response) => {
      receivedResponse = response;
      return null;
    });

    const config = createConfig(history, routes)
    config.ready()
      .then((resp) => {
        const wrapper = shallow(
          <Navigator config={config}>
            {fn}
          </Navigator>
        );

        const properties = ['location', 'status', 'name', 'partials', 'params', 'body'];
        expect(Object.keys(receivedResponse).length).toEqual(properties.length);
        properties.forEach(key => {
          expect(receivedResponse.hasOwnProperty(key)).toBe(true);
        });
        done();
      });
  });

  it('updates on location changes', (done) => {
    const history = createMemoryHistory();
    const routes = [
      { name: 'Home', path: path('', { end: true })},
      { name: 'About', path: path('about') }
    ];

    let first = true;
    const fn = jest.fn((resp) => {
      if (first) {
        expect(resp.name).toBe('Home');
        first = false;
      } else {
        expect(resp.name).toBe('About');
      }
      return null;
    });

    const config = createConfig(history, routes)
    config.ready()
      .then(() => {
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
      const resp = new Response({ pathname: '/testing' });      
      const respObj = resp.asObject();
      let received;
      const children = jest.fn((response) => {
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
      const resp = new Response({ pathname: '/testing' });      
      const respObj = resp.asObject();
      const wrapper = shallow(
        <Navigator response={respObj} config={fakeConfig} children={() => null} />
      );
      expect(fakeConfig.subscribe.mock.calls.length).toBe(0);
    });
  });

  describe('unmount', () => {
    it('unsubscribes from the config', () => {
      const unsub = jest.fn();
      const sub = jest.fn((fn) => {
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
      wrapper.unmount()
      expect(unsub.mock.calls.length).toBe(1);
    });
  });
});
