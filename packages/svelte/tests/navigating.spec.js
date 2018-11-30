function test(file, done) {
  require(file).default(done);
}

describe("<Navigating>", () => {
  describe("onmount", () => {
    it("cancel fn is undefined, so component renders a comment", () => {
      test("./cases/navigating/mount");
    });
  });

  describe("while navigating", () => {
    describe("to synchronous routes", () => {
      it("cancel fn is undefined, so component renders a comment", () => {
        test("./cases/navigating/nav-sync");
      });
    });

    describe("to asynchronous routes", () => {
      it("cancel is a function, renders slot", done => {
        test("./cases/navigating/nav-async", done);
      });
    });
  });

  describe("calling the cancel function", () => {
    it("cancels the navigation", done => {
      test("./cases/navigating/call", done);
    });
  });
});
