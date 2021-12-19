require("dotenv").config();

const secretKey = process.env.SECRET_KEY || "the-super-secret-key";

const portNum = +process.env.PORT || 3001;

const databaseURI = process.env.DATABASE_URL || `
	randop${process.env.NODE_ENV === "test" ? "_test" : ""}
`;

const bcryptWorkFactor = process.env.NODE_ENV === "test" ? 1 : 12;

module.exports = {
	secretKey,
	portNum,
	databaseURI,
	bcryptWorkFactor
};
