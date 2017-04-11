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
    const fn = jest.fn((resp) => {
      expect(resp).toBeInstanceOf(Response);
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
        expect(resp.uri.name).toBe('Home');
        first = false;
      } else {
        expect(resp.uri.name).toBe('About');
        done();
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
      });
  });

  describe('response', () => {
    it('renders using response if provided', () => {

    });

    it('does not call subscribe when passed a resposne', () => {
      const fakeConfig = {
        subscribe: jest.fn()
      };
      const resp = new Response({ pathname: '/testing' });      
      let received;
      const children = jest.fn((response) => {
        received = response;
        return null;
      });
      const wrapper = shallow(
        <Navigator response={resp} config={fakeConfig} children={children} />
      );
      expect(fakeConfig.subscribe.mock.calls.length).toBe(0);
      expect(received).toBe(resp);
    });
  });
});
