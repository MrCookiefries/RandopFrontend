require("dotenv").config();

const secretKey = process.env.SECRET_KEY || "the-super-secret-key";
const portNum = +process.env.PORT || 3001;
const databaseURI = process.env.DATABASE_URL || `randop`;
const bcryptWorkFactor = 12;

module.exports = {
	secretKey,
	portNum,
	databaseURI,
	bcryptWorkFactor
};
