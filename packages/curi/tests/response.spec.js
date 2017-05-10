import Response from '../src/response';
import createRoute from '../src/utils/createRoute';

const noop = () => {};

describe('Response', () => {
  describe('constructor', () => {
    it('sets the key', () => {
      const key = 'greetings';
      const location = { pathname: '/you-are-here' };
      const resp = new Response(key, location);
      expect(resp.key).toEqual(key);
    });

    it('sets the location', () => {
      const key = 'greetings';
      const location = { pathname: '/you-are-here' };
      const resp = new Response(key, location);
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

  describe('redirect', () => {
    it("sets the response's status property", () => {
      const resp = new Response();
      resp.redirect('http://www.example.com', 302);
      expect(resp.status).toBe(302);
    });

    it("sets the response's redirectTo property", () => {
      const resp = new Response();
      resp.redirect('https://www.example.com', 302);
      expect(resp.redirectTo).toBe('https://www.example.com');
    });

    it('defaults to a 301 response', () => {
      const resp = new Response();
      resp.redirect('http://www.example.com');
      expect(resp.status).toBe(301);
    });
  });

  describe('fail', () => {
    it("sets the response's error property", () => {
      const resp = new Response();
      resp.fail('This was a disaster');
      expect(resp.error).toBe('This was a disaster');
    });
  });

  describe('add', () => {
    it('sets the name, uri, and params', () => {
      const resp = new Response();
      const match = createRoute({ name: 'Foo', path: 'egg' });
      const params = { food: 'egg' };
      resp.add(match, params);
      expect(resp.uri).toEqual(match);
      expect(resp.params).toEqual(params);
    });

    it('pushes current name to partials when adding new match', () => {
      const resp = new Response();
      resp.add(createRoute({ name: 'State', path: 'WA' }), { state: 'WA' });
      resp.add(createRoute({ name: 'City', path: 'WA/Seattle' }), {
        city: 'Seattle'
      });
      expect(resp.partials.length).toBe(1);
      expect(resp.partials[0]).toBe('State');
    });

    it('merges params when adding new match', () => {
      const resp = new Response();
      resp.add(createRoute({ name: 'State', path: 'WA' }), { state: 'WA' });
      resp.add(createRoute({ name: 'City', path: 'WA/Seattle' }), {
        city: 'Seattle'
      });
      expect(resp.params).toEqual({ state: 'WA', city: 'Seattle' });
    });
  });

  describe('call', () => {
    it("calls the uri's render function, setting Response.body", () => {
      const retValue = 'Hakuna Matata';
      const fn = jest.fn(() => retValue);
      const resp = new Response();
      resp.add(
        createRoute({ name: 'Phrase', path: 'hakuna-matata', call: fn })
      );
      resp.call();
      expect(fn.mock.calls.length).toBe(1);
      expect(resp.body).toBe(retValue);
    });

    it("is undefined if uri wasn't passed a call/value option", () => {
      const resp = new Response();
      resp.add(createRoute({ name: 'Phrase', path: 'no-worries' }));
      resp.call();
      expect(resp.body).toBeUndefined();
    });
  });

  describe('asObject', () => {
    it('returns an object with desired properties', () => {
      const key = 'greetings';
      const location = { pathname: '/park/yosemite' };
      const resp = new Response(key, location);
      const value = 'Yosemite National Park';
      const parkURI = createRoute({ name: 'Park', path: 'park/:name', value });
      resp.add(parkURI, { name: 'yosemite' });
      resp.call();
      const respObj = resp.asObject();

      expect(respObj.key).toBe(key);
      expect(respObj.location).toBe(location);
      expect(respObj.status).toBe(200);
      expect(respObj.body).toBe(value);
      expect(respObj.name).toBe('Park');
      expect(respObj.partials).toEqual([]);
      expect(respObj.params).toEqual({ name: 'yosemite' });
    });

    it('returns a redirect object when redirectTo is set', () => {
      const key = 'greetings';
      const location = { pathname: '/park/yosemite' };
      const resp = new Response(key, location);
      const corporateTakeover = '/park/yosemite-land-brought-to-you-by-disney';
      resp.redirect(corporateTakeover);
      const respObj = resp.asObject();

      expect(respObj.key).toBe(key);
      expect(respObj.location).toBe(location);
      expect(respObj.status).toBe(301);
      expect(respObj.redirectTo).toBe(corporateTakeover);
    });
  });
});
