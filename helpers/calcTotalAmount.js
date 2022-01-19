const Product = require("../models/Product");

// takes a new payment request of cart data & calculates the amount
const calcTotalAmount = async items => {
	let total = 0n;
	const ids = items.map(i => i.productId);
	const products = await Product.getByIdSet(ids);

	console.warn(products);

	for (const { productId, quantity } of items) {
		console.warn(typeof products[productId]);
		total += (products[productId] * quantity);
	}

	return Number(total);
};

module.exports = calcTotalAmount;
