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
			.get(`/products`);

		expect(resp.statusCode).toBe(200);
	});

	test("user", async () => {
		const resp = await request(app)
			.get(`/products`)
			.set("authorization", `Bearer ${userToken}`);

		expect(resp.statusCode).toBe(200);
	});

	test("response (admin)", async () => {
		const resp = await request(app)
			.get(`/products`)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(200);

		const productsJest = [];
		for (let i = 1; i <= 6; i++) {
			productsJest.push(
				expect.objectContaining({
					id: `p${i}`,
					name: "name",
					image: "image",
					price: "100"
				})
			);
		}
		expect(resp.body).toEqual(expect.objectContaining({
			products: expect.arrayContaining(productsJest)
		}));
	});

	test("filters (limit & offset)", async () => {
		const resp = await request(app)
			.get(`/products`)
			.query({ limit: "1", offset: "3" })
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(200);
		expect(resp.body).toEqual(expect.objectContaining({
			products: expect.arrayContaining([
				expect.objectContaining({
					id: "p4",
					name: "name",
					image: "image",
					price: "100"
				})
			])
		}));
	});
});

describe("get /:id", () => {
	const productId = "p1";

	test("anon", async () => {
		const resp = await request(app)
			.get(`/products/${productId}`);

		expect(resp.statusCode).toBe(200);
	});

	test("user", async () => {
		const resp = await request(app)
			.get(`/products/${productId}`)
			.set("authorization", `Bearer ${userToken}`);

		expect(resp.statusCode).toBe(200);
	});

	test("response (admin)", async () => {
		const resp = await request(app)
			.get(`/products/${productId}`)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(200);
		expect(resp.body).toEqual(expect.objectContaining({
			product: expect.objectContaining({
				id: productId,
				name: expect.any(String),
				image: expect.any(String),
				price: expect.any(String),
				option1: null,
				option2: null
			})
		}));
	});

	test("not found", async () => {
		const resp = await request(app)
			.get(`/products/nope`)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});
});

describe("post /", () => {
	let newProduct;

	beforeEach(() => {
		newProduct = {
			name: "name",
			image: "image",
			price: 100
		};
	});

	test("anon", async () => {
		const resp = await request(app)
			.post(`/products`)
			.send(newProduct);

		expect(resp.statusCode).toBe(401);
	});

	test("user", async () => {
		const resp = await request(app)
			.post(`/products`)
			.send(newProduct)
			.set("authorization", `Bearer ${userToken}`);

		expect(resp.statusCode).toBe(403);
	});

	test("response (admin)", async () => {
		const resp = await request(app)
			.post(`/products`)
			.send(newProduct)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(201);
		expect(resp.body).toEqual(expect.objectContaining({
			product: expect.objectContaining({
				id: expect.any(String),
				...newProduct,
				option1: null,
				option2: null,
				price: newProduct.price.toString()
			})
		}));
	});

	test("no data", async () => {
		const resp = await request(app)
			.post(`/products`)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});

	test("missing data", async () => {
		delete newProduct.price;

		const resp = await request(app)
			.post(`/products`)
			.send(newProduct)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});

	test("wrong data types", async () => {
		newProduct.price = "wrong";

		const resp = await request(app)
			.post(`/products`)
			.send(newProduct)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});

	test("invalid values", async () => {
		newProduct.price = -480;

		const resp = await request(app)
			.post(`/products`)
			.send(newProduct)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});

	test("extra values", async () => {
		newProduct.year = 2008;

		const resp = await request(app)
			.post(`/products`)
			.send(newProduct)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(201);
	});
});

describe("patch /:id", () => {
	const productId = "p1";
	let newVals;

	beforeEach(() => {
		newVals = {
			option1: "Green",
			image: "new image"
		};
	});

	test("anon", async () => {
		const resp = await request(app)
			.patch(`/products/${productId}`)
			.send(newVals);

		expect(resp.statusCode).toBe(401);
	});

	test("user", async () => {
		const resp = await request(app)
			.patch(`/products/${productId}`)
			.send(newVals)
			.set("authorization", `Bearer ${userToken}`);

		expect(resp.statusCode).toBe(403);
	});

	test("response (admin)", async () => {
		const resp = await request(app)
			.patch(`/products/${productId}`)
			.send(newVals)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(200);
		expect(resp.body).toEqual(expect.objectContaining({
			product: expect.objectContaining({
				id: productId,
				name: expect.any(String),
				price: expect.any(String),
				option2: null,
				...newVals
			})
		}));
	});

	test("not found", async () => {
		newVals.year = 2891;

		const resp = await request(app)
			.patch(`/products/nope`)
			.send(newVals)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});

	test("no data", async () => {
		const resp = await request(app)
			.patch(`/products/${productId}`)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});

	test("missing data", async () => {
		const resp = await request(app)
			.patch(`/products/${productId}`)
			.send({})
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});

	test("wrong data types", async () => {
		newVals.image = 294;

		const resp = await request(app)
			.patch(`/products/${productId}`)
			.send(newVals)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});

	test("invalid values", async () => {
		newVals.price = -1378;

		const resp = await request(app)
			.patch(`/products/${productId}`)
			.send(newVals)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});

	test("extra values", async () => {
		newVals.year = 2891;

		const resp = await request(app)
			.patch(`/products/${productId}`)
			.send(newVals)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});
});

describe("delete /:id", () => {
	const productId = "p1";

	test("anon", async () => {
		const resp = await request(app)
			.delete(`/products/${productId}`);

		expect(resp.statusCode).toBe(401);
	});

	test("user", async () => {
		const resp = await request(app)
			.delete(`/products/${productId}`)
			.set("authorization", `Bearer ${userToken}`);

		expect(resp.statusCode).toBe(403);
	});

	test("response (admin)", async () => {
		const resp = await request(app)
			.delete(`/products/${productId}`)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(204);
		expect(resp.body).toEqual({});
	});

	test("not found", async () => {
		const resp = await request(app)
			.delete(`/products/nope`)
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.statusCode).toBe(400);
	});
});
