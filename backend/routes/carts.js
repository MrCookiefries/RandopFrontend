const { Router } = require("express");
const router = Router();

const catchErrors = require("../middleware/catchErrors");
const Cart = require("../models/Cart");
const handleJsonValidator = require("../helpers/handleJsonValidator");
const addNewSchema = require("../jsonschemas/carts/addNew.json");
const updateSchema = require("../jsonschemas/carts/update.json");
const { ensureUser, ensureOwnerOrAdmin } = require("../middleware/auth");

router.get("/", [ensureUser],
	catchErrors(async (req, res) => {
		const carts = await Cart.getByUser(res.user.id);
		return res.status(200).json({ carts });
	})
);

router.post("/", [ensureUser],
	catchErrors(async (req, res) => {
		req.body.userId = res.user.id;
		handleJsonValidator(req.body, addNewSchema);
		const cart = await Cart.addNew(req.body);
		return res.status(201).json({ cart });
	})
);

router.patch("/:userId/:productId", [ensureUser, ensureOwnerOrAdmin],
	catchErrors(async (req, res) => {
		handleJsonValidator(req.body, updateSchema);
		const cart = await Cart.updateById(req.params, req.body);
		return res.status(200).json({ cart });
	})
);

router.delete("/:userId/:productId", [ensureUser, ensureOwnerOrAdmin],
	catchErrors(async (req, res) => {
		await Cart.deleteById(req.params);
		return res.status(204).send();
	})
);

module.exports = router;
