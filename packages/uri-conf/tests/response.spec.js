import Response from '../src/response';
import uri from '../src/uri';
import path from '../src/path';

const noop = () => {};

describe('Response', () => {
  describe('constructor', () => {
    it('sets the location', () => {
      const location = { pathname : '/you-are-here' };
      const resp = new Response(location);
      expect(resp.location).toEqual(location);
    });

    it('sets default values', () => {
      const resp = new Response();
      expect(resp.status).toBe(200);
      expect(resp.name).toBeUndefined();
      expect(resp.uri).toBeUndefined();
      expect(resp.partials.length).toBe(0);
      expect(resp.params).toEqual({});
    });
  });

  describe('setStatus', () => {
    it('sets the status property', () => {
      const resp = new Response();
      resp.setStatus(404);
      expect(resp.status).toBe(404);
    });
  });

  describe('add', () => {
    it('sets the name, uri, and params', () => {
      const resp = new Response();
      const match = uri({ name: 'Foo', path: path('/egg') });
      const params = { food: 'egg' };
      resp.add(match, params);
      expect(resp.uri).toEqual(match);
      expect(resp.params).toEqual(params);
    });

    it('pushes current name to partials when adding new match', () => {
      const resp = new Response();
      resp.add(
        uri({ name: 'State', path: path('/WA') }),
        { state: 'WA' }
      );
      resp.add(
        uri({ name: 'City', path: path('/WA/Seattle') }),
        { city: 'Seattle' }
      );
      expect(resp.partials.length).toBe(1);
      expect(resp.partials[0]).toBe('State');
    });

    it('merges params when adding new match', () => {
      const resp = new Response();
      resp.add(
        uri({ name: 'State', path: path('/WA') }),
        { state: 'WA' }
      );
      resp.add(
        uri({ name: 'City', path: path('/WA/Seattle') }),
        { city: 'Seattle' }
      );
      expect(resp.params).toEqual({ state: 'WA', city: 'Seattle' });
    });
  });

  describe('call', () => {
    it('calls the uri\'s render function, setting Response.render', () => {
      const retValue = 'Hakuna Matata';
      const fn = jest.fn(() => retValue);
      const resp = new Response();
      resp.add(
        uri({ name: 'Phrase', path: path('/hakuna-matata'), call: fn })
      );
      resp.call();
      expect(fn.mock.calls.length).toBe(1);
      expect(resp.render).toBe(retValue);
    });

    it('is undefined if uri wasn\'t passed a call/value option', () => {
      const resp = new Response();
      resp.add(uri({ name: 'Phrase', path: path('/no-worries') }));
      resp.call();
      expect(resp.render).toBeUndefined();
    });
  });
});
