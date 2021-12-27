const {
	commonBeforeAll, commonBeforeEach,
	commonAfterEach, commonAfterAll
} = require("./commonSetups");

let userId;
let newCart;
const quantity = 4;

beforeAll(async () => {
	await commonBeforeAll();
	userId = (await db.query(
		`SELECT id FROM users
		WHERE email = 'u@1'`
	)).rows[0].id;
	newCart = {
		userId,
		productId: "p6"
	};
});
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

const db = require("../database");
const Cart = require("./Cart");
const ExpressError = require("../ExpressError");

describe("helpers", () => {
	test("duplicates", async () => {
		// new ID
		await expect(
			Cart.checkDuplicate(0, "nope")
		).resolves.toBeUndefined();
		// already used ID
		await expect(
			Cart.checkDuplicate(userId, "p1")
		).rejects.toThrowError(ExpressError);
	});
});

describe("fetching", () => {
	test("not found", async () => {
		await expect(
			Cart.getById(0, "nope")
		).rejects.toThrowError(ExpressError);
	});

	test("get one", async () => {
		const cart = await Cart.getById(userId, "p1");

		expect(cart).toEqual(
			expect.objectContaining({
				userId,
				productId: "p1",
				quantity: 2
			})
		);
	});

	test("get many", async () => {
		const carts = await Cart.getMany();
		const cartsJest = [];
		for (let i = 1; i <= 6; i++) {
			cartsJest.push(
				expect.objectContaining({
					quantity: 2,
					productId: expect.any(String),
					userId: expect.any(Number)
				})
			);
		}

		expect(carts).toEqual(
			expect.arrayContaining(cartsJest)
		);
	});
});

describe("creation", () => {
	test("duplicate", async () => {
		await expect(
			Cart.addNew({ userId, productId: "p1" })
		).rejects.toThrowError(ExpressError);
	});

	test("add one", async () => {
		const cart = await Cart.addNew(newCart);

		expect(cart).toEqual(expect.objectContaining({
			...newCart,
			quantity: 1
		}));
	});
});

describe("deletion", () => {
	test("not found", async () => {
		await expect(
			Cart.deleteById(0, "nope")
		).rejects.toThrowError(ExpressError);
	});

	test("delete one", async () => {
		const cart = await Cart.addNew(newCart);

		expect(cart.delete()).resolves.toBeUndefined();
	});
});

describe("update", () => {
	test("not found", async () => {
		await expect(
			Cart.updateById(0, "nope")
		).rejects.toThrowError(ExpressError);
	});

	test("update one", async () => {
		const cart = await (
			await Cart.addNew(newCart)
		).update({ quantity });

		expect(cart).toEqual(expect.objectContaining({
			...newCart,
			quantity
		}));
	});
});
