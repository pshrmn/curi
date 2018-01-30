import "jest";
import React from "react";
import { mount } from "enzyme";
import InMemory from "@hickory/in-memory";
import { HickoryLocation } from "@hickory/root";
import curi, { Response } from "@curi/core";
import createActiveAddon from "@curi/addon-active";
import CuriProvider from "../src/CuriProvider";
import Active from "../src/Active";

function render(router, fn) {
  return mount(<CuriProvider router={router}>{fn}</CuriProvider>);
}

describe("<Active>", () => {
  let history;
  let router;
  const routes = [
    { name: "Home", path: "" },
    {
      name: "Contact",
      path: "contact",
      children: [{ name: "Method", path: ":method" }]
    }
  ];

  beforeEach(() => {
    history = InMemory();
    router = curi(history, routes, {
      addons: [createActiveAddon()]
    });
  });

  describe("no active addon", () => {
    it('warns if attempting to use in a Curi router without the "active" addon', () => {
      const router = curi(history, routes);
      const Test = () => null;
      function merge(props) {
        return props;
      }

      const realError = console.error;
      console.error = jest.fn();

      expect(() => {
        render(router, () => (
          <Active name="Home" merge={merge}>
            <Test />
          </Active>
        ));
      }).toThrow(
        'You are attempting to use the "active" prop, but have not included the "active" ' +
          "addon (@curi/addon-active) in your Curi router."
      );
      console.error = realError;
    });
  });

  describe("children", () => {
    it("re-renders the children element it is passed", () => {
      const Test = () => null;
      function merge(props) {
        return props;
      }

      const wrapper = render(router, () => (
        <Active name="Home" merge={merge}>
          <Test />
        </Active>
      ));
      expect(wrapper.find(Test).exists()).toBe(true);
    });
  });

  describe("merge", () => {
    it("does not call merge function when not active", () => {
      const Test = () => null;
      const merge = jest.fn();

      const wrapper = render(router, () => (
        <Active name="About" merge={merge}>
          <Test />
        </Active>
      ));
      expect(merge.mock.calls.length).toBe(0);
    });

    it("calls merge function when active", () => {
      const Test = () => null;
      const merge = jest.fn();

      const wrapper = render(router, () => (
        <Active name="Home" merge={merge}>
          <Test />
        </Active>
      ));
      expect(merge.mock.calls.length).toBe(1);
    });

    it("merges props into children element's props when active", () => {
      const Test = () => null;
      function merge(props) {
        props.className = "not-a-test";
        return props;
      }

      const wrapper = render(router, () => (
        <Active name="Home" merge={merge}>
          <div className="test" />
        </Active>
      ));
      const div = wrapper.find("div");
      expect(div.prop("className")).toBe("not-a-test");
    });
  });

  describe("partial", () => {
    it("works for partial matches when partial=true", done => {
      const Test = () => null;
      function merge(props) {
        props.className = "not-a-test";
        return props;
      }
      const history = InMemory({ locations: ["/contact/email"] });
      const router = curi(history, routes, {
        addons: [createActiveAddon()]
      });
      router.respond(() => {
        const wrapper = render(router, () => (
          <Active name="Contact" partial={true} merge={merge}>
            <div className="test" />
          </Active>
        ));
        const div = wrapper.find("div");
        expect(div.prop("className")).toBe("not-a-test");
        done();
      });
    });
  });

  describe("extra", () => {
    it("does nothing when not provided", () => {
      const Test = () => null;
      const merge = jest.fn();

      const wrapper = render(router, () => (
        <Active name="Home" merge={merge}>
          <Test />
        </Active>
      ));
      expect(merge.mock.calls.length).toBe(1);
    });

    it("passes current location and details to the extra function", () => {
      const Test = () => null;
      const merge = jest.fn();
      const details = { query: "test=ing" };
      const extra = jest.fn((loc: HickoryLocation, deets: object): boolean => {
        //expect(loc).toBe(fakeResponse.location);
        expect(deets).toBe(details);
        return true;
      });

      const wrapper = render(router, () => (
        <Active name="Home" merge={merge} extra={extra} details={details}>
          <Test />
        </Active>
      ));
      expect(extra.mock.calls.length).toBe(1);
    });

    it("component is not active if extra returns false", () => {
      const Test = () => null;
      const merge = jest.fn();
      const extra = () => false;

      const wrapper = render(router, () => (
        <Active name="Home" merge={merge} extra={extra}>
          <Test />
        </Active>
      ));
      expect(merge.mock.calls.length).toBe(0);
    });
  });
});
