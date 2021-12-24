const { Router } = require("express");
const router = Router();

const catchErrors = require("../middleware/catchErrors");
const Product = require("../models/Product");
const parseStringNums = require("../helpers/parseStringNums");
const handleJsonValidator = require("../helpers/handleJsonValidator");
const getManySchema = require("../jsonschemas/products/getMany.json");
const addNewSchema = require("../jsonschemas/products/addNew.json");
const updateSchema = require("../jsonschemas/products/update.json");


router.get("/", catchErrors(async (req, res) => {
	parseStringNums(req.query, ["limit", "offset"]);
	handleJsonValidator(req.query, getManySchema);
	const products = await Product.getProducts(req.query);
	return res.status(200).json({ products });
}));

router.get("/:id", catchErrors(async (req, res) => {
	const product = await Product.getProductById(req.params.id);
	return res.status(200).json({ product });
}));

router.post("/", catchErrors(async (req, res) => {
	handleJsonValidator(req.body, addNewSchema);
	const product = await Product.addNew(req.body);
	return res.status(201).json({ product });
}));

router.patch("/:id", catchErrors(async (req, res) => {
	handleJsonValidator(req.body, updateSchema);
	const product = await Product.updateById(req.params.id, req.body);
	return res.status(200).json({ product });
}));

router.delete("/:id", catchErrors(async (req, res) => {
	await Product.deleteById(req.params.id);
	return res.status(204).send();
}));

module.exports = router;
