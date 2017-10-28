import 'jest';
import createRoute from '../src/createRoute';
import { HickoryLocation } from '@hickory/root';
import createResponse, { Response } from '../src/createResponse';

const noop = () => {};

describe('createResponse', () => {
  const routes = [];
  const addons = {};

  it('resolves a Response object with default values', () => {
    const location = {
      pathname: '/you-are-here',
      key: 'greetings'
    } as HickoryLocation;
    expect.assertions(1);
    return createResponse(location, routes, addons).then(response => {
      expect(response).toMatchObject({
        location: location,
        key: location.key,
        status: 404, // 404 since we don't actually have a route to match
        partials: [],
        params: {},
        data: undefined
      });
    });
  });

  describe('parent routes', () => {
    it('sets the partials using the names of all other matching routes', () => {
      const location = {
        key: '123',
        pathname: '/TX/Austin'
      } as HickoryLocation;

      const stateRoute = createRoute({
        name: 'State',
        path: ':state',
        children: [
          createRoute({
            name: 'City',
            path: ':city',
            children: []
          })
        ]
      });

      expect.assertions(1);
      return createResponse(location, [stateRoute], addons).then(resp => {
        expect(resp.partials).toEqual(['State']);
      });
    });

    it("sets the params by merging all of the matched routes' params", () => {
      const location = {
        key: '123',
        pathname: '/MT/Bozeman'
      } as HickoryLocation;

      const stateRoute = createRoute({
        name: 'State',
        path: ':state',
        children: [
          createRoute({
            name: 'City',
            path: ':city',
            children: []
          })
        ]
      });

      expect.assertions(1);
      return createResponse(location, [stateRoute], addons).then(resp => {
        expect(resp.params).toEqual({
          state: 'MT',
          city: 'Bozeman'
        });
      });
    });

    it('skips parent match if no children match', () => {
      const location = {
        key: '123',
        pathname: '/MT/Bozeman'
      } as HickoryLocation;

      const stateRoute = createRoute({
        name: 'State',
        path: ':state',
        children: [
          createRoute({
            name: 'Wat',
            path: 'wat',
            children: []
          })
        ]
      });

      expect.assertions(2);
      return createResponse(location, [stateRoute], addons).then(resp => {
        expect(resp.name).toBeUndefined();
        expect(resp.partials).toEqual([]);
      });
    });
  });

  describe('route load modifiers', () => {
    describe('setStatus', () => {
      it('sets the status property', () => {
        const location = { key: '123', pathname: '/abc' } as HickoryLocation;
        const routes = [
          createRoute({
            name: 'Test',
            path: 'abc',
            children: [],
            load: (route, mods): any => {
              mods.setStatus(404);
            }
          })
        ];
        expect.assertions(1);
        return createResponse(location, routes, addons).then(resp => {
          expect(resp.status).toBe(404);
        });
      });
    });

    describe('redirect', () => {
      it("sets the response's status and redirectTo properties", () => {
        const location = { key: '123', pathname: '/abc' } as HickoryLocation;
        const routes = [
          createRoute({
            name: 'Test',
            path: 'abc',
            children: [],
            load: (route, mods): any => {
              mods.redirect('http://www.example.com', 302);
            }
          })
        ];
        expect.assertions(2);
        return createResponse(location, routes, addons).then(resp => {
          expect(resp.status).toBe(302);
          expect(resp.redirectTo).toBe('http://www.example.com');
        });
      });

      it('defaults to a 301 response', () => {
        const location = { key: '123', pathname: '/abc' } as HickoryLocation;
        const routes = [
          createRoute({
            name: 'Test',
            path: 'abc',
            children: [],
            load: (route, mods): any => {
              mods.redirect('http://www.example.com');
            }
          })
        ];
        expect.assertions(1);
        return createResponse(location, routes, addons).then(resp => {
          expect(resp.status).toBe(301);
        });
      });
    });

    describe('fail', () => {
      it("sets the response's error property", () => {
        const location = { key: '123', pathname: '/abc' } as HickoryLocation;
        const routes = [
          createRoute({
            name: 'Test',
            path: 'abc',
            children: [],
            load: (route, mods): any => {
              mods.fail('This was a disaster');
            }
          })
        ];
        expect.assertions(1);
        return createResponse(location, routes, addons).then(resp => {
          expect(resp.error).toBe('This was a disaster');
        });
      });
    });

    describe('setData', () => {
      it("sets the response's data property", () => {
        const location = { key: '123', pathname: '/abc' } as HickoryLocation;
        const data = { one: 1, two: 2 };
        const routes = [
          createRoute({
            name: 'Test',
            path: 'abc',
            children: [],
            load: (route, mods): any => {
              mods.setData(data);
            }
          })
        ];
        expect.assertions(1);
        return createResponse(location, routes, addons).then(resp => {
          expect(resp.data).toBe(data);
        });
      });
    });
  });

  describe('title', () => {
    it('is an empty string when there is no matched route', () => {
      const location = { key: '123', pathname: '/abc' } as HickoryLocation;
      const stateRoute = createRoute({
        name: 'State',
        path: ':state',
        children: []
      });
      expect.assertions(1);
      return createResponse(location, [stateRoute], addons).then(resp => {
        expect(resp.title).toBe('');
      });
    });

    it('is an empty string if the matched route does not have a title property', () => {
      const location = { key: '123', pathname: '/ID' } as HickoryLocation;
      const stateRoute = createRoute({
        name: 'State',
        path: ':state',
        children: []
      });
      expect.assertions(1);
      return createResponse(location, [stateRoute], addons).then(resp => {
        expect(resp.title).toBe('');
      });
    });

    it('is the route.title value route.title is a string', () => {
      const location = { key: '123', pathname: '/VA' } as HickoryLocation;
      const stateRoute = createRoute({
        name: 'State',
        path: ':state',
        children: [],
        title: 'A State'
      });
      expect.assertions(1);
      return createResponse(location, [stateRoute], addons).then(resp => {
        expect(resp.title).toBe('A State');
      });
    });

    it('calls route.title passing it the params and data when it is a function', () => {
      const location = { key: '123', pathname: '/WV' } as HickoryLocation;
      const stateRoute = createRoute({
        name: 'State',
        path: ':state',
        children: [],
        load: (route, mods): any => {
          mods.setData({ full: 'West Virginia' });
        },
        title: (params, data) => {
          return `${params['state']} (aka ${data.full})`;
        }
      });
      expect.assertions(1);
      return createResponse(location, [stateRoute], addons).then(resp => {
        expect(resp.title).toBe('WV (aka West Virginia)');
      });
    });
  });

  describe('param parsing', () => {
    it('uses route.paramParsers to parse params', () => {
      const location = { key: '123', pathname: '/123' } as HickoryLocation;

      const numRoute = createRoute({
        name: 'number',
        path: ':num',
        children: [],
        params: {
          num: n => parseInt(n, 10)
        }
      });
      expect.assertions(1);
      return createResponse(location, [numRoute], addons).then(resp => {
        expect(resp.params).toEqual({ num: 123 });
      });
    });

    it('parsers params from parent routes', () => {
      const location = {
        key: '123',
        pathname: '/123/456'
      } as HickoryLocation;

      const firstRoute = createRoute({
        name: 'first',
        path: ':first',
        children: [
          createRoute({
            name: 'second',
            path: ':second',
            children: [],
            params: {
              second: n => parseInt(n, 10)
            }
          })
        ],
        params: {
          first: n => parseInt(n, 10)
        }
      });

      expect.assertions(1);
      return createResponse(location, [firstRoute], addons).then(resp => {
        expect(resp.params).toEqual({
          first: 123,
          second: 456
        });
      });
    });

    it('uses string for any params not in route.paramParsers', () => {
      const location = {
        key: '123',
        pathname: '/123/456'
      } as HickoryLocation;

      const comboRoute = createRoute({
        name: 'combo',
        path: ':first/:second',
        children: [],
        params: {
          first: n => parseInt(n, 10)
        }
      });

      expect.assertions(1);
      return createResponse(location, [comboRoute], addons).then(resp => {
        expect(resp.params).toEqual({
          first: 123,
          second: '456'
        });
      });
    });

    it('falls back to string value if param parser throws', () => {
      const originalError = console.error;
      const errorMock = jest.fn();
      console.error = errorMock;
      const location = { key: '123', pathname: '/123' } as HickoryLocation;
      const numRoute = createRoute({
        name: 'number',
        path: ':num',
        children: [],
        params: {
          num: n => {
            throw new Error('This will fail.');
          }
        }
      });
      expect.assertions(3);
      return createResponse(location, [numRoute], addons).then(resp => {
        expect(resp.params).toEqual({
          num: '123'
        });
        expect(errorMock.mock.calls.length).toBe(1);
        expect(errorMock.mock.calls[0][0].message).toBe('This will fail.');
        console.error = originalError;
      });
    });
  });
});
