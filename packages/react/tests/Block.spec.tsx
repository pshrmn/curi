import "jest";
import React from "react";
import ReactDOM from "react-dom";

import { curi } from "@curi/router";
import InMemory from "@hickory/in-memory";

// resolved by jest
import { CuriProvider, Block } from "@curi/react";

describe("Block", () => {
  let confirmationFunction;
  let node;
  const confirmWith = jest.fn(fn => {
    confirmationFunction = fn;
  });
  const removeConfirmation = jest.fn();

  const history = InMemory();
  // overwrite with jest
  history.confirmWith = confirmWith;
  history.removeConfirmation = removeConfirmation;
  const router = curi(history, [{ name: "Catch All", path: "(.*)" }]);

  beforeEach(() => {
    node = document.createElement("div");
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
    confirmWith.mockClear();
    removeConfirmation.mockClear();
  });

  it("if active=true when mounting, adds block", () => {
    const confirm = jest.fn();
    ReactDOM.render(
      <CuriProvider router={router}>
        {() => <Block active={true} confirm={confirm} />}
      </CuriProvider>,
      node
    );
    expect(confirmWith.mock.calls.length).toBe(1);
    expect(confirmWith.mock.calls[0][0]).toBe(confirm);
  });

  it("defaults to active=true", () => {
    const confirm = jest.fn();
    ReactDOM.render(
      <CuriProvider router={router}>
        {() => <Block confirm={confirm} />}
      </CuriProvider>,
      node
    );
    expect(confirmWith.mock.calls.length).toBe(1);
    expect(confirmWith.mock.calls[0][0]).toBe(confirm);
  });

  it("if active=false when mounting, does not add block", () => {
    const confirm = jest.fn();
    ReactDOM.render(
      <CuriProvider router={router}>
        {() => <Block active={false} confirm={confirm} />}
      </CuriProvider>,
      node
    );
    expect(confirmWith.mock.calls.length).toBe(0);
  });

  it("removes block if active goes true->false while updating", () => {
    const confirm = jest.fn();

    ReactDOM.render(
      <CuriProvider router={router}>
        {() => <Block active={true} confirm={confirm} />}
      </CuriProvider>,
      node
    );
    expect(removeConfirmation.mock.calls.length).toBe(0);

    ReactDOM.render(
      <CuriProvider router={router}>
        {() => <Block active={false} confirm={confirm} />}
      </CuriProvider>,
      node
    );
    expect(removeConfirmation.mock.calls.length).toBe(1);
  });

  it("adds block if active goes false->true while updating", () => {
    const confirm = jest.fn();

    ReactDOM.render(
      <CuriProvider router={router}>
        {() => <Block active={false} confirm={confirm} />}
      </CuriProvider>,
      node
    );
    expect(confirmWith.mock.calls.length).toBe(0);

    ReactDOM.render(
      <CuriProvider router={router}>
        {() => <Block active={true} confirm={confirm} />}
      </CuriProvider>,
      node
    );
    expect(confirmWith.mock.calls.length).toBe(1);
  });

  it("resets block on updates if confirm function changes", () => {
    const confirm = jest.fn();
    const confirm2 = jest.fn();

    ReactDOM.render(
      <CuriProvider router={router}>
        {() => <Block active={true} confirm={confirm} />}
      </CuriProvider>,
      node
    );
    expect(confirmWith.mock.calls.length).toBe(1);
    expect(removeConfirmation.mock.calls.length).toBe(0);

    ReactDOM.render(
      <CuriProvider router={router}>
        {() => <Block active={true} confirm={confirm2} />}
      </CuriProvider>,
      node
    );
    expect(confirmWith.mock.calls.length).toBe(2);
    expect(removeConfirmation.mock.calls.length).toBe(1);
  });

  it("does not reset block if both active and confirm stay the same", () => {
    const confirm = jest.fn();
    ReactDOM.render(
      <CuriProvider router={router}>
        {() => <Block active={true} confirm={confirm} />}
      </CuriProvider>,
      node
    );

    expect(confirmWith.mock.calls.length).toBe(1);
    expect(removeConfirmation.mock.calls.length).toBe(0);
    ReactDOM.render(
      <CuriProvider router={router}>
        {() => <Block active={true} confirm={confirm} />}
      </CuriProvider>,
      node
    );

    expect(confirmWith.mock.calls.length).toBe(1);
    expect(removeConfirmation.mock.calls.length).toBe(0);
  });

  it("unblocks when unmounting", () => {
    const confirm = jest.fn();
    ReactDOM.render(
      <CuriProvider router={router}>
        {() => <Block active={true} confirm={confirm} />}
      </CuriProvider>,
      node
    );
    expect(removeConfirmation.mock.calls.length).toBe(0);
    ReactDOM.unmountComponentAtNode(node);
    expect(removeConfirmation.mock.calls.length).toBe(1);
  });
});
