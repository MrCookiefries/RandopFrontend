const jwt = require("jsonwebtoken");

const { secretKey } = require("../config");
const ExpressError = require("../ExpressError");

/**
 * check if the request has a token
 * if so, get the payload & store it on the response
 */
const authenticateJWT = (req, res, next) => {
	try {
		const authHeader = req.headers?.authorization;
		if (authHeader) {
			const token = authHeader.replace(/^[Bb]earer /, "").trim();
			res.user = jwt.verify(token, secretKey);
		}
		return next();
	} catch (err) {
		return next();
	}
};

module.exports = {
	authenticateJWT
};
