import "jest";
import React from "react";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";

import curi from "@curi/core";
import InMemory from "@hickory/in-memory";
import CuriProvider from "../src/CuriProvider";
import Block from "../src/Block";

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
    router.respond(() => {
      const wrapper = render(router, () => (
        <Block active={true} confirm={confirm} />
      ));
      expect(confirmWith.mock.calls.length).toBe(1);
      expect(confirmWith.mock.calls[0][0]).toBe(confirm);
      done();
    });
  });

  it("defaults to active=true", done => {
    const confirm = jest.fn();
    router.respond(() => {
      const wrapper = render(router, () => <Block confirm={confirm} />);
      expect(confirmWith.mock.calls.length).toBe(1);
      expect(confirmWith.mock.calls[0][0]).toBe(confirm);
      done();
    });
  });

  it("if active=false when mounting, does not add block", done => {
    const confirm = jest.fn();
    router.respond(() => {
      const wrapper = render(router, () => (
        <Block active={false} confirm={confirm} />
      ));
      expect(confirmWith.mock.calls.length).toBe(0);
      done();
    });
  });

  it("removes block if active goes true->false while updating", done => {
    const confirm = jest.fn();
    router.respond(() => {
      const tree = renderer.create(
        <CuriProvider router={router}>
          {() => <Block active={true} confirm={confirm} />}
        </CuriProvider>
      );
      expect(removeConfirmation.mock.calls.length).toBe(0);
      tree.update(
        <CuriProvider router={router}>
          {() => <Block active={false} confirm={confirm} />}
        </CuriProvider>
      );
      expect(removeConfirmation.mock.calls.length).toBe(1);
      done();
    });
  });

  it("adds block if active goes false->true while updating", done => {
    const confirm = jest.fn();
    router.respond(() => {
      const tree = renderer.create(
        <CuriProvider router={router}>
          {() => <Block active={false} confirm={confirm} />}
        </CuriProvider>
      );
      expect(confirmWith.mock.calls.length).toBe(0);
      tree.update(
        <CuriProvider router={router}>
          {() => <Block active={true} confirm={confirm} />}
        </CuriProvider>
      );
      expect(confirmWith.mock.calls.length).toBe(1);
      done();
    });
  });

  it("resets block on updates if confirm function changes", done => {
    const confirm = jest.fn();
    const confirm2 = jest.fn();
    router.respond(() => {
      const tree = renderer.create(
        <CuriProvider router={router}>
          {() => <Block active={true} confirm={confirm} />}
        </CuriProvider>
      );
      expect(confirmWith.mock.calls.length).toBe(1);
      expect(removeConfirmation.mock.calls.length).toBe(0);
      tree.update(
        <CuriProvider router={router}>
          {() => <Block active={true} confirm={confirm2} />}
        </CuriProvider>
      );
      expect(confirmWith.mock.calls.length).toBe(2);
      expect(removeConfirmation.mock.calls.length).toBe(1);

      done();
    });
  });

  it("does not reset block if both active and confirm stay the same", done => {
    const confirm = jest.fn();
    router.respond(() => {
      const tree = renderer.create(
        <CuriProvider router={router}>
          {() => <Block active={true} confirm={confirm} />}
        </CuriProvider>
      );

      expect(confirmWith.mock.calls.length).toBe(1);
      expect(removeConfirmation.mock.calls.length).toBe(0);
      tree.update(
        <CuriProvider router={router}>
          {() => <Block active={true} confirm={confirm} />}
        </CuriProvider>
      );
      expect(confirmWith.mock.calls.length).toBe(1);
      expect(removeConfirmation.mock.calls.length).toBe(0);
      done();
    });
  });

  it("unblocks when unmounting", done => {
    const confirm = jest.fn();
    router.respond(() => {
      const wrapper = render(router, () => (
        <Block active={true} confirm={confirm} />
      ));
      expect(removeConfirmation.mock.calls.length).toBe(0);
      wrapper.unmount();
      expect(removeConfirmation.mock.calls.length).toBe(1);
      done();
    });
  });
});
