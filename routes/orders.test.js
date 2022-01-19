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
			.get(`/orders`);

		expect(resp.statusCode).toBe(401);
	});

	test("user", async () => {
		const resp = await request(app)
			.get(`/orders`)
			.set("authorization", `Bearer ${userToken}`);

		expect(resp.statusCode).toBe(403);
	});

	test("response (admin)", async () => {
		const resp = await request(app)
			.get(`/orders`)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(200);
		expect(resp.body).toEqual(expect.objectContaining({
			orders: expect.arrayContaining([expect.objectContaining({
				id: expect.any(Number), items: expect.any(Array),
				userId: 1, checkoutDate: expect.any(String)
			})])
		}));
	});

	test("response (filters)", async () => {
		const resp = await request(app)
			.get(`/orders`)
			.query({ limit: 1, offset: 1 })
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(200);
		expect(resp.body).toEqual(expect.objectContaining({
			orders: expect.arrayContaining([expect.objectContaining({
				id: expect.any(Number), items: expect.any(Array),
				userId: 3, checkoutDate: expect.any(String)
			})])
		}));
	});
});

describe("post /:cartId", () => {
	const cartID = 4;

	test("anon", async () => {
		const resp = await request(app)
			.post(`/orders/${cartID}`);

		expect(resp.statusCode).toBe(401);
	});

	test("user", async () => {
		const resp = await request(app)
			.post(`/orders/5`)
			.set("authorization", `Bearer ${userToken}`);

		expect(resp.statusCode).toBe(403);
	});

	test("response (owner)", async () => {
		const resp = await request(app)
			.post(`/orders/${cartID}`)
			.set("authorization", `Bearer ${userToken}`);

		expect(resp.statusCode).toBe(201);
		expect(resp.body).toEqual(expect.objectContaining({
			order: expect.objectContaining({
				userId: expect.any(Number),
				id: cartID, items: expect.any(Array),
				checkoutDate: expect.any(String)
			})
		}));
	});

	test("response (admin)", async () => {
		const resp = await request(app)
			.post(`/orders/${cartID}`)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(403);
	});

	test("no data", async () => {
		const resp = await request(app)
			.post(`/orders/${cartID}`)
			.set("authorization", `Bearer ${userToken}`);

		expect(resp.statusCode).toBe(201);
	});
});
