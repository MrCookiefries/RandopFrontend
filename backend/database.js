const pg = require("pg");
const { databaseURI } = require("./config");

pg.types.setTypeParser(20, BigInt);

const clientConfig = {
	connectionString: databaseURI
};

if (process.env.NODE_ENV === "production") {
	clientConfig.ssl = {
		rejectUnauthorized: false
	};
}

const db = new pg.Client(clientConfig);

db.connect();

module.exports = db;
