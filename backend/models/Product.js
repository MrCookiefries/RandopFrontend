const uuidv4 = require("uuid").v4;

const db = require("../database");
const ExpressError = require("../ExpressError");

// represents a product row in the products table
class Product {
	constructor({ id, name, image, option1, option2, price }) {
		this.id = id;
		this.name = name;
		this.image = image;
		this.option1 = option1;
		this.option2 = option2;
		this.price = price;
	}

	// price from 2680 -> $26.80
	get formattedPrice() {
		return `$${this.price / 100}`;
	}

	/**
	 * check if a product already exists with a given id
	 * if so throws an error
	 */
	static async checkDuplicate(id) {
		const result = await db.query(
			`SELECT id FROM products
			WHERE id = $1`,
			[id]
		);
		if (result.rows[0]) {
			throw new ExpressError(`Duplicate product id: ${id}`, 400);
		}
	}

	/**
	 * creates a new product instance to return
	 */
	static async addNew({
		name, image, price, id = uuidv4(), option1, option2
	}) {
		// pruducts can't have the same id
		await this.checkDuplicate(id);

		const result = await db.query(
			`INSERT INTO products
			(id, name, image, price, option1, option2)
			VALUES ($1, $2, $3, $4, $5, $6)
			RETURNING id, name, image, option1, option2, price`,
			[id, name, image, price, option1, option2]
		);

		return new this(result.rows[0]);
	}

	// deletes a product by ID & returns it
	static async deleteById(id) {
		const result = await db.query(
			`DELETE FROM products
			WHERE id = $1
			RETURNING id, name, price, image, option1, option2, price`,
			[id]
		);

		return result.rows[0];
	}

	// delete a product from instance
	async delete() {
		return await Product.deleteById(this.id);
	}
}

module.exports = Product;
