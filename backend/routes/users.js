const { Router } = require("express");
const router = Router();

const catchErrors = require("../middleware/catchErrors");
const User = require("../models/User");
const handleJsonValidator = require("../helpers/handleJsonValidator");
const newUserSchema = require("../jsonschemas/users/new.json");
const createToken = require("../helpers/createToken");

router.post("/", catchErrors(async (req, res) => {
	handleJsonValidator(req.body, newUserSchema);
	const user = await User.register(req.body);
	const token = createToken(user);
	return res.status(201).json({ user, token });
}));

module.exports = router;
