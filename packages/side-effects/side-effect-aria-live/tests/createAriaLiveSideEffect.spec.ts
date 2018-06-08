import "jest";
import createAriaLiveSideEffect from "../src";
import { Emitted } from "@curi/core";

describe("createAriaLiveSideEffect", () => {
  const liveRegion = document.createElement("div");
  liveRegion.setAttribute("aria-live", "polite");
  document.body.appendChild(liveRegion);

  afterEach(() => {
    liveRegion.textContent = "";
  });

  it("updates the live region's text content", () => {
    const sideEffect = createAriaLiveSideEffect(
      liveRegion,
      ({ response }) => `Navigated to ${response.name}`
    );
    sideEffect({
      response: { name: "Test" }
    } as Emitted);
    expect(liveRegion.textContent).toBe(`Navigated to Test`);
  });

  it("warns when provided element is not an aria-live region", () => {
    const notLive = document.createElement("div");
    document.body.appendChild(notLive);

    const realWarn = console.warn;
    const fakeWarn = (console.warn = jest.fn());

    const sideEffect = createAriaLiveSideEffect(
      notLive,
      ({ response }) => `Navigated to ${response.name}`
    );

    expect(fakeWarn.mock.calls.length).toBe(1);

    console.warn = realWarn;
    document.body.removeChild(notLive);
  });
});
