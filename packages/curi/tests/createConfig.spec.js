import createConfig from '../src/createConfig';
import pathname from '../src/addons/pathname';
import uri from '../src/uri';
import path from '../src/path';
import createMemoryHistory from 'history/createMemoryHistory';
import Response from '../src/response';

// The subscribe function is called when subscribing  so that the
// subscriber function is called with the original location. This has
// the downside that if we want to test navigation changes, we have to
// ignore the first call of the subscribed function. This does that for us.
function ignoreFirstCall(fn) {
  let called = false;
  return function() {
    if (!called) {
      called = true;
      return;
    }
    return fn(...arguments);
  }
}

describe('createConfig', () => {

  let history;

  beforeEach(() => {
    history = createMemoryHistory();
  });

  describe('constructor', () => {
    // these tests rely on the fact that the pathname generator
    // is a default addon
    it('registers uris', () => {
      const uris = [
        { name: 'Home', path: path('', { end: true }) },
        { name: 'About', path: path('about') },
        { name: 'Contact', path: path('contact') }
      ];
      const config = createConfig(history, uris);

      const names = [ 'Home', 'About', 'Contact' ];
      names.forEach(n => {
        expect(config.addons.pathname(n)).toBeDefined();
      });
    });

    it('registers nested uris', () => {
      const uris = [
        { name: 'Home', path: path('', { end: true }) },
        { name: 'About', path: path('about') },
        {
          name: 'Contact',
          path: path('contact'),
          children: [
            { name: 'Email', path: path('email') },
            { name: 'Phone', path: path('phone') }
          ]
        }
      ];
      const config = createConfig(history, uris);
      const names = [ 'Email', 'Phone' ];
      names.forEach(n => {
        expect(config.addons.pathname(n)).toBeDefined();
      });
    });

    it('works when initialURIs isn\'t an array', () => {
      const uris = {
        name: 'Contact',
        path: path('contact'),
        children: [
          { name: 'Email', path: path('email') },
          { name: 'Phone', path: path('phone') }
        ]
      }

      const config = createConfig(history, uris);
      const names = [ 'Contact', 'Email', 'Phone' ];
      names.forEach(n => {
        expect(config.addons.pathname(n)).toBeDefined();
      });
    });

    it('makes addons available through return object', () => {
      const uris = [
        { name: 'Home', path: path('', { end: true }) }
      ];
      const createFakeAddon = () => ({
        name: 'fake',
        register: () => {},
        reset: () => {},
        get: () => {}
      });
      const config = createConfig(history, uris, [ createFakeAddon ]);
      expect(config.addons.fake).toBeDefined();
    });

    it('includes pathname addon by default', () => {
      const uris = [
        { name: 'Home', path: path('', { end: true }) }
      ];
      const config = createConfig(history, uris);
      expect(config.addons.pathname).toBeDefined();
    });

    it('registers all of routes with all of the addons', () => {
      // this might be a bit convoluted, but it ensures that the addons
      // are registered as expected
      const firstAddonCache = {};
      const secondAddonCache = {};
      const createFirstAddon = () => {
        return {
          register: (route, extra) => {
            firstAddonCache[route.name] = route.path.path;
          }
        };
      }

      const createSecondAddon = () => {
        return {
          register: (route, extra) => {
            secondAddonCache[route.name] = `${extra ? extra : 'None'} + ${route.name}`;
            return route.name;
          }
        }
      };

      const routes = [
        { name: 'Grandparent', path: path('grandparent'), children: [
          { name: 'Parent', path: path('parent'), children: [
            { name: 'Child', path: path('child') }
          ]}
        ]},
        {
          name: 'Cousin', path: path('cousin')
        }
      ]

      const config = createConfig(history, routes, [ createFirstAddon, createSecondAddon ]);
      const expected = {
        Grandparent: {
          first: 'grandparent',
          second: 'None + Grandparent'
        },
        Parent: {
          first: 'parent',
          second: 'Grandparent + Parent'
        },
        Child: {
          first: 'child',
          second: 'Parent + Child'
        },
        Cousin: {
          first: 'cousin',
          second: 'None + Cousin'
        }
      }
      const keys = ['Grandparent', 'Parent', 'Child', 'Cousin'];
      keys.forEach(key => {
        expect(firstAddonCache[key]).toBe(expected[key].first);
        expect(secondAddonCache[key]).toBe(expected[key].second);
      })
    });
  });

  describe('refresh', () => {
    const err = console.error;

    beforeEach(() => {
      console.error = jest.fn();
    });

    afterEach(() => {
      console.error = err;
    });

    it('resets and replaces registered uris', () => {
      const englishRoutes = [
        { name: 'Home', path: path('', { end: true }) },
        { name: 'About', path: path('about') },
        { name: 'Contact', path: path('contact') }
      ];
      const spanishRoutes = [
        { name: 'Casa', path: path('', { end: true }) },
        { name: 'Acerca De', path: path('acerca-de') },
        { name: 'Contacto', path: path('contacto') }
      ];

      const config = createConfig(history, englishRoutes);

      config.refresh(spanishRoutes);

      const englishNames = [ 'Home', 'About', 'Contact' ];
      englishNames.forEach(n => {
        expect(config.addons.pathname(n)).toBeUndefined();
      });

      const spanishNames = [ 'Casa', 'Acerca De', 'Contacto' ];
      spanishNames.forEach(n => {
        expect(config.addons.pathname(n)).toBeDefined();
      });
    });
  });

  describe('ready', () => {
    it('returns a Promise with a Response', (done) => {
      const routes = [{
        name: 'Contact',
        path: path('contact'),
        children: [
          { name: 'Email', path: path('email') },
          { name: 'Phone', path: path('phone') }
        ]
      }];

      const config = createConfig(history, routes);
      config.ready()
        .then((arg) => {
          expect(arg).toBeInstanceOf(Response);
          done();
        });
    });

    it('resolves once route that matches initial location has loaded', (done) => {
      let loaded = false;
      const routes = [{
        name: 'Home',
        path: path('', { end: true }),
        load: () => {
          loaded = true;
          return Promise.resolve()
        }
      }];

      const config = createConfig(history, routes);
      config.ready()
        .then(() => {
          expect(loaded).toBe(true);
          done();
        });
    });
  });

  describe('subscribe', () => {
    it('throws an error if a non-function is passed to subscribe', () => {
      const history = createMemoryHistory({
        initialEntries: [ '/contact/phone' ]
      });
      const How = { name: 'How', path: path(':method') };
      const routes = [
        { name: 'Home', path: path('', { end: true }) },
        { name: 'About', path: path('about') },
        {
          name: 'Contact',
          path: path('contact'),
          children: [ How ]
        }
      ];

      const config = createConfig(history, routes);
      config.ready()
        .then(() => {
          const badArgs = [null, undefined, 1, true, {}, []];
          badArgs.forEach(arg => {
            expect(() => {
              config.subscribe(arg);
            }).toThrow();
          });
        });
    });

    it('passes response for current location when it subscribes', (done) => {
      const history = createMemoryHistory({
        initialEntries: [ '/contact/phone' ]
      });
      const How = { name: 'How', path: path(':method') };
      const routes = [
        { name: 'Home', path: path('', { end: true }) },
        { name: 'About', path: path('about') },
        {
          name: 'Contact',
          path: path('contact'),
          children: [ How ]
        }
      ];

      const config = createConfig(history, routes);
      config.ready()
        .then(() => {
          config.subscribe(response => {
            expect(response.uri.name).toBe('How');
            expect(response.partials[0]).toBe('Contact');
            done();
          });
        });
    });

    it('notifies subscribers of matching routes when location changes', (done) => {
      const How = { name: 'How', path: path(':method') };
      const routes = [
        { name: 'Home', path: path('', { end: true }) },
        { name: 'About', path: path('about') },
        { name: 'Contact', path: path('contact'), children: [ How ] }
      ];

      const check = ignoreFirstCall(response => {
        expect(response.uri.name).toBe('How');
        expect(response.partials[0]).toBe('Contact');
        expect(response.params.method).toBe('mail');
        done();
      })

      const config = createConfig(history, routes);
      config.ready()
        .then(() => {
          config.subscribe(check);
          history.push('/contact/mail');
        });
    });

    it('notifies subscribers after promises have resolved', (done) => {
      let promiseResolved = false;
      const uris = [
        { name: 'Home', path: path('', { end: true }) },
        { name: 'About', path: path('about') },
        {
          name: 'Contact',
          path: path('contact'),
          children: [
            {
              name: 'How',
              path: path(':method'),
              load: () => {
                promiseResolved = true;
                return Promise.resolve(promiseResolved);
              }
            }
          ]
        }
      ];

      const check = ignoreFirstCall(response => {
        expect(promiseResolved).toBe(true);
        done();
      })

      const config = createConfig(history, uris);
      config.ready()
        .then(() => {
          config.subscribe(check);
          history.push('/contact/phone');
        });
    });

    it('only emits most recent update if another one occurs before emitting', (done) => {
      const uris = [
        { name: 'Home', path: path('', { end: true }) },
        { name: 'About', path: path('about') },
        {
          name: 'Contact',
          path: path('contact'),
          children: [
            {
              name: 'How',
              path: path(':method'),
              preload: () => Promise.resolve()
            }
          ]
        }
      ];
      const check = ignoreFirstCall(response => {
        expect(response.params.method).toBe('mail');
        done();
      });

      const config = createConfig(history, uris);
      config.ready()
        .then(() => {
          config.subscribe(check)
          history.push('/contact/phone');
          history.push('/contact/mail');
        });
    });

    it('will only match the first uri (per level) that matches', (done) => {
      const Exact = { name: 'Exact', path: path('exact') };
      const CatchAll = { name: 'Catch All', path: path(':anything') };
      const routes = [ Exact, CatchAll ];
      const history = createMemoryHistory({ initialEntries: [ '/exact' ] });

      const config = createConfig(history, routes);
      config.ready()
        .then(() => {
          config.subscribe(response => {
            expect(response.uri.name).toBe('Exact');
            done();
          });
        });
    });

    it('only matches one uri for nested levels', (done) => {
      const Exact = { name: 'Exact', path: path('exact') };
      const CatchAll = { name: 'Catch All', path: path(':anything') };
      const uris = [
        { name: 'Parent', path: path('parent'), children: [ Exact, CatchAll ] }
      ];
      const history = createMemoryHistory({ initialEntries: [ '/parent/exact' ]});
      const config = createConfig(history, uris);
      config.ready()
        .then(() => {
          config.subscribe(response => {
            expect(response.uri.name).toBe('Exact');
            done();
          });
        });
    });

    it('passes response to load function', (done) => {
      const spy = jest.fn((resp) => {
        expect(resp).toBeInstanceOf(Response);
        expect(resp.params.anything).toBe('hello');
      });
      const CatchAll = {
        name: 'Catch All',
        path: path(':anything'),
        load: spy
      };
      const history = createMemoryHistory({ initialEntries: [ '/hello' ]});
      const config = createConfig(history, [ CatchAll ]);
      config.ready()
        .then(() => {
          expect(spy.mock.calls.length).toBe(1);
          done();
        });
    });
  });
});
