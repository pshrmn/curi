import 'jest';
import createConfig from '../src/curi';
import InMemory from '@hickory/in-memory';

describe('route matching/response generation', () => {
  describe('route matching', () => {
    it('ignores leading slash on the pathname', done => {
      const history = InMemory({ locations: ['/test'] });
      const routes = [
        {
          name: 'Test',
          path: 'test'
        }
      ];
      const config = createConfig(history, routes);
      config.subscribe(response => {
        expect(response.name).toBe('Test');
        done();
      });
    });

    it('does exact matching', done => {
      const history = InMemory({ locations: ['/test/leftovers'] });
      const routes = [
        {
          name: 'Test',
          path: 'test'
        },
        {
          name: 'Not Found',
          path: '(.*)'
        }
      ];
      const config = createConfig(history, routes);
      config.subscribe(response => {
        expect(response.name).toBe('Not Found');
        done();
      });
    });

    describe('nested routes', () => {
      it('includes parent if partials if a child matches', done => {
        const history = InMemory({ locations: ['/ND/Fargo'] });
        const routes = [
          {
            name: 'State',
            path: ':state',
            children: [
              {
                name: 'City',
                path: ':city'
              }
            ]
          }
        ];
        const config = createConfig(history, routes);
        config.subscribe(response => {
          expect(response.name).toBe('City');
          expect(response.partials).toEqual(['State']);
          done();
        });
      });

      it('does non-end parent matching when there are child routes, even if pathOptions.end=true', done => {
        const history = InMemory({ locations: ['/ND/Fargo'] });
        const routes = [
          {
            name: 'State',
            path: ':state',
            pathOptions: { end: true },
            children: [
              {
                name: 'City',
                path: ':city'
              }
            ]
          }
        ];
        const config = createConfig(history, routes);
        config.subscribe(response => {
          expect(response.name).toBe('City');
          expect(response.partials).toEqual(['State']);
          done();
        });
      });

      it('skips parent match if no children match', done => {
        const history = InMemory({ locations: ['/MT/Bozeman'] });
        const routes = [
          {
            name: 'State',
            path: ':state',
            children: [
              {
                name: 'Wat',
                path: 'wat'
              }
            ]
          },
          {
            name: 'Not Found',
            path: '(.*)'
          }
        ];
        const config = createConfig(history, routes);
        config.subscribe(response => {
          expect(response.name).toBe('Not Found');
          expect(response.partials).toEqual([]);
          done();
        });
      });
    });

    it('matches partial routes if route.pathOptions.end=false', done => {
      const history = InMemory({ locations: ['/SD/Sioux City'] });
      const routes = [
        {
          name: 'State',
          path: ':state',
          pathOptions: { end: false }
        },
        {
          name: 'Not Found',
          path: '(.*)'
        }
      ];
      const config = createConfig(history, routes);
      config.subscribe(response => {
        expect(response.name).toBe('State');
        done();
      });
    });
  });

  describe('response', () => {
    it('if either load or preload have uncaught errors, error is set as response.error', done => {
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
      config.subscribe(response => {
        expect(response.error).toBe('This is an error');
        done();
      });
    });

    describe('properties', () => {
      describe('key', () => {
        it('is the key property from the location', done => {
          const routes = [];
          const history = InMemory({ locations: ['/other-page'] });
          const config = createConfig(history, routes);
          config.subscribe(response => {
            expect(response.key).toBe(history.location.key);
            done();
          });
        });
      });

      describe('location', () => {
        it('is the location used to match routes', done => {
          const routes = [];
          const history = InMemory({ locations: ['/other-page'] });
          const config = createConfig(history, routes);
          config.subscribe(response => {
            expect(response.location).toBe(history.location);
            done();
          });
        });
      });

      describe('status', () => {
        it('is 200 if a route matches', done => {
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
          const history = InMemory({ locations: ['/contact'] });
          const config = createConfig(history, routes);
          expect.assertions(1);
          config.subscribe(response => {
            expect(response.status).toBe(200);
            done();
          });
        });

        it('is 404 if no routes match', done => {
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
          config.subscribe(response => {
            expect(response.status).toBe(404);
            done();
          });
        });

        it("is the value set by calling setStatus in the matching route's load function", done => {
          const routes = [
            {
              name: 'A Route',
              path: '',
              load: (route, mods) => {
                mods.setStatus(451);
                return Promise.resolve();
              }
            }
          ];
          const history = InMemory({ locations: ['/'] });
          const config = createConfig(history, routes);
          config.subscribe(response => {
            expect(response.status).toBe(451);
            done();
          });
        });

        it("is set by calling redirect in the matching route's load function", done => {
          const routes = [
            {
              name: '302 Route',
              path: '',
              load: (route, modifiers) => {
                return modifiers.redirect('/somewhere', 302);
              }
            }
          ];
          const history = InMemory({ locations: ['/'] });
          const config = createConfig(history, routes);
          let firstCall = true;
          config.subscribe(response => {
            if (firstCall) {
              expect(response.status).toBe(302);
              firstCall = false;
              done();
            }
          });
        });

        it("is set to 301 by default when calling redirect in the matching route's load function", done => {
          const routes = [
            {
              name: '301 Route',
              path: '',
              load: (route, modifiers) => {
                return modifiers.redirect('/somewhere');
              }
            }
          ];
          const history = InMemory({ locations: ['/'] });
          const config = createConfig(history, routes);
          let firstCall = true;
          config.subscribe(response => {
            if (firstCall) {
              expect(response.status).toBe(301);
              firstCall = false;
              done();
            }
          });
        });
      });

      describe('data', () => {
        it('is undefined by default', done => {
          const routes = [
            {
              name: 'A Route',
              path: ''
            }
          ];
          const history = InMemory({ locations: ['/'] });
          const config = createConfig(history, routes);
          config.subscribe(response => {
            expect(response.data).toBeUndefined();
            done();
          });
        });

        it("is the value set by the matching route's load function calling setData", done => {
          const routes = [
            {
              name: 'A Route',
              path: '',
              load: (route, mods) => {
                mods.setData({ test: 'value' });
                return Promise.resolve();
              }
            }
          ];
          const history = InMemory({ locations: ['/'] });
          const config = createConfig(history, routes);
          config.subscribe(response => {
            expect(response.data).toMatchObject({ test: 'value' });
            done();
          });
        });
      });

      describe('title', () => {
        it('is an empty string when there is no matched route', done => {
          const routes = [
            {
              name: 'State',
              path: ':state'
            }
          ];
          const history = InMemory({ locations: ['/'] });
          const config = createConfig(history, routes);

          config.subscribe(response => {
            expect(response.title).toBe('');
            done();
          });
        });

        it('is an empty string if the matched route does not have a title property', done => {
          const routes = [
            {
              name: 'State',
              path: ':state'
            }
          ];
          const history = InMemory({ locations: ['/AZ'] });
          const config = createConfig(history, routes);

          config.subscribe(response => {
            expect(response.title).toBe('');
            done();
          });
        });

        it('is the route.title value route.title is a string', done => {
          const routes = [
            {
              name: 'State',
              path: ':state',
              title: 'A State'
            }
          ];
          const history = InMemory({ locations: ['/VA'] });
          const config = createConfig(history, routes);

          config.subscribe(response => {
            expect(response.title).toBe('A State');
            done();
          });
        });

        it('calls route.title passing it the params and data when it is a function', done => {
          const routes = [
            {
              name: 'State',
              path: ':state',
              load: (route, mods): any => {
                mods.setData({ full: 'West Virginia' });
              },
              title: (params, data) => {
                return `${params['state']} (aka ${data.full})`;
              }
            }
          ];
          const history = InMemory({ locations: ['/WV'] });
          const config = createConfig(history, routes);

          config.subscribe(response => {
            expect(response.title).toBe('WV (aka West Virginia)');
            done();
          });
        });
      });

      describe('body', () => {
        it('is set after load/preload have resolved', done => {
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
          config.subscribe(response => {
            expect(response.body).toBe('testing');
            done();
          });
        });

        it('is undefined if matching route has no body property', done => {
          const Route = {
            name: 'A Route',
            path: 'a-route'
          };
          const history = InMemory({ locations: ['/a-route'] });
          const config = createConfig(history, [Route]);
          config.subscribe(response => {
            expect(response.body).toBeUndefined();
            done();
          });
        });
      });

      describe('name', () => {
        it('is the name of the best matching route', done => {
          const Route = {
            name: 'A Route',
            path: 'a-route'
          };
          const history = InMemory({ locations: ['/a-route'] });
          const config = createConfig(history, [Route]);
          config.subscribe(response => {
            expect(response.name).toBe('A Route');
            done();
          });
        });

        it('is undefined if no routes match', done => {
          const Route = {
            name: 'A Route',
            path: 'a-route'
          };
          const history = InMemory({ locations: ['/'] });
          const config = createConfig(history, [Route]);
          config.subscribe(response => {
            expect(response.name).toBeUndefined();
            done();
          });
        });
      });

      describe('partials', () => {
        it('is set using the names of all partially matching routes', done => {
          const history = InMemory({ locations: ['/TX/Austin'] });
          const routes = [
            {
              name: 'State',
              path: ':state',
              children: [
                {
                  name: 'City',
                  path: ':city'
                }
              ]
            }
          ];
          const config = createConfig(history, routes);
          config.subscribe(response => {
            expect(response.partials).toEqual(['State']);
            done();
          });
        });
      });

      describe('params', () => {
        it('includes params from partially matched routes', done => {
          const history = InMemory({ locations: ['/MT/Bozeman'] });
          const routes = [
            {
              name: 'State',
              path: ':state',
              children: [
                {
                  name: 'City',
                  path: ':city'
                }
              ]
            }
          ];
          const config = createConfig(history, routes);
          config.subscribe(response => {
            expect(response.params).toEqual({
              state: 'MT',
              city: 'Bozeman'
            });
            done();
          });
        });

        it('overwrites param name conflicts', done => {
          const history = InMemory({ locations: ['/1/2'] });
          const routes = [
            {
              name: 'One',
              path: ':id',
              children: [{ name: 'Two', path: ':id' }]
            }
          ];
          const config = createConfig(history, routes);
          config.subscribe(response => {
            expect(response.params['id']).toBe('2');
            done();
          });
        });

        it('uses route.paramParsers to parse params', done => {
          const history = InMemory({ locations: ['/123'] });
          const routes = [
            {
              name: 'number',
              path: ':num',
              params: {
                num: n => parseInt(n, 10)
              }
            }
          ];
          const config = createConfig(history, routes);
          config.subscribe(response => {
            expect(response.params).toEqual({ num: 123 });
            done();
          });
        });

        it('parsers params from parent routes', done => {
          const history = InMemory({ locations: ['/123/456'] });
          const routes = [
            {
              name: 'first',
              path: ':first',
              children: [
                {
                  name: 'second',
                  path: ':second',
                  params: {
                    second: n => parseInt(n, 10)
                  }
                }
              ],
              params: {
                first: n => parseInt(n, 10)
              }
            }
          ];
          const config = createConfig(history, routes);
          config.subscribe(response => {
            expect(response.params).toEqual({
              first: 123,
              second: 456
            });
            done();
          });
        });

        it('uses string for any params not in route.paramParsers', done => {
          const history = InMemory({ locations: ['/123/456'] });
          const routes = [
            {
              name: 'combo',
              path: ':first/:second',
              params: {
                first: n => parseInt(n, 10)
              }
            }
          ];
          const config = createConfig(history, routes);
          config.subscribe(response => {
            expect(response.params).toEqual({
              first: 123,
              second: '456'
            });
            done();
          });
        });

        it('falls back to string value if param parser throws', done => {
          const originalError = console.error;
          const errorMock = jest.fn();
          console.error = errorMock;

          const history = InMemory({ locations: ['/123'] });
          const routes = [
            {
              name: 'number',
              path: ':num',
              params: {
                num: n => {
                  throw new Error('This will fail.');
                }
              }
            }
          ];
          const config = createConfig(history, routes);
          config.subscribe(response => {
            expect(response.params).toEqual({
              num: '123'
            });
            expect(errorMock.mock.calls.length).toBe(1);
            expect(errorMock.mock.calls[0][0].message).toBe('This will fail.');
            console.error = originalError;
            done();
          });
        });
      });

      describe('error', () => {
        it('is undefined for good responses', done => {
          const routes = [{ name: 'Contact', path: 'contact' }];
          const history = InMemory({
            locations: ['/contact']
          });
          const config = createConfig(history, routes);
          config.subscribe(response => {
            expect(response.error).toBeUndefined();
            done();
          });
        });

        it("is set by calling the fail method from a matched route's load function", done => {
          const routes = [
            {
              name: 'A Route',
              path: '',
              load: (route, mods) => {
                mods.fail('woops');
                return Promise.resolve();
              }
            }
          ];
          const history = InMemory({ locations: ['/'] });
          const config = createConfig(history, routes);
          config.subscribe(response => {
            expect(response.error).toBe('woops');
            done();
          });
        });
      });

      describe('redirectTo', () => {
        it("is sets by calling the redirect function in a matching route's load function", done => {
          const routes = [
            {
              name: 'A Route',
              path: '',
              load: (route, modifiers) => {
                return modifiers.redirect('/somewhere', 301);
              }
            }
          ];
          const history = InMemory({ locations: ['/'] });
          const config = createConfig(history, routes);
          let firstCall = true;
          config.subscribe(response => {
            if (firstCall) {
              expect(response.redirectTo).toBe('/somewhere');
              firstCall = false;
              done();
            }
          });
        });
      });
    });
  });

  describe('the matching route', () => {
    describe('calling the load function', () => {
      it('passes params, location, modifier methods, and addons to load function', done => {
        const spy = jest.fn((route, modifiers, addons) => {
          expect(route).toMatchObject({
            params: { anything: 'hello' },
            location: {
              pathname: '/hello',
              query: 'one=two'
            }
          });
          expect(modifiers).toMatchObject(
            expect.objectContaining({
              fail: expect.any(Function),
              setData: expect.any(Function),
              setStatus: expect.any(Function)
            })
          );

          expect(typeof addons.pathname).toBe('function');
        });

        const CatchAll = {
          name: 'Catch All',
          path: ':anything',
          load: spy
        };

        const history = InMemory({ locations: ['/hello?one=two'] });
        const config = createConfig(history, [CatchAll]);
        expect.assertions(3);
        config.subscribe(response => {
          done();
        });
      });

      it('can use registered addons', done => {
        const routes = [
          {
            name: 'Old',
            path: 'old/:id',
            load: (route, modifiers, addons) => {
              const pathname = addons.pathname('New', route.params);
              return modifiers.redirect(pathname);
            }
          },
          {
            name: 'New',
            path: 'new/:id'
          }
        ];
        const history = InMemory({ locations: ['/old/1'] });
        const config = createConfig(history, routes);
        let firstCall = true;
        config.subscribe(response => {
          if (firstCall) {
            expect(response.redirectTo).toBe('/new/1');
            firstCall = false;
            done();
          }
        });
      });
    });

    describe('calling the preload function', () => {
      it('will only be called once', done => {
        /*
         * This test is a bit odd to read, but it verifies that the
         * preload function is only called once (while the load function
         * is called on every match).
         */
        let preCount = 0;
        let loadCount = 0;
        const preload = () => Promise.resolve(preCount++);
        const load = () => Promise.resolve(loadCount++);
        const history = InMemory({ locations: ['/test'] });
        const routes = [
          {
            name: 'Test',
            path: ':test',
            preload,
            load
          }
        ];
        const config = createConfig(history, routes);
        let firstCall = true;
        config.subscribe(() => {
          if (firstCall) {
            firstCall = false;
            expect(preCount).toBe(1);
            expect(loadCount).toBe(1);
            history.push('/another-one');
          } else {
            expect(preCount).toBe(1);
            expect(loadCount).toBe(2);
            done();
          }
        });
      });
    });
  });
});
