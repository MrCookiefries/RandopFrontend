const { Client } = require("pg");
const { databaseURI } = require("./config");

const clientConfig = {
	connectionString: databaseURI
};

if (process.env.NODE_ENV === "production") {
	clientConfig.ssl = {
		rejectUnauthorized: false
	};
}

const db = new Client(clientConfig);

db.connect();

module.exports = db;
