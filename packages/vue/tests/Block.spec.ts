import 'jest';
import Vue from 'vue/dist/vue.common.js';
import InMemory from '@hickory/in-memory';
import createConfig from '@curi/core';
import CuriPlugin from '../src/plugin';
import Block from '../src/Block';

describe('Block component', () => {
  const history = InMemory();
  history.confirmWith = jest.fn();
  history.removeConfirmation = jest.fn();

  const routes = [{ name: 'Place', path: '/place/:name' }];
  const config = createConfig(history, routes);
  Vue.use(CuriPlugin, { config });

  afterEach(() => {
    history.confirmWith.mockReset();
    history.removeConfirmation.mockReset();
  });

  it('registers with the name curi-block', () => {
    expect(Vue.options.components['curi-block']).toBeDefined();
  });

  it('renders undefined', () => {
    const vm = new Vue({
      template: '<curi-block :active="active" :confirm="confirm" />',
      data: {
        active: true,
        confirm: (data, s, f) => {
          s();
        }
      }
    }).$mount();
    expect(vm.$el.tagName).toBeUndefined();
  });

  it('if active=true when mounting, adds block', () => {
    const confirm = jest.fn();
    const vm = new Vue({
      template: '<curi-block :active="active"  :confirm="confirm" />',
      data: {
        active: true,
        confirm
      }
    }).$mount();
    expect(history.confirmWith.mock.calls.length).toBe(1);
    expect(history.confirmWith.mock.calls[0][0]).toBe(confirm);
  });

  it('defaults to active=true', () => {
    const confirm = jest.fn();
    const vm = new Vue({
      template: '<curi-block :confirm="confirm" />',
      data: {
        confirm
      }
    }).$mount();
    expect(history.confirmWith.mock.calls.length).toBe(1);
    expect(history.confirmWith.mock.calls[0][0]).toBe(confirm);
  });

  it('if active=false when mounting, does not add block', () => {
    const confirm = jest.fn();
    const vm = new Vue({
      template: '<curi-block :active="active"  :confirm="confirm" />',
      data: {
        active: false,
        confirm
      }
    }).$mount();
    expect(history.confirmWith.mock.calls.length).toBe(0);
  });

  it('removes block if active goes true->false while updating', done => {
    const confirm = jest.fn();
    const vm = new Vue({
      template: `
        <curi-block :active="active"  :confirm="confirm" />
      `,
      data: {
        active: true,
        confirm
      }
    }).$mount();
    expect(history.removeConfirmation.mock.calls.length).toBe(0);
    vm.active = false;
    Vue.nextTick(() => {
      expect(history.removeConfirmation.mock.calls.length).toBe(1);
      done();
    });
  });

  it('adds block if active goes false->true while updating', done => {
    const confirm = jest.fn();
    const vm = new Vue({
      template: `
        <curi-block :active="active" :confirm="confirm" />
      `,
      data: {
        active: false,
        confirm
      }
    }).$mount();
    expect(history.confirmWith.mock.calls.length).toBe(0);
    vm.active = true;
    Vue.nextTick(() => {
      expect(history.confirmWith.mock.calls.length).toBe(1);
      done();
    });
  });

  it('re-adds block if either prop changes', done => {
    const confirm1 = jest.fn();
    const confirm2 = jest.fn();

    const vm = new Vue({
      template: `
        <curi-block :active="active" :confirm="confirm" />
      `,
      data: {
        active: true,
        confirm: confirm1
      }
    }).$mount();
    expect(history.confirmWith.mock.calls.length).toBe(1);
    vm.confirm = confirm2;
    Vue.nextTick(() => {
      expect(history.confirmWith.mock.calls.length).toBe(2);
      done();
    });
  });

  it('unblocks before destroying', () => {
    const confirm = jest.fn();
    const vm = new Vue({
      template: '<curi-block :active="active" :confirm="confirm" />',
      data: {
        active: true,
        confirm
      }
    }).$mount();
    expect(history.removeConfirmation.mock.calls.length).toBe(0);
    vm.$destroy();
    expect(history.removeConfirmation.mock.calls.length).toBe(1);
  });
});
