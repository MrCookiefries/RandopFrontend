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

const cartId = 1;

describe("get /", () => {
	test("anon", async () => {
		const resp = await request(app)
			.get(`/cartItems/${cartId}`);

		expect(resp.statusCode).toBe(401);
	});

	test("user", async () => {
		const resp = await request(app)
			.get(`/cartItems/${cartId}`)
			.set("authorization", `Bearer ${userToken}`);

		expect(resp.statusCode).toBe(403);
	});

	test("owner", async () => {
		const resp = await request(app)
			.get(`/cartItems/2`)
			.set("authorization", `Bearer ${userToken}`);

		expect(resp.statusCode).toBe(200);
	});

	test("response (admin)", async () => {
		const resp = await request(app)
			.get(`/cartItems/${cartId}`)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(200);
		expect(resp.body).toEqual(expect.objectContaining({
			cartItems: expect.arrayContaining([expect.objectContaining({
				cartId, productId: "p1", quantity: 1
			})])
		}));
	});
});

describe("post /", () => {
	let newCartItem;

	beforeEach(() => {
		newCartItem = {
			cartId, productId: "p6"
		};
	});

	test("anon", async () => {
		const resp = await request(app)
			.post(`/cartItems`)
			.send(newCartItem);

		expect(resp.statusCode).toBe(401);
	});

	test("user", async () => {
		const resp = await request(app)
			.post(`/cartItems`)
			.send(newCartItem)
			.set("authorization", `Bearer ${userToken}`);

		expect(resp.statusCode).toBe(403);
	});

	test("owner", async () => {
		newCartItem.cartId = 2;

		const resp = await request(app)
			.post(`/cartItems`)
			.send(newCartItem)
			.set("authorization", `Bearer ${userToken}`);

		expect(resp.statusCode).toBe(201);
	});

	test("response (admin)", async () => {
		const resp = await request(app)
			.post(`/cartItems`)
			.send(newCartItem)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(201);
		expect(resp.body).toEqual(expect.objectContaining({
			cartItem: expect.objectContaining({
				...newCartItem, quantity: 1
			})
		}));
	});

	test("no data", async () => {
		const resp = await request(app)
			.post(`/cartItems`)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});

	test("missing data", async () => {
		delete newCartItem.productId;

		const resp = await request(app)
			.post(`/cartItems`)
			.send(newCartItem)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});

	test("wrong data types", async () => {
		newCartItem.cartId = "wrong";

		const resp = await request(app)
			.post(`/cartItems`)
			.send(newCartItem)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});

	test("invalid values", async () => {
		newCartItem.quantity = 0;

		const resp = await request(app)
			.post(`/cartItems`)
			.send(newCartItem)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});

	test("extra values", async () => {
		newCartItem.year = 2008;

		const resp = await request(app)
			.post(`/cartItems`)
			.send(newCartItem)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(201);
	});
});

describe("patch /", () => {
	let newVals;

	beforeEach(() => {
		newVals = {
			cartId, productId: "p1", quantity: 4
		};
	});

	test("anon", async () => {
		const resp = await request(app)
			.patch(`/cartItems`)
			.send(newVals);

		expect(resp.statusCode).toBe(401);
	});

	test("user", async () => {
		const resp = await request(app)
			.patch(`/cartItems`)
			.send(newVals)
			.set("authorization", `Bearer ${userToken}`);

		expect(resp.statusCode).toBe(403);
	});

	test("owner", async () => {
		newVals.cartId = 2;

		const resp = await request(app)
			.patch(`/cartItems`)
			.send(newVals)
			.set("authorization", `Bearer ${userToken}`);

		expect(resp.statusCode).toBe(200);
	});

	test("response (admin)", async () => {
		const resp = await request(app)
			.patch(`/cartItems`)
			.send(newVals)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(200);
		expect(resp.body).toEqual(expect.objectContaining({
			cartItem: expect.objectContaining({
				...newVals
			})
		}));
	});

	test("not found", async () => {
		newVals.productId = "no existe";

		const resp = await request(app)
			.patch(`/cartItems`)
			.send(newVals)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});

	test("no data", async () => {
		const resp = await request(app)
			.patch(`/cartItems`)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});

	test("missing data", async () => {
		const resp = await request(app)
			.patch(`/cartItems`)
			.send({})
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});

	test("wrong data types", async () => {
		newVals.quantity = "duck";

		const resp = await request(app)
			.patch(`/cartItems`)
			.send(newVals)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});

	test("invalid values", async () => {
		newVals.quantity = -1378;

		const resp = await request(app)
			.patch(`/cartItems`)
			.send(newVals)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});

	test("extra values", async () => {
		newVals.year = 2891;

		const resp = await request(app)
			.patch(`/cartItems`)
			.send(newVals)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});
});

describe("delete /:cartId/:productId", () => {
	const productId = "p1";

	test("anon", async () => {
		const resp = await request(app)
			.delete(`/cartItems/${cartId}/${productId}`);

		expect(resp.statusCode).toBe(401);
	});

	test("user", async () => {
		const resp = await request(app)
			.delete(`/cartItems/${cartId}/${productId}`)
			.set("authorization", `Bearer ${userToken}`);

		expect(resp.statusCode).toBe(403);
	});

	test("owner", async () => {
		const resp = await request(app)
			.delete(`/cartItems/2/${productId}`)
			.set("authorization", `Bearer ${userToken}`);

		expect(resp.statusCode).toBe(204);
	});

	test("response (admin)", async () => {
		const resp = await request(app)
			.delete(`/cartItems/${cartId}/${productId}`)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(204);
		expect(resp.body).toEqual({});
	});

	test("not found", async () => {
		const resp = await request(app)
			.delete(`/cartItems/${cartId}/nope`)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});
});
