function test(file, done) {
  require(file).default(done);
}

describe("<Link>", () => {
  describe("href", () => {
    it("renders an anchor with expected pathname", () => {
      test("./cases/link/basic-pathname");
    });

    it("uses params attribute to generate pathname", () => {
      test("./cases/link/pathname-params");
    });

    it("has no pathname component if name is not provided", () => {
      test("./cases/link/relative");
    });

    it("appends query & hash to end of URI", () => {
      test("./cases/link/query-hash");
    });
  });

  describe("additional props", () => {
    it("forwards additional properties to the anchor", () => {
      test("./cases/link/additional-props");
    });

    it("spreads additional props before native props to avoid overwriting", () => {
      test("./cases/link/additional-overwrite");
    });
  });

  describe("clicking a <Link>", () => {
    it("will navigate to the new location", () => {
      test("./cases/link/click");
    });

    it("will ignore modified clicks", () => {
      test("./cases/link/mod-click");
    });

    it("will ignore click if event.defaultPrevented is true", () => {
      test("./cases/link/prevent-click");
    });

    it("will ignore click if not done with left mouse button", () => {
      test("./cases/link/not-left-click");
    });
  });
});
