import 'jest';
import { HickoryLocation } from '@hickory/root';
import createRoute from '../src/route';

const noop = () => {};

describe('createRoute', () => {
  describe('constructor', () => {
    it('creates a route from an object', () => {
      const testRoute = createRoute({
        name: 'Test',
        path: 'test',
        children: []
      });
      const expectedProperties = [
        'name',
        'path',
        'getBody',
        'children',
        'preload',
        'load',
        'match',
        'extra'
      ];
      expectedProperties.forEach(key => {
        expect(testRoute.hasOwnProperty(key)).toBe(true);
      });
    });

    describe('options', () => {
      describe('name', () => {
        it('is set', () => {
          const testRoute = createRoute({
            name: 'Test',
            path: 'test',
            children: []
          });
          expect(testRoute.name).toBe('Test');
        });
      });

      describe('path', () => {
        it("is the path's path string", () => {
          const testRoute = createRoute({
            name: 'Test',
            path: 'test',
            children: []
          });
          expect(testRoute.path).toBe('test');
        });
      });

      describe('keys', () => {
        it('is the array of param names parsed from the path', () => {
          const testRoute = createRoute({
            name: 'Test',
            path: ':one/:two/:three',
            children: []
          });
          expect(testRoute.keys).toEqual(['one', 'two', 'three']);
        });

        it('is an empty array when the path has no params', () => {
          const testRoute = createRoute({
            name: 'test',
            path: 'one/two/three',
            children: []
          });
          expect(testRoute.keys).toEqual([]);
        });
      });

      describe('body', () => {
        it('calls the function to', () => {
          const body = () => 'Longitude';
          const testRoute = createRoute({
            name: 'Call',
            path: 'call-me-maybe',
            body,
            children: []
          });
          expect(testRoute.getBody()).toBe('Longitude');
        });
      });

      describe('children', () => {
        it('is options.children', () => {
          const First = createRoute({
            name: 'First',
            path: 'first',
            children: []
          });
          const Second = createRoute({
            name: 'Second',
            path: 'second',
            children: []
          });
          const children = [First, Second];
          const Parent = createRoute({
            name: 'Parent',
            path: 'parent',
            children
          });
          expect(Parent.children).toBe(children);
        });

        it('forces path match end=false when route has children', () => {
          const First = createRoute({
            name: 'First',
            path: 'first',
            children: []
          });
          const Parent = createRoute({
            name: 'Parent',
            path: 'parent',
            pathOptions: { end: true },
            children: [First]
          });
          const location = {
            pathname: '/parent/first'
          } as HickoryLocation;

          const matches = Parent.match(location.pathname, []);
          expect(matches).toBe(true);
        });

        it('does not affect path match end value when route has no children', () => {
          const Parent = createRoute({
            name: 'Parent',
            path: 'parent',
            pathOptions: { end: true },
            children: []
          });
          const location = {
            pathname: '/parent/first'
          } as HickoryLocation;

          const matches = Parent.match(location.pathname, []);
          expect(matches).toBe(false);
        });
      });

      describe('preload', () => {
        it('will attach a preload fn to returned object', () => {
          const loadTest = () => Promise.resolve();
          const testRoute = createRoute({
            name: 'Test',
            path: 'test',
            preload: loadTest,
            children: []
          });
          expect(typeof testRoute.preload).toBe('function');
        });

        it('will only call promise once', () => {
          let callCount = 0;
          const loadTest = () => Promise.resolve(callCount++);
          const testRoute = createRoute({
            name: 'Test',
            path: 'test',
            preload: loadTest,
            children: []
          });
          testRoute.preload();
          expect(callCount).toBe(1);
          testRoute.preload();
          expect(callCount).toBe(1);
        });

        it("will be undefined when preload isn't defined", () => {
          const loadTest = () => Promise.resolve();
          const testRoute = createRoute({
            name: 'Test',
            path: 'test',
            children: []
          });
          expect(testRoute.preload).toBeUndefined();
        });
      });

      describe('load', () => {
        it('will attach a load fn to returned object', () => {
          const loadTest = () => Promise.resolve();
          const testRoute = createRoute({
            name: 'Test',
            path: 'test',
            load: loadTest,
            children: []
          });
          expect(typeof testRoute.load).toBe('function');
        });

        it("will be undefined when load isn't defined", () => {
          const testRoute = createRoute({
            name: 'Test',
            path: 'test',
            children: []
          });
          expect(testRoute.load).toBeUndefined();
        });
      });

      describe('params', () => {
        it('will attach the object to the route as "paramParsers"', () => {
          const params = {
            id: input => parseInt(input, 10)
          };
          const testRoute = createRoute({
            name: 'Test',
            path: 'test/:id',
            children: [],
            params
          });
          expect(testRoute.paramParsers).toBe(params);
        });
      });

      describe('extra', () => {
        it('can be used to attach extra key-value pairs to the route', () => {
          const loadTest = () => Promise.resolve();
          const extra = {
            unofficial: true,
            another: 1
          };
          const testRoute = createRoute({
            name: 'Test',
            path: 'test',
            load: loadTest,
            children: [],
            extra
          });
          expect(testRoute.extra).toBe(extra);
        });
      });
    });
  });

  describe('match', () => {
    describe('return value', () => {
      it('returns true if it matches', () => {
        const location = { pathname: '/test' } as HickoryLocation;
        const testRoute = createRoute({
          name: 'Test',
          path: 'test',
          children: []
        });
        const matches = testRoute.match(location.pathname, []);
        expect(matches).toBe(true);
      });

      it('returns false if it does not', () => {
        const location = { pathname: '/no-match' } as HickoryLocation;
        const testRoute = createRoute({
          name: 'Test',
          path: 'test',
          children: []
        });
        const matches = testRoute.match(location.pathname, []);
        expect(matches).toBe(false);
      });
    });

    it('ignores a leading slash on the pathname', () => {
      const location = { pathname: '/test' } as HickoryLocation;
      const testRoute = createRoute({
        name: 'Test',
        path: 'test',
        children: []
      });
      const matches = [];
      testRoute.match(location.pathname, matches);
      const { route } = matches[matches.length - 1];
      expect(route).toBe(testRoute);
    });

    describe('with children', () => {
      describe('when children match', () => {
        it('also matches', () => {
          const location = { pathname: '/test/child' } as HickoryLocation;

          const testRoute = createRoute({
            name: 'Test',
            path: 'test',
            children: [
              createRoute({
                name: 'Child',
                path: 'child',
                children: []
              })
            ]
          });
          const matches = testRoute.match(location.pathname, []);
          expect(matches).toBe(true);
        });
      });

      describe('when children do not match', () => {
        it('matches if the route matches exactly', () => {
          const location = { pathname: '/test' } as HickoryLocation;
          const testRoute = createRoute({
            name: 'Test',
            path: 'test',
            children: [
              createRoute({
                name: 'Child',
                path: 'child',
                children: []
              })
            ]
          });
          const matches = testRoute.match(location.pathname, []);
          expect(matches).toBe(true);
        });

        it('matches if pathOptions.end=false', () => {
          const location = { pathname: '/test' } as HickoryLocation;
          const testRoute = createRoute({
            name: 'Test',
            path: 'test',
            pathOptions: { end: false },
            children: [
              createRoute({
                name: 'Child',
                path: 'child',
                children: []
              })
            ]
          });
          const matches = testRoute.match(location.pathname, []);
          expect(matches).toBe(true);
        });

        it('does not match if pathOptions.end != false', () => {
          const location = { pathname: '/test' } as HickoryLocation;
          const testRoute = createRoute({
            name: 'Test',
            path: 'test',
            children: [
              createRoute({
                name: 'Child',
                path: 'child',
                children: []
              })
            ]
          });
          const matches = testRoute.match(location.pathname, []);
          expect(matches).toBe(true);
        });
      });
    });

    it('does not register if the path does not match the pathname', () => {
      const location = { pathname: '/best' } as HickoryLocation;
      const testRoute = createRoute({
        name: 'Test',
        path: 'test',
        children: []
      });
      const matches = [];
      testRoute.match(location.pathname, matches);
      const match = matches[matches.length - 1];
      expect(match).toBeUndefined();
    });

    it('registers if the path matches the pathname', () => {
      const location = { pathname: '/test' } as HickoryLocation;
      const testRoute = createRoute({
        name: 'Test',
        path: 'test',
        children: []
      });
      const matches = [];
      testRoute.match(location.pathname, matches);
      const { route } = matches[matches.length - 1];
      expect(route).toBe(testRoute);
    });

    describe('children', () => {
      it('tests children if it matches', () => {
        const One = createRoute({ name: 'One', path: 'one', children: [] });
        const Two = createRoute({ name: 'Two', path: 'two', children: [] });
        const testRoute = createRoute({
          name: 'Test',
          path: 'test',
          children: [One, Two]
        });
        const location = { pathname: '/test/one' } as HickoryLocation;
        const matches = [];
        testRoute.match(location.pathname, matches);
        // slice? or splice?
        matches.reverse();
        let [best, ...partials] = matches;
        partials.reverse();
        expect(best.route).toBe(One);
        expect(partials[0].route.name).toBe('Test');
      });

      it.skip('children inherit parent params', () => {
        // test this elsewhere?
        const Attractions = createRoute({
          name: 'Attractions',
          path: 'attractions',
          children: []
        });
        const testRoute = createRoute({
          name: 'State',
          path: ':state',
          children: [Attractions]
        });
        const location = {
          pathname: '/Wisconsin/attractions'
        } as HickoryLocation;
        const matches = [];
        testRoute.match(location.pathname, matches);
        const { route, params } = matches[matches.length - 1];
        expect(route).toBe(Attractions);
        expect(params['state']).toBe('Wisconsin');
      });

      it.skip('overwrites param name conflicts', () => {
        const testRoute = createRoute({
          name: 'One',
          path: ':id',
          children: [createRoute({ name: 'Two', path: ':id', children: [] })]
        });
        const location = { pathname: '/one/two' } as HickoryLocation;
        const matches = [];
        testRoute.match(location.pathname, matches);
        //expect(resp.params['id']).toBe('two');
      });
    });
  });
});
