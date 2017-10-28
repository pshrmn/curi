import 'jest';
import createConfig from '../src/curi';
import pathname from '../src/addons/pathname';
import InMemory from '@hickory/in-memory';

describe('route matching/response generation', () => {
  let history;

  beforeEach(() => {
    history = InMemory();
  });

  describe('route matching', () => {
    it('ignores leading slash on the pathname', () => {
      const history = InMemory({ locations: ['/test'] });
      const routes = [
        {
          name: 'Test',
          path: 'test',
          children: []
        }
      ];
      const config = createConfig(history, routes);
      expect.assertions(1);
      return config.ready().then(response => {
        expect(response.name).toBe('Test');
      });
    });

    it('does exact matching', () => {
      const history = InMemory({ locations: ['/test/leftovers'] });
      const routes = [
        {
          name: 'Test',
          path: 'test',
          children: []
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

    describe('nested routes', () => {   
      it('includes parent if partials if a child matches', () => {
        const history = InMemory({ locations: ['/ND/Fargo'] });
        const routes = [
          {
            name: 'State',
            path: ':state',
            children: [
              {
                name: 'City',
                path: ':city',
                children: []
              }
            ]
          }
        ];
        const config = createConfig(history, routes);
        expect.assertions(2);
        return config.ready().then(response => {
          expect(response.name).toBe('City');
          expect(response.partials).toEqual(['State']);
        });
      });

      it('does non-end parent matching when there are child routes, even if pathOptions.end=true', () => {
        const history = InMemory({ locations: ['/ND/Fargo'] });
        const routes = [
          {
            name: 'State',
            path: ':state',
            pathOptions: { end: true },
            children: [
              {
                name: 'City',
                path: ':city',
                children: []
              }
            ]
          }
        ];
        const config = createConfig(history, routes);
        expect.assertions(2);
        return config.ready().then(response => {
          expect(response.name).toBe('City');
          expect(response.partials).toEqual(['State']);
        });
      });

      it('skips parent match if no children match', () => {
        const history = InMemory({ locations: ['/MT/Bozeman'] });
        const routes = [
          {
            name: 'State',
            path: ':state',
            children: [
              {
                name: 'Wat',
                path: 'wat',
                children: []
              }
            ]
          },
          {
            name: 'Not Found',
            path: '(.*)'
          }
        ];
        const config = createConfig(history, routes);
        expect.assertions(2);
        return config.ready().then(response => {
          expect(response.name).toBe('Not Found');
          expect(response.partials).toEqual([]);
        });
      });
    });

    it('matches partial routes if route.pathOptions.end=false', () => {
      const history = InMemory({ locations: ['/SD/Sioux City'] });
      const routes = [
        {
          name: 'State',
          path: ':state',
          pathOptions: { end: false },
          children: []
        },
        {
          name: 'Not Found',
          path: '(.*)'
        }
      ];
      const config = createConfig(history, routes);
      expect.assertions(1);
      return config.ready().then(response => {
        expect(response.name).toBe('State');
      });
    });
  });

  describe('response', () => {
    it('is null if either load or preload fail (and error is logged)', () => {
      const err = console.error;
      const mockError = jest.fn();
      console.error = mockError;
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
      expect.assertions(3);
      return config.ready().then(arg => {
        expect(arg).toBe(null);
        expect(mockError.mock.calls.length).toBe(1);
        expect(mockError.mock.calls[0][0]).toBe('This is an error');
        console.error = err;
      });
    });

    describe('properties', () => {
      describe('key', () => {
        it('is the key property from the location', () => {
          const routes = [];
          const history = InMemory({ locations: ['/other-page'] });
          const config = createConfig(history, routes);
          expect.assertions(1);
          return config.ready().then(response => {
            expect(response.key).toBe(history.location.key);
          });
        });
      });

      describe('location', () => {
        it('is the location used to match routes', () => {
          const routes = [];
          const history = InMemory({ locations: ['/other-page'] });
          const config = createConfig(history, routes);
          expect.assertions(1);
          return config.ready().then(response => {
            expect(response.location).toBe(history.location);
          });
        });
      });

      describe('status', () => {
        it('is 200 if a route matches', () => {
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
          return config.ready().then(resp => {
            expect(resp.status).toBe(200);
          });
        });

        it('is 404 if no routes match', () => {
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
          return config.ready().then(resp => {
            expect(resp.status).toBe(404);
          });
        });

        it("is the value set by calling setStatus in the matching route's load function", () => {
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
  
          const config = createConfig(history, routes);
          expect.assertions(1);
          return config.ready().then(response => {
            expect(response.status).toBe(451);
          });
        });

        it("is set by calling redirect in the matching route's load function", () => {
          const routes = [
            {
              name: 'A Route',
              path: '',
              load: (route, modifiers) => {
                return modifiers.redirect('/somewhere', 302);
              }
            }
          ];

          const config = createConfig(history, routes);
          expect.assertions(1);
          return config.ready().then(response => {
            expect(response.status).toBe(302);
          });
        });

        it("is set to 301 by default when calling redirect in the matching route's load function", () => {
          const routes = [
            {
              name: 'A Route',
              path: '',
              load: (route, modifiers) => {
                return modifiers.redirect('/somewhere');
              }
            }
          ];

          const config = createConfig(history, routes);
          expect.assertions(1);
          return config.ready().then(response => {
            expect(response.status).toBe(301);
          });
        });
      });

      describe('data', () => {
        it('is undefined by default', () => {
          const routes = [
            {
              name: 'A Route',
              path: ''
            }
          ];

          const config = createConfig(history, routes);
          expect.assertions(1);
          return config.ready().then(response => {
            expect(response.data).toBeUndefined();
          });
        });

        it("is the value set by the matching route's load function calling setData", () => {
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

          const config = createConfig(history, routes);
          expect.assertions(1);
          return config.ready().then(response => {
            expect(response.data).toMatchObject({ test: 'value' });
          });
        });
      });

      describe('title', () => {
        it('is an empty string when there is no matched route', () => {
          const routes = [
            {
              name: 'State',
              path: ':state',
              children: []
            }
          ];
          const history = InMemory({ locations: ['/'] });
          const config = createConfig(history, routes);

          expect.assertions(1);
          return config.ready().then(resp => {
            expect(resp.title).toBe('');
          });
        });

        it('is an empty string if the matched route does not have a title property', () => {
          const routes = [
            {
              name: 'State',
              path: ':state',
              children: []
            }
          ];
          const history = InMemory({ locations: ['/AZ'] });
          const config = createConfig(history, routes);

          expect.assertions(1);
          return config.ready().then(resp => {
            expect(resp.title).toBe('');
          });
        });

        it('is the route.title value route.title is a string', () => {
          const routes = [
            {
              name: 'State',
              path: ':state',
              children: [],
              title: 'A State'
            }
          ];
          const history = InMemory({ locations: ['/VA'] });
          const config = createConfig(history, routes);

          expect.assertions(1);
          return config.ready().then(resp => {
            expect(resp.title).toBe('A State');
          });
        });

        it('calls route.title passing it the params and data when it is a function', () => {
          const routes = [
            {
              name: 'State',
              path: ':state',
              children: [],
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

          expect.assertions(1);
          return config.ready().then(resp => {
            expect(resp.title).toBe('WV (aka West Virginia)');
          });
        });
      });

      describe('body', () => {
        it('is set after load/preload have resolved', () => {
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
            expect(response.body).toBe('testing');
          });
        });

        it('is undefined if matching route has no body property', () => {
          const Route = {
            name: 'A Route',
            path: 'a-route'
          };
          const history = InMemory({ locations: ['/a-route'] });
          const config = createConfig(history, [Route]);
          expect.assertions(1);
          return config.ready().then(response => {
            expect(response.body).toBeUndefined();
          });
        });
      });

      describe('name', () => {
        it('is the name of the best matching route', () => {
          const Route = {
            name: 'A Route',
            path: 'a-route'
          };
          const history = InMemory({ locations: ['/a-route'] });
          const config = createConfig(history, [Route]);
          expect.assertions(1);
          return config.ready().then(response => {
            expect(response.name).toBe('A Route');
          });
        });

        it('is undefined if no routes match', () => {
          const Route = {
            name: 'A Route',
            path: 'a-route'
          };
          const history = InMemory({ locations: ['/'] });
          const config = createConfig(history, [Route]);
          expect.assertions(1);
          return config.ready().then(response => {
            expect(response.name).toBeUndefined();
          });
        });
      });

      describe('partials', () => {
        it('is set using the names of all partially matching routes', () => {
          const history = InMemory({ locations: ['/TX/Austin'] });
          const routes = [
            {
              name: 'State',
              path: ':state',
              children: [
                {
                  name: 'City',
                  path: ':city',
                  children: []
                }
              ]
            }
          ];
          const config = createConfig(history, routes);
          expect.assertions(1);
          return config.ready().then(response => {
            expect(response.partials).toEqual(['State']);
          });
        });
      });

      describe('params', () => {
        it('includes params from partially matched routes', () => {
          const history = InMemory({ locations: ['/MT/Bozeman'] });
          const routes = [
            {
              name: 'State',
              path: ':state',
              children: [
                {
                  name: 'City',
                  path: ':city',
                  children: []
                }
              ]
            }
          ];
          const config = createConfig(history, routes);
          expect.assertions(1);
          return config.ready().then(response => {
            expect(response.params).toEqual({
              state: 'MT',
              city: 'Bozeman'
            });
          });
        });

        it('overwrites param name conflicts', () => {
          const history = InMemory({ locations: ['/1/2'] });
          const routes = [
            {
              name: 'One',
              path: ':id',
              children: [{ name: 'Two', path: ':id', children: [] }]
            }
          ];
          const config = createConfig(history, routes);
          expect.assertions(1);
          return config.ready().then(response => {
            expect(response.params['id']).toBe('2');
          });
        });

        it('uses route.paramParsers to parse params', () => {
          const history = InMemory({ locations: ['/123'] });
          const routes = [
            {
              name: 'number',
              path: ':num',
              children: [],
              params: {
                num: n => parseInt(n, 10)
              }
            }
          ];
          const config = createConfig(history, routes);
          expect.assertions(1);
          return config.ready().then(response => {
            expect(response.params).toEqual({ num: 123 });
          });
        });

        it('parsers params from parent routes', () => {
          const history = InMemory({ locations: ['/123/456'] });
          const routes = [
            {
              name: 'first',
              path: ':first',
              children: [
                {
                  name: 'second',
                  path: ':second',
                  children: [],
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
          expect.assertions(1);
          return config.ready().then(response => {
            expect(response.params).toEqual({
              first: 123,
              second: 456
            });
          });
        });

        it('uses string for any params not in route.paramParsers', () => {
          const history = InMemory({ locations: ['/123/456'] });
          const routes = [
            {
              name: 'combo',
              path: ':first/:second',
              children: [],
              params: {
                first: n => parseInt(n, 10)
              }
            }
          ];
          const config = createConfig(history, routes);
          expect.assertions(1);
          return config.ready().then(response => {
            expect(response.params).toEqual({
              first: 123,
              second: '456'
            });
          });
        });

        it('falls back to string value if param parser throws', () => {
          const originalError = console.error;
          const errorMock = jest.fn();
          console.error = errorMock;

          const history = InMemory({ locations: ['/123'] });
          const routes = [
            {
              name: 'number',
              path: ':num',
              children: [],
              params: {
                num: n => {
                  throw new Error('This will fail.');
                }
              }
            }
          ];
          const config = createConfig(history, routes);
          expect.assertions(3);
          return config.ready().then(response => {
            expect(response.params).toEqual({
              num: '123'
            });
            expect(errorMock.mock.calls.length).toBe(1);
            expect(errorMock.mock.calls[0][0].message).toBe('This will fail.');
            console.error = originalError;
          });
        });
      });

      describe('error', () => {
        it('is undefined for good responses', () => {
          const routes = [{ name: 'Contact', path: 'contact' }];
          const history = InMemory({
            locations: ['/contact']
          });
          const config = createConfig(history, routes);
          expect.assertions(1);
          return config.ready().then(arg => {
            expect(arg.error).toBeUndefined();
          });
        });

        it("is set by calling the fail method from a matched route's load function", () => {
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

          const config = createConfig(history, routes);
          expect.assertions(1);
          return config.ready().then(response => {
            expect(response.error).toBe('woops');
          });
        });
      });

      describe('redirectTo', () => {
        it("is sets by calling the redirect function in a matching route's load function", () => {
          const routes = [
            {
              name: 'A Route',
              path: '',
              load: (route, modifiers) => {
                return modifiers.redirect('/somewhere', 301);
              }
            }
          ];
  
          const config = createConfig(history, routes);
          expect.assertions(1);
          return config.ready().then(response => {
            expect(response.redirectTo).toBe('/somewhere');
          });
        });
      });
    });
  });

  describe('the matching route', () => {
    describe('calling the load function', () => {
      it('passes params, location, modifier methods, and addons to load function', () => {
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
        return config.ready();
      });
  
      it('can use registered addons', () => {
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
        expect.assertions(1);
        return config.ready().then(response => {
          expect(response.redirectTo).toBe('/new/1');
        });
      });
    });
  });
});
