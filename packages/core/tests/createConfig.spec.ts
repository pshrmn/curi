import 'jest';
import createConfig from '../src/createConfig';
import pathname from '../src/addons/pathname';
import InMemory from '@hickory/in-memory';
import ResponseCreator from '../src/utils/createResponse';
import { Addon, AddonFactory } from '../src/interface';
import { Response, RedirectResponse } from '../src/utils/createResponse';

// The subscribe function is called when subscribing so that the
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
  };
}

describe('createConfig', () => {
  let history;

  beforeEach(() => {
    history = InMemory();
  });

  describe('constructor', () => {
    // these tests rely on the fact that the pathname generator
    // is a default addon
    it('registers routes', () => {
      const routes = [
        { name: 'Home', path: '' },
        { name: 'About', path: 'about' },
        { name: 'Contact', path: 'contact' }
      ];
      const config = createConfig(history, routes);

      const names = ['Home', 'About', 'Contact'];
      names.forEach(n => {
        expect(config.addons.pathname(n)).toBeDefined();
      });
    });

    it('registers nested routes', () => {
      const routes = [
        { name: 'Home', path: '' },
        { name: 'About', path: 'about' },
        {
          name: 'Contact',
          path: 'contact',
          children: [
            { name: 'Email', path: 'email' },
            { name: 'Phone', path: 'phone' }
          ]
        }
      ];
      const config = createConfig(history, routes);
      const names = ['Email', 'Phone'];
      names.forEach(n => {
        expect(config.addons.pathname(n)).toBeDefined();
      });
    });

    it('makes addons available through return object', () => {
      const routes = [{ name: 'Home', path: '' }];
      const createFakeAddon = () => ({
        name: 'fake',
        register: () => {},
        reset: () => {},
        get: () => {}
      });
      const config = createConfig(history, routes, {
        addons: [createFakeAddon]
      });
      expect(config.addons.fake).toBeDefined();
    });

    describe('options', () => {
      describe('addons', () => {
        it('includes pathname addon by default', () => {
          const routes = [{ name: 'Home', path: '' }];
          const config = createConfig(history, routes);
          expect(config.addons.pathname).toBeDefined();
        });

        it('includes pathname addon even when other addons are provided', () => {
          const firstAddonCache = {};
          const createFirstAddon: AddonFactory = () => {
            return {
              register: (route, extra) => {
                firstAddonCache[route.name] = route.path;
              }
            } as Addon;
          };

          const routes = [{ name: 'Home', path: '' }];
          const config = createConfig(history, routes, {
            addons: [createFirstAddon]
          });
          expect(config.addons.pathname).toBeDefined();
        });

        it('registers all of the routes with all of the addons', () => {
          // this might be a bit convoluted, but it ensures that the addons
          // are registered as expected
          const firstAddonCache = {};
          const secondAddonCache = {};
          const createFirstAddon: AddonFactory = () => {
            return {
              register: (route, extra) => {
                firstAddonCache[route.name] = route.path;
              }
            } as Addon;
          };

          const createSecondAddon: AddonFactory = () => {
            return {
              register: (route, extra) => {
                secondAddonCache[
                  route.name
                ] = `${extra ? extra : 'None'} + ${route.name}`;
                return route.name;
              }
            } as Addon;
          };

          const routes = [
            {
              name: 'Grandparent',
              path: 'grandparent',
              children: [
                {
                  name: 'Parent',
                  path: 'parent',
                  children: [{ name: 'Child', path: 'child' }]
                }
              ]
            },
            {
              name: 'Cousin',
              path: 'cousin'
            }
          ];

          const config = createConfig(history, routes, {
            addons: [createFirstAddon, createSecondAddon]
          });
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
          };
          const keys = ['Grandparent', 'Parent', 'Child', 'Cousin'];
          keys.forEach(key => {
            expect(firstAddonCache[key]).toBe(expected[key].first);
            expect(secondAddonCache[key]).toBe(expected[key].second);
          });
        });
      });

      describe('sideEffects', () => {
        it('calls side effect methods after a response is generated, passing them response and action', () => {
          const routes = [{ name: 'All', path: ':all+' }];
          const sideEffect = jest.fn();

          const config = createConfig(history, routes, {
            sideEffects: [sideEffect]
          });
          expect.assertions(3);
          return config.ready().then(response => {
            expect(sideEffect.mock.calls.length).toBe(1);
            expect(sideEffect.mock.calls[0][0]).toBe(response);
            expect(sideEffect.mock.calls[0][1]).toBe('PUSH');
          });
        });
      });

      describe('cache', () => {
        it('returns cached response for same key on subsequent calls if cache is provided', (done) => {
          const routes = [{
            name: 'All',
            path: '(.*)',
            load: (params, location, mods) => {
              mods.setData(Math.random());
              return Promise.resolve(true);
            }
          }];
          const createSimpleCache = () => {
            const cache = {};

            return {
              get: ({ key }) => cache[key],
              set: response => {
                const { key } = response.location;
                cache[key] = response;
              }
            };
          };

          const config = createConfig(history, routes, {
            cache: createSimpleCache()
          });

          let calls = 0;
          let randomValue;
          const steps = [
            (r) => {
              randomValue = r.data;
              history.push('/new-location');
            },
            (r) => {
              expect(r.data).not.toEqual(randomValue);
              history.go(-1);
            },
            (r) => {
              expect(r.data).toEqual(randomValue);
              done();
            }
          ];

          function subscriber(response) {
            steps[calls++](response);
          }

          return config.ready().then(() => {
            config.subscribe(subscriber);
          });
        });

        it('generates new response for same key on subsequent calls if cache is not provided', done => {
          const routes = [{
            name: 'All',
            path: '(.*)',
            load: (params, location, mods) => {
              mods.setData(Math.random());
              return Promise.resolve(true);
            }
          }];
          const config = createConfig(history, routes);

          let calls = 0;
          let randomValue;
          const steps = [
            (r) => {
              randomValue = r.data;
              history.push('/new-location');
            },
            (r) => {
              expect(r.data).not.toEqual(randomValue);
              history.go(-1);
            },
            (r) => {
              expect(r.data).not.toEqual(randomValue);
              done();
            }
          ];

          function subscriber(response) {
            steps[calls++](response);
          }
          config.ready().then(() => {
            config.subscribe(subscriber);
          });
        });
      });
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

    it('resets and replaces registered routes', () => {
      const englishRoutes = [
        { name: 'Home', path: '' },
        { name: 'About', path: 'about' },
        { name: 'Contact', path: 'contact' }
      ];
      const spanishRoutes = [
        { name: 'Casa', path: '' },
        { name: 'Acerca De', path: 'acerca-de' },
        { name: 'Contacto', path: 'contacto' }
      ];

      const config = createConfig(history, englishRoutes);

      config.refresh(spanishRoutes);

      const englishNames = ['Home', 'About', 'Contact'];
      englishNames.forEach(n => {
        expect(config.addons.pathname(n)).toBeUndefined();
      });

      const spanishNames = ['Casa', 'Acerca De', 'Contacto'];
      spanishNames.forEach(n => {
        expect(config.addons.pathname(n)).toBeDefined();
      });
    });
  });

  describe('ready', () => {
    describe('resolve value', () => {
      it('returns a Promise with an object generated by a Response', () => {
        const routes = [
          {
            name: 'Contact',
            path: 'contact',
            children: [
              { name: 'Email', path: 'email' },
              { name: 'Phone', path: 'phone' }
            ]
          }
        ];
        const history = InMemory({
          locations: ['/contact/email']
        });
        const config = createConfig(history, routes);
        const properties = [
          'key',
          'location',
          'status',
          'body',
          'name',
          'partials',
          'params',
          'error',
          'data',
          'title'
        ];
        expect.assertions(properties.length + 1);
        return config.ready().then(arg => {
          expect(Object.keys(arg).length).toEqual(properties.length);
          properties.forEach(prop => {
            expect(arg.hasOwnProperty(prop)).toBe(true);
          });
        });
      });

      it('resolved value has undefined error for good responses', () => {
        const routes = [{ name: 'Contact', path: 'contact' }];
        const history = InMemory({
          locations: ['/contact']
        });
        const config = createConfig(history, routes);
        expect.assertions(1);
        return config.ready().then(arg => {
          expect((<Response>arg).error).toBeUndefined();
        });
      });

      it('resolved value has error either load/preload fail', () => {
        const routes = [
          {
            name: 'Contact',
            path: 'contact',
            load: () => {
              return Promise.reject('This is an error');
            }
          }
        ];
        const history = InMemory({
          locations: ['/contact']
        });
        const config = createConfig(history, routes);
        expect.assertions(1);
        return config.ready().then(arg => {
          expect((<Response>arg).error).toBe('This is an error');
        });
      });
    });

    it('resolves once route that matches initial location has loaded', () => {
      let loaded = false;
      const routes = [
        {
          name: 'Home',
          path: '',
          load: () => {
            loaded = true;
            return Promise.resolve();
          }
        }
      ];

      const config = createConfig(history, routes);
      expect.assertions(1);
      return config.ready().then(() => {
        expect(loaded).toBe(true);
      });
    });

    it('uses the last response if calling ready after a response has been created', () => {
      const routes = [
        {
          name: 'Contact',
          path: 'contact',
          children: [
            { name: 'Email', path: 'email' },
            { name: 'Phone', path: 'phone' }
          ]
        }
      ];
      const history = InMemory({
        locations: ['/contact/email']
      });
      const config = createConfig(history, routes);
      expect.assertions(1);
      return config.ready().then(readyOne => {
        config.ready().then(readyTwo => {
          expect(readyTwo).toBe(readyOne);
        });
      });
    });
  });

  // not an actual function, but grouping some response related tests here
  describe('response', () => {
    it('sets 404 if no routes match', () => {
      const routes = [
        {
          name: 'Contact',
          path: 'contact',
          children: [
            { name: 'Email', path: 'email' },
            { name: 'Phone', path: 'phone' }
          ]
        }
      ];
      const history = InMemory({ locations: ['/other-page'] });
      const config = createConfig(history, routes);
      expect.assertions(1);
      config.ready().then(resp => {
        expect(resp.status).toBe(404);
      });
    });

    it('handles route promises that are rejected', () => {
      const routes = [
        {
          name: 'Home',
          path: '',
          load: () => {
            return Promise.reject('oh no');
          }
        }
      ];
      const config = createConfig(history, routes);

      return config.ready()
        .then(resp => {
          expect((<Response>resp).error).toBe('oh no');
        });
    });

    it('passes params and some response creator methods to load function', () => {
      const spy = jest.fn((params, location, modifiers) => {
        expect(params).toMatchObject({ anything: 'hello' });
        expect(location).toMatchObject({
          pathname: '/hello',
          query: 'one=two'
        })
        expect(modifiers).toMatchObject(expect.objectContaining({
          fail: expect.any(Function),
          redirect: expect.any(Function),
          setData: expect.any(Function),
          setStatus: expect.any(Function)
        }));
      });

      const CatchAll = {
        name: 'Catch All',
        path: ':anything',
        load: spy
      };

      const history = InMemory({ locations: ['/hello?one=two'] });
      const config = createConfig(history, [CatchAll]);
      expect.assertions(3);
      return config.ready();
    });

    it('has data set if load calls setData', () => {
      const routes = [
        {
          name: 'A Route',
          path: '',
          load: (params, location, mods) => {
            mods.setData({ test: 'value' });
            return Promise.resolve();
          }
        }
      ];

      const config = createConfig(history, routes);
      expect.assertions(1);
      return config.ready().then(response => {
        expect(response.data).toMatchObject({ test: 'value' });
      });
    });

    it('has status set if load calls setStatus', () => {
      const routes = [
        {
          name: 'A Route',
          path: '',
          load: (params, location, mods) => {
            mods.setStatus(451);
            return Promise.resolve();
          }
        }
      ];

      const config = createConfig(history, routes);
      expect.assertions(1);
      return config.ready().then(response => {
        expect(response.status).toBe(451);
      });
    });

    it('has error set if load calls fail', () => {
      const routes = [
        {
          name: 'A Route',
          path: '',
          load: (params, location, mods) => {
            mods.fail('woops');
            return Promise.resolve();
          }
        }
      ];

      const config = createConfig(history, routes);
      expect.assertions(1);
      return config.ready().then(response => {
        expect((<Response>response).error).toBe('woops');
      });
    });

    it('has redirectTo (and status) set if load calls redirect', () => {
      const routes = [
        {
          name: 'A Route',
          path: '',
          load: (params, location, mods) => {
            mods.redirect('/somewhere');
            return Promise.resolve();
          }
        }
      ];

      const config = createConfig(history, routes);
      expect.assertions(2);
      return config.ready().then(response => {
        expect(response.status).toBe(301);
        expect((<RedirectResponse>response).redirectTo).toBe('/somewhere');
      });
    });

    it('does not set body until after load/preload have resolved', () => {
      let bodyValue;
      const Route = {
        name: 'A Route',
        path: 'a-route',
        load: () => {
          bodyValue = 'testing';
          return Promise.resolve(true);
        },
        body: () => bodyValue
      };
      const history = InMemory({ locations: ['/a-route'] });
      const config = createConfig(history, [Route]);
      expect.assertions(1);
      return config.ready().then(response => {
        expect((<Response>response).body).toBe('testing');
      });
    });
  });

  describe('subscribe', () => {
    describe('when subscribing', () => {
      it('calls subscriber function, passing it the response object and last action', () => {
        const history = InMemory({
          locations: ['/contact/phone']
        });
        const How = { name: 'How', path: ':method' };
        const routes = [
          { name: 'Home', path: '' },
          { name: 'About', path: 'about' },
          {
            name: 'Contact',
            path: 'contact',
            children: [How]
          }
        ];
        const sub = jest.fn();
        const config = createConfig(history, routes);
        expect.assertions(4);
        return config.ready().then(() => {
          config.subscribe(sub);
          expect(sub.mock.calls.length).toBe(1);
          const [ resp, action ] = sub.mock.calls[0];
          expect(resp.name).toBe('How');
          expect(resp.partials[0]).toBe('Contact');
          expect(action).toBe('PUSH');
        });
      });

      it('calls subscriber function with undefined params when no response has resolved', () => {
        const history = InMemory({
          locations: ['/contact/phone']
        });
        const How = { name: 'How', path: ':method' };
        const routes = [
          { name: 'Home', path: '' },
          { name: 'About', path: 'about' },
          {
            name: 'Contact',
            path: 'contact',
            children: [How]
          }
        ];
        const sub = jest.fn();
        const config = createConfig(history, routes);
        config.subscribe(sub);
        expect(sub.mock.calls.length).toBe(1);
        const [ resp, action ] = sub.mock.calls[0];
        expect(resp).toBeUndefined();
        expect(action).toBeUndefined();
      });      
    });

    it('notifies subscribers of new response and action when location changes', done => {
      const How = { name: 'How', path: ':method' };
      const routes = [
        { name: 'Home', path: '' },
        { name: 'About', path: 'about' },
        { name: 'Contact', path: 'contact', children: [How] }
      ];

      const check = ignoreFirstCall((response, action) => {
        expect(response.name).toBe('How');
        expect(response.partials[0]).toBe('Contact');
        expect(response.params.method).toBe('mail');
        expect(action).toBe('PUSH');
        done();
      });

      const config = createConfig(history, routes);
      config.subscribe(check);
      history.push('/contact/mail');
    });

    it('notifies subscribers after promises have resolved', done => {
      let promiseResolved = false;
      const routes = [
        { name: 'Home', path: '' },
        { name: 'About', path: 'about' },
        {
          name: 'Contact',
          path: 'contact',
          children: [
            {
              name: 'How',
              path: ':method',
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
      });

      const config = createConfig(history, routes);
      config.subscribe(check);
      history.push('/contact/phone');
    });

    it('only emits most recent update if another one occurs before emitting', done => {
      const routes = [
        { name: 'Home', path: '' },
        { name: 'About', path: 'about' },
        {
          name: 'Contact',
          path: 'contact',
          children: [
            {
              name: 'How',
              path: ':method',
              preload: () => Promise.resolve()
            }
          ]
        }
      ];
      const check = ignoreFirstCall(response => {
        expect(response.params.method).toBe('mail');
        done();
      });

      const config = createConfig(history, routes);
      config.subscribe(check);
      history.push('/contact/phone');
      history.push('/contact/mail');
    });

    it('returns a function to unsubscribe when called', done => {
      const config = createConfig(history, [{ name: 'Home', path: '' }]);

      const sub1 = jest.fn();
      const sub2 = jest.fn();

      // wait for the first response to be generated to ensure that both
      // subscriber functions are called when subscribing
      const unsub1 = config.subscribe(sub1);
      const unsub2 = config.subscribe(sub2);

      expect(sub1.mock.calls.length).toBe(1);
      expect(sub2.mock.calls.length).toBe(1);
      unsub1();
      history.push({ pathname: '/next' });

      // need to wait for the subscribers to actually be called
      process.nextTick(() => {
        expect(sub1.mock.calls.length).toBe(1);
        expect(sub2.mock.calls.length).toBe(2);
        done();
      });
    });
  });
});
