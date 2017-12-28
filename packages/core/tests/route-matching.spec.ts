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
      config.respond(response => {
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
      config.respond(response => {
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
        config.respond(response => {
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
        config.respond(response => {
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
        config.respond(response => {
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
      config.respond(response => {
        expect(response.name).toBe('State');
        done();
      });
    });
  });

  describe('response', () => {
    it('if either initial or every response fns have uncaught errors, error is passed to response fn', done => {
      const routes = [
        {
          name: 'Contact',
          path: 'contact',
          match: {
            every: () => {
              return Promise.reject('This is an error');
            },
            response: ({ error }) => {
              expect(error).toBe('This is an error');
            }
          }
        }
      ];
      const history = InMemory({
        locations: ['/contact']
      });
      const config = createConfig(history, routes);
      config.respond(response => {
        done();
      });
    });

    describe('properties', () => {
      describe('key', () => {
        it('is the key property from the location', done => {
          const routes = [];
          const history = InMemory({ locations: ['/other-page'] });
          const config = createConfig(history, routes);
          config.respond(response => {
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
          config.respond(response => {
            expect(response.location).toBe(history.location);
            done();
          });
        });
      });

      describe('body', () => {
        it("is undefined if it isn't set in match.response", done => {
          const history = InMemory({ locations: ['/test'] });
          const routes = [
            {
              name: 'Test',
              path: 'test'
            }
          ];
          const config = createConfig(history, routes);
          config.respond(response => {
            expect(response.body).toBeUndefined();
            done();
          });
        });

        it('is the value set with set.body', done => {
          const history = InMemory({ locations: ['/test'] });
          const body = () => 'anybody out there?';
          const routes = [
            {
              name: 'Test',
              path: 'test',
              match: {
                response: ({ set }) => {
                  set.body(body);
                }
              }
            }
          ];
          const config = createConfig(history, routes);
          config.respond(response => {
            expect(response.body).toBe(body);
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
          config.respond(response => {
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
          config.respond(response => {
            expect(response.status).toBe(404);
            done();
          });
        });

        it("is the value set by calling status in the matching route's match.response function", done => {
          const routes = [
            {
              name: 'A Route',
              path: '',
              match: {
                response: ({ set }) => {
                  set.status(451);
                }
              }
            }
          ];
          const history = InMemory({ locations: ['/'] });
          const config = createConfig(history, routes);
          config.respond(response => {
            expect(response.status).toBe(451);
            done();
          });
        });

        it('is set by calling set.redirect in the matching match.response', done => {
          const routes = [
            {
              name: '302 Route',
              path: '',
              match: {
                response: ({ set }) => {
                  set.redirect('/somewhere', 302);
                }
              }
            }
          ];
          const history = InMemory({ locations: ['/'] });
          const config = createConfig(history, routes);
          let firstCall = true;
          config.respond(response => {
            if (firstCall) {
              expect(response.status).toBe(302);
              firstCall = false;
              done();
            }
          });
        });

        it('is set to 301 by default when calling set.redirect in match.response', done => {
          const routes = [
            {
              name: '301 Route',
              path: '',
              match: {
                response: ({ set }) => {
                  set.redirect('/somewhere');
                }
              }
            }
          ];
          const history = InMemory({ locations: ['/'] });
          const config = createConfig(history, routes);
          let firstCall = true;
          config.respond(response => {
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
          config.respond(response => {
            expect(response.data).toBeUndefined();
            done();
          });
        });

        it('is the value set by calling set.data in match.response', done => {
          const routes = [
            {
              name: 'A Route',
              path: '',
              match: {
                response: ({ set }) => {
                  set.data({ test: 'value' });
                }
              }
            }
          ];
          const history = InMemory({ locations: ['/'] });
          const config = createConfig(history, routes);
          config.respond(response => {
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

          config.respond(response => {
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

          config.respond(response => {
            expect(response.title).toBe('');
            done();
          });
        });

        it('is the value set by calling set.title in match.response', done => {
          const routes = [
            {
              name: 'State',
              path: ':state',
              match: {
                response: ({ set }) => {
                  set.title('A State');
                }
              }
            }
          ];
          const history = InMemory({ locations: ['/VA'] });
          const config = createConfig(history, routes);

          config.respond(response => {
            expect(response.title).toBe('A State');
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
          config.respond(response => {
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
          config.respond(response => {
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
          config.respond(response => {
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
          config.respond(response => {
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
          config.respond(response => {
            expect(response.params['id']).toBe('2');
            done();
          });
        });

        describe('parsing params', () => {
          it('uses route.params to parse params', done => {
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
            config.respond(response => {
              expect(response.params).toEqual({ num: 123 });
              done();
            });
          });

          it('parses params from parent routes', done => {
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
            config.respond(response => {
              expect(response.params).toEqual({
                first: 123,
                second: 456
              });
              done();
            });
          });

          it('uses string for any params not in route.params', done => {
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
            config.respond(response => {
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
            config.respond(response => {
              expect(response.params).toEqual({
                num: '123'
              });
              expect(errorMock.mock.calls.length).toBe(1);
              expect(errorMock.mock.calls[0][0].message).toBe(
                'This will fail.'
              );
              console.error = originalError;
              done();
            });
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
          config.respond(response => {
            expect(response.error).toBeUndefined();
            done();
          });
        });

        it("is set by calling the error method from a matched route's match.response function", done => {
          const routes = [
            {
              name: 'A Route',
              path: '',
              match: {
                response: ({ set }) => {
                  set.error('woops');
                }
              }
            }
          ];
          const history = InMemory({ locations: ['/'] });
          const config = createConfig(history, routes);
          config.respond(response => {
            expect(response.error).toBe('woops');
            done();
          });
        });
      });

      describe('redirectTo', () => {
        it("is sets by calling the redirect function in a matching route's match.response function", done => {
          const routes = [
            {
              name: 'A Route',
              path: '',
              match: {
                response: ({ set }) => {
                  set.redirect('/somewhere', 301);
                }
              }
            }
          ];
          const history = InMemory({ locations: ['/'] });
          const config = createConfig(history, routes);
          let firstCall = true;
          config.respond(response => {
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

  describe('the match functions', () => {
    describe('initial', () => {
      it('will only be called once', done => {
        /*
         * This test is a bit odd to read, but it verifies that the
         * match.initial function is only called once (while the
         * match.every function is called on every match).
         */
        let initialCount = 0;
        let everyCount = 0;
        const initial = () => Promise.resolve(initialCount++);
        const every = () => Promise.resolve(everyCount++);
        const history = InMemory({ locations: ['/test'] });
        const routes = [
          {
            name: 'Test',
            path: ':test',
            match: { initial, every }
          }
        ];
        const config = createConfig(history, routes);
        let firstCall = true;
        config.respond(() => {
          if (firstCall) {
            firstCall = false;
            expect(initialCount).toBe(1);
            expect(everyCount).toBe(1);
            history.push('/another-one');
          } else {
            expect(initialCount).toBe(1);
            expect(everyCount).toBe(2);
            done();
          }
        });
      });
    });

    describe('every', () => {
      it('receives the route props from the matching route', done => {
        const spy = jest.fn(route => {
          expect(route).toMatchObject({
            params: { anything: 'hello' },
            location: {
              pathname: '/hello',
              query: 'one=two'
            },
            name: 'Catch All'
          });
        });

        const CatchAll = {
          name: 'Catch All',
          path: ':anything',
          match: { every: spy }
        };

        const history = InMemory({ locations: ['/hello?one=two'] });
        const config = createConfig(history, [CatchAll]);
        config.respond(
          response => {
            done();
          },
          { once: true }
        );
      });
    });

    describe('response', () => {
      it('is not called if the navigation has been cancelled', done => {
        const responseSpy = jest.fn();
        let firstHasResolved = false;
        const everySpy = jest.fn(() => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              firstHasResolved = true;
              resolve();
            }, 15);
          });
        });

        const routes = [
          {
            name: 'First',
            path: 'first',
            match: {
              every: everySpy,
              response: responseSpy
            }
          },
          {
            name: 'Second',
            path: 'second',
            match: {
              // re-use the every spy so that this route's response
              // fn isn't call until after the first route's every
              // fn has resolved
              every: everySpy,
              response: () => {
                expect(firstHasResolved).toBe(true);
                expect(everySpy.mock.calls.length).toBe(2);
                expect(responseSpy.mock.calls.length).toBe(0);
                done();
              }
            }
          }
        ];

        const history = InMemory({ locations: ['/first'] });
        const config = createConfig(history, routes);
        history.push('/second');
      });

      describe('error', () => {
        it('receives the error rejected by match.initial', done => {
          const spy = jest.fn(({ error }) => {
            expect(error).toBe('rejected by initial');
          });

          const CatchAll = {
            name: 'Catch All',
            path: ':anything',
            match: {
              initial: () => Promise.reject('rejected by initial'),
              response: spy
            }
          };

          const history = InMemory({ locations: ['/hello?one=two'] });
          const config = createConfig(history, [CatchAll]);
          config.respond(
            response => {
              done();
            },
            { once: true }
          );
        });

        it('receives the error rejected by match.every', done => {
          const spy = jest.fn(({ error }) => {
            expect(error).toBe('rejected by every');
          });

          const CatchAll = {
            name: 'Catch All',
            path: ':anything',
            match: {
              every: () => Promise.reject('rejected by every'),
              response: spy
            }
          };

          const history = InMemory({ locations: ['/hello?one=two'] });
          const config = createConfig(history, [CatchAll]);
          config.respond(
            response => {
              done();
            },
            { once: true }
          );
        });
      });

      describe('resolved', () => {
        describe('initial', () => {
          it('receives the data resolved by match.initial', done => {
            const spy = jest.fn(({ resolved }) => {
              expect(resolved.initial).toMatchObject({ test: 'ing' });
            });

            const CatchAll = {
              name: 'Catch All',
              path: ':anything',
              match: {
                initial: () => Promise.resolve({ test: 'ing' }),
                response: spy
              }
            };

            const history = InMemory({ locations: ['/hello?one=two'] });
            const config = createConfig(history, [CatchAll]);
            config.respond(
              response => {
                done();
              },
              { once: true }
            );
          });

          it('re-use the Promise returned by initial on subsequent matches', done => {
            const history = InMemory({ locations: ['/test'] });
            let hasFinished = false;
            let random;
            const routes = [
              {
                name: 'Test',
                path: ':test',
                match: {
                  initial: () => {
                    return Promise.resolve(Math.random());
                  },
                  response: ({ resolved }) => {
                    if (!hasFinished) {
                      hasFinished = true;
                      random = resolved.initial;
                    } else {
                      expect(resolved.initial).toBe(random);
                      done();
                    }
                  }
                }
              }
            ];
            const config = createConfig(history, routes);
            config.respond(
              () => {
                history.push('/another-one');
              },
              { once: true }
            );
          });

          it('resolved.initial is undefined if there is no match.initial function', done => {
            const spy = jest.fn(({ resolved }) => {
              expect(resolved.initial).toBeUndefined();
            });

            const CatchAll = {
              name: 'Catch All',
              path: ':anything',
              match: {
                response: spy
              }
            };

            const history = InMemory({ locations: ['/hello?one=two'] });
            const config = createConfig(history, [CatchAll]);
            config.respond(
              response => {
                done();
              },
              { once: true }
            );
          });
        });

        describe('every', () => {
          it('receives the data resolved by match.every', done => {
            const spy = jest.fn(({ resolved }) => {
              expect(resolved.every).toMatchObject({ test: 'ing' });
            });

            const CatchAll = {
              name: 'Catch All',
              path: ':anything',
              match: {
                every: () => Promise.resolve({ test: 'ing' }),
                response: spy
              }
            };

            const history = InMemory({ locations: ['/hello?one=two'] });
            const config = createConfig(history, [CatchAll]);
            config.respond(
              response => {
                done();
              },
              { once: true }
            );
          });

          it('resolved.every is undefined if there is no match.every function', done => {
            const spy = jest.fn(({ resolved }) => {
              expect(resolved.every).toBeUndefined();
            });

            const CatchAll = {
              name: 'Catch All',
              path: ':anything',
              match: {
                response: spy
              }
            };

            const history = InMemory({ locations: ['/hello?one=two'] });
            const config = createConfig(history, [CatchAll]);
            config.respond(
              response => {
                done();
              },
              { once: true }
            );
          });
        });
      });

      describe('route', () => {
        it('receives the route props', done => {
          const spy = jest.fn(({ route }) => {
            expect(route).toMatchObject({
              params: { anything: 'hello' },
              location: {
                pathname: '/hello',
                query: 'one=two'
              }
            });
          });

          const CatchAll = {
            name: 'Catch All',
            path: ':anything',
            match: { response: spy }
          };

          const history = InMemory({ locations: ['/hello?one=two'] });
          const config = createConfig(history, [CatchAll]);
          config.respond(
            response => {
              done();
            },
            { once: true }
          );
        });
      });

      describe('set', () => {
        it('receives the response set functions', done => {
          const spy = jest.fn(({ set }) => {
            expect(set).toMatchObject(
              expect.objectContaining({
                body: expect.any(Function),
                data: expect.any(Function),
                status: expect.any(Function),
                redirect: expect.any(Function),
                error: expect.any(Function)
              })
            );
          });

          const CatchAll = {
            name: 'Catch All',
            path: ':anything',
            match: { response: spy }
          };

          const history = InMemory({ locations: ['/hello?one=two'] });
          const config = createConfig(history, [CatchAll]);
          config.respond(
            response => {
              done();
            },
            { once: true }
          );
        });
      });

      describe('addons', () => {
        it('receives the registered addons object', done => {
          const spy = jest.fn(({ addons }) => {
            expect(typeof addons.pathname).toBe('function');
          });

          const CatchAll = {
            name: 'Catch All',
            path: ':anything',
            match: { response: spy }
          };

          const history = InMemory({ locations: ['/hello?one=two'] });
          const config = createConfig(history, [CatchAll]);
          config.respond(
            response => {
              done();
            },
            { once: true }
          );
        });

        it('can use registered addons', done => {
          const routes = [
            {
              name: 'Old',
              path: 'old/:id',
              match: {
                response: ({ route, set, addons }) => {
                  const pathname = addons.pathname('New', route.params);
                  set.redirect(pathname);
                }
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
          config.respond(response => {
            if (firstCall) {
              expect(response.redirectTo).toBe('/new/1');
              firstCall = false;
              done();
            }
          });
        });
      });
    });
  });
});
