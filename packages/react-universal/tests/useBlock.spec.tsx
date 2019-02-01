import "jest";
import React from "react";
import ReactDOM from "react-dom";
import InMemory from "@hickory/in-memory";
import { curi, prepareRoutes } from "@curi/router";

// @ts-ignore (resolved by jest)
import { curiProvider, useBlock } from "@curi/react-universal";

describe("useBlock", () => {
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

  it("if active=true when mounting, adds block", () => {
    const confirm = jest.fn();

    function Blocker() {
      const result = useBlock(true, confirm);
      return null;
    }
    ReactDOM.render(<Router>{() => <Blocker />}</Router>, node);

    expect(confirmWith.mock.calls.length).toBe(1);
    expect(confirmWith.mock.calls[0][0]).toBe(confirm);
  });

  it("if active=false when mounting, does not add block", () => {
    const confirm = jest.fn();
    function Blocker() {
      const result = useBlock(false, confirm);
      return null;
    }
    ReactDOM.render(<Router>{() => <Blocker />}</Router>, node);
    expect(confirmWith.mock.calls.length).toBe(0);
  });

  it("removes block if active goes true->false while updating", () => {
    const confirm = jest.fn();

    function Blocker(props) {
      const result = useBlock(props.block, confirm);
      return null;
    }
    ReactDOM.render(<Router>{() => <Blocker block={true} />}</Router>, node);

    expect(removeConfirmation.mock.calls.length).toBe(0);

    ReactDOM.render(<Router>{() => <Blocker block={false} />}</Router>, node);
    expect(removeConfirmation.mock.calls.length).toBe(1);
  });

  it("adds block if active goes false->true while updating", () => {
    const confirm = jest.fn();

    function Blocker(props) {
      const result = useBlock(props.block, confirm);
      return null;
    }

    ReactDOM.render(<Router>{() => <Blocker active={false} />}</Router>, node);

    expect(confirmWith.mock.calls.length).toBe(0);

    ReactDOM.render(<Router>{() => <Blocker block={true} />}</Router>, node);

    expect(confirmWith.mock.calls.length).toBe(1);
  });

  it("resets block on updates if confirm function changes", () => {
    const confirm = jest.fn();
    const confirm2 = jest.fn();

    function Blocker(props) {
      const result = useBlock(true, props.confirm);
      return null;
    }

    ReactDOM.render(
      <Router>{() => <Blocker confirm={confirm} />}</Router>,
      node
    );

    expect(confirmWith.mock.calls.length).toBe(1);
    expect(removeConfirmation.mock.calls.length).toBe(0);

    ReactDOM.render(
      <Router>{() => <Blocker confirm={confirm2} />}</Router>,
      node
    );

    expect(confirmWith.mock.calls.length).toBe(2);
    expect(removeConfirmation.mock.calls.length).toBe(1);
  });

  it("does not reset block if both active and confirm stay the same", () => {
    const confirm = jest.fn();

    function Blocker(props) {
      const result = useBlock(true, confirm);
      return null;
    }

    ReactDOM.render(<Router>{() => <Blocker />}</Router>, node);

    expect(confirmWith.mock.calls.length).toBe(1);
    expect(removeConfirmation.mock.calls.length).toBe(0);

    ReactDOM.render(<Router>{() => <Blocker />}</Router>, node);

    expect(confirmWith.mock.calls.length).toBe(1);
    expect(removeConfirmation.mock.calls.length).toBe(0);
  });

  it("unblocks when unmounting", () => {
    const confirm = jest.fn();
    function Blocker(props) {
      const result = useBlock(true, confirm);
      return null;
    }

    ReactDOM.render(<Router>{() => <Blocker />}</Router>, node);
    expect(removeConfirmation.mock.calls.length).toBe(0);
    ReactDOM.unmountComponentAtNode(node);
    expect(removeConfirmation.mock.calls.length).toBe(1);
  });
});
