const { Router } = require("express");
const router = Router();

const catchErrors = require("../middleware/catchErrors");
const CartItem = require("../models/CartItem");
const handleJsonValidator = require("../helpers/handleJsonValidator");
const { ensureUser } = require("../middleware/auth");
const Cart = require("../models/Cart");
const checkOwner = require("../helpers/checkOwner");
const addNewSchema = require("../jsonschemas/cartItems/new.json");
const updateSchema = require("../jsonschemas/cartItems/update.json");

router.get("/:cartId", [ensureUser],
	catchErrors(async (req, res) => {
		const { cartId } = req.params;
		// fetch the cart
		const cart = await Cart.getById(cartId);
		// ensure owner
		checkOwner(res.user.id, cart.userId);

		const cartItems = await CartItem.getByCart(cartId);
		return res.status(200).json({ cartItems });
	})
);

router.post("/", [ensureUser],
	catchErrors(async (req, res) => {
		handleJsonValidator(req.body, addNewSchema);

		// fetch the cart
		const cart = await Cart.getById(req.body.cartId);
		// ensure owner
		checkOwner(res.user.id, cart.userId);

		const cartItem = await CartItem.addNew(req.body);
		return res.status(201).json({ cartItem });
	})
);

router.patch("/", [ensureUser],
	catchErrors(async (req, res) => {
		handleJsonValidator(req.body, updateSchema);
		const { cartId, productId, ...data } = req.body;

		// fetch the cart
		const cart = await Cart.getById(cartId);
		// ensure owner
		checkOwner(res.user.id, cart.userId);

		const cartItem = await CartItem.updateById({ cartId, productId }, data);
		return res.status(200).json({ cartItem });
	})
);

router.delete("/:cartId/:productId", [ensureUser],
	catchErrors(async (req, res) => {
		const { cartId, productId } = req.params;

		// fetch the cart
		const cart = await Cart.getById(cartId);
		// ensure owner
		checkOwner(res.user.id, cart.userId);

		await CartItem.deleteById({ cartId, productId });
		return res.status(204).send();
	})
);

module.exports = router;
