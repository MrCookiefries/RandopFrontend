import removeFalseyValues from "./removeFalseyValues";

describe("works", () => {
	test("all false", () => {
		expect(removeFalseyValues({ test: false })).toEqual({});
	});

	test("some false", () => {
		expect(removeFalseyValues({ test: false, age: 12 })).toEqual({ age: 12 });
	});

	test("none false", () => {
		expect(removeFalseyValues({ age: 12, name: "bob" })).toEqual({ age: 12, name: "bob" });
	});
});
