import "jest";
import { Emitted } from "@curi/types";

import { scroll } from "@curi/router";

jest.useFakeTimers();

describe("scroll", () => {
  let realScrollTo = window.scrollTo;
  let realScrollIntoView = Element.prototype.scrollIntoView;

  let mockScroll;
  let mockElementScroll;

  beforeEach(() => {
    mockScroll = jest.fn();
    mockElementScroll = jest.fn();

    window.scrollTo = mockScroll;
    Element.prototype.scrollIntoView = mockElementScroll;
  });

  afterEach(() => {
    window.scrollTo = realScrollTo;
    Element.prototype.scrollIntoView = realScrollIntoView;
  });

  it("does not scroll after pop", () => {
    let sideEffect = scroll();
    sideEffect({
      response: { location: {} },
      navigation: {
        action: "pop",
        previous: {}
      }
    } as Emitted);

    jest.runAllTimers();
    expect(mockScroll.mock.calls.length).toBe(0);
  });

  it("scrolls to 0 after push", () => {
    let sideEffect = scroll();
    sideEffect({
      response: { location: {} },
      navigation: {
        action: "push",
        previous: {}
      }
    } as Emitted);

    jest.runAllTimers();
    expect(mockScroll.mock.calls.length).toBe(1);
  });

  it("scrolls to 0 after replace", () => {
    let sideEffect = scroll();
    sideEffect({
      response: { location: {} },
      navigation: {
        action: "replace",
        previous: {}
      }
    } as Emitted);

    jest.runAllTimers();
    expect(mockScroll.mock.calls.length).toBe(1);
  });

  it("scrolls to matching element if there is a location.hash", () => {
    let div = document.createElement("div");
    div.setAttribute("id", "test");
    document.body.appendChild(div);

    let sideEffect = scroll();
    sideEffect({
      response: { location: { hash: "test" } },
      navigation: {
        action: "replace",
        previous: {}
      }
    } as Emitted);

    jest.runAllTimers();
    expect(mockScroll.mock.calls.length).toBe(0);
    expect(mockElementScroll.mock.calls.length).toBe(1);

    document.body.removeChild(div);
  });

  it("scrolls to top if there is location.hash but no matching element", () => {
    let sideEffect = scroll();
    sideEffect({
      response: { location: { hash: "test" } },
      navigation: {
        action: "replace",
        previous: {}
      }
    } as Emitted);

    jest.runAllTimers();
    expect(mockScroll.mock.calls.length).toBe(1);
    expect(mockElementScroll.mock.calls.length).toBe(0);
  });

  it("scrolls to top if location.hash is empty string", () => {
    let sideEffect = scroll();
    sideEffect({
      response: { location: { hash: "" } },
      navigation: {
        action: "replace",
        previous: {}
      }
    } as Emitted);

    jest.runAllTimers();
    expect(mockScroll.mock.calls.length).toBe(1);
    expect(mockElementScroll.mock.calls.length).toBe(0);
  });
});
