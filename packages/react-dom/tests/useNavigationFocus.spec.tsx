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
  const routes = prepareRoutes({
    routes: [{ name: "Home", path: "" }, { name: "About", path: "about" }]
  });

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
        const ref = React.useRef(null);
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

      const wrapper = document.querySelector("#test");
      const focused = document.activeElement;
      expect(focused).toBe(wrapper);
    });

    it("warns if ref isn't attached to an element (body focused)", () => {
      const realWarn = console.warn;
      const fakeWarn = (console.warn = jest.fn());

      const routes = prepareRoutes({
        routes: [
          {
            name: "Home",
            path: ""
          }
        ]
      });

      const router = createRouter(inMemory, routes);
      const Router = createRouterComponent(router);

      function Focuser() {
        const ref = React.useRef(null);
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
        const ref = React.useRef(null);
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

      const wrapper = document.querySelector("#test");
      const initialFocus = document.activeElement;
      expect(initialFocus).toBe(wrapper);

      const input = document.querySelector("input");
      // steal the focus
      input.focus();
      const stolenFocus = document.activeElement;
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
          const ref = React.useRef(null);
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

        const input = document.querySelector("input");
        const wrapper = input.parentElement;
        const initialFocused = document.activeElement;

        expect(wrapper).toBe(initialFocused);

        // steal the focus
        input.focus();
        const stolenFocus = document.activeElement;
        expect(input).toBe(stolenFocus);

        act(() => {
          // navigate and verify wrapper is re-focused
          const url = router.url({ name: "About" });
          router.navigate({ url });
        });

        const postNavFocus = document.activeElement;

        expect(wrapper).toBe(postNavFocus);
      });

      it("focuses new ref for new responses", () => {
        const Home = React.forwardRef((_, ref: React.Ref<any>) => (
          <div id="home" tabIndex={-1} ref={ref}>
            <h1>Home</h1>
          </div>
        ));
        const About = React.forwardRef((_, ref: React.Ref<any>) => (
          <div id="about" tabIndex={-1} ref={ref}>
            <h1>About</h1>
          </div>
        ));
        const routes = prepareRoutes({
          routes: [
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
          ]
        });

        const router = createRouter(inMemory, routes);
        const Router = createRouterComponent(router);

        function Focuser() {
          const { response } = useResponse();
          const { body: Body } = response;
          const ref = React.useRef(null);
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

        const homeDiv = node.querySelector("#home");
        expect(document.activeElement).toBe(homeDiv);

        act(() => {
          const url = router.url({ name: "About" });
          router.navigate({ url });
        });

        const aboutDiv = node.querySelector("#about");
        expect(document.activeElement).toBe(aboutDiv);
      });

      it("warns if ref isn't attached to an element (body focused)", () => {
        const realWarn = console.warn;
        const fakeWarn = (console.warn = jest.fn());

        const Home = ({ innerRef }) => (
          <div id="home" tabIndex={-1} ref={innerRef}>
            <h1>Home</h1>
          </div>
        );

        const About = () => (
          <div id="about">
            <h1>About</h1>
          </div>
        );

        const routes = prepareRoutes({
          routes: [
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
          ]
        });

        const router = createRouter(inMemory, routes);
        const Router = createRouterComponent(router);

        function Focuser() {
          const { response } = useResponse();
          const { body: Body } = response;
          const ref = React.useRef(null);
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

        const homeDiv = node.querySelector("#home");
        expect(document.activeElement).toBe(homeDiv);
        expect(fakeWarn.mock.calls.length).toBe(0);

        act(() => {
          const url = router.url({ name: "About" });
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
          const ref = React.useRef(null);
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

        const input = document.querySelector("input");
        const wrapper = input.parentElement;
        const initialFocused = document.activeElement;

        expect(wrapper).toBe(initialFocused);

        // steal the focus
        input.focus();
        const stolenFocus = document.activeElement;
        expect(input).toBe(stolenFocus);

        act(() => {
          // navigate and verify wrapper is re-focused
          const url = router.url({ name: "About" });
          router.navigate({ url });
        });

        const postNavFocus = document.activeElement;

        expect(wrapper).toBe(postNavFocus);
      });
    });

    describe("true", () => {
      it("does not focus ref if something is already ", () => {
        function Focuser() {
          const ref = React.useRef(null);
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

        const input = document.querySelector("input");
        const wrapper = input.parentElement;
        const initialFocused = document.activeElement;

        expect(wrapper).toBe(initialFocused);

        // steal the focus
        input.focus();
        const stolenFocus = document.activeElement;
        expect(input).toBe(stolenFocus);

        act(() => {
          // navigate and verify wrapper is re-focused
          const url = router.url({ name: "About" });
          router.navigate({ url });
        });

        const postNavFocus = document.activeElement;

        expect(postNavFocus).toBe(input);
      });
    });
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
      function Focuser() {
        const ref = React.useRef(null);
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
        const ref = React.useRef(null);
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
        const ref = React.useRef(null);
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
      const realWarn = console.warn;
      const fakeWarn = (console.warn = jest.fn());

      function Focuser() {
        const ref = React.useRef(null);
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
      const realWarn = console.warn;
      const fakeWarn = (console.warn = jest.fn());

      function Focuser() {
        const ref = React.useRef(null);
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
