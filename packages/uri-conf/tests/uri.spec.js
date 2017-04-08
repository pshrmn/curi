import uri from '../src/uri';
import path from '../src/path';
import Response from '../src/response';

describe('uri', () => {
  it('returns an object with a match function', () => {
    const testUri = uri('Test', path('test'));
    expect(typeof testUri.match).toBe('function');
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
      expect(resp.name).toBeUndefined();
    });

    it('registers if the path matches the pathname', () => {
      const resp = new Response({ pathname: 'test' });
      const testUri = uri('Test', path('test'));
      testUri.match('test', resp);
      expect(resp.name).toBe('Test');
    });

    it('ignores a leading slash on the pathname', () => {
      const resp = new Response();
      const testUri = uri('Test', path('test'));
      testUri.match('/test', resp);
      expect(resp.name).toBe('Test');
    })

    describe('children', () => {
      it('tests children if it matches', () => {
        const testUri = uri('Test', path('test'), [
          uri('One', path('one')),
          uri('Two', path('two'))
        ]);
        const resp = new Response();
        testUri.match('test/one', resp);
        expect(resp.name).toBe('One');
        expect(resp.partials[0]).toBe('Test');
      });

      it('children inherit parent params', () => {
        const testUri = uri('State', path(':state'), [
          uri('Attractions', path('attractions'))
        ]);
        const resp = new Response();
        testUri.match('Wisconsin/attractions', resp);
        expect(resp.name).toBe('Attractions');
        expect(resp.params.state).toBe('Wisconsin');
      });

      it('overwrites param name conflicts', () => {
        const testUri = uri('One', path(':id'), [
          uri('Two', path(':id'))
        ]);
        const resp = new Response();
        testUri.match('one/two', resp);
        expect(resp.params.id).toBe('two');
      });
    });

    describe('load', () => {
      describe('preload', () => {
        it('will register the promise', () => {
          const loadTest = () => Promise.resolve();
          const testUri = uri('Test', path('test'), [], { preload: loadTest });
          const resp = new Response();
          const spy = jest.fn();
          testUri.match('test', resp, spy);
          expect(spy.mock.calls.length).toBe(1);
        });

        it('does not register if preload not passed', () => {
          const testUri = uri('Test', path('test'));
          const resp = new Response();
          const spy = jest.fn();
          testUri.match('test', resp, spy);
          expect(spy.mock.calls.length).toBe(0);
        });

        it('does not register if path doesn\'t match', () => {
          const loadTest = () => Promise.resolve();
          const testUri = uri('Test', path('test'), [], { preload: loadTest });
          const resp = new Response();
          const spy = jest.fn();
          testUri.match('nope', resp, spy);
          expect(spy.mock.calls.length).toBe(0);
        });
      });

      describe('load', () => {
        it('registers itself when it matches', () => {
          const resp = new Response();
          const spy = jest.fn();
          const testUri = uri('Test', path('test'), null, {
            load: () => Promise.resolve('1234')
          });
          testUri.match('test', resp, spy);
          expect(resp.name).toBe('Test');
          expect(spy.mock.calls.length).toBe(1);
        });

        it('will not be registered when it does not match', () => {
          const resp = new Response();
          const spy = jest.fn();
          const testUri = uri('Test', path('test'), null, {
            load: () => Promise.resolve('1234')
          });
          testUri.match('no-match', resp, spy);
          expect(resp.name).toBeUndefined();
          expect(spy.mock.calls.length).toBe(0);
        });
      });
    });
  });
});
