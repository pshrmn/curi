import "jest";
import React from "react";
import ReactDOM from "react-dom";
import InMemory from "@hickory/in-memory";
import curi from "@curi/router";

import Focus from "../src/Focus";
import CuriProvider from "../src/CuriProvider";

describe("<Focus>", () => {
  let node;
  let history, router;
  const routes = [{ name: "Home", path: "" }, { name: "About", path: "about" }];

  beforeEach(() => {
    node = document.createElement("div");
    document.body.appendChild(node);
    history = InMemory();
    router = curi(history, routes);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
    document.body.removeChild(node);
  });

  it("focuses when mounting", () => {
    ReactDOM.render(
      <CuriProvider router={router}>
        {() => (
          <Focus>
            {ref => (
              <div id="test" tabIndex={-1} ref={ref}>
                Testing!
              </div>
            )}
          </Focus>
        )}
      </CuriProvider>,
      node
    );
    const wrapper = document.querySelector("#test");
    const focused = document.activeElement;
    expect(focused).toBe(wrapper);
  });

  it("does not re-focus for regular re-renders", () => {
    ReactDOM.render(
      <CuriProvider router={router}>
        {() => (
          <Focus>
            {ref => (
              <div id="test" tabIndex={-1} ref={ref}>
                <input type="text" />
              </div>
            )}
          </Focus>
        )}
      </CuriProvider>,
      node
    );
    const wrapper = document.querySelector("#test");
    const initialFocus = document.activeElement;
    expect(initialFocus).toBe(wrapper);

    const input = document.querySelector("input");
    // steal the focus
    input.focus();
    const stolenFocus = document.activeElement;
    expect(stolenFocus).toBe(input);

    ReactDOM.render(
      <CuriProvider router={router}>
        {() => (
          <Focus>
            {ref => (
              <div id="test" ref={ref}>
                <input type="number" />
              </div>
            )}
          </Focus>
        )}
      </CuriProvider>,
      node
    );
    expect(stolenFocus).toBe(input);
  });

  it("re-focuses for new response re-renders", () => {
    ReactDOM.render(
      <CuriProvider router={router}>
        {() => (
          <Focus>
            {ref => (
              <div id="test" tabIndex={-1} ref={ref}>
                <input type="text" />
              </div>
            )}
          </Focus>
        )}
      </CuriProvider>,
      node
    );
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

    const postNavFocus = document.activeElement;

    expect(wrapper).toBe(postNavFocus);
  });

  describe("tabIndex", () => {
    it("warns when ref element does not have a tabIndex attribute", () => {
      const realWarn = console.error;
      const fakeWarn = (console.error = jest.fn());

      ReactDOM.render(
        <CuriProvider router={router}>
          {() => (
            <Focus>
              {ref => (
                <div id="test" ref={ref}>
                  <input type="text" />
                </div>
              )}
            </Focus>
          )}
        </CuriProvider>,
        node
      );
      expect(fakeWarn.mock.calls.length).toBe(1);
      console.error = realWarn;
    });

    it("does not warn when ref element does not have a tabIndex attribute, but ele is already focusable", () => {
      const realWarn = console.error;
      const fakeWarn = (console.error = jest.fn());

      ReactDOM.render(
        <CuriProvider router={router}>
          {() => (
            <Focus>
              {ref => (
                <div id="test">
                  <input type="text" ref={ref} />
                </div>
              )}
            </Focus>
          )}
        </CuriProvider>,
        node
      );
      expect(fakeWarn.mock.calls.length).toBe(0);
      console.error = realWarn;
    });
  });
});
