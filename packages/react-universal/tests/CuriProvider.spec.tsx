import "jest";
import React from "react";
import ReactDOM from "react-dom";
import { curi } from "@curi/router";
import InMemory from "@hickory/in-memory";

// resolved by jest
import { CuriProvider, Curious } from "@curi/react-universal";

describe("<CuriProvider>", () => {
  let node;
  const routes = [{ name: "Home", path: "" }, { name: "About", path: "about" }];

  beforeEach(() => {
    node = document.createElement("div");
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  describe("router prop", () => {
    it("can switch observers when given a new router", () => {
      const history = InMemory();
      const router = curi(history, [
        {
          name: "Catch All",
          path: "(.*)",
          response() {
            return { data: "one" };
          }
        }
      ]);
      const router2 = curi(history, [
        {
          name: "Catch All",
          path: "(.*)",
          response() {
            return { data: "two" };
          }
        }
      ]);

      ReactDOM.render(
        <CuriProvider router={router}>
          {({ response }) => <div>{response.data}</div>}
        </CuriProvider>,
        node
      );

      expect(node.textContent).toBe("one");

      ReactDOM.render(
        <CuriProvider router={router2}>
          {({ response }) => <div>{response.data}</div>}
        </CuriProvider>,
        node
      );

      expect(node.textContent).toBe("two");
    });
  });

  describe("children prop", () => {
    it("calls children() function when it renders", () => {
      const history = InMemory();
      const router = curi(history, [{ name: "Catch All", path: "(.*)" }]);

      const fn = jest.fn(() => {
        return null;
      });
      ReactDOM.render(<CuriProvider router={router}>{fn}</CuriProvider>, node);
      expect(fn.mock.calls.length).toBe(1);
    });

    it("re-renders when the location changes", done => {
      const history = InMemory();
      const router = curi(history, routes);
      let pushedHistory = false;
      let firstCall = true;
      const fn = jest.fn(({ response }) => {
        if (firstCall) {
          expect(response.name).toBe("Home");
          firstCall = false;
        } else {
          expect(response.name).toBe("About");
          done();
        }
        return null;
      });

      ReactDOM.render(<CuriProvider router={router}>{fn}</CuriProvider>, node);
      history.navigate("/about");
    });

    it("passes { response, navigation, router } to children()  prop", () => {
      const history = InMemory();
      const fn = jest.fn(({ response, navigation, router: routerProp }) => {
        expect(response).toMatchObject({
          name: "Home"
        });
        expect(navigation).toMatchObject({
          action: "PUSH"
        });
        expect(routerProp).toBe(router);
        return null;
      });

      const router = curi(history, routes);
      ReactDOM.render(<CuriProvider router={router}>{fn}</CuriProvider>, node);
    });
  });

  describe("context", () => {
    it("makes response, navigation, and router available to <Curious>", done => {
      let emittedResponse;
      let emittedNavigation;
      const history = InMemory();
      const router = curi(history, routes);

      const ContextLogger: React.ComponentType = () => (
        <Curious>
          {value => {
            expect(value.response).toBe(emittedResponse);
            expect(value.router).toBe(router);
            expect(value.navigation).toBe(emittedNavigation);
            done();
            return null;
          }}
        </Curious>
      );

      router.respond(({ response, navigation }) => {
        emittedResponse = response;
        emittedNavigation = navigation;
        ReactDOM.render(
          <CuriProvider router={router}>
            {() => <ContextLogger />}
          </CuriProvider>,
          node
        );
      });
    });
  });
});
