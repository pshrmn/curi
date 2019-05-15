import "jest";
import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { createRouter, prepareRoutes } from "@curi/router";
import { inMemory } from "@hickory/in-memory";

import { sleep } from "../../../utils/tests";

// @ts-ignore (resolved by jest)
import {
  createRouterComponent,
  useFinishNavigation,
  useResponse
} from "@curi/react-universal";

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
    const router = createRouter(inMemory, routes, { suspend: true });
    const Router = createRouterComponent(router);

    let navigations = [];
    // intercept and mock navigation.finish()
    router.observe(({ navigation }) => {
      navigation.finish = jest.fn();
      navigations.push(navigation);
    });

    function App() {
      const { navigation } = useResponse();
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

  it('"finishes" navigation after updating', async () => {
    const router = createRouter(inMemory, routes, { suspend: true });
    const Router = createRouterComponent(router);

    let navigations = [];
    // intercept and mock navigation.finish()
    router.observe(({ navigation }) => {
      navigation.finish = jest.fn();
      navigations.push(navigation);
    });

    function App() {
      const { navigation } = useResponse();
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
      const url = router.url({ name: "About" });
      router.navigate({ url });
    });

    await act(async () => {
      await sleep(100);
    });

    expect(navigations[1].finish.mock.calls.length).toBe(1);
  });
});
