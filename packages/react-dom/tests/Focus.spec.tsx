import "jest";
import React from "react";
import ReactDOM from "react-dom";
import InMemory from "@hickory/in-memory";
import { curi, buildRoutes } from "@curi/router";

// @ts-ignore (resolved by jest)
import { curiProvider, Focus } from "@curi/react-dom";

jest.useFakeTimers();

describe("<Focus>", () => {
  let node;
  let history, router, Router;
  const routes = buildRoutes([
    { name: "Home", path: "" },
    { name: "About", path: "about" }
  ]);

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

  describe("mounting", () => {
    it("focuses ref when mounting", () => {
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

    it("warns if ref isn't attached to an element  (body focused)", () => {
      const realWarn = console.warn;
      const fakeWarn = (console.warn = jest.fn());

      const Home = () => (
        <div id="home">
          <h1>Home</h1>
        </div>
      );

      const routes = buildRoutes([
        {
          name: "Home",
          path: "",
          response() {
            return { body: Home };
          }
        }
      ]);

      const history = InMemory();
      const router = curi(history, routes);
      const Router = curiProvider(router);
      ReactDOM.render(
        <Router>
          {({ response }) => {
            const { body: Body } = response;
            return <Focus>{ref => <Body innerRef={ref} />}</Focus>;
          }}
        </Router>,
        node
      );
      jest.runAllTimers();

      expect(document.activeElement).toBe(document.body);
      expect(fakeWarn.mock.calls[0][0]).toBe(
        "There is no element to focus. Did you forget to add the ref to an element?"
      );
      console.warn = realWarn;
    });
  });

  describe("updates", () => {
    it("does not re-focus ref for regular re-renders", () => {
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

    describe("new response", () => {
      it("re-focuses ref for new response re-renders", () => {
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
        const routes = buildRoutes([
          {
            name: "Home",
            path: "",
            response() {
              return { body: Home };
            }
          },
          {
            name: "About",
            path: "about",
            response() {
              return { body: About };
            }
          }
        ]);

        const history = InMemory();
        const router = curi(history, routes);
        const Router = curiProvider(router);
        ReactDOM.render(
          <Router>
            {({ response }) => {
              const { body: Body } = response;
              return <Focus>{ref => <Body ref={ref} />}</Focus>;
            }}
          </Router>,
          node
        );
        jest.runAllTimers();

        const homeDiv = node.querySelector("#home");
        expect(document.activeElement).toBe(homeDiv);

        router.navigate({ name: "About" });

        jest.runAllTimers();

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

        const routes = buildRoutes([
          {
            name: "Home",
            path: "",
            response() {
              return { body: Home };
            }
          },
          {
            name: "About",
            path: "about",
            response() {
              return { body: About };
            }
          }
        ]);

        const history = InMemory();
        const router = curi(history, routes);
        const Router = curiProvider(router);
        ReactDOM.render(
          <Router>
            {({ response }) => {
              const { body: Body } = response;
              return <Focus>{ref => <Body innerRef={ref} />}</Focus>;
            }}
          </Router>,
          node
        );
        jest.runAllTimers();

        const homeDiv = node.querySelector("#home");
        expect(document.activeElement).toBe(homeDiv);
        expect(fakeWarn.mock.calls.length).toBe(0);

        router.navigate({ name: "About" });

        jest.runAllTimers();

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
    });

    describe("true", () => {
      it("does not focus ref if something is already ", () => {
        ReactDOM.render(
          <Router>
            {() => (
              <Focus preserve={true}>
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
