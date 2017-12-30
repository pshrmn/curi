import 'jest';
import React from 'react';
import { shallow, mount } from 'enzyme';
import PropTypes from 'prop-types';
import curi from '@curi/core';
import InMemory from '@hickory/in-memory';
import CuriBase from '../src/CuriBase';
import { Response } from '@curi/core';

describe('<CuriBase>', () => {
  it('calls render function when it renders', () => {
    const history = InMemory();
    const router = curi(history, []);
    const fakerouter = { subscribe: () => {} };
    const fn = jest.fn(() => {
      return null;
    });
    const wrapper = shallow(
      <CuriBase response={{} as Response} router={router} render={fn} />
    );
    expect(fn.mock.calls.length).toBe(1);
  });

  it('defaults to action="POP" if not provided', () => {
    const history = InMemory();
    const router = curi(history, []);
    const fakerouter = { subscribe: () => {} };
    const fn = jest.fn((response, action) => {
      expect(action).toBe('POP');
      return null;
    });
    const wrapper = shallow(
      <CuriBase response={{} as Response} router={router} render={fn} />
    );
  });

  it('passes the render function the response prop', done => {
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

    const router = curi(history, routes);
    const properties = [
      'key',
      'location',
      'status',
      'name',
      'partials',
      'params',
      'body',
      'data',
      'title'
    ];
    router.respond(response => {
      const wrapper = shallow(
        <CuriBase response={response} router={router} render={fn} />
      );
      expect(Object.keys(receivedResponse).length).toEqual(properties.length);
      properties.forEach(key => {
        expect(receivedResponse.hasOwnProperty(key)).toBe(true);
      });
      done();
    });
  });

  it('passes the render function the action prop', done => {
    const history = InMemory();
    const routes = [
      { name: 'Home', path: '', pathOptions: { end: true } },
      { name: 'About', path: 'about' }
    ];
    const fn = jest.fn(() => {
      return null;
    });

    const router = curi(history, routes);

    router.respond((response, action) => {
      const wrapper = shallow(
        <CuriBase
          response={response}
          action={action}
          router={router}
          render={fn}
        />
      );
      expect(fn.mock.calls[0][1]).toBe('PUSH');
      done();
    });
  });

  it('passes the render function the router object', done => {
    const history = InMemory();
    const routes = [
      { name: 'Home', path: '', pathOptions: { end: true } },
      { name: 'About', path: 'about' }
    ];
    const fn = jest.fn(() => {
      return null;
    });

    const router = curi(history, routes);
    router.respond(response => {
      const wrapper = shallow(
        <CuriBase response={response} router={router} render={fn} />
      );
      expect(fn.mock.calls[0][2]).toBe(router);
      done();
    });
  });

  describe('context', () => {
    let receivedContext;

    beforeEach(() => {
      receivedContext = undefined;
    });

    const RouterReporter: React.StatelessComponent = (props, context) => {
      receivedContext = context;
      return null;
    };

    RouterReporter.contextTypes = {
      curi: PropTypes.shape({
        router: PropTypes.object,
        response: PropTypes.object,
        action: PropTypes.string
      })
    };

    it('places the curi router on the context as "context.curi.router"', done => {
      const history = InMemory();
      const routes = [
        { name: 'Home', path: '', pathOptions: { end: true } },
        { name: 'About', path: 'about' }
      ];
      const router = curi(history, routes);

      router.respond(response => {
        const wrapper = mount(
          <CuriBase
            response={response}
            router={router}
            render={response => <RouterReporter />}
          />
        );
        expect(receivedContext.curi.router).toBe(router);
        done();
      });
    });

    it('places the current response on the context as "context.curi.response"', done => {
      const history = InMemory();
      const routes = [
        { name: 'Home', path: '', pathOptions: { end: true } },
        { name: 'About', path: 'about' }
      ];
      const router = curi(history, routes);

      router.respond(response => {
        const wrapper = mount(
          <CuriBase
            response={response}
            router={router}
            render={response => <RouterReporter />}
          />
        );
        expect(receivedContext.curi.response).toBe(response);
        done();
      });
    });

    it('places the current action on the context as "context.curi.action"', done => {
      const history = InMemory();
      const routes = [
        { name: 'Home', path: '', pathOptions: { end: true } },
        { name: 'About', path: 'about' }
      ];
      const router = curi(history, routes);

      router.respond((response, action) => {
        const wrapper = mount(
          <CuriBase
            response={response}
            action={action}
            router={router}
            render={response => <RouterReporter />}
          />
        );
        expect(receivedContext.curi.action).toBe(action);
        done();
      });
    });
  });
});
