import "jest";
import React from "react";
import ReactDOM from "react-dom";
import InMemory from "@hickory/in-memory";
import curi from "@curi/core";

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
            <span id="child">Testing!</span>
          </Focus>
        )}
      </CuriProvider>,
      node
    );
    const span = document.querySelector("#child");
    const wrapper = span.parentElement;
    const focused = document.activeElement;
    expect(wrapper).toBe(focused);
  });

  it("does not re-focus for regular re-renders", () => {
    ReactDOM.render(
      <CuriProvider router={router}>
        {() => (
          <Focus>
            <input type="text" />
          </Focus>
        )}
      </CuriProvider>,
      node
    );
    const input = document.querySelector("input");
    // steal the focus
    input.focus();
    const focused = document.activeElement;
    expect(input).toBe(focused);

    ReactDOM.render(
      <CuriProvider router={router}>
        {() => (
          <Focus>
            <input type="number" />
          </Focus>
        )}
      </CuriProvider>,
      node
    );
    expect(input).toBe(focused);
  });

  it("re-focuses for new response re-renders", () => {
    ReactDOM.render(
      <CuriProvider router={router}>
        {() => (
          <Focus>
            <input type="text" />
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

  describe("component", () => {
    it("renders a <div> by default", () => {
      ReactDOM.render(
        <CuriProvider router={router}>
          {() => (
            <Focus>
              <input type="text" />
            </Focus>
          )}
        </CuriProvider>,
        node
      );
      const input = document.querySelector("input");
      const wrapper = input.parentElement;
      expect(wrapper.tagName).toBe("DIV");
    });

    it("uses provided component type as wrapper", () => {
      ReactDOM.render(
        <CuriProvider router={router}>
          {() => (
            <Focus component="main">
              <input type="text" />
            </Focus>
          )}
        </CuriProvider>,
        node
      );
      const input = document.querySelector("input");
      const wrapper = input.parentElement;
      expect(wrapper.tagName).toBe("MAIN");
    });
  });

  describe("other props", () => {
    it("passes on other props to the focus wrapper", () => {
      ReactDOM.render(
        <CuriProvider router={router}>
          {() => (
            <Focus id="yo" className="ahoy">
              <input type="text" />
            </Focus>
          )}
        </CuriProvider>,
        node
      );
      const input = document.querySelector("input");
      const wrapper = input.parentElement;
      expect(wrapper.getAttribute("id")).toBe("yo");
      expect(wrapper.className).toBe("ahoy");
    });
  });
});
