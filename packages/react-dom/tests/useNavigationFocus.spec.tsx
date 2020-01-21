import "jest";
import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { inMemory } from "@hickory/in-memory";
import { createRouter, prepareRoutes } from "@curi/router";

import {
  createRouterComponent,
  useNavigationFocus,
  useResponse
} from "@curi/react-dom";

describe("useNavigationFocus", () => {
  let node;
  let router, Router;
  let routes = prepareRoutes([
    { name: "Home", path: "" },
    { name: "About", path: "about" }
  ]);

  beforeEach(() => {
    node = document.createElement("div");
    document.body.appendChild(node);
    router = createRouter(inMemory, routes);
    Router = createRouterComponent(router);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
    document.body.removeChild(node);
  });

  describe("mounting", () => {
    it("focuses ref when mounting", () => {
      function Focuser() {
        let ref = React.useRef(null);
        useNavigationFocus(ref);
        return <div id="test" tabIndex={-1} ref={ref} />;
      }

      act(() => {
        ReactDOM.render(
          <Router>
            <Focuser />
          </Router>,
          node
        );
      });

      let wrapper = document.querySelector("#test");
      let focused = document.activeElement;
      expect(focused).toBe(wrapper);
    });

    it("warns if ref isn't attached to an element (body focused)", () => {
      let realWarn = console.warn;
      let fakeWarn = (console.warn = jest.fn());

      let routes = prepareRoutes([
        {
          name: "Home",
          path: ""
        }
      ]);

      let router = createRouter(inMemory, routes);
      let Router = createRouterComponent(router);

      function Focuser() {
        let ref = React.useRef(null);
        useNavigationFocus(ref);
        return <div id="test" tabIndex={-1} />;
      }

      act(() => {
        ReactDOM.render(
          <Router>
            <Focuser />
          </Router>,
          node
        );
      });

      expect(document.activeElement).toBe(document.body);
      expect(fakeWarn.mock.calls[0][0]).toBe(
        "There is no element to focus. Did you forget to add the ref to an element?"
      );
      console.warn = realWarn;
    });
  });

  describe("updates", () => {
    it("does not re-focus ref for regular re-renders", () => {
      function Focuser({ children }) {
        let ref = React.useRef(null);
        useNavigationFocus(ref);
        return (
          <div id="test" tabIndex={-1} ref={ref}>
            {children}
          </div>
        );
      }

      act(() => {
        ReactDOM.render(
          <Router>
            <Focuser>
              <input type="text" />
            </Focuser>
          </Router>,
          node
        );
      });

      let wrapper = document.querySelector("#test");
      let initialFocus = document.activeElement;
      expect(initialFocus).toBe(wrapper);

      let input = document.querySelector("input");
      // steal the focus
      input.focus();
      let stolenFocus = document.activeElement;
      expect(stolenFocus).toBe(input);

      act(() => {
        ReactDOM.render(
          <Router>
            <Focuser>
              <input type="number" />
            </Focuser>
          </Router>,
          node
        );
      });

      expect(stolenFocus).toBe(input);
    });

    describe("new response", () => {
      it("re-focuses ref for new response re-renders", () => {
        function Focuser() {
          let ref = React.useRef(null);
          useNavigationFocus(ref);
          return (
            <div id="test" tabIndex={-1} ref={ref}>
              <input type="text" />
            </div>
          );
        }

        act(() => {
          ReactDOM.render(
            <Router>
              <Focuser />
            </Router>,
            node
          );
        });

        let input = document.querySelector("input");
        let wrapper = input.parentElement;
        let initialFocused = document.activeElement;

        expect(wrapper).toBe(initialFocused);

        // steal the focus
        input.focus();
        let stolenFocus = document.activeElement;
        expect(input).toBe(stolenFocus);

        act(() => {
          // navigate and verify wrapper is re-focused
          let url = router.url({ name: "About" });
          router.navigate({ url });
        });

        let postNavFocus = document.activeElement;

        expect(wrapper).toBe(postNavFocus);
      });

      it("focuses new ref for new responses", () => {
        let Home = React.forwardRef((_, ref: React.Ref<any>) => (
          <div id="home" tabIndex={-1} ref={ref}>
            <h1>Home</h1>
          </div>
        ));
        let About = React.forwardRef((_, ref: React.Ref<any>) => (
          <div id="about" tabIndex={-1} ref={ref}>
            <h1>About</h1>
          </div>
        ));
        let routes = prepareRoutes([
          {
            name: "Home",
            path: "",
            respond() {
              return { body: Home };
            }
          },
          {
            name: "About",
            path: "about",
            respond() {
              return { body: About };
            }
          }
        ]);

        let router = createRouter(inMemory, routes);
        let Router = createRouterComponent(router);

        function Focuser() {
          let { response } = useResponse();
          let { body: Body } = response;
          let ref = React.useRef(null);
          useNavigationFocus(ref);
          return <Body ref={ref} />;
        }

        act(() => {
          ReactDOM.render(
            <Router>
              <Focuser />
            </Router>,
            node
          );
        });

        let homeDiv = node.querySelector("#home");
        expect(document.activeElement).toBe(homeDiv);

        act(() => {
          let url = router.url({ name: "About" });
          router.navigate({ url });
        });

        let aboutDiv = node.querySelector("#about");
        expect(document.activeElement).toBe(aboutDiv);
      });

      it("warns if ref isn't attached to an element (body focused)", () => {
        let realWarn = console.warn;
        let fakeWarn = (console.warn = jest.fn());

        let Home = ({ innerRef }) => (
          <div id="home" tabIndex={-1} ref={innerRef}>
            <h1>Home</h1>
          </div>
        );

        let About = () => (
          <div id="about">
            <h1>About</h1>
          </div>
        );

        let routes = prepareRoutes([
          {
            name: "Home",
            path: "",
            respond() {
              return { body: Home };
            }
          },
          {
            name: "About",
            path: "about",
            respond() {
              return { body: About };
            }
          }
        ]);

        let router = createRouter(inMemory, routes);
        let Router = createRouterComponent(router);

        function Focuser() {
          let { response } = useResponse();
          let { body: Body } = response;
          let ref = React.useRef(null);
          useNavigationFocus(ref);
          return <Body innerRef={ref} />;
        }

        act(() => {
          ReactDOM.render(
            <Router>
              <Focuser />
            </Router>,
            node
          );
        });

        let homeDiv = node.querySelector("#home");
        expect(document.activeElement).toBe(homeDiv);
        expect(fakeWarn.mock.calls.length).toBe(0);

        act(() => {
          let url = router.url({ name: "About" });
          router.navigate({ url });
        });

        expect(document.activeElement).toBe(document.body);
        expect(fakeWarn.mock.calls[0][0]).toBe(
          "There is no element to focus. Did you forget to add the ref to an element?"
        );
        console.warn = realWarn;
      });
    });
  });

  describe("preserve", () => {
    describe("false (default)", () => {
      it("re-focuses for new response re-renders", () => {
        function Focuser() {
          let ref = React.useRef(null);
          useNavigationFocus(ref, { preserve: false });
          return (
            <div id="test" tabIndex={-1} ref={ref}>
              <input type="text" />
            </div>
          );
        }

        act(() => {
          ReactDOM.render(
            <Router>
              <Focuser />
            </Router>,
            node
          );
        });

        let input = document.querySelector("input");
        let wrapper = input.parentElement;
        let initialFocused = document.activeElement;

        expect(wrapper).toBe(initialFocused);

        // steal the focus
        input.focus();
        let stolenFocus = document.activeElement;
        expect(input).toBe(stolenFocus);

        act(() => {
          // navigate and verify wrapper is re-focused
          let url = router.url({ name: "About" });
          router.navigate({ url });
        });

        let postNavFocus = document.activeElement;

        expect(wrapper).toBe(postNavFocus);
      });
    });

    describe("true", () => {
      it("does not focus ref if something is already ", () => {
        function Focuser() {
          let ref = React.useRef(null);
          useNavigationFocus(ref, { preserve: true });
          return (
            <div id="test" tabIndex={-1} ref={ref}>
              <input type="text" />
            </div>
          );
        }

        act(() => {
          ReactDOM.render(
            <Router>
              <Focuser />
            </Router>,
            node
          );
        });

        let input = document.querySelector("input");
        let wrapper = input.parentElement;
        let initialFocused = document.activeElement;

        expect(wrapper).toBe(initialFocused);

        // steal the focus
        input.focus();
        let stolenFocus = document.activeElement;
        expect(input).toBe(stolenFocus);

        act(() => {
          // navigate and verify wrapper is re-focused
          let url = router.url({ name: "About" });
          router.navigate({ url });
        });

        let postNavFocus = document.activeElement;

        expect(postNavFocus).toBe(input);
      });
    });
  });

  describe("preventScroll", () => {
    let realFocus = HTMLElement.prototype.focus;
    let fakeFocus;

    beforeEach(() => {
      fakeFocus = HTMLElement.prototype.focus = jest.fn();
    });

    afterEach(() => {
      fakeFocus.mockReset();
      HTMLElement.prototype.focus = realFocus;
    });

    it("calls focus({ preventScroll: false }} when not provided", () => {
      function Focuser() {
        let ref = React.useRef(null);
        useNavigationFocus(ref);
        return (
          <div id="test" tabIndex={-1} ref={ref}>
            <input type="text" />
          </div>
        );
      }

      act(() => {
        ReactDOM.render(
          <Router>
            <Focuser />
          </Router>,
          node
        );
      });

      expect(fakeFocus.mock.calls[0][0]).toMatchObject({
        preventScroll: false
      });
    });

    it("calls focus({ preventScroll: true }} when preventScroll = true", () => {
      function Focuser() {
        let ref = React.useRef(null);
        useNavigationFocus(ref, { preventScroll: true });
        return (
          <div id="test" tabIndex={-1} ref={ref}>
            <input type="text" />
          </div>
        );
      }

      act(() => {
        ReactDOM.render(
          <Router>
            <Focuser />
          </Router>,
          node
        );
      });

      expect(fakeFocus.mock.calls[0][0]).toMatchObject({ preventScroll: true });
    });

    it("calls focus({ preventScroll: false }} when preventScroll = false", () => {
      function Focuser() {
        let ref = React.useRef(null);
        useNavigationFocus(ref, { preventScroll: false });
        return (
          <div id="test" tabIndex={-1} ref={ref}>
            <input type="text" />
          </div>
        );
      }

      act(() => {
        ReactDOM.render(
          <Router>
            <Focuser />
          </Router>,
          node
        );
      });

      expect(fakeFocus.mock.calls[0][0]).toMatchObject({
        preventScroll: false
      });
    });
  });

  describe("tabIndex", () => {
    it("warns when ref element does not have a tabIndex attribute", () => {
      let realWarn = console.warn;
      let fakeWarn = (console.warn = jest.fn());

      function Focuser() {
        let ref = React.useRef(null);
        useNavigationFocus(ref);
        return (
          <div id="test" ref={ref}>
            <input type="text" />
          </div>
        );
      }

      act(() => {
        ReactDOM.render(
          <Router>
            <Focuser />
          </Router>,
          node
        );
      });

      expect(fakeWarn.mock.calls.length).toBe(1);
      console.warn = realWarn;
    });

    it("does not warn when ref element does not have a tabIndex attribute, but ele is already focusable", () => {
      let realWarn = console.warn;
      let fakeWarn = (console.warn = jest.fn());

      function Focuser() {
        let ref = React.useRef(null);
        useNavigationFocus(ref);
        return (
          <div id="test">
            <input type="text" ref={ref} />
          </div>
        );
      }

      ReactDOM.render(
        <Router>
          <Focuser />
        </Router>,
        node
      );

      expect(fakeWarn.mock.calls.length).toBe(0);
      console.warn = realWarn;
    });
  });
});
