import "jest";
import { Emitted } from "@curi/types";

import { announce } from "@curi/router";

describe("announce", () => {
  it("inserts a <div> with a live-region into the DOM", () => {
    let sideEffect = announce(
      ({ response }) => `Navigated to ${response.name}`
    );
    sideEffect({
      response: { name: "Test" }
    } as Emitted);
    let liveRegion = document.querySelector("div[aria-live]");
    expect(liveRegion).toBeDefined();
    liveRegion.parentElement.removeChild(liveRegion);
  });

  it("updates the live region's text content", () => {
    let sideEffect = announce(
      ({ response }) => `Navigated to ${response.name}`
    );
    sideEffect({
      response: { name: "Test" }
    } as Emitted);
    let liveRegion = document.querySelector("div[aria-live]");
    expect(liveRegion.textContent).toBe(`Navigated to Test`);
    liveRegion.parentElement.removeChild(liveRegion);
  });

  describe("mode", () => {
    it('defaults to aria-live="assertive"', () => {
      let sideEffect = announce(
        ({ response }) => `Navigated to ${response.name}`
      );
      sideEffect({
        response: { name: "Test" }
      } as Emitted);
      let liveRegion = document.querySelector("div[aria-live]");
      expect(liveRegion.getAttribute("aria-live")).toBe("assertive");
      liveRegion.parentElement.removeChild(liveRegion);
    });

    it("uses the provided mode", () => {
      let sideEffect = announce(
        ({ response }) => `Navigated to ${response.name}`,
        "polite"
      );
      sideEffect({
        response: { name: "Test" }
      } as Emitted);
      let liveRegion = document.querySelector("div[aria-live]");
      expect(liveRegion.getAttribute("aria-live")).toBe("polite");
      liveRegion.parentElement.removeChild(liveRegion);
    });
  });
});
