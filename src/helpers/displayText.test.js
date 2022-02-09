import displayText from "./displayText";

describe("works", () => {
	test("one word", () => {
		expect(displayText("word")).toEqual("Word");
	});

	test("many words", () => {
		expect(displayText("manyWords")).toEqual("Many Words");
	});
});
