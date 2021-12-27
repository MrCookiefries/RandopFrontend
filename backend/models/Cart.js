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
	static async addNew({ userId, productId, quantity }) {
		// no duplicate primary keys allowed
		await this.checkDuplicate(userId, productId);
		const result = await db.query(
			`INSERT INTO carts 
			(user_id, product_id ${quantity ? ", quantity" : ""})
			VALUES ($1, $2 ${quantity ? ", $3" : ""})
			RETURNING user_id AS "userId",
			product_id AS "productId", quantity`,
			quantity ? [userId, productId, quantity] : [userId, productId]
		);

		return new this(result.rows[0]);
	}

	// updates the quantity of a cart entry
	static async updateById(userId, productId, data = {}) {
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
		return await Cart.updateById(this.userId, this.productId, data);
	}

	// deletes a cart by ID
	static async deleteById(userId, productId) {
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
		await Cart.deleteById(this.userId, this.productId);
	}

	// creates multiple new cart instances in an array to return
	static addMultiple(carts) {
		return carts.map(c => new this(c));
	}

	// returns all the carts or the amount specified
	static async getMany({ limit, offset } = {}) {
		// only add in the filtering clauses if applicable
		const result = await db.query(
			`SELECT user_id AS "userId",
			product_id AS "productId", quantity
			FROM carts ${limit ? "LIMIT " + limit : ""}
			${offset ? "OFFSET " + offset : ""}`
		);

		return this.addMultiple(result.rows);
	}

	// return a cart found by its ID
	static async getById(userId, productId) {
		const result = await db.query(
			`SELECT user_id AS "userId",
			product_id AS "productId", quantity
			FROM carts WHERE user_id = $1
			AND product_id = $2`,
			[userId, productId]
		);

		const cart = result.rows[0];
		if (!cart) {
			throw new ExpressError(`No cart found with user ID: ${userId} & product ID: ${productId}`, 400);
		}

		return new this(cart);
	}
}

module.exports = Cart;
