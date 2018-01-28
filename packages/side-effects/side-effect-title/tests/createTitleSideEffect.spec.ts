import "jest";
import createTitleSideEffect from "../src";
import { Emitted } from "@curi/core";

describe("createTitleSideEffect", () => {
  const fakeResponse = {
    response: { title: "Test Title; Please Ignore" }
  } as Emitted;

  it("returned function sets document.title using response.title", () => {
    const sideEffect = createTitleSideEffect();
    const queryResponse = sideEffect(fakeResponse);
    expect(document.title).toBe("Test Title; Please Ignore");
  });

  it("sets document.title to empty string if response has no title", () => {
    const sideEffect = createTitleSideEffect();
    const fakeResponse = { response: {} } as Emitted;
    const queryResponse = sideEffect(fakeResponse);
    expect(document.title).toBe("");
  });

  describe("prefix", () => {
    it("prepends the prefix before the title", () => {
      const sideEffect = createTitleSideEffect({ prefix: "My Site" });
      const queryResponse = sideEffect(fakeResponse);
      expect(document.title).toBe("My Site Test Title; Please Ignore");
    });
  });

  describe("suffix", () => {
    it("appends the suffix after the title", () => {
      const sideEffect = createTitleSideEffect({ suffix: "My Site" });
      const queryResponse = sideEffect(fakeResponse);
      expect(document.title).toBe("Test Title; Please Ignore My Site");
    });
  });

  describe("delimiter", () => {
    it("it adds delimiter between prefix, response.title, and suffix", () => {
      const sideEffect = createTitleSideEffect({
        prefix: "Prefix",
        suffix: "Suffix",
        delimiter: "|"
      });
      const queryResponse = sideEffect(fakeResponse);
      expect(document.title).toBe(
        "Prefix | Test Title; Please Ignore | Suffix"
      );
    });

    it("does not prepend delimiter when there is no prefix", () => {
      const sideEffect = createTitleSideEffect({
        suffix: "Suffix",
        delimiter: "|"
      });
      const queryResponse = sideEffect(fakeResponse);
      expect(document.title).toBe("Test Title; Please Ignore | Suffix");
    });

    it("does not append delimiter when there is no suffix", () => {
      const sideEffect = createTitleSideEffect({
        prefix: "Prefix",
        delimiter: "|"
      });
      const queryResponse = sideEffect(fakeResponse);
      expect(document.title).toBe("Prefix | Test Title; Please Ignore");
    });
  });
});
