const {
	commonBeforeAll, commonBeforeEach,
	commonAfterEach, commonAfterAll
} = require("../commonSetups");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

const Product = require("./Product");
const ExpressError = require("../ExpressError");

describe("helpers", () => {
	test("duplicates", async () => {
		// new ID
		await expect(
			Product.checkDuplicate("nope")
		).resolves.toBeUndefined();
		// already used ID
		await expect(
			Product.checkDuplicate("p1")
		).rejects.toThrowError(ExpressError);
	});
});

const newProduct = {
	name: "name",
	image: "image",
	price: 100n,
	option1: null,
	option2: null
};

describe("fetching", () => {
	test("not found", async () => {
		await expect(
			Product.getById("nope")
		).rejects.toThrowError(ExpressError);
	});

	test("get one", async () => {
		const product = await Product.getById("p1");

		expect(product).toEqual(
			expect.objectContaining({
				...newProduct,
				id: "p1",
				price: newProduct.price.toString()
			})
		);
	});

	test("get many", async () => {
		const products = await Product.getMany();
		const productsJest = [];
		for (let i = 1; i <= 6; i++) {
			productsJest.push(
				expect.objectContaining({
					...newProduct,
					id: `p${i}`,
					price: newProduct.price.toString()
				})
			);
		}

		expect(products).toEqual(
			expect.arrayContaining(productsJest)
		);
	});
});

describe("creation", () => {
	test("duplicate", async () => {
		await expect(
			Product.addNew({ ...newProduct, id: "p1" })
		).rejects.toThrowError(ExpressError);
	});

	test("add one", async () => {
		const product = await Product.addNew(newProduct);

		expect(product).toEqual(expect.objectContaining({
			...newProduct,
			id: expect.any(String),
			price: newProduct.price.toString()
		}));
	});
});

describe("deletion", () => {
	test("not found", async () => {
		await expect(
			Product.deleteById("nope")
		).rejects.toThrowError(ExpressError);
	});

	test("delete one", async () => {
		const product = await Product.addNew(newProduct);

		expect(product.delete()).resolves.toBeUndefined();
	});
});

describe("update", () => {
	test("not found", async () => {
		await expect(
			Product.updateById("nope")
		).rejects.toThrowError(ExpressError);
	});

	test("update one", async () => {
		const newVals = { option1: "Green", price: 2840n };
		const product = await (
			await Product.addNew(newProduct)
		).update(newVals);

		expect(product).toEqual(expect.objectContaining({
			...newProduct,
			...newVals,
			price: newVals.price.toString()
		}));
	});
});
