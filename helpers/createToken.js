const jwt = require("jsonwebtoken");

const { secretKey } = require("../config");

// create a JWT & return it
const createToken = ({ id, isAdmin }) => {
	const payload = { id, isAdmin };

	return jwt.sign(payload, secretKey);
};

module.exports = createToken;
