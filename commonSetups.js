const bcrypt = require("bcrypt");

const db = require("./database");
const { bcryptWorkFactor } = require("./config");
const createToken = require("./helpers/createToken");

// setup the database before testing
const commonBeforeAll = async () => {
	// clear out all the tables
	await db.query("DELETE FROM products");
	await db.query("DELETE FROM users");
	await db.query("DELETE FROM carts");
	await db.query("DELETE FROM orders");

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
		(id, email, name, password, is_admin)
		VALUES
		(1, 'u@1', 'name', '${hash}', TRUE),
		(2, 'u@2', 'name', '${hash}', TRUE),
		(3, 'u@3', 'name', '${hash}', FALSE),
		(4, 'u@4', 'name', '${hash}', FALSE),
		(5, 'u@5', 'name', '${hash}', FALSE),
		(6, 'u@6', 'name', '${hash}', FALSE)
		`
	);

	await db.query(
		`INSERT INTO carts
		(id, user_id)
		VALUES
		(1, 1),
		(2, 3),
		(3, 3),
		(4, 3),
		(5, 5)
		`
	);

	await db.query(
		`INSERT INTO carts_products
		(cart_id, product_id)
		VALUES
		(2, 'p1'),
		(2, 'p2'),
		(1, 'p1'),
		(4, 'p3'),
		(4, 'p6')`
	);

	await db.query(
		`INSERT INTO orders
		(id, user_id)
		VALUES
		(1, 1),
		(2, 3),
		(3, 3)
		`
	);

	await db.query(
		`INSERT INTO orders_products
		(order_id, product_id)
		VALUES
		(3, 'p1'),
		(3, 'p2'),
		(1, 'p1')`
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

// JWTs for testing admin / non admin
const userToken = createToken({ id: 3, isAdmin: false });
const adminToken = createToken({ id: 1, isAdmin: true });

module.exports = {
	commonBeforeAll, commonBeforeEach,
	commonAfterEach, commonAfterAll,
	userToken, adminToken
};
