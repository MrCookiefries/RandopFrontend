const {
	commonBeforeAll, commonBeforeEach,
	commonAfterEach, commonAfterAll
} = require("../commonSetups");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

const Order = require("./Order");

describe("fetching", () => {
	test("get many", async () => {
		const orders = await Order.getMany();
		const ordersJest = [];
		for (let i = 1; i <= 3; i++) {
			ordersJest.push(
				expect.objectContaining({
					id: expect.any(Number),
					userId: expect.any(Number),
					checkoutDate: expect.any(Date),
					items: expect.any(Array)
				})
			);
		}

		expect(orders).toEqual(
			expect.arrayContaining(ordersJest)
		);
	});

	test("get many (limit filter)", async () => {
		const orders = await Order.getMany({ limit: 1 });

		expect(orders).toEqual(
			expect.arrayContaining([expect.objectContaining({
				id: expect.any(Number),
				userId: expect.any(Number),
				checkoutDate: expect.any(Date),
				items: expect.any(Array)
			})])
		);
	});
});

describe("creation", () => {
	test("add one", async () => {
		const order = await Order.addNew(4);

		expect(order).toEqual(expect.objectContaining({
			id: 4,
			userId: expect.any(Number),
			checkoutDate: expect.any(Date),
			items: expect.any(Array)
		}));
	});
});
