import 'jest';
import { HickoryLocation } from '@hickory/root';
import createRoute from '../src/utils/createRoute';
import ResponseCreator from '../src/utils/createResponse';

const noop = () => {};

describe('createRoute', () => {
  describe('constructor', () => {
    it('creates a route from an object', () => {
      const testRoute = createRoute({ name: 'Test', path: 'test', children: [] });
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
          const testRoute = createRoute({ name: 'Test', path: 'test', children: [] });
          expect(testRoute.name).toBe('Test');
        });
      });

      describe('path', () => {
        it("is the path's path string", () => {
          const testRoute = createRoute({ name: 'Test', path: 'test', children: [] });
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
          const First = createRoute({ name: 'First', path: 'first', children: [] });
          const Second = createRoute({ name: 'Second', path: 'second', children: [] });
          const children = [First, Second];
          const Parent = createRoute({
            name: 'Parent',
            path: 'parent',
            children
          });
          expect(Parent.children).toBe(children);
        });

        it('forces path match end=false when route has children', () => {
          const First = createRoute({ name: 'First', path: 'first', children: [] });
          const Parent = createRoute({
            name: 'Parent',
            path: 'parent',
            pathOptions: { end: true },
            children: [First]
          });
          const location = {
            pathname: '/parent/first'
          } as HickoryLocation;
          const rc = new ResponseCreator(location.key, location);
          const matches = Parent.match(location.pathname, rc);
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
          const rc = new ResponseCreator(location.key, location);
          const matches = Parent.match(location.pathname, rc);
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
          const testRoute = createRoute({ name: 'Test', path: 'test', children: [] });
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
          const testRoute = createRoute({ name: 'Test', path: 'test', children: [] });
          expect(testRoute.load).toBeUndefined();
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
        const resp = new ResponseCreator('123', location);
        const testRoute = createRoute({ name: 'Test', path: 'test', children: [] });
        const matches = testRoute.match(location.pathname, resp);
        expect(matches).toBe(true);
      });

      it('returns false if it does not', () => {
        const location = { pathname: '/no-match' } as HickoryLocation;
        const resp = new ResponseCreator('456', location);
        const testRoute = createRoute({ name: 'Test', path: 'test', children: [] });
        const matches = testRoute.match(location.pathname, resp);
        expect(matches).toBe(false);
      });
    });

    it('ignores a leading slash on the pathname', () => {
      const location = { pathname: '/test' } as HickoryLocation;
      const resp = new ResponseCreator('789', location);
      const testRoute = createRoute({ name: 'Test', path: 'test', children: [] });
      testRoute.match(location.pathname, resp);
      resp.freeze();
      expect(resp.route).toBe(testRoute);
    });

    describe('with children', () => {
      describe('when children match', () => {
        it('also matches', () => {
          const location = { pathname: '/test/child' } as HickoryLocation;
          const resp = new ResponseCreator('012', location);
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
          const matches = testRoute.match(location.pathname, resp);
          expect(matches).toBe(true);
        });
      });

      describe('when children do not match', () => {
        it('matches if the route matches exactly', () => {
          const location = { pathname: '/test' } as HickoryLocation;
          const resp = new ResponseCreator('345', location);
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
          const matches = testRoute.match(location.pathname, resp);
          expect(matches).toBe(true);
        });

        it('matches if pathOptions.end=false', () => {
          const location = { pathname: '/test' } as HickoryLocation;
          const resp = new ResponseCreator('678', location);
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
          const matches = testRoute.match(location.pathname, resp);
          expect(matches).toBe(true);
        });

        it('does not match if pathOptions.end != false', () => {
          const location = { pathname: '/test' } as HickoryLocation;
          const resp = new ResponseCreator('901', location);
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
          const matches = testRoute.match(location.pathname, resp);
          expect(matches).toBe(true);
        });
      });
    });

    it('does not register if the path does not match the pathname', () => {
      const location = { pathname: '/best' } as HickoryLocation;
      const resp = new ResponseCreator('234', location);
      const testRoute = createRoute({ name: 'Test', path: 'test', children: [] });
      testRoute.match(location.pathname, resp);
      resp.freeze();
      expect(resp.route).toBeUndefined();
    });

    it('registers if the path matches the pathname', () => {
      const location = { pathname: '/test' } as HickoryLocation;
      const resp = new ResponseCreator('567', location);
      const testRoute = createRoute({ name: 'Test', path: 'test', children: [] });
      testRoute.match(location.pathname, resp);
      resp.freeze();
      expect(resp.route).toBe(testRoute);
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
        const resp = new ResponseCreator('890', location);
        testRoute.match(location.pathname, resp);
        resp.freeze();
        expect(resp.route).toBe(One);
        expect(resp.partials[0]).toBe('Test');
      });

      it('children inherit parent params', () => {
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
        const location = { pathname: '/Wisconsin/attractions' } as HickoryLocation;
        const resp = new ResponseCreator('123', location);
        testRoute.match(location.pathname, resp);
        resp.freeze();
        expect(resp.route).toBe(Attractions);
        expect(resp.params['state']).toBe('Wisconsin');
      });

      it('overwrites param name conflicts', () => {
        const testRoute = createRoute({
          name: 'One',
          path: ':id',
          children: [createRoute({ name: 'Two', path: ':id', children: [] })]
        });
        const location = { pathname: '/one/two' } as HickoryLocation;
        const resp = new ResponseCreator('456', location);
        testRoute.match(location.pathname, resp);
        resp.freeze();
        expect(resp.params['id']).toBe('two');
      });
    });
  });
});
