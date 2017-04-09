import uri from '../src/uri';
import path from '../src/path';
import Response from '../src/response';

const noop = () => {};

describe('uri', () => {
  it('returns an object with a match function', () => {
    const testUri = uri('Test', noop, path('test'));
    expect(typeof testUri.match).toBe('function');
  });
  
  describe('match', () => {

    describe('return value', () => {
      it('returns true if it matches', () => {
        const resp = new Response();
        const testUri = uri('Test', noop, path('test'));
        const matches = testUri.match('test', resp);  
        expect(matches).toBe(true);
      });

      it('returns false if it does not', () => {
        const resp = new Response();
        const testUri = uri('Test', noop, path('test'));
        const matches = testUri.match('no-match', resp);  
        expect(matches).toBe(false);
      });
    });

    it('does not register if the path does not match the pathname', () => {
      const resp = new Response();
      const testUri = uri('Test', noop, path('test'));
      testUri.match('best', resp);
      expect(resp.uri).toBeUndefined();
    });

    it('registers if the path matches the pathname', () => {
      const resp = new Response({ pathname: 'test' });
      const testUri = uri('Test', noop, path('test'));
      testUri.match('test', resp);
      expect(resp.uri).toBe(testUri);
    });

    it('ignores a leading slash on the pathname', () => {
      const resp = new Response();
      const testUri = uri('Test', noop, path('test'));
      testUri.match('/test', resp);
      expect(resp.uri).toBe(testUri);
    })

    describe('children', () => {
      it('tests children if it matches', () => {
        const One = uri('One', noop, path('one'));
        const Two = uri('Two', noop, path('two'));
        const testUri = uri('Test', noop, path('test'), [ One, Two ]);
        const resp = new Response();
        testUri.match('test/one', resp);
        expect(resp.uri).toBe(One);
        expect(resp.partials[0]).toBe('Test');
      });

      it('children inherit parent params', () => {
        const Attractions = uri('Attractions', noop, path('attractions'));
        const testUri = uri('State', noop, path(':state'), [ Attractions ]);
        const resp = new Response();
        testUri.match('Wisconsin/attractions', resp);
        expect(resp.uri).toBe(Attractions);
        expect(resp.params.state).toBe('Wisconsin');
      });

      it('overwrites param name conflicts', () => {
        const testUri = uri('One', noop, path(':id'), [
          uri('Two', noop, path(':id'))
        ]);
        const resp = new Response();
        testUri.match('one/two', resp);
        expect(resp.params.id).toBe('two');
      });
    });
  });

  describe('loading', () => {
    describe('preload', () => {
      it('will attach a preload fn to returned object', () => {
        const loadTest = () => Promise.resolve();
        const testUri = uri('Test', noop, path('test'), [], { preload: loadTest });
        expect(typeof testUri.preload).toBe('function');
      });

      it('will only call promise once', () => {
        let callCount = 0;
        const loadTest = () =>  Promise.resolve(callCount++);
        const testUri = uri('Test', noop, path('test'), [], { preload: loadTest });
        testUri.preload();
        expect(callCount).toBe(1);
        testUri.preload();
        expect(callCount).toBe(1);
      });

      it('will be undefined when preload isn\'t defined', () => {
        const loadTest = () => Promise.resolve();
        const testUri = uri('Test', noop, path('test'));
        expect(testUri.preload).toBeUndefined();
      });
    });

    describe('load', () => {
      it('will attach a preload fn to returned object', () => {
        const loadTest = () => Promise.resolve();
        const testUri = uri('Test', noop, path('test'), [], { preload: loadTest });
        expect(typeof testUri.preload).toBe('function');
      });

      it('will be undefined when load isn\'t defined', () => {
        const testUri = uri('Test', noop, path('test'));
        expect(testUri.load).toBeUndefined();
      });
    });
  });
});
