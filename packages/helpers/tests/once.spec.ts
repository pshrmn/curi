import "jest";

import { once } from "@curi/helpers";

describe("once()", () => {
  it("wraps a promise returning function", () => {
    let fn = () => Promise.resolve();
    let wrapped = once(fn);
    expect(typeof wrapped).toBe("function");
  });

  it("wrapped function returns a promise", () => {
    let fn = () => Promise.resolve();
    let wrapped = once(fn);
    expect(wrapped()).toBeInstanceOf(Promise);
  });

  it("wrapped function re-uses results on subsequent calls", async done => {
    let calls = 0;
    let fn = () => Promise.resolve(calls++);
    let wrapped = once(fn);
    let first = await wrapped();
    expect(first).toBe(0);
    let second = await wrapped();
    expect(second).toBe(0);
    done();
  });
});
