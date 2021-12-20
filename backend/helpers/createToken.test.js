const jwt = require("jsonwebtoken");

const { secretKey } = require("../config");
const createToken = require("./createToken");

describe("creates a signed JWT", () => {
	const payload = { id: 1, isAdmin: true };
	const token = createToken(payload);

	test("returns a string, not an object", () => {
		expect(token).toEqual(expect.any(String));
		expect(token).not.toEqual(expect.any(Object));
	});

	test("decodes to the same data", () => {
		expect(jwt.decode(token)).toEqual(expect.objectContaining({
			...payload
		}));
	});

	test("verifies with right secret key", () => {
		expect(jwt.verify(token, secretKey)).toEqual(expect.objectContaining({
			...payload
		}));
	});

	test("fails to verify with wrong secret key", () => {
		expect(
			() => jwt.verify(token, "notTheSecretKey")
		).toThrowError(jwt.JsonWebTokenError);
	});
});
