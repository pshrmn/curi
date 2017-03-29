import uri from '../src/uri';
import path from '../src/path';

describe('uri', () => {
  it('returns an object with a match function', () => {
    const testUri = uri('Test', path('test'));
    expect(typeof testUri.match).toBe('function');
  });
  
  describe('match', () => {
    it('does not register if the path does not match the pathname', () => {
      const testUri = uri('Test', path('test'));
      const results = {};
      testUri.match('best', results);
      expect(results['Test']).toBeUndefined();
    });

    it('registers if the path matches the pathname', () => {
      const testUri = uri('Test', path('test'));
      const results = {};
      testUri.match('test', results);
      expect(results['Test']).toBeDefined();
    });

    it('ignores a leading slash on the pathname', () => {
      const testUri = uri('Test', path('test'));
      const results = {};
      testUri.match('/test', results);
      expect(results['Test']).toBeDefined();
    })

    describe('children', () => {
      it('tests children if it matches', () => {
        const testUri = uri('Test', path('test'), [
          uri('One', path('one')),
          uri('Two', path('two'))
        ]);
        const results = {};
        testUri.match('test/one', results);

        expect(results['Test']).toBeDefined();
        expect(results['One']).toBeDefined();
      });

      it('children inherit parent params', () => {
        const testUri = uri('State', path(':state'), [
          uri('Attractions', path('attractions'))
        ]);
        const results = {};
        testUri.match('Wisconsin/attractions', results);
        expect(results['Attractions']).toBeDefined();
        const { params } = results['Attractions'];
        expect(params.state).toBe('Wisconsin');
      });

      it('overwrites param name conflicts', () => {
        const testUri = uri('One', path(':id'), [
          uri('Two', path(':id'))
        ]);
        const results = {};
        testUri.match('one/two', results);
        expect(results['One'].params.id).toBe('one');
        expect(results['Two'].params.id).toBe('two');
      });
    });

    describe('load', () => {
      describe('preload', () => {
        it('does not register if preload not passed', () => {
          const testUri = uri('Test', path('test'));
          const results = {};
          const spy = jest.fn();
          testUri.match('test', results, spy);
          expect(spy.mock.calls.length).toBe(0);
        });

        it('does not register if path doesn\'t match', () => {
          const loadTest = () => Promise.resolve();
          const testUri = uri('Test', path('test'), [], { preload: loadTest });
          const results = {};
          const spy = jest.fn();
          testUri.match('nope', results, spy);
          expect(spy.mock.calls.length).toBe(0);
        });

        it('will register the promise', () => {
          const loadTest = () => Promise.resolve();
          const testUri = uri('Test', path('test'), [], { preload: loadTest });
          const results = {};
          const spy = jest.fn();
          testUri.match('test', results, spy);
          expect(spy.mock.calls.length).toBe(1);
        });

      });
    });
  });

  describe('reverse', () => {
    it('returns a URI with params filled in', () => {
      const testUri = uri('Test', path(':test'));
      const reversed = testUri.reverse({ test: 'hello' });
      expect(reversed).toBe('hello');
    });
  });
});
