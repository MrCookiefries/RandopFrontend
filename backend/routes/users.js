const { Router } = require("express");
const router = Router();

const catchErrors = require("../middleware/catchErrors");
const User = require("../models/User");
const handleJsonValidator = require("../helpers/handleJsonValidator");
const newUserSchema = require("../jsonschemas/users/new.json");
const updateUserSchema = require("../jsonschemas/users/update.json");
const createToken = require("../helpers/createToken");
const { ensureUser, ensureOwnerOrAdmin } = require("../middleware/auth");

// register
router.post("/", catchErrors(async (req, res) => {
	handleJsonValidator(req.body, newUserSchema);
	const user = await User.register(req.body);
	const token = createToken(user);
	return res.status(201).json({ user, token });
}));

router.patch("/:userId", [ensureUser, ensureOwnerOrAdmin],
	catchErrors(async (req, res) => {
		handleJsonValidator(req.body, updateUserSchema);
		const user = await User.updateById(req.params.userId, req.body);
		return res.status(200).json({ user });
	})
);

module.exports = router;
