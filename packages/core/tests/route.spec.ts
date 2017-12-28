import 'jest';
import createRoute from '../src/route';
import { Route, Addon } from '../src/types';
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
          `Could not generate pathname for ${name} because it is not registered.`
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

  describe('match', () => {
    describe('initial', () => {
      it('will be defined when a match.initial function is provided', () => {
        const matchTest = () => Promise.resolve();

        const history = InMemory({ locations: ['/test'] });
        const routes = [
          {
            name: 'Test',
            path: 'test',
            match: {
              initial: matchTest
            }
          }
        ];
        const config = createConfig(history, routes, {
          addons: [PropertyReporter()]
        });
        const routeProperties = config.addons.properties('Test');
        expect(routeProperties.match.initial).toBeDefined();
      });

      it("will be undefined when match.initial fn isn't defined", () => {
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
        expect(routeProperties.match.initial).toBeUndefined();
      });
    });

    describe('every', () => {
      it('will be the provided match.every function', () => {
        const matchTest = () => Promise.resolve();

        const history = InMemory({ locations: ['/test'] });
        const routes = [
          {
            name: 'Test',
            path: 'test',
            match: { every: matchTest }
          }
        ];
        const config = createConfig(history, routes, {
          addons: [PropertyReporter()]
        });
        const routeProperties = config.addons.properties('Test');
        expect(routeProperties.match.every).toBe(matchTest);
      });

      it("will be undefined when match.every isn't defined", () => {
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
        expect(routeProperties.match.every).toBeUndefined();
      });
    });

    describe('response', () => {
      it('will be the provided match.response function', () => {
        const matchTest = () => Promise.resolve();

        const history = InMemory({ locations: ['/test'] });
        const routes = [
          {
            name: 'Test',
            path: 'test',
            match: { response: matchTest }
          }
        ];
        const config = createConfig(history, routes, {
          addons: [PropertyReporter()]
        });
        const routeProperties = config.addons.properties('Test');
        expect(routeProperties.match.response).toBe(matchTest);
      });

      it("will be undefined when match.response isn't defined", () => {
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
        expect(routeProperties.match.response).toBeUndefined();
      });
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
