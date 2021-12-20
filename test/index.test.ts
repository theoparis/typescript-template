import { main } from "../src/index.js";

describe("main()", () => {
  it("Should contain hello", () => {
    expect(main()).toEqual("hello world!");
  });
});
