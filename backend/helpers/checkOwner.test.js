const ExpressError = require("../ExpressError");
const checkOwner = require("./checkOwner");

describe("validates a user id matches an owner's", () => {
	test("matching ids", () => {
		expect(checkOwner(1, 1)).toBeUndefined();
	});

	test("different ids", () => {
		expect(
			() => checkOwner(1, 2)
		).toThrowError(ExpressError);
	});
});
