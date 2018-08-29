import "jest";
import React from "react";
import ReactDOM from "react-dom";
import InMemory from "@hickory/in-memory";
import { curi } from "@curi/router";

// resolved by jest
import { CuriProvider, Curious } from "@curi/react-universal";

describe("<Curious>", () => {
  let node;
  let history, router;
  const routes = [{ name: "Home", path: "" }];

  beforeEach(() => {
    node = document.createElement("div");
    history = InMemory();
    router = curi(history, routes);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  it("passes router, response, and navigation to children function", done => {
    router.respond(({ response, navigation }) => {
      ReactDOM.render(
        <CuriProvider router={router}>
          {() => (
            <Curious>
              {value => {
                expect(value.router).toBe(router);
                expect(value.response).toBe(response);
                expect(value.navigation).toBe(navigation);
                done();
                return null;
              }}
            </Curious>
          )}
        </CuriProvider>,
        node
      );
    });
  });
});
