const { Router } = require("express");
const router = Router();

const catchErrors = require("../middleware/catchErrors");
const parseStringNums = require("../helpers/parseStringNums");
const Cart = require("../models/Cart");
const handleJsonValidator = require("../helpers/handleJsonValidator");
const getManySchema = require("../jsonschemas/carts/getMany.json");
const addNewSchema = require("../jsonschemas/carts/addNew.json");
const updateSchema = require("../jsonschemas/carts/update.json");

router.get("/", catchErrors(async (req, res) => {
	parseStringNums(req.query, ["limit", "offset"]);
	handleJsonValidator(req.query, getManySchema);
	const carts = await Cart.getMany(req.query);
	return res.status(200).json({ carts });
}));

router.get("/:userId/:productId", catchErrors(async (req, res) => {
	const { userId, productId } = req.params;
	const cart = await Cart.getById(userId, productId);
	return res.status(200).json({ cart });
}));

router.post("/", catchErrors(async (req, res) => {
	handleJsonValidator(req.body, addNewSchema);
	const cart = await Cart.addNew(req.body);
	return res.status(201).json({ cart });
}));

router.patch("/:userId/:productId", catchErrors(async (req, res) => {
	handleJsonValidator(req.body, updateSchema);
	const { userId, productId } = req.params;
	const cart = await Cart.updateById(userId, productId, req.body);
	return res.status(200).json({ cart });
}));

router.delete("/:userId/:productId", catchErrors(async (req, res) => {
	const { userId, productId } = req.params;
	await Cart.deleteById(userId, productId);
	return res.status(204).send();
}));

module.exports = router;
