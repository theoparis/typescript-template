import { main } from "..";

describe("main()", () => {
    it("Should contain hello", () => {
        expect(main()).toEqual("hello world!");
    });
});
