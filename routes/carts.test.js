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

describe("get /", () => {
	test("anon", async () => {
		const resp = await request(app)
			.get(`/carts`);

		expect(resp.statusCode).toBe(401);
	});

	test("user", async () => {
		const resp = await request(app)
			.get(`/carts`)
			.set("authorization", `Bearer ${userToken}`);

		expect(resp.statusCode).toBe(200);
	});

	test("response (admin)", async () => {
		const resp = await request(app)
			.get(`/carts`)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(200);
		expect(resp.body).toEqual(expect.objectContaining({
			carts: expect.arrayContaining([expect.objectContaining({
				id: 1, userId: 1
			})])
		}));
	});
});

describe("post /", () => {
	test("anon", async () => {
		const resp = await request(app)
			.post(`/carts`);

		expect(resp.statusCode).toBe(401);
	});

	test("user", async () => {
		const resp = await request(app)
			.post(`/carts`)
			.set("authorization", `Bearer ${userToken}`);

		expect(resp.statusCode).toBe(201);
	});

	test("response (admin)", async () => {
		const resp = await request(app)
			.post(`/carts`)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(201);
		expect(resp.body).toEqual(expect.objectContaining({
			cart: expect.objectContaining({
				userId: 1,
				id: expect.any(Number)
			})
		}));
	});

	test("no data", async () => {
		const resp = await request(app)
			.post(`/carts`)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(201);
	});
});

describe("delete /:cartId", () => {
	const cartId = 1;

	test("anon", async () => {
		const resp = await request(app)
			.delete(`/carts/${cartId}`);

		expect(resp.statusCode).toBe(401);
	});

	test("user", async () => {
		const resp = await request(app)
			.delete(`/carts/${cartId}`)
			.set("authorization", `Bearer ${userToken}`);

		expect(resp.statusCode).toBe(403);
	});

	test("owner", async () => {
		const resp = await request(app)
			.delete(`/carts/2`)
			.set("authorization", `Bearer ${userToken}`);

		expect(resp.statusCode).toBe(204);
	});

	test("response (admin)", async () => {
		const resp = await request(app)
			.delete(`/carts/${cartId}`)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(204);
		expect(resp.body).toEqual({});
	});

	test("not found", async () => {
		const resp = await request(app)
			.delete(`/carts/0`)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});
});
