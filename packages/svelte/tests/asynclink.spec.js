function test(file, done) {
  require(file).default(done);
}

describe("<AsyncLink>", () => {
  describe("href", () => {
    it("renders an anchor with expected pathname", () => {
      test("./cases/asynclink/basic-pathname");
    });

    it("uses params attribute to generate pathname", () => {
      test("./cases/asynclink/pathname-params");
    });

    it("has no pathname component if name is not provided", () => {
      test("./cases/asynclink/relative");
    });

    it("appends query & hash to end of URI", () => {
      test("./cases/asynclink/query-hash");
    });
  });

  describe("forward prop", () => {
    it('forwards "forward" properties to the anchor', () => {
      test("./cases/asynclink/forward-props");
    });

    it('spreads "forward" before native props to avoid overwriting', () => {
      test("./cases/asynclink/forward-overwrite");
    });
  });

  describe("wrapper prop", () => {
    it("renders the wrapper when provided", () => {
      test("./cases/asynclink/wrapper");
    });

    it("passes navigating=false to wrapper by default", () => {
      test("./cases/asynclink/wrapper-navigating");
    });

    it("passes navigating=true to wrapper while navigating", done => {
      test("./cases/asynclink/wrapper-while-navigating", done);
    });

    it("cancels finish/cancel callbacks when destroyed", done => {
      test("./cases/asynclink/wrapper-destroy-callbacks", done);
    });
  });

  describe("clicking a <Link>", () => {
    it("will navigate to the new location", () => {
      test("./cases/asynclink/click");
    });

    it("will ignore modified clicks", () => {
      test("./cases/asynclink/mod-click");
    });

    it("will ignore click if event.defaultPrevented is true", () => {
      test("./cases/asynclink/prevent-click");
    });

    it("will ignore click if not done with left mouse button", () => {
      test("./cases/asynclink/not-left-click");
    });
  });
});
