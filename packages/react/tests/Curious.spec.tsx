import "jest";
import React from "react";
import PropTypes from "prop-types";
import { shallow, mount } from "enzyme";

import InMemory from "@hickory/in-memory";
import curi from "@curi/core";

import { Consumer as Curious } from "../src/Context";
import CuriProvider from "../src/CuriProvider";

function render(router, fn) {
  return mount(<CuriProvider router={router} render={fn} />);
}

describe("<Curious>", () => {
  let history, router;
  const routes = [{ name: "Home", path: "" }];

  beforeEach(() => {
    history = InMemory();
    router = curi(history, routes);
  });

  it("passes router, response, and navigation to children function", done => {
    router.respond(
      ({ response, navigation }) => {
        const wrapper = render(router, () => (
          <Curious>
            {value => {
              expect(value.router).toBe(router);
              expect(value.response).toBe(response);
              expect(value.navigation).toBe(navigation);
              done();
              return null;
            }}
          </Curious>
        ));
      },
      { once: true }
    );
  });
});
