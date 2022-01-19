import { productTypes } from "../actionTypes";
import Api from "../../helpers/api";

const productActions = {
	add: newProduct => ({
		type: productTypes.add, payload: newProduct
	}),
	update: productData => ({
		type: productTypes.update, payload: productData
	}),
	delete: id => ({
		type: productTypes.delete, id
	}),
	loadOne: product => ({
		type: productTypes.loadOne, payload: product
	}),
	loadMany: products => ({
		type: productTypes.loadMany, payload: products
	}),
	fetchOne: (id) => async dispatch => {
		const resp = await Api.getProductById(id);
		if (!resp) return;
		dispatch(productActions.loadOne(resp.product));
	},
	fetchMany: (limit = 10, offset) => async dispatch => {
		const resp = await Api.getProducts(limit, offset);
		if (!resp) return;
		dispatch(productActions.loadMany(resp.products));
	}
};

export default productActions;
