import { main } from "../src";
import { expect } from "chai";

describe("Main", () => {
    it("main()", () => {
        it("Should contain hello", () => {
            expect(main()).to.contain("hello");
        });
    });
});
