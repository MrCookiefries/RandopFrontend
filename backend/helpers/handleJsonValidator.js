const jsonschema = require("jsonschema");

const ExpressError = require("../ExpressError");

// handle the json schema validator
const handleJsonValidator = (instance, schema) => {
	// if it's invalid, generate an error & throw it
	const validator = jsonschema.validate(instance, schema);
	if (!validator.valid) {
		const errors = validator.errors.map(err => err.stack);
		throw new ExpressError(errors, 400);
	}
};

module.exports = handleJsonValidator;
