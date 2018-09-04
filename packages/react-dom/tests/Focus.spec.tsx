import "jest";
import React from "react";
import ReactDOM from "react-dom";
import InMemory from "@hickory/in-memory";
import { curi } from "@curi/router";

// resolved by jest
import { curiProvider, Focus } from "@curi/react-dom";

jest.useFakeTimers();

describe("<Focus>", () => {
  let node;
  let history, router, Router;
  const routes = [{ name: "Home", path: "" }, { name: "About", path: "about" }];

  beforeEach(() => {
    node = document.createElement("div");
    document.body.appendChild(node);
    history = InMemory();
    router = curi(history, routes);
    Router = curiProvider(router);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
    document.body.removeChild(node);
  });

  it("focuses when mounting", () => {
    ReactDOM.render(
      <Router>
        {() => (
          <Focus>
            {ref => (
              <div id="test" tabIndex={-1} ref={ref}>
                Testing!
              </div>
            )}
          </Focus>
        )}
      </Router>,
      node
    );
    jest.runAllTimers();
    const wrapper = document.querySelector("#test");
    const focused = document.activeElement;
    expect(focused).toBe(wrapper);
  });

  it("does not re-focus for regular re-renders", () => {
    ReactDOM.render(
      <Router>
        {() => (
          <Focus>
            {ref => (
              <div id="test" tabIndex={-1} ref={ref}>
                <input type="text" />
              </div>
            )}
          </Focus>
        )}
      </Router>,
      node
    );

    jest.runAllTimers();

    const wrapper = document.querySelector("#test");
    const initialFocus = document.activeElement;
    expect(initialFocus).toBe(wrapper);

    const input = document.querySelector("input");
    // steal the focus
    input.focus();
    const stolenFocus = document.activeElement;
    expect(stolenFocus).toBe(input);

    ReactDOM.render(
      <Router>
        {() => (
          <Focus>
            {ref => (
              <div id="test" ref={ref}>
                <input type="number" />
              </div>
            )}
          </Focus>
        )}
      </Router>,
      node
    );

    jest.runAllTimers();

    expect(stolenFocus).toBe(input);
  });

  it("re-focuses for new response re-renders", () => {
    ReactDOM.render(
      <Router>
        {() => (
          <Focus>
            {ref => (
              <div id="test" tabIndex={-1} ref={ref}>
                <input type="text" />
              </div>
            )}
          </Focus>
        )}
      </Router>,
      node
    );

    jest.runAllTimers();

    const input = document.querySelector("input");
    const wrapper = input.parentElement;
    const initialFocused = document.activeElement;

    expect(wrapper).toBe(initialFocused);

    // steal the focus
    input.focus();
    const stolenFocus = document.activeElement;
    expect(input).toBe(stolenFocus);

    // navigate and verify wrapper is re-focused
    router.navigate({ name: "About" });

    jest.runAllTimers();

    const postNavFocus = document.activeElement;

    expect(wrapper).toBe(postNavFocus);
  });

  describe("preventScroll", () => {
    const realFocus = HTMLElement.prototype.focus;
    let fakeFocus;

    beforeEach(() => {
      fakeFocus = HTMLElement.prototype.focus = jest.fn();
    });

    afterEach(() => {
      fakeFocus.mockReset();
      HTMLElement.prototype.focus = realFocus;
    });

    it("calls focus({ preventScroll: false }} when not provided", () => {
      ReactDOM.render(
        <Router>
          {() => (
            <Focus>
              {ref => (
                <div id="test" tabIndex={-1} ref={ref}>
                  <input type="text" />
                </div>
              )}
            </Focus>
          )}
        </Router>,
        node
      );
      jest.runAllTimers();
      expect(fakeFocus.mock.calls[0][0]).toMatchObject({
        preventScroll: false
      });
    });

    it("calls focus({ preventScroll: true }} when preventScroll = true", () => {
      ReactDOM.render(
        <Router>
          {() => (
            <Focus preventScroll={true}>
              {ref => (
                <div id="test" tabIndex={-1} ref={ref}>
                  <input type="text" />
                </div>
              )}
            </Focus>
          )}
        </Router>,
        node
      );
      jest.runAllTimers();
      expect(fakeFocus.mock.calls[0][0]).toMatchObject({ preventScroll: true });
    });

    it("calls focus({ preventScroll: false }} when preventScroll = false", () => {
      ReactDOM.render(
        <Router>
          {() => (
            <Focus preventScroll={false}>
              {ref => (
                <div id="test" tabIndex={-1} ref={ref}>
                  <input type="text" />
                </div>
              )}
            </Focus>
          )}
        </Router>,
        node
      );
      jest.runAllTimers();
      expect(fakeFocus.mock.calls[0][0]).toMatchObject({
        preventScroll: false
      });
    });
  });

  describe("tabIndex", () => {
    it("warns when ref element does not have a tabIndex attribute", () => {
      const realWarn = console.warn;
      const fakeWarn = (console.warn = jest.fn());

      ReactDOM.render(
        <Router>
          {() => (
            <Focus>
              {ref => (
                <div id="test" ref={ref}>
                  <input type="text" />
                </div>
              )}
            </Focus>
          )}
        </Router>,
        node
      );
      expect(fakeWarn.mock.calls.length).toBe(1);
      console.warn = realWarn;
    });

    it("does not warn when ref element does not have a tabIndex attribute, but ele is already focusable", () => {
      const realWarn = console.warn;
      const fakeWarn = (console.warn = jest.fn());

      ReactDOM.render(
        <Router>
          {() => (
            <Focus>
              {ref => (
                <div id="test">
                  <input type="text" ref={ref} />
                </div>
              )}
            </Focus>
          )}
        </Router>,
        node
      );
      expect(fakeWarn.mock.calls.length).toBe(0);
      console.warn = realWarn;
    });
  });
});
