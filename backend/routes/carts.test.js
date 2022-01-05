const request = require("supertest");

const app = require("../app");
const {
	commonBeforeAll, commonBeforeEach,
	commonAfterEach, commonAfterAll
} = require("../commonSetups");
const db = require("../database");
const createToken = require("../helpers/createToken");

// used for JWT creation
let user;
let admin;
// used for tokens with valid user IDs
let userToken;
let adminToken;

beforeAll(async () => {
	await commonBeforeAll();
	// fetch users
	const { rows: users } = await db.query(
		`SELECT id, is_admin AS "isAdmin"
		FROM users`
	);
	// extract a user & an admin
	user = users.find(u => !u.isAdmin);
	admin = users.find(u => u.isAdmin);
	// create new JWTs for them
	userToken = createToken(user);
	adminToken = createToken(admin);
});
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

		const cartsJest = [];
		for (let i = 1; i <= 2; i++) {
			cartsJest.push(
				expect.objectContaining({
					productId: `p${i}`,
					userId: admin.id,
					quantity: 2
				})
			);
		}
		expect(resp.body).toEqual(expect.objectContaining({
			carts: expect.arrayContaining(cartsJest)
		}));
	});
});

describe("post /", () => {
	let newCart;

	beforeEach(() => {
		newCart = {
			productId: "p6"
		};
	});

	test("anon", async () => {
		const resp = await request(app)
			.post(`/carts`)
			.send(newCart);

		expect(resp.statusCode).toBe(401);
	});

	test("user", async () => {
		const resp = await request(app)
			.post(`/carts`)
			.send(newCart)
			.set("authorization", `Bearer ${userToken}`);

		expect(resp.statusCode).toBe(201);
	});

	test("response (admin)", async () => {
		const resp = await request(app)
			.post(`/carts`)
			.send(newCart)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(201);
		expect(resp.body).toEqual(expect.objectContaining({
			cart: expect.objectContaining({
				...newCart,
				quantity: 1
			})
		}));
	});

	test("no data", async () => {
		const resp = await request(app)
			.post(`/carts`)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});

	test("missing data", async () => {
		delete newCart.productId;

		const resp = await request(app)
			.post(`/carts`)
			.send(newCart)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});

	test("wrong data types", async () => {
		newCart.productId = -150;

		const resp = await request(app)
			.post(`/carts`)
			.send(newCart)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});

	test("invalid values", async () => {
		newCart.quantity = -4;

		const resp = await request(app)
			.post(`/carts`)
			.send(newCart)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});

	test("extra values", async () => {
		newCart.year = 2008;

		const resp = await request(app)
			.post(`/carts`)
			.send(newCart)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(201);
	});
});

describe("patch /:userId/:productId", () => {
	const productId = "p3";
	let newVals;

	beforeEach(() => {
		newVals = {
			quantity: 4
		};
	});

	test("anon", async () => {
		const resp = await request(app)
			.patch(`/carts/${user.id}/${productId}`)
			.send(newVals);

		expect(resp.statusCode).toBe(401);
	});

	test("user", async () => {
		const resp = await request(app)
			.patch(`/carts/${admin.id}/p1`)
			.send(newVals)
			.set("authorization", `Bearer ${userToken}`);

		expect(resp.statusCode).toBe(403);
	});

	test("owner", async () => {
		const resp = await request(app)
			.patch(`/carts/${user.id}/${productId}`)
			.send(newVals)
			.set("authorization", `Bearer ${userToken}`);

		expect(resp.statusCode).toBe(200);
	});

	test("response (admin)", async () => {
		const resp = await request(app)
			.patch(`/carts/${user.id}/${productId}`)
			.send(newVals)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(200);
		expect(resp.body).toEqual(expect.objectContaining({
			cart: expect.objectContaining({
				userId: user.id,
				productId,
				...newVals
			})
		}));
	});

	test("not found", async () => {
		const resp = await request(app)
			.patch(`/carts/0/nope`)
			.send(newVals)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});

	test("no data", async () => {
		const resp = await request(app)
			.patch(`/carts/${user.id}/${productId}`)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});

	test("missing data", async () => {
		const resp = await request(app)
			.patch(`/carts/${user.id}/${productId}`)
			.send({})
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});

	test("wrong data types", async () => {
		newVals.quantity = "wrong";

		const resp = await request(app)
			.patch(`/carts/${user.id}/${productId}`)
			.send(newVals)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});

	test("invalid values", async () => {
		newVals.quantity = -1378;

		const resp = await request(app)
			.patch(`/carts/${user.id}/${productId}`)
			.send(newVals)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});

	test("extra values", async () => {
		newVals.year = 2891;

		const resp = await request(app)
			.patch(`/carts/${user.id}/${productId}`)
			.send(newVals)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});
});

describe("delete /:id", () => {
	const productId = "p3";

	test("anon", async () => {
		const resp = await request(app)
			.delete(`/carts/${user.id}/${productId}`);

		expect(resp.statusCode).toBe(401);
	});

	test("user", async () => {
		const resp = await request(app)
			.delete(`/carts/${admin.id}/p1}`)
			.set("authorization", `Bearer ${userToken}`);

		expect(resp.statusCode).toBe(403);
	});

	test("owner", async () => {
		const resp = await request(app)
			.delete(`/carts/${user.id}/${productId}`)
			.set("authorization", `Bearer ${userToken}`);

		expect(resp.statusCode).toBe(204);
	});

	test("response (admin)", async () => {
		const resp = await request(app)
			.delete(`/carts/${user.id}/${productId}`)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(204);
		expect(resp.body).toEqual({});
	});

	test("not found", async () => {
		const resp = await request(app)
			.delete(`/carts/0/nope`)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});
});
