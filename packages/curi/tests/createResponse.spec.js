import ResponseCreator from '../src/utils/createResponse';
import createRoute from '../src/utils/createRoute';

const noop = () => {};

describe('Response', () => {
  describe('constructor', () => {
    it('sets the key', () => {
      const key = 'greetings';
      const location = { pathname: '/you-are-here' };
      const resp = new ResponseCreator(key, location);
      expect(resp.key).toEqual(key);
    });

    it('sets the location', () => {
      const key = 'greetings';
      const location = { pathname: '/you-are-here' };
      const resp = new ResponseCreator(key, location);
      expect(resp.location).toEqual(location);
    });

    it('sets default values', () => {
      const resp = new ResponseCreator();
      expect(resp.status).toBe(200);
      expect(resp.name).toBeUndefined();
      expect(resp.uri).toBeUndefined();
      expect(resp.partials.length).toBe(0);
      expect(resp.params).toEqual({});
    });
  });

  describe('setStatus', () => {
    it('sets the status property', () => {
      const resp = new ResponseCreator();
      resp.setStatus(404);
      expect(resp.status).toBe(404);
    });
  });

  describe('redirect', () => {
    it("sets the response's status property", () => {
      const resp = new ResponseCreator();
      resp.redirect('http://www.example.com', 302);
      expect(resp.status).toBe(302);
    });

    it("sets the response's redirectTo property", () => {
      const resp = new ResponseCreator();
      resp.redirect('https://www.example.com', 302);
      expect(resp.redirectTo).toBe('https://www.example.com');
    });

    it('defaults to a 301 response', () => {
      const resp = new ResponseCreator();
      resp.redirect('http://www.example.com');
      expect(resp.status).toBe(301);
    });
  });

  describe('fail', () => {
    it("sets the response's error property", () => {
      const resp = new ResponseCreator();
      resp.fail('This was a disaster');
      expect(resp.error).toBe('This was a disaster');
    });
  });

  describe('setData', () => {
    it("setes the response's data property", () => {
      const resp = new ResponseCreator();
      const data = { one: 1, two: 2 };
      resp.setData(data);
      expect(resp.data).toBe(data);
    });
  });

  describe('push', () => {
    it('adds the route and params to matches array', () => {
      const resp = new ResponseCreator();
      const route = createRoute({ name: 'Foo', path: 'egg' });
      const params = { food: 'egg' };
      resp.push(route, params);
      const { matches } = resp;
      expect(matches[0].route).toBe(route);
      expect(matches[0].params).toBe(params);
    });

    it('adds additional routes/params to end of matches array', () => {
      const resp = new ResponseCreator();
      const stateRoute = createRoute({ name: 'State', path: ':state' });
      const stateParams = { state: 'WA' };
      const cityRoute = createRoute({ name: 'City', path: ':city' });
      const cityParams = { city: 'Seattle' };
      resp.push(stateRoute, stateParams);
      resp.push(cityRoute, cityParams);
      const { matches } = resp;
      const [first, second] = matches;
      expect(first.route).toBe(stateRoute);
      expect(first.params).toBe(stateParams);
      expect(second.route).toBe(cityRoute);
      expect(second.params).toBe(cityParams);
    });
  });

  describe('pop', () => {
    it('removes the last match from the matches array', () => {
      const resp = new ResponseCreator();
      const stateRoute = createRoute({ name: 'State', path: ':state' });
      const stateParams = { state: 'WA' };
      const cityRoute = createRoute({ name: 'City', path: ':city' });
      const cityParams = { city: 'Seattle' };
      resp.push(stateRoute, stateParams);
      expect(resp.matches.length).toBe(1);
      resp.push(cityRoute, cityParams);
      expect(resp.matches.length).toBe(2);
      resp.pop();
      expect(resp.matches.length).toBe(1);
      expect(resp.matches[0].route).toBe(stateRoute);
    });
  });

  describe('freeze', () => {
    it("sets the route using the most best response's match'", () => {
      const resp = new ResponseCreator();
      const stateRoute = createRoute({ name: 'State', path: ':state' });
      const stateParams = { state: 'OR' };
      const cityRoute = createRoute({ name: 'City', path: ':city' });
      const cityParams = { city: 'Portland' };
      resp.push(stateRoute, stateParams);
      resp.push(cityRoute, cityParams);
      resp.freeze();
      expect(resp.route).toBe(cityRoute);
    });

    it('sets the partials using the names of all other matching routes', () => {
      const resp = new ResponseCreator();
      const stateRoute = createRoute({ name: 'State', path: ':state' });
      const stateParams = { state: 'TX' };
      const cityRoute = createRoute({ name: 'City', path: ':city' });
      const cityParams = { city: 'Austin' };
      resp.push(stateRoute, stateParams);
      resp.push(cityRoute, cityParams);
      resp.freeze();
      expect(resp.partials).toEqual(['State']);
    });

    it("sets the params by merging all of the matched routes' params", () => {
      const resp = new ResponseCreator();
      const stateRoute = createRoute({ name: 'State', path: ':state' });
      const stateParams = { state: 'MT' };
      const cityRoute = createRoute({ name: 'City', path: ':city' });
      const cityParams = { city: 'Bozeman' };
      resp.push(stateRoute, stateParams);
      resp.push(cityRoute, cityParams);
      resp.freeze();
      expect(resp.params).toEqual({
        state: 'MT',
        city: 'Bozeman'
      });
    });

    it("calls the matching route's render function to set the body value", () => {
      const resp = new ResponseCreator();
      resp.push({ name: 'Country', path: ':country', render: () => 'Egypt' });
      resp.freeze();
      expect(resp.body).toEqual('Egypt');
    });
  });

  describe('asObject', () => {
    it('returns an object with desired properties', () => {
      const key = 'greetings';
      const location = { pathname: '/park/yosemite' };
      const resp = new ResponseCreator(key, location);
      const value = 'Yosemite National Park';
      const parkURI = createRoute({ name: 'Park', path: 'park/:name', value });
      resp.push(parkURI, { name: 'yosemite' });
      resp.setData({ open: true });
      resp.freeze();
      const respObj = resp.asObject();

      expect(respObj.key).toBe(key);
      expect(respObj.location).toBe(location);
      expect(respObj.status).toBe(200);
      expect(respObj.body).toBe(value);
      expect(respObj.name).toBe('Park');
      expect(respObj.partials).toEqual([]);
      expect(respObj.params).toEqual({ name: 'yosemite' });
      expect(respObj.data).toEqual({ open: true });
    });

    it('returns a redirect object when redirectTo is set', () => {
      const key = 'greetings';
      const location = { pathname: '/park/yosemite' };
      const resp = new ResponseCreator(key, location);
      const corporateTakeover = '/park/yosemite-land-brought-to-you-by-disney';
      resp.redirect(corporateTakeover);
      const respObj = resp.asObject();

      expect(respObj.key).toBe(key);
      expect(respObj.location).toBe(location);
      expect(respObj.status).toBe(301);
      expect(respObj.redirectTo).toBe(corporateTakeover);
      expect(respObj.data).toBeUndefined();
    });
  });
});
