import Response from '../src/response';

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
      const name = 'Food';
      const uri = '/egg';
      const params = { food: 'egg' };
      resp.add(name, uri, params);
      expect(resp.name).toEqual(name);
      expect(resp.uri).toEqual(uri);
      expect(resp.params).toEqual(params);
    });

    it('pushes current name to partials when adding new match', () => {
      const resp = new Response();
      resp.add('State', '/WA', { state: 'WA' });
      resp.add('City', '/WA/Seattle', { city: 'Seattle' });
      expect(resp.partials.length).toBe(1);
      expect(resp.partials[0]).toBe('State');
    });

    it('merges params when adding new match', () => {
      const resp = new Response();
      resp.add('State', '/WA', { state: 'WA' });
      resp.add('City', '/WA/Seattle', { city: 'Seattle' });
      expect(resp.params).toEqual({ state: 'WA', city: 'Seattle' });
    });
  });
});
