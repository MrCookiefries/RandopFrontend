const db = require("../database");
const ExpressError = require("../ExpressError");

// represents a cart row in the carts table
class Cart {
	constructor({ id, userId }) {
		this.id = id;
		this.userId = userId;
	}

	// creates a new cart for a user
	static async addNew(userId) {
		const result = await db.query(
			`INSERT INTO carts (user_id)
			VALUES ($1)
			RETURNING id, user_id AS "userId"`,
			[userId]
		);

		return new this(result.rows[0]);
	}

	// deletes a cart by ID
	static async deleteById(cartId) {
		const result = await db.query(
			`DELETE FROM carts
			WHERE id = $1
			RETURNING id`,
			[cartId]
		);

		if (!result.rows[0]) {
			throw new ExpressError(`No cart found with ID: ${cartId}`, 400);
		}
	}

	// delete a cart from instance
	async delete() {
		await Cart.deleteById(this.id);
	}

	// creates multiple new cart instances in an array to return
	static addMultiple(carts) {
		return carts.map(c => new this(c));
	}

	// returns all the user's carts
	static async getByUser(userId) {
		const result = await db.query(
			`SELECT id, user_id AS "userId"
			FROM carts WHERE user_id = $1`,
			[userId]
		);

		return this.addMultiple(result.rows);
	}

	// gets a cart by id
	static async getById(cartId) {
		const result = await db.query(
			`SELECT id, user_id AS "userId"
			FROM carts WHERE id = $1`,
			[cartId]
		);

		const cart = result.rows[0];

		if (!cart) {
			throw new ExpressError(`No cart found with ID: ${cartId}`, 400);
		}

		return new this(cart);
	}
}

module.exports = Cart;
