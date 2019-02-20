import "jest";
import { createLocalVue } from "@vue/test-utils";
import { InMemory } from "@hickory/in-memory";
import { curi, prepareRoutes } from "@curi/router";

// @ts-ignore (resolved by jest)
import { CuriPlugin } from "@curi/vue";

describe("<curi-block>", () => {
  const history = InMemory();
  const mockConfirmWith = jest.fn();
  const mockRemoveConfirmation = jest.fn();
  history.confirmWith = mockConfirmWith;
  history.removeConfirmation = mockRemoveConfirmation;

  const routes = prepareRoutes([
    { name: "Place", path: "place/:name" },
    { name: "Catch All", path: "(.*)" }
  ]);
  const router = curi(history, routes);

  const Vue = createLocalVue();
  Vue.use(CuriPlugin, { router });

  let node;
  beforeEach(() => {
    node = document.createElement("div");
  });

  afterEach(() => {
    mockConfirmWith.mockReset();
    mockRemoveConfirmation.mockReset();
  });

  it("renders nothing", () => {
    const wrapper = new Vue({
      template: `<curi-block :active="active" :confirm="confirm" />`,
      el: node,
      data: {
        active: true,
        confirm: (data, s, f) => {
          s();
        }
      }
    });
    expect(node.textContent).toBe("");
  });

  it("if active=true when mounting, adds block", () => {
    const confirm = jest.fn();
    const wrapper = new Vue({
      template: `<curi-block :active="active" :confirm="confirm" />`,
      el: node,
      data: {
        active: true,
        confirm
      }
    });
    expect(mockConfirmWith.mock.calls.length).toBe(1);
    expect(mockConfirmWith.mock.calls[0][0]).toBe(confirm);
  });

  it("defaults to active=true", () => {
    const confirm = jest.fn();
    const wrapper = new Vue({
      template: `<curi-block :confirm="confirm" />`,
      el: node,
      data: {
        confirm
      }
    });
    expect(mockConfirmWith.mock.calls.length).toBe(1);
    expect(mockConfirmWith.mock.calls[0][0]).toBe(confirm);
  });

  it("if active=false when mounting, does not add block", () => {
    const confirm = jest.fn();
    const wrapper = new Vue({
      template: `<curi-block :active="active" :confirm="confirm" />`,
      el: node,
      data: {
        active: false,
        confirm
      }
    });
    expect(mockConfirmWith.mock.calls.length).toBe(0);
  });

  it("removes block if active goes true->false while updating", done => {
    const confirm = jest.fn();
    const wrapper = new Vue({
      template: `<curi-block :active="active" :confirm="confirm" />`,
      el: node,
      data: {
        active: true,
        confirm
      }
    });
    expect(mockRemoveConfirmation.mock.calls.length).toBe(0);
    wrapper.active = false;
    Vue.nextTick(() => {
      expect(mockRemoveConfirmation.mock.calls.length).toBe(1);
      done();
    });
  });

  it("adds block if active goes false->true while updating", done => {
    const confirm = jest.fn();
    const wrapper = new Vue({
      template: `<curi-block :active="active" :confirm="confirm" />`,
      el: node,
      data: {
        active: false,
        confirm
      }
    });
    expect(mockConfirmWith.mock.calls.length).toBe(0);
    wrapper.active = true;
    Vue.nextTick(() => {
      expect(mockConfirmWith.mock.calls.length).toBe(1);
      done();
    });
  });

  it("re-adds block if either prop changes", done => {
    const confirm1 = jest.fn();
    const confirm2 = jest.fn();
    const wrapper = new Vue({
      template: `<curi-block :active="active" :confirm="confirm" />`,
      el: node,
      data: {
        active: true,
        confirm: confirm1
      }
    });

    expect(mockConfirmWith.mock.calls.length).toBe(1);
    wrapper.confirm = confirm2;
    Vue.nextTick(() => {
      expect(mockConfirmWith.mock.calls.length).toBe(2);
      done();
    });
  });

  it("unblocks before destroying", () => {
    const confirm = jest.fn();
    const wrapper = new Vue({
      template: `<curi-block :active="active" :confirm="confirm" />`,
      el: node,
      data: {
        active: false,
        confirm
      }
    });
    expect(mockRemoveConfirmation.mock.calls.length).toBe(0);
    wrapper.$destroy();
    expect(mockRemoveConfirmation.mock.calls.length).toBe(1);
  });
});
