import "jest";
import { Emitted } from "@curi/types";

import { title } from "@curi/router";

describe("title", () => {
  let fakeResponse = {
    response: { meta: { title: "Test Title; Please Ignore" } }
  } as Emitted;

  it("sets document.title to value returned by provided callback", () => {
    let sideEffect = title(({ response }) => {
      return `My Site | ${response.meta.title}`;
    });
    sideEffect(fakeResponse);
    expect(document.title).toBe("My Site | Test Title; Please Ignore");
  });
});
