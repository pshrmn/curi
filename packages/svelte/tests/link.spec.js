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

    it('uses relative href if "name" isn\'t provided', () => {
      test("./cases/link/relative");
    });

    it("appends query & hash to end of URI", () => {
      test("./cases/link/query-hash");
    });
  });

  describe("forward prop", () => {
    it('forwards "forward" properties to the anchor', () => {
      test("./cases/link/forward-props");
    });
  });

  describe("wrapper prop", () => {
    it("renders the wrapper when provided", () => {
      test("./cases/link/wrapper");
    });

    it("passes navigating=false to wrapper by default", () => {
      test("./cases/link/wrapper-navigating");
    });

    it("passes navigating=true to wrapper while navigating", done => {
      test("./cases/link/wrapper-while-navigating", done);
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
