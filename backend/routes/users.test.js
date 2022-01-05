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
	let newUser;

	beforeEach(() => {
		newUser = {
			email: "new@user",
			password: "password",
			name: "name"
		};
	});

	test("anon", async () => {
		const resp = await request(app)
			.post(`/users`)
			.send(newUser);

		expect(resp.statusCode).toBe(201);
	});

	test("user", async () => {
		const resp = await request(app)
			.post(`/users`)
			.send(newUser)
			.set("authorization", `Bearer ${userToken}`);

		expect(resp.statusCode).toBe(201);
	});

	test("response (admin)", async () => {
		const resp = await request(app)
			.post(`/users`)
			.send(newUser)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(201);
		expect(resp.body).toEqual(expect.objectContaining({
			user: expect.objectContaining({
				email: newUser.email,
				id: expect.any(Number),
				isAdmin: false,
				name: "name"
			}),
			token: expect.any(String)
		}));
	});

	test("no data", async () => {
		const resp = await request(app)
			.post(`/users`)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});

	test("missing data", async () => {
		delete newUser.password;

		const resp = await request(app)
			.post(`/users`)
			.send(newUser)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});

	test("wrong data types", async () => {
		newUser.password = 2195;

		const resp = await request(app)
			.post(`/users`)
			.send(newUser)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});

	test("invalid values", async () => {
		newUser.email = "not an email";

		const resp = await request(app)
			.post(`/users`)
			.send(newUser)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});

	test("extra values", async () => {
		newUser.year = 2008;

		const resp = await request(app)
			.post(`/users`)
			.send(newUser)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(201);
	});
});
