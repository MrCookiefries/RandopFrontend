const parseStringNums = require("./parseStringNums");

describe("parses values to nums in obj at keys", () => {
	let obj;

	beforeEach(() => {
		obj = {
			age: "20",
			height: "1.86",
			name: "Drake"
		};
	});

	test("parses integers", () => {
		parseStringNums(obj, ["age"]);
		expect(obj.age).toBe(20);
	});

	test("parses floats", () => {
		parseStringNums(obj, ["height"]);
		expect(obj.height).toBe(1.86);
	});

	test("parses strings", () => {
		parseStringNums(obj, ["name"]);
		expect(obj.name).toBeNaN();
	});

	test("doesn't parse non-existent keys", () => {
		const key = "notHere";
		parseStringNums(obj, [key]);
		expect(key in obj).toBeFalsy();
	});
});
