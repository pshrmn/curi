import 'jest';
import createConfig from '../src/curi';
import InMemory from '@hickory/in-memory';

describe('route.pathOptions matching', () => {
  describe('default options', () => {
    it('sensitive = false', () => {
      const history = InMemory({ locations: ['/Here'] });
      const routes = [
        {
          name: 'Test',
          path: 'here'
        },
        {
          name: 'Not Found',
          path: '(.*)'
        }
      ];
      const config = createConfig(history, routes);
      expect.assertions(1);
      return config.ready().then(response => {
        expect(response.name).toBe('Test');
      });
    });

    it('strict = false', () => {
      const history = InMemory({ locations: ['/here/'] });
      const routes = [
        {
          name: 'Test',
          path: 'here'
        },
        {
          name: 'Not Found',
          path: '(.*)'
        }
      ];
      const config = createConfig(history, routes);
      expect.assertions(1);
      return config.ready().then(response => {
        expect(response.name).toBe('Test');
      });
    });

    it('end = true', () => {
      const history = InMemory({ locations: ['/here/again'] });
      const routes = [
        {
          name: 'Test',
          path: 'here'
        },
        {
          name: 'Not Found',
          path: '(.*)'
        }
      ];
      const config = createConfig(history, routes);
      expect.assertions(1);
      return config.ready().then(response => {
        expect(response.name).toBe('Not Found');
      });
    });
  });

  describe('user provided options', () => {
    it('sensitive = true', () => {
      const history = InMemory({ locations: ['/Here'] });
      const routes = [
        {
          name: 'Test',
          path: 'here',
          pathOptions: { sensitive: true }
        },
        {
          name: 'Not Found',
          path: '(.*)'
        }
      ];
      const config = createConfig(history, routes);
      expect.assertions(1);
      return config.ready().then(response => {
        expect(response.name).toBe('Not Found');
      });
    });

    it('strict = true', () => {
      const history = InMemory({ locations: ['/here/'] });
      const routes = [
        {
          name: 'Test',
          path: 'here',
          pathOptions: { strict: true }
        },
        {
          name: 'Not Found',
          path: '(.*)'
        }
      ];
      const config = createConfig(history, routes);
      expect.assertions(1);
      return config.ready().then(response => {
        expect(response.name).toBe('Not Found');
      });
    });

    it('end = false', () => {
      const history = InMemory({ locations: ['/here/again'] });
      const routes = [
        {
          name: 'Test',
          path: 'here',
          pathOptions: { end: false }
        },
        {
          name: 'Not Found',
          path: '(.*)'
        }
      ];
      const config = createConfig(history, routes);
      expect.assertions(1);
      return config.ready().then(response => {
        expect(response.name).toBe('Test');
      });
    });
  });
});
