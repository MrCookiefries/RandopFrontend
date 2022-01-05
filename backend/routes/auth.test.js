const request = require("supertest");

const app = require("../app");
const {
	commonBeforeAll, commonBeforeEach,
	commonAfterEach, commonAfterAll,
	userToken, adminToken
} = require("../commonSetups");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("post /", () => {
	let newLogin;

	beforeEach(() => {
		newLogin = {
			email: "u@1",
			password: "password"
		};
	});

	test("anon", async () => {
		const resp = await request(app)
			.post(`/auth`)
			.send(newLogin);

		expect(resp.statusCode).toBe(201);
	});

	test("user", async () => {
		const resp = await request(app)
			.post(`/auth`)
			.send(newLogin)
			.set("authorization", `Bearer ${userToken}`);

		expect(resp.statusCode).toBe(201);
	});

	test("response (admin)", async () => {
		const resp = await request(app)
			.post(`/auth`)
			.send(newLogin)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(201);
		expect(resp.body).toEqual(expect.objectContaining({
			user: expect.objectContaining({
				email: newLogin.email,
				id: expect.any(Number),
				isAdmin: true,
				name: "name"
			}),
			token: expect.any(String)
		}));
	});

	test("no data", async () => {
		const resp = await request(app)
			.post(`/auth`)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});

	test("missing data", async () => {
		delete newLogin.password;

		const resp = await request(app)
			.post(`/auth`)
			.send(newLogin)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});

	test("wrong data types", async () => {
		newLogin.email = -150;

		const resp = await request(app)
			.post(`/auth`)
			.send(newLogin)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});

	test("invalid values", async () => {
		newLogin.email = "not an email";

		const resp = await request(app)
			.post(`/auth`)
			.send(newLogin)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});

	test("extra values", async () => {
		newLogin.year = 2008;

		const resp = await request(app)
			.post(`/auth`)
			.send(newLogin)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(201);
	});
});
