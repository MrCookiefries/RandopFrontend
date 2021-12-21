const { Router } = require("express");
const router = Router();

const Product = require("../models/Product");
const parseStringNums = require("../helpers/parseStringNums");
const handleJsonValidator = require("../helpers/handleJsonValidator");
const getManySchema = require("../jsonschemas/products/getMany.json");


router.get("/", async (req, res, next) => {
	try {
		parseStringNums(req.query, ["limit", "offset"]);
		handleJsonValidator(req.query, getManySchema);
		const products = await Product.getProducts(req.query);
		return res.status(200).json({ products });
	} catch (err) {
		next(err);
	}
});

router.get("/:id", async (req, res, next) => {
	try {
		const product = await Product.getProductById(req.params.id);
		return res.status(200).json({ product });
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
