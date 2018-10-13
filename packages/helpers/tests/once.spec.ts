import "jest";

// @ts-ignore (resolved by jest)
import { once } from "@curi/helpers";

describe("once()", () => {
  it("wraps a promise returning function", () => {
    const fn = () => Promise.resolve();
    const wrapped = once(fn);
    expect(typeof wrapped).toBe("function");
  });

  it("wrapped function returns a promise", () => {
    const fn = () => Promise.resolve();
    const wrapped = once(fn);
    expect(wrapped()).toBeInstanceOf(Promise);
  });

  it("wrapped function re-uses results on subsequent calls", async done => {
    let calls = 0;
    const fn = () => Promise.resolve(calls++);
    const wrapped = once(fn);
    const firstResult = await wrapped();
    expect(firstResult).toBe(0);
    const secondResult = await wrapped();
    expect(secondResult).toBe(0);
    done();
  });
});
