import createConfig from '../src/createConfig';
import pathname from '../src/addons/pathname';
import InMemory from '@hickory/in-memory';
import ResponseCreator from '../src/utils/createResponse';

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
          const createFirstAddon = () => {
            return {
              register: (route, extra) => {
                firstAddonCache[route.name] = route.path;
              }
            };
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
          const createFirstAddon = () => {
            return {
              register: (route, extra) => {
                firstAddonCache[route.name] = route.path;
              }
            };
          };

          const createSecondAddon = () => {
            return {
              register: (route, extra) => {
                secondAddonCache[
                  route.name
                ] = `${extra ? extra : 'None'} + ${route.name}`;
                return route.name;
              }
            };
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
        it('calls side effect methods after a response is generated, passing them response and action', done => {
          const routes = [{ name: 'All', path: ':all+' }];
          const sideEffect = jest.fn();

          const config = createConfig(history, routes, {
            sideEffects: [sideEffect]
          });

          config.ready().then(response => {
            expect(sideEffect.mock.calls.length).toBe(1);
            expect(sideEffect.mock.calls[0][0]).toBe(response);
            expect(sideEffect.mock.calls[0][1]).toBe('PUSH');
            done();
          });
        });
      });

      describe('cache', () => {
        it('returns cached response for same key on subsequent calls if cache is provided', (done) => {
          const routes = [{
            name: 'All',
            path: '*',
            load: (params, location, mods) => {
              mods.setData(Math.random());
            }
          }];
          const createSimpleCache = () => {
            const cache = {};

            return {
              get: location => {
                const { key } = location;
                return cache[key];
              },
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

          config.ready().then(() => {
            config.subscribe(subscriber);
          });
        });

        it('generates new response for same key on subsequent calls if cache=false', done => {
          const routes = [{
            name: 'All',
            path: '*',
            load: (params, location, mods) => {
              mods.setData(Math.random());
            }
          }];
          const config = createConfig(history, routes, { cache: false });

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
      it('returns a Promise with an object generated by a Response', done => {
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
        config.ready().then(arg => {
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
          expect(Object.keys(arg).length).toEqual(properties.length);
          properties.forEach(prop => {
            expect(arg.hasOwnProperty(prop)).toBe(true);
          });
          done();
        });
      });

      it('resolved value has undefined error for good responses', done => {
        const routes = [{ name: 'Contact', path: 'contact' }];
        const history = InMemory({
          locations: ['/contact']
        });
        const config = createConfig(history, routes);
        config.ready().then(arg => {
          expect(arg.error).toBeUndefined();
          done();
        });
      });

      it('resolved value has error either load/preload fail', done => {
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
        config.ready().then(arg => {
          expect(arg.error).toBe('This is an error');
          done();
        });
      });
    });

    it('resolves once route that matches initial location has loaded', done => {
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
      config.ready().then(() => {
        expect(loaded).toBe(true);
        done();
      });
    });

    it('uses the last response if calling ready after a response has been created', done => {
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
      config.ready().then(readyOne => {
        config.ready().then(readyTwo => {
          expect(readyTwo).toBe(readyOne);
          done();
        });
      });
    });
  });

  // not an actual function, but grouping some response related tests here
  describe('response', () => {
    it('sets 404 if no routes match', done => {
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
      config.ready().then(resp => {
        expect(resp.status).toBe(404);
        done();
      });
    });

    it('handles route promises that are rejected', done => {
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

      // Jest 20 will add the ability to check that a promise resolves/rejects
      // for now, this just verifies that it rejects
      config.ready()
        .then(resp => {
          expect(true).toBe(false);
          done();
        })
        .catch(err => {
          expect(true).toBe(true);
          done();
        });
    });

    it('passes params and some response creator methods to load function', done => {
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
        done();
      });

      const CatchAll = {
        name: 'Catch All',
        path: ':anything',
        load: spy
      };

      const history = InMemory({ locations: ['/hello?one=two'] });
      const config = createConfig(history, [CatchAll]);
    });

    it('does not set body until after load/preload have resolved', (done) => {
      let bodyValue;
      const Route = {
        name: 'A Route',
        path: 'a-route',
        load: () => {
          bodyValue = 'testing';
        },
        body: () => bodyValue
      };
      const history = InMemory({ locations: ['/a-route'] });
      const config = createConfig(history, [Route]);
      config.ready().then(response => {
        expect(response.body).toBe('testing');
        done();
      });
    });
  });

  describe('subscribe', () => {
    it('throws an error if a non-function is passed to subscribe', () => {
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

      const config = createConfig(history, routes);
      const badArgs = [null, undefined, 1, true, {}, []];
      badArgs.forEach(arg => {
        expect(() => {
          config.subscribe(arg);
        }).toThrow('The argument passed to subscribe must be a function');
      });
    });

    describe('when subscribing', () => {
      it('calls subscriber function, passing it the response object and last action', done => {
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
        config.ready().then(() => {
          config.subscribe(sub);
          expect(sub.mock.calls.length).toBe(1);
          const [ resp, action ] = sub.mock.calls[0];
          expect(resp.name).toBe('How');
          expect(resp.partials[0]).toBe('Contact');
          expect(action).toBe('PUSH');
          done();
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
