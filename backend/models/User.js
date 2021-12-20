const bcrypt = require("bcrypt");

const db = require("../database");
const ExpressError = require("../ExpressError");
const { bcryptWorkFactor } = require("../config");

// represents a user row in the users table
class User {
	constructor({ id, email, name, isAdmin }) {
		this.id = id;
		this.email = email;
		this.name = name;
		this.isAdmin = isAdmin;
	}

	/**
	 * check if a user already exists with a given email
	 * if so throws an error
	 */
	static async checkDuplicate(email) {
		const result = await db.query(
			`SELECT email
			FROM users
			WHERE email = $1`,
			[email]
		);
		if (result.rows[0]) {
			throw new ExpressError(`Duplicate email: ${email}`, 400);
		}
	}

	// create a new user & return it
	static async register({ email, name, password }) {
		// can't have same email as another user
		await this.checkDuplicate(email);
		// hash the password for protection
		const hashedPassword = await bcrypt.hash(password, bcryptWorkFactor);

		const result = await db.query(
			`INSERT INTO users
			(email, name, password)
			VALUES ($1, $2, $3)
			RETURNING id, email, name, is_admin AS "isAdmin"`,
			[email, name, hashedPassword]
		);

		return new this(result.rows[0]);
	}

	// returns a user from credentials
	static async login({ email, password }) {
		const result = await db.query(
			`SELECT id, email, name, password, is_admin AS "isAdmin"
			FROM users WHERE email = $1`,
			[email]
		);
		const user = result.rows[0];
		// check if a user was found with that email
		if (!user) {
			throw new ExpressError(`Couldn't find email: ${email}`, 401);
		}
		// check if the passwords match
		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword) {
			throw new ExpressError(`Incorrect password`, 401);
		}

		return new this(user);
	}

}

module.exports = User;
