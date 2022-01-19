const {
	commonBeforeAll, commonBeforeEach,
	commonAfterEach, commonAfterAll
} = require("../commonSetups");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

const ExpressError = require("../ExpressError");
const CartItem = require("./CartItem");

const cartId = 2;
const productId = "p3";
const quantity = 4;

describe("helpers", () => {
	test("check duplicate", async () => {
		// new id
		await expect(
			CartItem.checkDuplicate(2, "p6")
		).resolves.toBeUndefined();
		// already in use
		await expect(
			CartItem.checkDuplicate(2, "p1")
		).rejects.toThrowError(ExpressError);
	});
});

describe("fetching", () => {
	test("not found cart items", async () => {
		const cart = await CartItem.getByCart(0);

		expect(cart).toEqual([]);
	});

	test("get by cart id", async () => {
		const cartItems = await CartItem.getByCart(cartId);
		const cartItemsJest = [];
		for (let i = 1; i <= 2; i++) {
			cartItemsJest.push(
				expect.objectContaining({
					cartId,
					productId: `p${i}`,
					quantity: 1
				})
			);
		}

		expect(cartItems).toEqual(
			expect.arrayContaining(cartItemsJest)
		);
	});
});

describe("creation", () => {
	test("duplicate", async () => {
		await expect(
			CartItem.addNew({ cartId: 2, productId: "p1" })
		).rejects.toThrowError(ExpressError);
	});

	test("add one", async () => {
		const cartItem = await CartItem.addNew({ cartId, productId });

		expect(cartItem).toEqual(expect.objectContaining({
			cartId, productId, quantity: 1
		}));
	});
});

describe("deletion", () => {
	test("not found", async () => {
		await expect(
			CartItem.deleteById({ cartId, productId })
		).rejects.toThrowError(ExpressError);
	});

	test("delete one", async () => {
		const cartItem = await CartItem.addNew({ cartId, productId });

		expect(cartItem.delete()).resolves.toBeUndefined();
	});
});

describe("update", () => {
	test("not found", async () => {
		await expect(
			CartItem.updateById({ cartId, productId })
		).rejects.toThrowError(ExpressError);
	});

	test("update one", async () => {
		const newVals = { quantity };
		const cartItem = await (
			await CartItem.addNew({ cartId, productId })
		).update(newVals);

		expect(cartItem).toEqual(expect.objectContaining({
			...newVals, cartId, productId
		}));
	});
});
