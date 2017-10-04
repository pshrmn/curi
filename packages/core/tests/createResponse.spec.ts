import 'jest';
import createRoute from '../src/utils/createRoute';
import { HickoryLocation } from '@hickory/root';
import ResponseCreator, { Response, RedirectResponse } from '../src/utils/createResponse';

const noop = () => {};

describe('Response', () => {
  describe('constructor', () => {
    it('sets the key', () => {
      const key = 'greetings';
      const location = { pathname: '/you-are-here' } as HickoryLocation;
      const resp = new ResponseCreator(key, location);
      expect(resp.key).toEqual(key);
    });

    it('sets the location', () => {
      const key = 'greetings';
      const location = { pathname: '/you-are-here' } as HickoryLocation;
      const resp = new ResponseCreator(key, location);
      expect(resp.location).toEqual(location);
    });

    it('sets default values', () => {
      const location = { key: '123', pathname: '/abc' } as HickoryLocation;
      const resp = new ResponseCreator(location.key, location);
      expect(resp.status).toBe(200);
      expect(resp.partials.length).toBe(0);
      expect(resp.params).toEqual({});
    });
  });

  describe('setStatus', () => {
    it('sets the status property', () => {
      const location = { key: '123', pathname: '/abc' } as HickoryLocation;
      const resp = new ResponseCreator(location.key, location);
      resp.setStatus(404);
      expect(resp.status).toBe(404);
    });
  });

  describe('redirect', () => {
    it("sets the response's status property", () => {
      const location = { key: '123', pathname: '/abc' } as HickoryLocation;
      const resp = new ResponseCreator(location.key, location);
      resp.redirect('http://www.example.com', 302);
      expect(resp.status).toBe(302);
    });

    it("sets the response's redirectTo property", () => {
      const location = { key: '123', pathname: '/abc' } as HickoryLocation;
      const resp = new ResponseCreator(location.key, location);
      resp.redirect('https://www.example.com', 302);
      expect(resp.redirectTo).toBe('https://www.example.com');
    });

    it('defaults to a 301 response', () => {
      const location = { key: '123', pathname: '/abc' } as HickoryLocation;
      const resp = new ResponseCreator(location.key, location);
      resp.redirect('http://www.example.com');
      expect(resp.status).toBe(301);
    });
  });

  describe('fail', () => {
    it("sets the response's error property", () => {
      const location = { key: '123', pathname: '/abc' } as HickoryLocation;
      const resp = new ResponseCreator(location.key, location);
      resp.fail('This was a disaster');
      expect(resp.error).toBe('This was a disaster');
    });
  });

  describe('setData', () => {
    it("sets the response's data property", () => {
      const location = { key: '123', pathname: '/abc' } as HickoryLocation;
      const resp = new ResponseCreator(location.key, location);
      const data = { one: 1, two: 2 };
      resp.setData(data);
      expect(resp.data).toBe(data);
    });
  });

  describe('push', () => {
    it('adds the route and params to matches array', () => {
      const location = { key: '123', pathname: '/abc' } as HickoryLocation;
      const resp = new ResponseCreator(location.key, location);
      const route = createRoute({ name: 'Foo', path: 'egg', children: [] });
      const params = { food: 'egg' };
      resp.push(route, params);
      const { matches } = resp;
      expect(matches[0].route).toBe(route);
      expect(matches[0].params).toBe(params);
    });

    it('adds additional routes/params to end of matches array', () => {
      const location = { key: '123', pathname: '/abc' } as HickoryLocation;
      const resp = new ResponseCreator(location.key, location);
      const stateRoute = createRoute({ name: 'State', path: ':state', children: [] });
      const stateParams = { state: 'WA' };
      const cityRoute = createRoute({ name: 'City', path: ':city', children: [] });
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
      const location = { key: '123', pathname: '/abc' } as HickoryLocation;
      const resp = new ResponseCreator(location.key, location);
      const stateRoute = createRoute({ name: 'State', path: ':state', children: [] });
      const stateParams = { state: 'WA' };
      const cityRoute = createRoute({ name: 'City', path: ':city', children: [] });
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
      const location = { key: '123', pathname: '/abc' } as HickoryLocation;
      const resp = new ResponseCreator(location.key, location);
      const stateRoute = createRoute({ name: 'State', path: ':state', children: [] });
      const stateParams = { state: 'OR' };
      const cityRoute = createRoute({ name: 'City', path: ':city', children: [] });
      const cityParams = { city: 'Portland' };
      resp.push(stateRoute, stateParams);
      resp.push(cityRoute, cityParams);
      resp.freeze();
      expect(resp.route).toBe(cityRoute);
    });

    it('sets the partials using the names of all other matching routes', () => {
      const location = { key: '123', pathname: '/abc' } as HickoryLocation;
      const resp = new ResponseCreator(location.key, location);
      const stateRoute = createRoute({ name: 'State', path: ':state', children: [] });
      const stateParams = { state: 'TX' };
      const cityRoute = createRoute({ name: 'City', path: ':city', children: [] });
      const cityParams = { city: 'Austin' };
      resp.push(stateRoute, stateParams);
      resp.push(cityRoute, cityParams);
      resp.freeze();
      expect(resp.partials).toEqual(['State']);
    });

    it("sets the params by merging all of the matched routes' params", () => {
      const location = { key: '123', pathname: '/abc' } as HickoryLocation;
      const resp = new ResponseCreator(location.key, location);
      const stateRoute = createRoute({ name: 'State', path: ':state', children: [] });
      const stateParams = { state: 'MT' };
      const cityRoute = createRoute({ name: 'City', path: ':city', children: [] });
      const cityParams = { city: 'Bozeman' };
      resp.push(stateRoute, stateParams);
      resp.push(cityRoute, cityParams);
      resp.freeze();
      expect(resp.params).toEqual({
        state: 'MT',
        city: 'Bozeman'
      });
    });

    describe('title', () => {
      it('is an empty string when there is no matched route', () => {
        const location = { key: '123', pathname: '/abc' } as HickoryLocation;
        const resp = new ResponseCreator(location.key, location);
        resp.freeze();

        const respObject = resp.asObject();
        expect(respObject.title).toBe('');
      });

      it('is an empty string if the matched route does not have a title property', () => {
        const location = { key: '123', pathname: '/abc' } as HickoryLocation;
        const resp = new ResponseCreator(location.key, location);
        const stateRoute = createRoute({ name: 'State', path: ':state', children: [] });
        const stateParams = { state: 'ID' };
        resp.push(stateRoute, stateParams);
        resp.freeze();

        const respObject = resp.asObject();
        expect(respObject.title).toBe('');
      });

      it('is the route.title value route.title is a string', () => {
        const location = { key: '123', pathname: '/abc' } as HickoryLocation;
        const resp = new ResponseCreator(location.key, location);
        const stateRoute = createRoute({
          name: 'State',
          path: ':state',
          children: [],
          title: 'A State'
        });
        const stateParams = { state: 'VA' };
        resp.push(stateRoute, stateParams);
        resp.freeze();

        const respObject = resp.asObject();
        expect(respObject.title).toBe('A State');
      });

      it('calls route.title passing it the params and data when it is a function', () => {
        const location = { key: '123', pathname: '/abc' } as HickoryLocation;
        const resp = new ResponseCreator(location.key, location);
        const stateRoute = createRoute({
          name: 'State',
          path: ':state',
          children: [],
          title: (params, data) => {
            return `${params['state']} (aka ${data.full})`;
          } });
        const stateParams = { state: 'WV' };
        resp.push(stateRoute, stateParams);
        resp.freeze();
        resp.setData({ full: 'West Virginia' });

        const respObject = resp.asObject();
        expect(respObject.title).toBe('WV (aka West Virginia)');
      });
    });
  });

  describe('asObject', () => {
    it('returns an object with desired properties', () => {
      const key = 'greetings';
      const location = { pathname: '/park/yosemite' } as HickoryLocation;
      const resp = new ResponseCreator(key, location);
      const body = () => 'Yosemite National Park';
      const parkURI = createRoute({ name: 'Park', path: 'park/:name', children: [], body });
      resp.push(parkURI, { name: 'yosemite' });
      resp.setData({ open: true });
      resp.freeze();
      const respObj = resp.asObject() as Response;

      expect(respObj).toMatchObject({
        key,
        location,
        status: 200,
        body: 'Yosemite National Park',
        name: 'Park',
        partials: [],
        params: { name: 'yosemite' },
        data: { open: true }
      });
    });

    it('returns a redirect object when redirectTo is set', () => {
      const key = 'greetings';
      const location = { pathname: '/park/yosemite' } as HickoryLocation;
      const resp = new ResponseCreator(key, location);
      const corporateTakeover = '/park/yosemite-land-brought-to-you-by-disney';
      resp.redirect(corporateTakeover);
      const respObj = resp.asObject() as RedirectResponse;

      expect(respObj).toMatchObject({
        key,
        location,
        status: 301,
        redirectTo: corporateTakeover
      });
    });
  });
});
