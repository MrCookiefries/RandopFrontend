CREATE TABLE users (
	id SERIAL,
	stripe_id TEXT,
	email VARCHAR(254) NOT NULL,
	name VARCHAR(70) NOT NULL,
	password TEXT NOT NULL,
	is_admin BOOLEAN NOT NULL DEFAULT FALSE,

	CONSTRAINT valid_email CHECK (
		position('@' IN email) > 1
	),

	PRIMARY KEY (id),
	UNIQUE (email)
);

CREATE TABLE products (
	id TEXT,
	name VARCHAR(250) NOT NULL,
	image TEXT NOT NULL,
	option1 VARCHAR(20),
	option2 VARCHAR(20),
	price BIGINT NOT NULL, -- stored in cents, 100 = $1.00 USD

	CONSTRAINT valid_price CHECK (
		price > 0
	),

	PRIMARY KEY (id)
);

-- users can have many carts
CREATE TABLE carts (
	id SERIAL,
	user_id INTEGER NOT NULL,

	CONSTRAINT fk_user
		FOREIGN KEY (user_id)
			REFERENCES users
			ON DELETE CASCADE
	,
	
	PRIMARY KEY (id)
);

-- join a product to a cart
CREATE TABLE carts_products (
	cart_id INTEGER NOT NULL,
	product_id TEXT NOT NULL,
	quantity INTEGER NOT NULL DEFAULT 1,

	CONSTRAINT fk_cart
		FOREIGN KEY (cart_id)
			REFERENCES carts
			ON DELETE CASCADE
	,
	CONSTRAINT fk_product
		FOREIGN KEY (product_id)
			REFERENCES products
			ON DELETE CASCADE
	,
	CONSTRAINT valid_quantity CHECK (
		quantity > 0
	),

	PRIMARY KEY (cart_id, product_id)
);

-- users can have many orders
CREATE TABLE orders (
	id SERIAL,
	user_id INTEGER NOT NULL,
	checkout_date TIMESTAMPTZ NOT NULL DEFAULT NOW()

	CONSTRAINT fk_user
		FOREIGN KEY (user_id)
			REFERENCES users
			ON DELETE CASCADE
	,
	
	PRIMARY KEY (id)
);

-- join a product to an order
CREATE TABLE carts_products (
	order_id INTEGER NOT NULL,
	product_id TEXT NOT NULL,
	quantity INTEGER NOT NULL DEFAULT 1,

	CONSTRAINT fk_order
		FOREIGN KEY (order_id)
			REFERENCES orders
			ON DELETE CASCADE
	,
	CONSTRAINT fk_product
		FOREIGN KEY (product_id)
			REFERENCES products
			ON DELETE CASCADE
	,
	CONSTRAINT valid_quantity CHECK (
		quantity > 0
	),

	PRIMARY KEY (order_id, product_id)
);
