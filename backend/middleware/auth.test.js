const jwt = require("jsonwebtoken");

const { authenticateJWT } = require("./auth");
const { secretKey } = require("../config");

const goodJwt = jwt.sign({ id: 0, isAdmin: false }, secretKey);
const badJwt = jwt.sign({ id: 0, isAdmin: false }, "different key");

describe("req token to res payload", () => {
	let req;
	let res;
	const next = err => {
		expect(err).toBeUndefined();
	};

	beforeEach(() => {
		req = { headers: {} };
		res = {};
	});

	test("good jwt", () => {
		req.headers.authorization = `Bearer ${goodJwt}`;
		authenticateJWT(req, res, next);

		expect(res.user).toEqual(
			expect.objectContaining({
				iat: expect.any(Number),
				id: 0,
				isAdmin: false
			})
		);
	});

	test("no jwt", () => {
		authenticateJWT(req, res, next);

		expect(res.user).toBeUndefined();
	});

	test("invalid jwt", () => {
		req.headers.authorization = `Bearer ${badJwt}`;
		authenticateJWT(req, res, next);

		expect(res.user).toBeUndefined();
	});
});
