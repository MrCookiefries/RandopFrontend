import formatName from "./formatName";

describe("works", () => {
	test("no hyphens", () => {
		expect(formatName("no hyphens")).toBe("No hyphens");
	});

	test("with hyphens", () => {
		expect(formatName("with-hyphens")).toBe("With Hyphens");
	});
});
