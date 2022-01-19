const { Router } = require("express");
const router = Router();

const catchErrors = require("../middleware/catchErrors");
const stripe = require("stripe")(process.env.STRIPE_TOKEN);
const User = require("../models/User");
const { ensureUser } = require("../middleware/auth");
const handleJsonValidator = require("../helpers/handleJsonValidator");
const newCustomerSchema = require("../jsonschemas/customers/new.json");

router.post("/", [ensureUser],
	catchErrors(async (req, res) => {
		handleJsonValidator(req.body, newCustomerSchema);
		const { id: stripeId } = await stripe.customers.create(req.body);
		const user = await User.updateById(res.user.id, { stripeId });
		return res.status(201).json({ user });
	})
);

module.exports = router;
