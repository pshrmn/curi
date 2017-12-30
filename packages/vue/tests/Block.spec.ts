import 'jest';
import { createLocalVue, shallow } from 'vue-test-utils';
import InMemory from '@hickory/in-memory';
import curi from '@curi/core';
import installCuri from '../src/install';
import Block from '../src/Block';

describe('Block component', () => {
  const history = InMemory();
  const mockConfirmWith = jest.fn();
  const mockRemoveConfirmation = jest.fn();
  history.confirmWith = mockConfirmWith;
  history.removeConfirmation = mockRemoveConfirmation;

  const routes = [{ name: 'Place', path: '/place/:name' }];
  const router = curi(history, routes);

  const Vue = createLocalVue();
  installCuri(Vue, router);

  afterEach(() => {
    mockConfirmWith.mockReset();
    mockRemoveConfirmation.mockReset();
  });

  it('renders undefined', () => {
    const wrapper = shallow(Block, {
      localVue: Vue,
      propsData: {
        active: true,
        confirm: (data, s, f) => {
          s();
        }
      }
    });
    expect(wrapper.isEmpty()).toBe(true);
  });

  it('if active=true when mounting, adds block', () => {
    const confirm = jest.fn();
    const wrapper = shallow(Block, {
      localVue: Vue,
      propsData: {
        active: true,
        confirm
      }
    });

    expect(mockConfirmWith.mock.calls.length).toBe(1);
    expect(mockConfirmWith.mock.calls[0][0]).toBe(confirm);
  });

  it('defaults to active=true', () => {
    const confirm = jest.fn();
    const wrapper = shallow(Block, {
      localVue: Vue,
      propsData: {
        confirm
      }
    });
    expect(mockConfirmWith.mock.calls.length).toBe(1);
    expect(mockConfirmWith.mock.calls[0][0]).toBe(confirm);
  });

  it('if active=false when mounting, does not add block', () => {
    const confirm = jest.fn();
    const wrapper = shallow(Block, {
      localVue: Vue,
      propsData: {
        active: false,
        confirm
      }
    });
    expect(mockConfirmWith.mock.calls.length).toBe(0);
  });

  it('removes block if active goes true->false while updating', done => {
    const confirm = jest.fn();
    const wrapper = shallow(Block, {
      localVue: Vue,
      propsData: {
        active: true,
        confirm
      }
    });
    expect(mockRemoveConfirmation.mock.calls.length).toBe(0);
    wrapper.vm.active = false;
    Vue.nextTick(() => {
      expect(mockRemoveConfirmation.mock.calls.length).toBe(1);
      done();
    });
  });

  it('adds block if active goes false->true while updating', done => {
    const confirm = jest.fn();
    const wrapper = shallow(Block, {
      localVue: Vue,
      propsData: {
        active: false,
        confirm
      }
    });
    expect(mockConfirmWith.mock.calls.length).toBe(0);
    wrapper.vm.active = true;
    Vue.nextTick(() => {
      expect(mockConfirmWith.mock.calls.length).toBe(1);
      done();
    });
  });

  it('re-adds block if either prop changes', done => {
    const confirm1 = jest.fn();
    const confirm2 = jest.fn();

    const wrapper = shallow(Block, {
      localVue: Vue,
      propsData: {
        active: true,
        confirm1
      }
    });
    expect(mockConfirmWith.mock.calls.length).toBe(1);
    wrapper.vm.confirm = confirm2;
    Vue.nextTick(() => {
      expect(mockConfirmWith.mock.calls.length).toBe(2);
      done();
    });
  });

  it('unblocks before destroying', () => {
    const confirm = jest.fn();
    const wrapper = shallow(Block, {
      localVue: Vue,
      propsData: {
        active: true,
        confirm
      }
    });
    expect(mockRemoveConfirmation.mock.calls.length).toBe(0);
    wrapper.vm.$destroy();
    expect(mockRemoveConfirmation.mock.calls.length).toBe(1);
  });
});
