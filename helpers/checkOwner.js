const ExpressError = require("../ExpressError");

// checks if an id matches a resources owner id
const checkOwner = (userId, ownerId) => {
	if (userId != ownerId) {
		throw new ExpressError(`You must own this resource to interact with it`, 403);
	}
};

module.exports = checkOwner;
