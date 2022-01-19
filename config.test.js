describe("config uses env vars", () => {
	beforeEach(() => {
		process.env.SECRET_KEY = "awesome";
		process.env.PORT = "8080";
		process.env.NODE_ENV = "nope";
	});

	test("works", () => {
		const config = require("./config");

		expect(config.secretKey).toBe("awesome");
		expect(config.portNum).toBe(8080);
		expect(config.bcryptWorkFactor).toBe(12);
	});

	afterEach(() => {
		delete process.env.SECRET_KEY;
		delete process.env.PORT;
		delete process.env.DATABASE_URL;
		delete process.env.NODE_ENV;
	});
});
