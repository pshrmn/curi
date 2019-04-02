import "jest";
import { Emitted } from "@curi/types";

import createTitleSideEffect from "@curi/side-effect-title";

describe("createTitleSideEffect", () => {
  const fakeResponse = {
    response: { title: "Test Title; Please Ignore" }
  } as Emitted;

  it("sets document.title to value returned by provided callback", () => {
    const sideEffect = createTitleSideEffect(({ response }) => {
      return `My Site | ${response.title}`;
    });
    sideEffect(fakeResponse);
    expect(document.title).toBe("My Site | Test Title; Please Ignore");
  });
});
