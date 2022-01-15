const db = require("../database");
const ExpressError = require("../ExpressError");
const sqlPartialUpdate = require("../helpers/sqlPartialUpdate");

// represents a cart item row in the carts_products table
class CartItem {
	constructor({ cartId, productId, quantity }) {
		this.cartId = cartId;
		this.productId = productId;
		this.quantity = quantity;
	}

	// creates multiple new cart item instances in an array to return
	static addMultiple(cartItems) {
		return cartItems.map(i => new this(i));
	}

	// returns all the items in a cart
	static async getByCart(cartId) {
		const result = await db.query(
			`SELECT cart_id AS "cartId",
			product_id AS "productId", quantity
			FROM carts_products WHERE cart_id = $1`,
			[cartId]
		);

		return this.addMultiple(result.rows);
	}

	// checks if a product already exists in a cart
	static async checkDuplicate(cartId, productId) {
		const result = await db.query(
			`SELECT quantity FROM carts_products
			WHERE cart_id = $1 AND product_id = $2`,
			[cartId, productId]
		);

		if (result.rows[0]) {
			throw new ExpressError(`Cart item found for product ID: ${productId} in cart ID: ${cartId}`, 400);
		}
	}

	// adds a new product to a cart
	static async addNew({ cartId, productId, quantity = 1 }) {
		// can't have the same item in a cart twice
		await this.checkDuplicate(cartId, productId);

		const result = await db.query(
			`INSERT INTO carts_products
			(cart_id, product_id, quantity)
			VALUES ($1, $2, $3)
			RETURNING cart_id AS "cartId",
			product_id AS "productId", quantity`,
			[cartId, productId, quantity]
		);

		return new this(result.rows[0]);
	}

	// updates the quantity of a cart item
	static async updateById({ cartId, productId }, data = {}) {
		// generate the set portion of the query & the values array
		const { setColumns, values } = sqlPartialUpdate(data);
		const result = await db.query(
			`UPDATE carts_products SET ${setColumns}
			WHERE cart_id = $${values.length + 1}
			AND product_id = $${values.length + 2}
			RETURNING cart_id AS "cartId",
			product_id AS "productId", quantity`,
			[...values, cartId, productId]
		);

		const cartItem = result.rows[0];
		if (!cartItem) {
			throw new ExpressError(`No cart item found for product ID: ${productId} in cart ID: ${cartId}`, 400);
		}

		return new this(cartItem);
	}

	// update a cart item from instance
	async update(data) {
		const { cartId, productId } = this;
		return await CartItem.updateById({ cartId, productId }, data);
	}

	// deletes a cart item by ID
	static async deleteById({ cartId, productId }) {
		const result = await db.query(
			`DELETE FROM carts_products
			WHERE cart_id = $1 AND product_id = $2
			RETURNING quantity`,
			[cartId, productId]
		);

		if (!result.rows[0]) {
			throw new ExpressError(`No cart item found for product ID: ${productId} in cart ID: ${cartId}`, 400);
		}
	}

	// delete a product from instance
	async delete() {
		const { cartId, productId } = this;
		await CartItem.deleteById({ cartId, productId });
	}
}

module.exports = CartItem;
