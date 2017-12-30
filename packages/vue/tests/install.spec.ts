import 'jest';
import { createLocalVue, shallow } from 'vue-test-utils';
import installCuri from '../src/install';
import curi from '@curi/core';
import InMemory from '@hickory/in-memory';

describe('installCuri', () => {
  it('installs the CuriPlugin with the provided router object', done => {
    const Vue = createLocalVue();

    const history = InMemory();
    const routes = [];
    const router = curi(history, routes);

    const FakeComponent = {
      render: function(h) {
        return h('div');
      }
    };
    installCuri(Vue, router);

    router.respond(
      (response, action) => {
        const wrapper = shallow(FakeComponent, {
          localVue: Vue
        });

        expect(wrapper.vm.$curi).toMatchObject({
          router,
          response,
          action
        });
        done();
      },
      { once: true }
    );
  });

  it('subscribes to new responses', done => {
    const Vue = createLocalVue();

    const history = InMemory();
    const routes = [];
    const router = curi(history, routes);

    let renderCount = 0;
    const FakeComponent = {
      render: function(h) {
        // need to include response to trigger re-render
        return h('div', {}, this.$curi.response.location.pathname);
      },
      mounted: function() {
        expect(this.$curi).toMatchObject({
          response: {
            location: { pathname: '/' }
          },
          action: 'PUSH'
        });
      },
      updated: function() {
        expect(this.$curi).toMatchObject({
          response: {
            location: { pathname: '/another-one' }
          },
          action: 'REPLACE'
        });
        done();
      }
    };

    installCuri(Vue, router);

    router.respond(
      (response, action) => {
        const wrapper = shallow(FakeComponent, {
          localVue: Vue
        });
        router.history.replace('/another-one');
      },
      { once: true }
    );
  });
});
