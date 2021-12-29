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

// ensure requester is a user
const ensureUser = (req, res, next) => {
	try {
		if (!res.user) {
			throw new ExpressError(`Must be a logged in user`, 401);
		}
		return next();
	} catch (err) {
		return next(err);
	}
};

// ensure requester is an admin
const ensureAdmin = (req, res, next) => {
	try {
		if (!res.user.isAdmin) {
			throw new ExpressError(`User must be an admin`, 403);
		}
		return next();
	} catch (err) {
		return next(err);
	}
};

module.exports = {
	authenticateJWT,
	ensureUser,
	ensureAdmin
};
