import { main } from "../src";
import { expect } from "chai";

describe("main()", () => {
    it("Should contain hello", () => {
        expect(main()).to.contain("hello");
    });
});
