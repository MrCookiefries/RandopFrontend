const { Router } = require("express");
const router = Router();

const catchErrors = require("../middleware/catchErrors");
const Cart = require("../models/Cart");
const { ensureUser } = require("../middleware/auth");
const checkOwner = require("../helpers/checkOwner");

router.get("/", [ensureUser],
	catchErrors(async (req, res) => {
		const carts = await Cart.getByUser(res.user.id);
		return res.status(200).json({ carts });
	})
);

router.post("/", [ensureUser],
	catchErrors(async (req, res) => {
		const cart = await Cart.addNew(res.user.id);
		return res.status(201).json({ cart });
	})
);

router.delete("/:cartId", [ensureUser],
	catchErrors(async (req, res) => {
		const { cartId } = req.params;
		// fetch cart by ID
		const cart = await Cart.getById(cartId);

		// ensure user owns the cart
		checkOwner(res.user.id, cart.userId);

		await cart.delete();
		return res.status(204).send();
	})
);

module.exports = router;
