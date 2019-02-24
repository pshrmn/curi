import "jest";

import { preferDefault } from "@curi/helpers";

describe("preferDefault()", () => {
  it('resolves with the "default" export if it exists', done => {
    function fakeDefault() {}
    const withDefault = {
      default: fakeDefault
    };
    Promise.resolve(withDefault)
      .then(preferDefault)
      .then(module => {
        expect(module).toBe(fakeDefault);
        done();
      });
  });

  it('resolves with the entire module if "default" does not exist', done => {
    const noDefault = {};
    Promise.resolve(noDefault)
      .then(preferDefault)
      .then(module => {
        expect(module).toBe(noDefault);
        done();
      });
  });
});
