const bcrypt = require("bcrypt");

const db = require("./database");
const { bcryptWorkFactor } = require("./config");

// setup the database before testing
const commonBeforeAll = async () => {
	// clear out all the tables
	await db.query("DELETE FROM products");
	await db.query("DELETE FROM users");
	await db.query("DELETE FROM carts");

	// fill out the tables with sample data
	await db.query(
		`INSERT INTO products
		(id, name, image, price)
		VALUES
		('p1', 'name', 'image', 100),
		('p2', 'name', 'image', 100),
		('p3', 'name', 'image', 100),
		('p4', 'name', 'image', 100),
		('p5', 'name', 'image', 100),
		('p6', 'name', 'image', 100)
		`
	);
	const hash = await bcrypt.hash("password", bcryptWorkFactor);
	await db.query(
		`INSERT INTO users
		(email, name, password, is_admin)
		VALUES
		('u@1', 'name', '${hash}', TRUE),
		('u@2', 'name', '${hash}', TRUE),
		('u@3', 'name', '${hash}', FALSE),
		('u@4', 'name', '${hash}', FALSE),
		('u@5', 'name', '${hash}', FALSE),
		('u@6', 'name', '${hash}', FALSE)
		`
	);
	const ids = (await db.query(`SELECT id FROM users`)).rows.map(r => r.id);
	await db.query(
		`INSERT INTO carts
		(product_id, user_id, quantity)
		VALUES
		('p1', ${ids[0]}, 2),
		('p2', ${ids[0]}, 2),
		('p2', ${ids[1]}, 2),
		('p3', ${ids[2]}, 2),
		('p4', ${ids[3]}, 2),
		('p1', ${ids[4]}, 2),
		('p1', ${ids[5]}, 2)
		`
	);
}

// begin a DB transaction
const commonBeforeEach = async () => {
	await db.query("BEGIN");
}

// undo the transaction
const commonAfterEach = async () => {
	await db.query("ROLLBACK");
}

// end the DB connection
const commonAfterAll = async () => {
	await db.end();
}

module.exports = {
	commonBeforeAll, commonBeforeEach,
	commonAfterEach, commonAfterAll
};
