import "jest";
import React from "react";
import { shallow, mount } from "enzyme";
import Block from "../src/Block";
import curi from "@curi/core";
import InMemory from "@hickory/in-memory";

import CuriProvider from "../src/CuriProvider";

function render(router, fn) {
  return mount(<CuriProvider router={router}>{fn}</CuriProvider>);
}

describe("Block", () => {
  let confirmationFunction;
  const confirmWith = jest.fn(fn => {
    confirmationFunction = fn;
  });
  const removeConfirmation = jest.fn();

  const history = InMemory();
  // overwrite with jest
  history.confirmWith = confirmWith;
  history.removeConfirmation = removeConfirmation;
  const router = curi(history, []);
  const fakeContext = {
    curi: { router }
  };

  afterEach(() => {
    confirmWith.mockClear();
    removeConfirmation.mockClear();
  });

  it("if active=true when mounting, adds block", done => {
    const confirm = jest.fn();
    router.respond(
      () => {
        const wrapper = render(router, () => (
          <Block active={true} confirm={confirm} />
        ));
        expect(confirmWith.mock.calls.length).toBe(1);
        expect(confirmWith.mock.calls[0][0]).toBe(confirm);
        done();
      },
      { once: true }
    );
  });

  it("defaults to active=true", done => {
    const confirm = jest.fn();
    router.respond(
      () => {
        const wrapper = render(router, () => <Block confirm={confirm} />);
        expect(confirmWith.mock.calls.length).toBe(1);
        expect(confirmWith.mock.calls[0][0]).toBe(confirm);
        done();
      },
      { once: true }
    );
  });

  it("if active=false when mounting, does not add block", done => {
    const confirm = jest.fn();
    router.respond(
      () => {
        const wrapper = render(router, () => (
          <Block active={false} confirm={confirm} />
        ));
        expect(confirmWith.mock.calls.length).toBe(0);
        done();
      },
      { once: true }
    );
  });

  it.skip("removes block if active goes true->false while updating", done => {
    // need to figure out how to set props
    const confirm = jest.fn();
    router.respond(
      () => {
        const wrapper = render(router, () => (
          <Block active={true} confirm={confirm} />
        ));
        expect(removeConfirmation.mock.calls.length).toBe(0);
        wrapper.setProps({ active: false });
        expect(removeConfirmation.mock.calls.length).toBe(1);
        done();
      },
      { once: true }
    );
  });

  it.skip("adds block if active goes false->true while updating", done => {
    const confirm = jest.fn();
    router.respond(
      () => {
        const wrapper = render(router, () => (
          <Block active={false} confirm={confirm} />
        ));
        expect(confirmWith.mock.calls.length).toBe(0);
        wrapper.setProps({ active: true });
        expect(confirmWith.mock.calls.length).toBe(1);
        done();
      },
      { once: true }
    );
  });

  it.skip("resets on block on updates if confirm function", done => {
    const confirm = jest.fn();
    const confirm2 = jest.fn();
    router.respond(
      () => {
        const wrapper = render(router, () => (
          <Block active={true} confirm={confirm} />
        ));
        expect(confirmWith.mock.calls.length).toBe(1);
        expect(removeConfirmation.mock.calls.length).toBe(0);
        wrapper.setProps({ active: true, confirm: confirm2 });
        expect(confirmWith.mock.calls.length).toBe(2);
        expect(removeConfirmation.mock.calls.length).toBe(1);

        done();
      },
      { once: true }
    );
  });

  it.skip("does not reset block if both active and message stay the same", done => {
    const confirm = jest.fn();
    router.respond(
      () => {
        const wrapper = render(router, () => (
          <Block active={true} confirm={confirm} />
        ));
        expect(confirmWith.mock.calls.length).toBe(1);
        expect(removeConfirmation.mock.calls.length).toBe(0);
        wrapper.setProps({ active: true, message: "This is a test" });
        expect(confirmWith.mock.calls.length).toBe(1);
        expect(removeConfirmation.mock.calls.length).toBe(0);
        done();
      },
      { once: true }
    );
  });

  it("unblocks when unmounting", done => {
    const confirm = jest.fn();
    router.respond(
      () => {
        const wrapper = render(router, () => (
          <Block active={true} confirm={confirm} />
        ));
        expect(removeConfirmation.mock.calls.length).toBe(0);
        wrapper.unmount();
        expect(removeConfirmation.mock.calls.length).toBe(1);
        done();
      },
      { once: true }
    );
  });
});
