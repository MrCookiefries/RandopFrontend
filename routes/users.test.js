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

describe("get /:userId", () => {
	const userId = 3;

	test("anon", async () => {
		const resp = await request(app)
			.get(`/users/${userId}`);

		expect(resp.statusCode).toBe(401);
	});

	test("user", async () => {
		const resp = await request(app)
			.get(`/users/${userId}`)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(403);
	});

	test("response (owner)", async () => {
		const resp = await request(app)
			.get(`/users/${userId}`)
			.set("authorization", `Bearer ${userToken}`);

		expect(resp.statusCode).toBe(200);
		expect(resp.body).toEqual(expect.objectContaining({
			user: expect.objectContaining({
				email: "u@3", id: userId,
				isAdmin: false, name: "name",
				stripeId: null
			}),
		}));
	});
});

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
				name: "name",
				stripeId: null
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

describe("patch /:id", () => {
	const userId = 3;
	let newVals;

	beforeEach(() => {
		newVals = {
			stripeId: "ksla3857alkgj82375"
		};
	});

	test("anon", async () => {
		const resp = await request(app)
			.patch(`/users/${userId}`)
			.send(newVals);

		expect(resp.statusCode).toBe(401);
	});

	test("user", async () => {
		const resp = await request(app)
			.patch(`/users/6`)
			.send(newVals)
			.set("authorization", `Bearer ${userToken}`);

		expect(resp.statusCode).toBe(403);
	});

	test("owner", async () => {
		const resp = await request(app)
			.patch(`/users/${userId}`)
			.send(newVals)
			.set("authorization", `Bearer ${userToken}`);

		expect(resp.statusCode).toBe(200);
	});

	test("response (admin)", async () => {
		const resp = await request(app)
			.patch(`/users/${userId}`)
			.send(newVals)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(200);
		expect(resp.body).toEqual(expect.objectContaining({
			user: expect.objectContaining({
				id: userId,
				name: "name",
				isAdmin: false,
				email: expect.any(String),
				...newVals
			})
		}));
	});

	test("not found", async () => {
		const resp = await request(app)
			.patch(`/users/0`)
			.send(newVals)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});

	test("no data", async () => {
		const resp = await request(app)
			.patch(`/users/${userId}`)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});

	test("missing data", async () => {
		const resp = await request(app)
			.patch(`/users/${userId}`)
			.send({})
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});

	test("wrong data types", async () => {
		newVals.stripeId = 252;

		const resp = await request(app)
			.patch(`/users/${userId}`)
			.send(newVals)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});

	test("invalid values", async () => {
		newVals.stripeId = "";

		const resp = await request(app)
			.patch(`/users/${userId}`)
			.send(newVals)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});

	test("extra values", async () => {
		newVals.year = 2891;

		const resp = await request(app)
			.patch(`/users/${userId}`)
			.send(newVals)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});
});
