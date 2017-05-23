import createRoute from '../src/utils/createRoute';
import ResponseCreator from '../src/utils/createResponse';

const noop = () => {};

describe('createRoute', () => {
  describe('constructor', () => {
    it('creates a route from an object', () => {
      const testRoute = createRoute({ name: 'Test', path: 'test' });
      const expectedProperties = [
        'name',
        'path',
        'render',
        'children',
        'preload',
        'load',
        'match'
      ];
      expectedProperties.forEach(key => {
        expect(testRoute.hasOwnProperty(key)).toBe(true);
      });
    });

    describe('options', () => {
      describe('name', () => {
        it('is set', () => {
          const testRoute = createRoute({ name: 'Test', path: 'test' });
          expect(testRoute.name).toBe('Test');
        });

        it('throws error if name is not provided', () => {
          expect(() => {
            const noNameRoute = createRoute({ path: 'no-name' });
          }).toThrow();
        });
      });

      describe('path', () => {
        it("is the path's path string", () => {
          const testRoute = createRoute({ name: 'Test', path: 'test' });
          expect(testRoute.path).toBe('test');
        });

        it('throws error if path is not provided', () => {
          expect(() => {
            const noNameRoute = createRoute({ name: 'No Path' });
          }).toThrow();
        });
      });

      describe('keys', () => {
        it('is the array of param names parsed from the path', () => {
          const testRoute = createRoute({
            name: 'Test',
            path: ':one/:two/:three'
          });
          expect(testRoute.keys).toEqual(['one', 'two', 'three']);
        });

        it('is an empty array when the path has no params', () => {
          const testRoute = createRoute({
            name: 'test',
            path: 'one/two/three'
          });
          expect(testRoute.keys).toEqual([]);
        });
      });

      describe('value', () => {
        it('sets the value that will be returned by the render function', () => {
          const value = 'Latitude';
          const testRoute = createRoute({
            name: 'Value',
            path: 'value',
            value
          });
          expect(testRoute.render()).toBe(value);
        });

        it('is preferred over the call option', () => {
          const one = 'One';
          const two = 'Two';
          const testRoute = createRoute({
            name: 'Value Over Call',
            path: 'value',
            value: one,
            call: () => two
          });
          expect(testRoute.render()).toBe(one);
        });
      });

      describe('call', () => {
        it('sets the function that will be called by the render function', () => {
          const value = 'Longitude';
          const call = () => value;
          const testRoute = createRoute({
            name: 'Call',
            path: 'call-me-maybe',
            call
          });
          expect(testRoute.render()).toBe(value);
        });
      });

      describe('children', () => {
        it('is options.children', () => {
          const First = createRoute({ name: 'First', path: 'first' });
          const Second = createRoute({ name: 'Second', path: 'second' });
          const children = [First, Second];
          const Parent = createRoute({
            name: 'Parent',
            path: 'parent',
            children
          });
          expect(Parent.children).toBe(children);
        });
      });

      describe('preload', () => {
        it('will attach a preload fn to returned object', () => {
          const loadTest = () => Promise.resolve();
          const testRoute = createRoute({
            name: 'Test',
            path: 'test',
            preload: loadTest
          });
          expect(typeof testRoute.preload).toBe('function');
        });

        it('will only call promise once', () => {
          let callCount = 0;
          const loadTest = () => Promise.resolve(callCount++);
          const testRoute = createRoute({
            name: 'Test',
            path: 'test',
            preload: loadTest
          });
          testRoute.preload();
          expect(callCount).toBe(1);
          testRoute.preload();
          expect(callCount).toBe(1);
        });

        it("will be undefined when preload isn't defined", () => {
          const loadTest = () => Promise.resolve();
          const testRoute = createRoute({ name: 'Test', path: 'test' });
          expect(testRoute.preload).toBeUndefined();
        });
      });

      describe('load', () => {
        it('will attach a load fn to returned object', () => {
          const loadTest = () => Promise.resolve();
          const testRoute = createRoute({
            name: 'Test',
            path: 'test',
            load: loadTest
          });
          expect(typeof testRoute.load).toBe('function');
        });

        it("will be undefined when load isn't defined", () => {
          const testRoute = createRoute({ name: 'Test', path: 'test' });
          expect(testRoute.load).toBeUndefined();
        });
      });
    });
  });

  describe('match', () => {
    describe('return value', () => {
      it('returns true if it matches', () => {
        const resp = new ResponseCreator();
        const testRoute = createRoute({ name: 'Test', path: 'test' });
        const matches = testRoute.match('test', resp);
        expect(matches).toBe(true);
      });

      it('returns false if it does not', () => {
        const resp = new ResponseCreator();
        const testRoute = createRoute({ name: 'Test', path: 'test' });
        const matches = testRoute.match('no-match', resp);
        expect(matches).toBe(false);
      });
    });

    describe('with children', () => {
      describe('when children match', () => {
        it('also matches', () => {
          const resp = new ResponseCreator();
          const testRoute = createRoute({
            name: 'Test',
            path: 'test',
            children: [
              createRoute({
                name: 'Child',
                path: 'child'
              })
            ]
          });
          const matches = testRoute.match('test/child', resp);
          expect(matches).toBe(true);
        });
      });

      describe('when children do not match', () => {
        it('matches if the route matches exactly', () => {
          const resp = new ResponseCreator();
          const testRoute = createRoute({
            name: 'Test',
            path: 'test',
            children: [
              createRoute({
                name: 'Child',
                path: 'child'
              })
            ]
          });
          const matches = testRoute.match('test', resp);
          expect(matches).toBe(true);
        });

        it('matches if pathOptions.end=false', () => {
          const resp = new ResponseCreator();
          const testRoute = createRoute({
            name: 'Test',
            path: 'test',
            pathOptions: { end: false },
            children: [
              createRoute({
                name: 'Child',
                path: 'child'
              })
            ]
          });
          const matches = testRoute.match('test', resp);
          expect(matches).toBe(true);
        });

        it('does not match if pathOptions.end != false', () => {
          const resp = new ResponseCreator();
          const testRoute = createRoute({
            name: 'Test',
            path: 'test',
            children: [
              createRoute({
                name: 'Child',
                path: 'child'
              })
            ]
          });
          const matches = testRoute.match('test', resp);
          expect(matches).toBe(true);
        });
      });
    });

    it('does not register if the path does not match the pathname', () => {
      const resp = new ResponseCreator();
      const testRoute = createRoute({ name: 'Test', path: 'test' });
      testRoute.match('best', resp);
      resp.freeze();
      expect(resp.route).toBeUndefined();
    });

    it('registers if the path matches the pathname', () => {
      const resp = new ResponseCreator({ pathname: 'test' });
      const testRoute = createRoute({ name: 'Test', path: 'test' });
      testRoute.match('test', resp);
      resp.freeze();
      expect(resp.route).toBe(testRoute);
    });

    it('ignores a leading slash on the pathname', () => {
      const resp = new ResponseCreator();
      const testRoute = createRoute({ name: 'Test', path: 'test' });
      testRoute.match('/test', resp);
      resp.freeze();
      expect(resp.route).toBe(testRoute);
    });

    describe('children', () => {
      it('tests children if it matches', () => {
        const One = createRoute({ name: 'One', path: 'one' });
        const Two = createRoute({ name: 'Two', path: 'two' });
        const testRoute = createRoute({
          name: 'Test',
          path: 'test',
          children: [One, Two]
        });
        const resp = new ResponseCreator();
        testRoute.match('test/one', resp);
        resp.freeze();
        expect(resp.route).toBe(One);
        expect(resp.partials[0]).toBe('Test');
      });

      it('children inherit parent params', () => {
        const Attractions = createRoute({
          name: 'Attractions',
          path: 'attractions'
        });
        const testRoute = createRoute({
          name: 'State',
          path: ':state',
          children: [Attractions]
        });
        const resp = new ResponseCreator();
        testRoute.match('Wisconsin/attractions', resp);
        resp.freeze();
        expect(resp.route).toBe(Attractions);
        expect(resp.params.state).toBe('Wisconsin');
      });

      it('overwrites param name conflicts', () => {
        const testRoute = createRoute({
          name: 'One',
          path: ':id',
          children: [createRoute({ name: 'Two', path: ':id' })]
        });
        const resp = new ResponseCreator();
        testRoute.match('one/two', resp);
        resp.freeze();
        expect(resp.params.id).toBe('two');
      });
    });
  });
});
