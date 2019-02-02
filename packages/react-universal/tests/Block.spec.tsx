import "jest";
import React from "react";
import ReactDOM from "react-dom";
import { curi, prepareRoutes } from "@curi/router";
import InMemory from "@hickory/in-memory";

import wait from "./utils/wait";

// @ts-ignore (resolved by jest)
import { curiProvider, Block } from "@curi/react-universal";

// TODO: Determine which tests can be removed because the behavior
// is already tested in the useBlock tests.

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
  const routes = prepareRoutes([{ name: "Catch All", path: "(.*)" }]);
  const router = curi(history, routes);
  const Router = curiProvider(router);

  beforeEach(() => {
    node = document.createElement("div");
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
    confirmWith.mockClear();
    removeConfirmation.mockClear();
  });

  it("if active=true when mounting, adds block", async () => {
    const confirm = jest.fn();
    ReactDOM.render(
      <Router>
        <Block active={true} confirm={confirm} />
      </Router>,
      node
    );

    await wait(15);

    expect(confirmWith.mock.calls.length).toBe(1);
    expect(confirmWith.mock.calls[0][0]).toBe(confirm);
  });

  it("defaults to active=true", async () => {
    const confirm = jest.fn();
    ReactDOM.render(
      <Router>
        <Block confirm={confirm} />
      </Router>,
      node
    );

    await wait(15);

    expect(confirmWith.mock.calls.length).toBe(1);
    expect(confirmWith.mock.calls[0][0]).toBe(confirm);
  });

  it("if active=false when mounting, does not add block", async () => {
    const confirm = jest.fn();
    ReactDOM.render(
      <Router>
        <Block active={false} confirm={confirm} />
      </Router>,
      node
    );

    await wait(15);

    expect(confirmWith.mock.calls.length).toBe(0);
  });

  it("removes block if active goes true->false while updating", async () => {
    const confirm = jest.fn();

    ReactDOM.render(
      <Router>
        <Block active={true} confirm={confirm} />
      </Router>,
      node
    );

    await wait(15);

    expect(removeConfirmation.mock.calls.length).toBe(0);

    ReactDOM.render(
      <Router>
        <Block active={false} confirm={confirm} />
      </Router>,
      node
    );

    await wait(15);

    expect(removeConfirmation.mock.calls.length).toBe(1);
  });

  it("adds block if active goes false->true while updating", async () => {
    const confirm = jest.fn();

    ReactDOM.render(
      <Router>
        <Block active={false} confirm={confirm} />
      </Router>,
      node
    );

    await wait(15);

    expect(confirmWith.mock.calls.length).toBe(0);

    ReactDOM.render(
      <Router>
        <Block active={true} confirm={confirm} />
      </Router>,
      node
    );

    await wait(15);

    expect(confirmWith.mock.calls.length).toBe(1);
  });

  it("resets block on updates if confirm function changes", async () => {
    const confirm = jest.fn();
    const confirm2 = jest.fn();

    ReactDOM.render(
      <Router>
        <Block active={true} confirm={confirm} />
      </Router>,
      node
    );

    await wait(15);

    expect(confirmWith.mock.calls.length).toBe(1);
    expect(removeConfirmation.mock.calls.length).toBe(0);

    ReactDOM.render(
      <Router>
        <Block active={true} confirm={confirm2} />
      </Router>,
      node
    );

    await wait(15);

    expect(confirmWith.mock.calls.length).toBe(2);
    expect(removeConfirmation.mock.calls.length).toBe(1);
  });

  it("does not reset block if both active and confirm stay the same", async () => {
    const confirm = jest.fn();
    ReactDOM.render(
      <Router>
        <Block active={true} confirm={confirm} />
      </Router>,
      node
    );

    await wait(15);

    expect(confirmWith.mock.calls.length).toBe(1);
    expect(removeConfirmation.mock.calls.length).toBe(0);
    ReactDOM.render(
      <Router>
        <Block active={true} confirm={confirm} />
      </Router>,
      node
    );

    await wait(15);

    expect(confirmWith.mock.calls.length).toBe(1);
    expect(removeConfirmation.mock.calls.length).toBe(0);
  });

  it("unblocks when unmounting", async () => {
    const confirm = jest.fn();
    ReactDOM.render(
      <Router>
        <Block active={true} confirm={confirm} />
      </Router>,
      node
    );

    await wait(15);

    expect(removeConfirmation.mock.calls.length).toBe(0);
    ReactDOM.unmountComponentAtNode(node);

    await wait(15);

    expect(removeConfirmation.mock.calls.length).toBe(1);
  });
});
