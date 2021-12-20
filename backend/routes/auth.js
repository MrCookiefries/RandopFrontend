const { Router } = require("express");
const router = Router();

const User = require("../models/User");
const handleJsonValidator = require("../helpers/jsonValidator");
const loginSchema = require("../jsonschemas/auth/login.json");
const createToken = require("../helpers/createToken");

/**
 * takes a email & password to login,
 * making a new JWT & returning it with the user
 */
router.post("/", async (req, res, next) => {
	try {
		handleJsonValidator(req.body, loginSchema);
		const user = await User.login(req.body);
		const token = createToken(user);
		return res.status(201).json({ user, token });
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
