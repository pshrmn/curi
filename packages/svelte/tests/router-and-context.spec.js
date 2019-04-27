function test(file, done) {
  require(file).default(done);
}

describe("getRouter", () => {
  it("accesses the router object through the context", () => {
    test("./cases/context/router");
  });
});

describe("getResponse", () => {
  it("accesses the response store through the context", () => {
    test("./cases/context/initial-response");
  });

  it("it updates when the store updates", done => {
    test("./cases/context/updated-response", done);
  });
});

describe("getResponse", () => {
  it("accesses the navigation store through the context", () => {
    test("./cases/context/initial-navigation");
  });

  it("it updates when the store updates", done => {
    test("./cases/context/updated-navigation", done);
  });
});
