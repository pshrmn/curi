import "jest";

import { prefer_default } from "@curi/helpers";

describe("prefer_default()", () => {
  it('resolves with the "default" export if it exists', done => {
    function fake_default() {}
    const with_default = {
      default: fake_default
    };
    Promise.resolve(with_default)
      .then(prefer_default)
      .then(module => {
        expect(module).toBe(fake_default);
        done();
      });
  });

  it('resolves with the entire module if "default" does not exist', done => {
    const no_default = {};
    Promise.resolve(no_default)
      .then(prefer_default)
      .then(module => {
        expect(module).toBe(no_default);
        done();
      });
  });
});
