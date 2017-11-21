import 'jest';
import createRoute, { Route } from '../src/route';
import { Addon } from '../src/interface';
import createConfig from '../src/curi';
import InMemory from '@hickory/in-memory';

function PropertyReporter(): Addon {
  let knownRoutes = {};
  return {
    name: 'properties',
    register: (route: Route): void => {
      const { name, path } = route;
      knownRoutes[name] = route;
    },
    get: (name: string): Route => {
      if (knownRoutes[name] == null) {
        console.error(
          `Could not generate pathname for ${
            name
          } because it is not registered.`
        );
        return;
      }
      return knownRoutes[name];
    },
    reset: () => {
      knownRoutes = {};
    }
  };
}

describe('public route properties', () => {
  describe('name', () => {
    it('is the provided value', () => {
      const history = InMemory({ locations: ['/test'] });
      const routes = [
        {
          name: 'Test',
          path: 'test'
        }
      ];
      const config = createConfig(history, routes, {
        addons: [PropertyReporter()]
      });
      const routeProperties = config.addons.properties('Test');
      expect(routeProperties.name).toBe('Test');
    });
  });

  describe('path', () => {
    it('is the provided value', () => {
      const history = InMemory({ locations: ['/test'] });
      const routes = [
        {
          name: 'Test',
          path: 'test'
        }
      ];
      const config = createConfig(history, routes, {
        addons: [PropertyReporter()]
      });
      const routeProperties = config.addons.properties('Test');
      expect(routeProperties.path).toBe('test');
    });
  });

  describe('keys', () => {
    it('is the array of param names parsed from the path', () => {
      const history = InMemory({ locations: ['/test'] });
      const routes = [
        {
          name: 'Test',
          path: ':one/:two/:three'
        }
      ];
      const config = createConfig(history, routes, {
        addons: [PropertyReporter()]
      });
      const routeProperties = config.addons.properties('Test');
      expect(routeProperties.keys).toEqual(['one', 'two', 'three']);
    });

    it('is an empty array when the path has no params', () => {
      const history = InMemory({ locations: ['/test'] });
      const routes = [
        {
          name: 'Test',
          path: 'one/two/three'
        }
      ];
      const config = createConfig(history, routes, {
        addons: [PropertyReporter()]
      });
      const routeProperties = config.addons.properties('Test');
      expect(routeProperties.keys).toEqual([]);
    });
  });

  describe('body', () => {
    it('is the provided value', () => {
      const history = InMemory({ locations: ['/test'] });
      const body = () => 'Longitude';
      const routes = [
        {
          name: 'Test',
          path: 'test',
          body
        }
      ];
      const config = createConfig(history, routes, {
        addons: [PropertyReporter()]
      });
      const routeProperties = config.addons.properties('Test');
      expect(routeProperties.body).toBe(body);
    });
  });

  describe('preload', () => {
    it('will be defined when a preload function is provided', () => {
      const loadTest = () => Promise.resolve();

      const history = InMemory({ locations: ['/test'] });
      const body = () => 'Longitude';
      const routes = [
        {
          name: 'Test',
          path: 'test',
          preload: loadTest
        }
      ];
      const config = createConfig(history, routes, {
        addons: [PropertyReporter()]
      });
      const routeProperties = config.addons.properties('Test');
      expect(routeProperties.preload).toBeDefined();
    });

    it("will be undefined when preload isn't defined", () => {
      const history = InMemory({ locations: ['/test'] });
      const body = () => 'Longitude';
      const routes = [
        {
          name: 'Test',
          path: 'test'
        }
      ];
      const config = createConfig(history, routes, {
        addons: [PropertyReporter()]
      });
      const routeProperties = config.addons.properties('Test');
      expect(routeProperties.preload).toBeUndefined();
    });
  });

  describe('load', () => {
    it('will be the provided load function', () => {
      const loadTest = () => Promise.resolve();

      const history = InMemory({ locations: ['/test'] });
      const body = () => 'Longitude';
      const routes = [
        {
          name: 'Test',
          path: 'test',
          load: loadTest
        }
      ];
      const config = createConfig(history, routes, {
        addons: [PropertyReporter()]
      });
      const routeProperties = config.addons.properties('Test');
      expect(routeProperties.load).toBe(loadTest);
    });

    it("will be undefined when load isn't defined", () => {
      const history = InMemory({ locations: ['/test'] });
      const body = () => 'Longitude';
      const routes = [
        {
          name: 'Test',
          path: 'test'
        }
      ];
      const config = createConfig(history, routes, {
        addons: [PropertyReporter()]
      });
      const routeProperties = config.addons.properties('Test');
      expect(routeProperties.load).toBeUndefined();
    });
  });

  describe('extra', () => {
    it('is the provided value', () => {
      const history = InMemory({ locations: ['/test'] });
      const extra = {
        unofficial: true,
        another: 1
      };
      const routes = [
        {
          name: 'Test',
          path: 'test',
          extra
        }
      ];
      const config = createConfig(history, routes, {
        addons: [PropertyReporter()]
      });
      const routeProperties = config.addons.properties('Test');
      expect(routeProperties.extra).toBe(extra);
    });
  });
});
