import formatPrice from "./formatPrice";

describe("works", () => {
	test("cents", () => {
		expect(formatPrice(20)).toBe("$0.20");
	});
	test("dollars", () => {
		expect(formatPrice(2000)).toBe("$20.00");
	});
	test("dollars & cents", () => {
		expect(formatPrice(1499)).toBe("$14.99");
	});
	test("large amounts", () => {
		expect(formatPrice(3485963)).toBe("$34,859.63");
	});
});
