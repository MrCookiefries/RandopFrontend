const db = require("../database");
const ExpressError = require("../ExpressError");
const sqlPartialUpdate = require("../helpers/sqlPartialUpdate");

// represents a cart row in the carts table
class Cart {
	constructor({ userId, productId, quantity }) {
		this.userId = userId;
		this.productId = productId;
		this.quantity = quantity;
	}

	// checks if a duplicate entry already exists by primary key
	static async checkDuplicate(userId, productId) {
		const result = await db.query(
			`SELECT quantity
			FROM carts
			WHERE user_id = $1
			AND product_id = $2`,
			[userId, productId]
		);
		// throw error if an entry was found
		if (result.rows[0]) {
			throw new ExpressError(`Duplicate cart item with user ID: ${userId} & product ID: ${productId}`);
		}
	}

	// creates a new cart item for a user
	static async addNew({ userId, productId, quantity = 1 }) {
		// no duplicate primary keys allowed
		await this.checkDuplicate(userId, productId);
		const result = await db.query(
			`INSERT INTO carts 
			(user_id, product_id, quantity)
			VALUES ($1, $2, $3)
			RETURNING user_id AS "userId",
			product_id AS "productId", quantity`,
			[userId, productId, quantity]
		);

		return new this(result.rows[0]);
	}

	// updates the quantity of a cart entry
	static async updateById({ userId, productId }, data = {}) {
		// generate the set portion of the query & the values array
		const { setColumns, values } = sqlPartialUpdate(data);
		const result = await db.query(
			`UPDATE carts SET ${setColumns}
			WHERE user_id = $${values.length + 1}
			AND product_id = $${values.length + 2}
			RETURNING user_id AS "userId",
			product_id AS "productId", quantity`,
			[...values, userId, productId]
		);

		const cart = result.rows[0];
		if (!cart) {
			throw new ExpressError(`No cart found with user ID: ${userId} & product ID: ${productId}`, 400);
		}

		return new this(cart);
	}

	// update a cart from instance
	async update(data) {
		const { userId, productId } = this;
		return await Cart.updateById({ userId, productId }, data);
	}

	// deletes a cart by ID
	static async deleteById({ userId, productId }) {
		const result = await db.query(
			`DELETE FROM carts
			WHERE user_id = $1
			AND product_id = $2
			RETURNING quantity`,
			[userId, productId]
		);

		if (!result.rows[0]) {
			throw new ExpressError(`No cart found with user ID: ${userId} & product ID: ${productId}`, 400);
		}
	}

	// delete a cart from instance
	async delete() {
		const { userId, productId } = this;
		await Cart.deleteById({ userId, productId });
	}

	// creates multiple new cart instances in an array to return
	static addMultiple(carts) {
		return carts.map(c => new this(c));
	}

	// returns all the user's carts
	static async getByUser(userId) {
		const result = await db.query(
			`SELECT user_id AS "userId",
			product_id AS "productId", quantity
			FROM carts WHERE user_id = $1`,
			[userId]
		);

		return this.addMultiple(result.rows);
	}
}

module.exports = Cart;
