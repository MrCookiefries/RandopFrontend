const { Router } = require("express");
const router = Router();

const catchErrors = require("../middleware/catchErrors");
const Product = require("../models/Product");
const parseStringNums = require("../helpers/parseStringNums");
const handleJsonValidator = require("../helpers/handleJsonValidator");
const getManySchema = require("../jsonschemas/products/getMany.json");


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

module.exports = router;
