const { Router } = require("express");
const router = Router();

const catchErrors = require("../middleware/catchErrors");
const Order = require("../models/Order");
const { ensureUser, ensureAdmin } = require("../middleware/auth");
const parseStringNums = require("../helpers/parseStringNums");
const handleJsonValidator = require("../helpers/handleJsonValidator");
const getManySchema = require("../jsonschemas/orders/getMany.json");
const Cart = require("../models/Cart");
const checkOwner = require("../helpers/checkOwner");

router.get("/", [ensureUser, ensureAdmin],
	catchErrors(async (req, res) => {
		const { query } = req;
		parseStringNums(query, ["limit", "offset"]);
		handleJsonValidator(query, getManySchema);

		const orders = await Order.getMany(query);
		return res.status(200).json({ orders });
	})
);

router.post("/:cartId", [ensureUser],
	catchErrors(async (req, res) => {
		const { cartId } = req.params;
		// fetch the cart by ID
		const cart = await Cart.getById(cartId);

		// ensure user owns cart
		checkOwner(res.user.id, cart.userId);

		const order = await Order.addNew(cartId);
		return res.status(201).json({ order });
	})
);

module.exports = router;
