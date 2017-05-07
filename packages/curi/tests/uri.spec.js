import uri from '../src/utils/createUri';
import Response from '../src/response';

const noop = () => {};

describe('uri', () => {
  describe('constructor', () => {
    it('creates a uri from an object', () => {
      const testUri = uri({ name: 'Test', path: 'test' });
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
        expect(testUri.hasOwnProperty(key)).toBe(true);
      });
    });

    describe('options', () => {
      describe('name', () => {
        it('is set', () => {
          const testURI = uri({ name: 'Test', path: 'test' });
          expect(testURI.name).toBe('Test');
        });

        it('throws error if name is not provided', () => {
          expect(() => {
            const noNameURI = uri({ path: 'no-name' });
          }).toThrow();
        });
      });

      describe('path', () => {
        it("is the path's path string", () => {
          const testURI = uri({ name: 'Test', path: 'test' });
          expect(testURI.path).toBe('test');
        });

        it('throws error if path is not provided', () => {
          expect(() => {
            const noNameURI = uri({ name: 'No Path' });
          }).toThrow();
        });
      });

      describe('keys', () => {
        it('is the array of param names parsed from the path', () => {
          const testURI = uri({ name: 'Test', path: ':one/:two/:three' });
          expect(testURI.keys).toEqual(['one', 'two', 'three']);
        });

        it('is an empty array when the path has no params', () => {
          const testURI = uri({ name: 'test', path: 'one/two/three' });
          expect(testURI.keys).toEqual([]);
        });
      });

      describe('value', () => {
        it('sets the value that will be returned by the render function', () => {
          const value = 'Latitude';
          const testURI = uri({ name: 'Value', path: 'value', value });
          expect(testURI.render()).toBe(value);
        });

        it('is preferred over the call option', () => {
          const one = 'One';
          const two = 'Two';
          const testURI = uri({
            name: 'Value Over Call',
            path: 'value',
            value: one,
            call: () => two
          });
          expect(testURI.render()).toBe(one);
        });
      });

      describe('call', () => {
        it('sets the function that will be called by the render function', () => {
          const value = 'Longitude';
          const call = () => value;
          const testURI = uri({
            name: 'Call',
            path: 'call-me-maybe',
            call
          });
          expect(testURI.render()).toBe(value);
        });
      });

      describe('children', () => {
        it('is options.children', () => {
          const First = uri({ name: 'First', path: 'first' });
          const Second = uri({ name: 'Second', path: 'second' });
          const children = [First, Second];
          const Parent = uri({
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
          const testUri = uri({
            name: 'Test',
            path: 'test',
            preload: loadTest
          });
          expect(typeof testUri.preload).toBe('function');
        });

        it('will only call promise once', () => {
          let callCount = 0;
          const loadTest = () => Promise.resolve(callCount++);
          const testUri = uri({
            name: 'Test',
            path: 'test',
            preload: loadTest
          });
          testUri.preload();
          expect(callCount).toBe(1);
          testUri.preload();
          expect(callCount).toBe(1);
        });

        it("will be undefined when preload isn't defined", () => {
          const loadTest = () => Promise.resolve();
          const testUri = uri({ name: 'Test', path: 'test' });
          expect(testUri.preload).toBeUndefined();
        });
      });

      describe('load', () => {
        it('will attach a load fn to returned object', () => {
          const loadTest = () => Promise.resolve();
          const testUri = uri({
            name: 'Test',
            path: 'test',
            load: loadTest
          });
          expect(typeof testUri.load).toBe('function');
        });

        it("will be undefined when load isn't defined", () => {
          const testUri = uri({ name: 'Test', path: 'test' });
          expect(testUri.load).toBeUndefined();
        });
      });
    });
  });

  describe('match', () => {
    describe('return value', () => {
      it('returns true if it matches', () => {
        const resp = new Response();
        const testUri = uri({ name: 'Test', path: 'test' });
        const matches = testUri.match('test', resp);
        expect(matches).toBe(true);
      });

      it('returns false if it does not', () => {
        const resp = new Response();
        const testUri = uri({ name: 'Test', path: 'test' });
        const matches = testUri.match('no-match', resp);
        expect(matches).toBe(false);
      });
    });

    it('does not register if the path does not match the pathname', () => {
      const resp = new Response();
      const testUri = uri({ name: 'Test', path: 'test' });
      testUri.match('best', resp);
      expect(resp.uri).toBeUndefined();
    });

    it('registers if the path matches the pathname', () => {
      const resp = new Response({ pathname: 'test' });
      const testUri = uri({ name: 'Test', path: 'test' });
      testUri.match('test', resp);
      expect(resp.uri).toBe(testUri);
    });

    it('ignores a leading slash on the pathname', () => {
      const resp = new Response();
      const testUri = uri({ name: 'Test', path: 'test' });
      testUri.match('/test', resp);
      expect(resp.uri).toBe(testUri);
    });

    describe('children', () => {
      it('tests children if it matches', () => {
        const One = uri({ name: 'One', path: 'one' });
        const Two = uri({ name: 'Two', path: 'two' });
        const testUri = uri({
          name: 'Test',
          path: 'test',
          children: [One, Two]
        });
        const resp = new Response();
        testUri.match('test/one', resp);
        expect(resp.uri).toBe(One);
        expect(resp.partials[0]).toBe('Test');
      });

      it('children inherit parent params', () => {
        const Attractions = uri({
          name: 'Attractions',
          path: 'attractions'
        });
        const testUri = uri({
          name: 'State',
          path: ':state',
          children: [Attractions]
        });
        const resp = new Response();
        testUri.match('Wisconsin/attractions', resp);
        expect(resp.uri).toBe(Attractions);
        expect(resp.params.state).toBe('Wisconsin');
      });

      it('overwrites param name conflicts', () => {
        const testUri = uri({
          name: 'One',
          path: ':id',
          children: [uri({ name: 'Two', path: ':id' })]
        });
        const resp = new Response();
        testUri.match('one/two', resp);
        expect(resp.params.id).toBe('two');
      });
    });
  });
});
