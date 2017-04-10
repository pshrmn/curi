import uri from '../src/uri';
import path from '../src/path';
import Response from '../src/response';

const noop = () => {};

describe('uri', () => {
  describe('constructor', () => {
    it('returns an object with a match function', () => {
      const testUri = uri('Test', path('test'));
      expect(typeof testUri.match).toBe('function');
    });
    

    describe('name', () => {
      it('is set', () => {
        const testURI = uri('Test', path('test'));
        expect(testURI.name).toBe('Test');
      });
    });
    
    describe('path', () => {
      it('is the path\'s path string', () => {
        const testURI = uri('Test', path('test'));
        expect(testURI.path).toBe('test');
      });
    });

    describe('options', () => {
      describe('value', () => {
        it('sets the value that will be returned by the render function', () => {
          const value = 'Latitude';
          const testURI = uri('Value', path('value'), { value });
          expect(testURI.render()).toBe(value);
        });

        it('is preferred over the call option', () => {
          const one = 'One';
          const two = 'Two';
          const testURI = uri('Value Over Call', path('value'), { value: one, call: () => two });
          expect(testURI.render()).toBe(one);
        })
      });

      describe('call', () => {
        it('sets the function that will be called by the render function', () => {
          const value = 'Longitude';
          const call = () => value;
          const testURI = uri('Call', path('call-me-maybe'), { call });
          expect(testURI.render()).toBe(value);
        })
      });

      describe('children', () => {
        it('is options.children', () => {
          const First = uri('First', path('first'));
          const Second = uri('Second', path('second'));
          const children = [ First, Second ];
          const Parent = uri('Parent', path('parent'), { children });
          expect(Parent.children).toBe(children);
        });
      });

      describe('loading', () => {
        describe('preload', () => {
          it('will attach a preload fn to returned object', () => {
            const loadTest = () => Promise.resolve();
            const testUri = uri('Test', path('test'), { preload: loadTest });
            expect(typeof testUri.preload).toBe('function');
          });

          it('will only call promise once', () => {
            let callCount = 0;
            const loadTest = () =>  Promise.resolve(callCount++);
            const testUri = uri('Test', path('test'), { preload: loadTest });
            testUri.preload();
            expect(callCount).toBe(1);
            testUri.preload();
            expect(callCount).toBe(1);
          });

          it('will be undefined when preload isn\'t defined', () => {
            const loadTest = () => Promise.resolve();
            const testUri = uri('Test', path('test'));
            expect(testUri.preload).toBeUndefined();
          });
        });

        describe('load', () => {
          it('will attach a load fn to returned object', () => {
            const loadTest = () => Promise.resolve();
            const testUri = uri('Test', path('test'), { load: loadTest });
            expect(typeof testUri.load).toBe('function');
          });

          it('will be undefined when load isn\'t defined', () => {
            const testUri = uri('Test', path('test'));
            expect(testUri.load).toBeUndefined();
          });
        });
      });
    });
  });
  
  describe('match', () => {

    describe('return value', () => {
      it('returns true if it matches', () => {
        const resp = new Response();
        const testUri = uri('Test', path('test'));
        const matches = testUri.match('test', resp);  
        expect(matches).toBe(true);
      });

      it('returns false if it does not', () => {
        const resp = new Response();
        const testUri = uri('Test', path('test'));
        const matches = testUri.match('no-match', resp);  
        expect(matches).toBe(false);
      });
    });

    it('does not register if the path does not match the pathname', () => {
      const resp = new Response();
      const testUri = uri('Test', path('test'));
      testUri.match('best', resp);
      expect(resp.uri).toBeUndefined();
    });

    it('registers if the path matches the pathname', () => {
      const resp = new Response({ pathname: 'test' });
      const testUri = uri('Test', path('test'));
      testUri.match('test', resp);
      expect(resp.uri).toBe(testUri);
    });

    it('ignores a leading slash on the pathname', () => {
      const resp = new Response();
      const testUri = uri('Test', path('test'));
      testUri.match('/test', resp);
      expect(resp.uri).toBe(testUri);
    })

    describe('children', () => {
      it('tests children if it matches', () => {
        const One = uri('One', path('one'));
        const Two = uri('Two', path('two'));
        const testUri = uri('Test', path('test'), { children: [ One, Two ] });
        const resp = new Response();
        testUri.match('test/one', resp);
        expect(resp.uri).toBe(One);
        expect(resp.partials[0]).toBe('Test');
      });

      it('children inherit parent params', () => {
        const Attractions = uri('Attractions', path('attractions'));
        const testUri = uri('State', path(':state'), { children: [ Attractions ] });
        const resp = new Response();
        testUri.match('Wisconsin/attractions', resp);
        expect(resp.uri).toBe(Attractions);
        expect(resp.params.state).toBe('Wisconsin');
      });

      it('overwrites param name conflicts', () => {
        const testUri = uri('One', path(':id'), { children: [ uri('Two', path(':id')) ] });
        const resp = new Response();
        testUri.match('one/two', resp);
        expect(resp.params.id).toBe('two');
      });
    });
  });
});
