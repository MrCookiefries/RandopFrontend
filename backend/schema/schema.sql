CREATE TABLE users (
	id SERIAL,
	email VARCHAR(40) NOT NULL,
	name VARCHAR(20) NOT NULL,
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

-- join table of products & users
CREATE TABLE carts (
	user_id INTEGER,
	product_id TEXT,
	quantity INTEGER,

	CONSTRAINT fk_user
		FOREIGN KEY (user_id)
			REFERENCES users
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

	PRIMARY KEY (user_id, product_id)
);
