import "jest";
import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils"
import { curi, prepareRoutes } from "@curi/router";
import { InMemory } from "@hickory/in-memory";

// @ts-ignore (resolved by jest)
import { curiProvider, useFinishNavigation, useCuri } from "@curi/react-universal";

describe("useFinishNavigation", () => {
  let node;
  const routes = prepareRoutes([
    { name: "Home", path: "" },
    { name: "About", path: "about" }
  ]);

  beforeEach(() => {
    node = document.createElement("div");
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  it('"finishes" navigation after mounting', () => {
    const history = InMemory();
    const router = curi(history, routes, { suspend: true });
    const Router = curiProvider(router);

    let navigations = [];
    // intercept and mock navigation.finish()
    router.observe(
      ({ navigation }) => {
        navigation.finish = jest.fn();
        navigations.push(navigation);
      }
    );

    function App() {
      const { navigation } = useCuri();
      expect((navigation.finish as jest.Mock).mock.calls.length).toBe(0);
      useFinishNavigation();
      return null;
    }

    act(() => {
      ReactDOM.render(
        <Router>
          <App />
        </Router>,
        node
      );
    });

    expect(navigations[0].finish.mock.calls.length).toBe(1);
  });

  it('"finishes" navigation after updating', () => {
    const history = InMemory();
    const router = curi(history, routes, { suspend: true });
    const Router = curiProvider(router);

    let navigations = [];
    // intercept and mock navigation.finish()
    router.observe(
      ({ navigation }) => {
        navigation.finish = jest.fn();
        navigations.push(navigation);
      }
    );

    function App() {
      const { navigation } = useCuri();
      expect((navigation.finish as jest.Mock).mock.calls.length).toBe(0);
      useFinishNavigation();
      return null;
    }

    act(() => {
      ReactDOM.render(
        <Router>
          <App />
        </Router>,
        node
      );
    });
    expect(navigations[0].finish.mock.calls.length).toBe(1);

    act(() => {
      router.navigate({ name: "About" });
    });
    
    expect(navigations[1].finish.mock.calls.length).toBe(1);
  });
});
